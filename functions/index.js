const functions = require('firebase-functions');

const admin = require('firebase-admin');

const stripe = require('stripe')(functions.config().stripe.key);

const cors = require('cors')({ origin: true });

const pdfkit = require('pdfkit');

const nodemailer = require('nodemailer');

const nodemailMailgun = require('nodemailer-mailgun-transport');

const moment = require('moment');

const client = require('twilio')(
  functions.config().twilio.accountsid,
  functions.config().twilio.authtoken,
);

admin.initializeApp();

exports.getOrders = functions.https.onCall(async (data, context) => {
  const docPath = data.docPath;

  const collections = await admin
    .firestore()
    .doc(docPath)
    .listCollections();

  const getData = async () => {
    return Promise.all(
      collections.map(async (col) => {
        return col.get().then((querySnapshot) => querySnapshot);
      }),
    );
  };

  let querysnapshots = await getData().then((data) => {
    return data;
  });

  querysnapshots = querysnapshots.map((querySnapshot) => {
    let docs = querySnapshot.docs;
    let docum = {};
    for (let doc of docs) {
      docum = { idOrder: doc.id, ...doc.data() };
    }
    return docum;
  });

  return querysnapshots;
});

const calculateOrderAmount = (items, tip) => {
  let amount = items.reduce(
    (accumulator, currentValue) =>
      accumulator +
      parseInt(currentValue.totalOrdered) * currentValue.productPrice,
    0,
  );
  amount += (amount * 8.875) / 100;
  if (typeof tip === 'number') {
    amount += tip;
  }
  return Math.round(amount) * 100;
};

exports.getClientSecret = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    if (req.method === 'POST') {
      try {
        const { productsOrdered, tip } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
          amount: calculateOrderAmount(productsOrdered, tip),
          currency: 'usd',
        });

        res.status(200).send(paymentIntent.client_secret);
      } catch (err) {
        console.log(err);
        res.status(500).json({ statusCode: 500, message: err.message });
      }
    } else {
      res.setHeader('Allow', 'POST');
      res.status(405).end('Method Not Allowed');
    }
  });
});

async function mail(buffers, orderID) {
  const pdfData = Buffer.concat(buffers);

  const auth = {
    auth: {
      api_key: functions.config().mailgun.apikey,
      domain: functions.config().mailgun.domain,
    },
  };

  let transporter = nodemailer.createTransport(nodemailMailgun(auth));

  const mailOptions = {
    from:
      'Franky Dev 👻 <postmaster@sandboxc0135ae4ebea47a3ba72cf83f4d8b4e6.mailgun.org>', // sender address
    to: 'eltepeyacgrocery@gmail.com, fr4nky.develop3r@gmail.com', // list of receivers
    subject: 'Nueva orden de comida', // Subject line
    text:
      'Hola El tepeyac, puedes encontrar los detalles de la orden en el PDF', // plain text body
    attachments: [
      {
        filename: `${orderID}.pdf`,
        content: pdfData,
      },
    ],
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log('Error: ', err);
      return false;
    } else {
      console.log('message sent', data);
      return true;
    }
  });
}

function generateTableRow(doc, y, c1, c2, c3) {
  doc
    .fontSize(8)
    .text(c1, 10, y)
    .text(c2, 20, y, { width: 90, align: 'left' })
    .text(c3, 110, y, { width: 60, align: 'left' });
}

function generateProductsTable(doc, products, customer) {
  let invoiceTableTop = 100;
  let position = 0;

  for (let i = 0; i < products.length; i++) {
    const item = products[i];
    position = invoiceTableTop + (i + 1) * 25;
    generateTableRow(
      doc,
      position,
      item.totalOrdered,
      item.productName,
      item.productCategory,
    );
  }
  generateCustomerInfo(doc, customer, position);
}

function generateCustomerInfo(doc, customer, position) {
  doc
    .fontSize(9)
    .text('Customer', 10, position + 30)
    .moveDown(0.5);

  doc.fontSize(8).text(`Name: ${customer.customerName}`, 10, position + 40);
  doc
    .fontSize(8)
    .text(`Phone Number: ${customer.customerPhoneNumber}`, 10, position + 55);
  if (customer.customerAddress) {
    doc
      .fontSize(8)
      .text(`Address: ${customer.customerAddress}`, 10, position + 70);
    doc
      .fontSize(8)
      .text(`Apt: ${customer.customerApt}`, 10, position + 85)
      .moveDown(0.5);
  } else {
    doc
      .fontSize(8)
      .text(`Pickup`, 10, position + 70)
      .moveDown(0.5);
  }
}

function generatePDF(orderID, data) {
  const products = Object.values(data.products);
  const customer = data.infoCustomer;
  const doc = new pdfkit();
  const bucket = admin.storage().bucket(functions.config().storage.bucket);
  const filename = `/orders/${moment().format(
    'MM-DD-YYYY',
  )}/${orderID}/${orderID}.pdf`;
  const file = bucket.file(filename);
  const bucketFileStream = file.createWriteStream();
  var buffers = [];
  let p = new Promise((resolve, reject) => {
    doc.on('end', () => {
      resolve(buffers);
    });
    doc.on('error', () => {
      reject();
    });
  });
  doc.pipe(bucketFileStream);
  doc.on('data', buffers.push.bind(buffers));
  //Add Document Text and stuff

  doc
    .fontSize(8)
    .text('www.eltepeyacfood.com', 20, 90)
    .image('./img/logo.jpg', 20, 5, { width: 80 });

  doc
    .font('./fonts/Roboto-Medium.ttf')
    .fontSize(12)
    .text(`# ${data.infoCustomer.customerName}`, 10, 100);

  generateProductsTable(doc, products, customer);

  doc
    .fontSize(9)
    .text(`Other info`, 10)
    .moveDown(0.5);
  if (data.specialInstructions) {
    doc
      .fontSize(8)
      .text(`Special Instructions: ${data.specialInstructions}`, {
        width: 130,
      })
      .moveDown(0.5);
  }
  doc
    .fontSize(8)
    .text(`Delivery Tip: $${data.deliveryTip}`, 10)
    .moveDown(0.5);
  doc
    .fontSize(8)
    .text(`Time Order: ${data.timeOrder}`, 10)
    .moveDown(0.5);
  doc
    .fontSize(8)
    .text(`Total Order: $${data.totalOrder}`, 10)
    .moveDown(0.5);
  doc.end();
  return p.then((buffers) => {
    return mail(buffers, orderID);
  });
}

function sendSMS(data) {
  let orderInfo = '';

  if (data.infoCustomer.customerAddress) {
    orderInfo = `${data.infoCustomer.customerAddress} - ${data.infoCustomer.customerApt} `;
  } else {
    orderInfo = 'Pickup';
  }
  return client.messages
    .create({
      body: `Nueva orden de comida,  ${data.infoCustomer.customerName} - ${orderInfo}`,
      from: '+11 202 795 3374',
      to: '+13478856523',
    })
    .then((message) => console.log(message.sid));
}

exports.generatePDF = functions.firestore
  .document('orders/{day}/{idOrder}/{order}')
  .onCreate(async (snapshot, context) => {
    const data = snapshot.data();
    sendSMS(data);
    const idOrder = context.params.idOrder;
    return generatePDF(idOrder, data);
  });

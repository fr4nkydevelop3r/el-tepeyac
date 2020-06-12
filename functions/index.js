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
    to: 'fr4nky.develop3r@gmail.com', // list of receivers
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
    .fontSize(10)
    .text(c1, 20, y)
    .text(c2, 40, y, { width: 80, align: 'left' })
    .text(c3, 130, y);
}

function generateProductsTable(doc, products, customer) {
  let invoiceTableTop = 80;
  let position = 0;

  for (let i = 0; i < products.length; i++) {
    const item = products[i];
    position = invoiceTableTop + (i + 1) * 50;
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
    .fontSize(11)
    .text('Customer', 20, position + 30)
    .moveUp(0.5);

  doc.fontSize(10).text(`Name: ${customer.customerName}`, 20, position + 45);
  doc
    .fontSize(10)
    .text(`Phone Number: ${customer.customerPhoneNumber}`, 20, position + 60);
  if (customer.customerAddress) {
    doc
      .fontSize(10)
      .text(`Address: ${customer.customerAddress}`, 20, position + 75);
    doc
      .fontSize(10)
      .text(`Apt: ${customer.customerApt}`, 20, position + 90)
      .moveDown(0.5);
  } else {
    doc
      .fontSize(10)
      .text(`Pickup`, 20, position + 75)
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
    .text('www.eltepeyacfood.com', 40, 95)
    .image('./img/logo.jpg', 45, 10, { width: 80 });

  doc
    .font('./fonts/Roboto-Medium.ttf')
    .fontSize(15)
    .text(`# ${data.infoCustomer.customerName}`, 20, 110);

  generateProductsTable(doc, products, customer);

  doc
    .fontSize(11)
    .text(`Other info`, 20)
    .moveDown(0.5);
  if (data.specialInstructions) {
    doc
      .fontSize(10)
      .text(`Special Instructions: ${data.specialInstructions}`, {
        width: 150,
      })
      .moveDown(0.5);
  }
  doc
    .fontSize(10)
    .text(`Delivery Tip: $${data.deliveryTip}`, 20)
    .moveDown(0.5);
  doc
    .fontSize(10)
    .text(`Time Order: ${data.timeOrder}`, 20)
    .moveDown(0.5);
  doc
    .fontSize(10)
    .text(`Total Order: $${data.totalOrder}`, 20)
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
      to: '+13476830875',
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

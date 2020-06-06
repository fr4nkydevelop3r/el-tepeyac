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

const calculateOrderAmount = (items) => {
  console.log(items);
  const amount = items.reduce(
    (accumulator, currentValue) =>
      accumulator +
      parseInt(currentValue.totalOrdered) * parseInt(currentValue.productPrice),
    0,
  );
  console.log(amount * 100);
  return amount * 100;
};

exports.getClientSecret = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    if (req.method === 'POST') {
      try {
        const { amount, productsOrdered } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
          amount: calculateOrderAmount(productsOrdered),
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
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
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
    .text(c1, 50, y)
    .text(c2, 70, y, { width: 150, align: 'left' })
    .text(c3, 220, y);
}

function generateProductsTable(doc, products, customer) {
  let invoiceTableTop = 80;
  let position = 0;

  for (let i = 0; i < products.length; i++) {
    const item = products[i];
    position = invoiceTableTop + (i + 1) * 30;
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
  doc.fontSize(10).text('Customer', 50, position + 30);
  doc.fontSize(9).text(`Name: ${customer.customerName}`, 50, position + 45);
  doc
    .fontSize(9)
    .text(`Phone Number: ${customer.customerPhoneNumber}`, 50, position + 60);
  if (customer.customerAddress) {
    doc
      .fontSize(9)
      .text(`Address: ${customer.customerAddress}`, 50, position + 75);
    doc.fontSize(9).text(`Apt: ${customer.customerApt}`, 50, position + 90);
  } else {
    doc.fontSize(9).text(`Pickup`, 50, position + 75);
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
    .font('./fonts/Roboto-Medium.ttf')
    .fontSize(15)
    .text(`# ${data.infoCustomer.customerName}`);

  generateProductsTable(doc, products, customer);

  doc.end();
  return p.then((buffers) => {
    return mail(buffers, orderID);
  });
}

exports.generatePDF = functions.firestore
  .document('orders/{day}/{idOrder}/{order}')
  .onCreate(async (snapshot, context) => {
    /*return client.messages
      .create({
        body: 'Hola El Tepeyac, llego una orden de comida',
        from: '+11 202 795 3374',
        to: '+13476830875',
      })
      .then((message) => console.log(message.sid));*/
    //return mail().catch(console.error);
    //console.log(snapshot.data());
    const idOrder = context.params.idOrder;
    const data = snapshot.data();
    return generatePDF(idOrder, data);
  });

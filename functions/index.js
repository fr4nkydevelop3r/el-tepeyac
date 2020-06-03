const functions = require('firebase-functions');

const admin = require('firebase-admin');

const stripe = require('stripe')(functions.config().stripe.key);

const cors = require('cors')({ origin: true });

const accountSid = 'ACc40807ad78083c6fbb6a6a15a09805ef';
const authToken = 'dba23f1c179bc11ac96d1c74deba8c80';
const client = require('twilio')(accountSid, authToken);

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

exports.sendSMS = functions.firestore
  .document('orders/{day}/{idOrder}/{order}')
  .onCreate((change, context) => {
    return client.messages
      .create({
        body: 'Hola El tepeyac, llego una orden de comida!',
        from: '+12027953374',
        to: '+13476830875',
      })
      .then((message) => console.log(message.sid));
  });

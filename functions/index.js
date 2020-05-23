const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe = require('stripe')(functions.config().stripe.key);
const cors = require('cors')({ origin: true });

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
      parseInt(currentValue.totalOrdered) * parseInt(currentValue.dishPrice),
    0,
  );
  console.log(amount * 100);
  return amount * 100;
};

exports.getClientSecret = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    if (req.method === 'POST') {
      try {
        const { amount, dishesOrdered } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
          amount: calculateOrderAmount(dishesOrdered),
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

import { v1 as uuidv1 } from 'uuid';

import { firestore } from '../firebase';
import { getDay } from '../utilities';

export default function addOrder(order) {
  const idOrder = uuidv1();

  const docRef = firestore.collection('orders').doc(getDay());
  docRef.get().then((doc) => {
    if (!doc.exists) {
      firestore
        .collection('orders')
        .doc(getDay())
        .set({})
        .catch((error) => {
          console.error('Error writing document: ', error);
        });
    }
  });

  return firestore
    .collection('orders')
    .doc(getDay())
    .collection(idOrder)
    .doc(idOrder)
    .set(order)
    .then(() => ({
      idOrder,
      dayOrder: getDay(),
      ...order,
    }))
    .catch((error) => {
      console.error('Error writing document: ', error);
    });
}

export function getOrders() {
  firestore
    .collection('orders')
    .doc(getDay())
    .collection('dbc9ace0-5c39-11ea-9e8b-87bc4b7df2a2')
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        console.log('No documents found.');
      } else {
        console.log(`Found ${querySnapshot.size} documents.`);
      }
    });
}

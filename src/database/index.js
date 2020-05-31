import { v1 as uuidv1 } from 'uuid';

import { firestore } from '../firebase';
import { getDay } from '../utilities';

export default async function addOrder(order) {
  const idOrder = uuidv1();
  const docRef = firestore.collection('orders').doc(getDay());
  await docRef.get().then((doc) => {
    if (!doc.exists) {
      firestore
        .collection('orders')
        .doc(getDay())
        .set({ totalOrders: 0 })
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

export async function incrementTotalOrders() {
  const docRef = firestore.collection('orders').doc(getDay());
  let totalOrders = 0;
  await docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        totalOrders = doc.data().totalOrders;
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    })
    .catch((error) => {
      console.log('Error getting document:', error);
    });
  return docRef
    .update({
      totalOrders: totalOrders + 1,
    })
    .catch((error) => {
      // The document probably doesn't exist.
      console.error('Error updating document: ', error);
    });
}

export async function updateOrder(idOrder) {
  let orderCompleted;
  const docRef = firestore
    .collection('orders')
    .doc(getDay())
    .collection(idOrder)
    .doc(idOrder);
  await docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        orderCompleted = doc.data().orderCompleted;
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    })
    .catch((error) => {
      console.log('Error getting document:', error);
    });
  return docRef
    .update({
      orderCompleted: !orderCompleted,
    })
    .then(() => ({
      dayOrder: getDay(),
      idOrder,
    }))
    .catch((error) => {
      // The document probably doesn't exist.
      console.error('Error updating document: ', error);
    });
}


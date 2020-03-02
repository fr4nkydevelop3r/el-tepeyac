import { v1 as uuidv1 } from 'uuid';

import { firestore } from '../firebase';
import { getDay } from '../utilities';

export default function addOrder(order) {
  const idOrder = uuidv1();
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

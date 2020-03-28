import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

import { firestore } from '../../firebase';
import { getDay } from '../../utilities';

const OrderConfirmation = () => {
  const order = useSelector((state) => state.orders);
  const [orderDB, setOrder] = useState(order);
  const { id } = useParams();

  useEffect(() => {
    const docRef = firestore
      .collection('orders')
      .doc(getDay())
      .collection(id)
      .doc(id);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setOrder(doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  }, []);

  console.log(orderDB);

  const getHourDelivery = (deliverPriority) => {
    switch (deliverPriority) {
      case 1:
        return '9:00 - 10:00';
      case 2:
        return '10:00 - 11:00';
      case 3:
        return '11:00 - 12:00';
      case 4:
        return '12:00 - 13:00';
      case 5:
        return '13:00 - 14:00';
      case 6:
        return '14:00 - 15:00';
      case 7:
        return '15:00 - 16:00';
      default:
        return '';
    }
  };

  return (
    <div>
      {isEmpty(orderDB) ? (
        <div>What would you like to get =) </div>
      ) : (
        <div>
          <h4>Order Details</h4>
          <div className="Customer">
            <div>
              <span>Customer: {orderDB.infoCustomer.customerName}</span>
            </div>
            <div>
              <span>Address: {orderDB.infoCustomer.customerAddress}</span>
            </div>
            <div>
              <span>
                Office or Apt: {orderDB.infoCustomer.customerofficeOrApt}
              </span>
            </div>
            <div>
              <span>
                Phone Number: {orderDB.infoCustomer.customerPhoneNumber}
              </span>
            </div>
          </div>
          <div className="OrderDetails">
            <span>Order details</span>
            <ul>
              {Object.values(orderDB.dishes).map((dish) => (
                <li key={dish.dishID}>
                  {dish.totalOrdered} {dish.dishName}
                </li>
              ))}
            </ul>
            <span>Total Order: ${orderDB.totalOrder}</span>
          </div>
          <div className="OtherInfoOrder">
            <span>Time order: {orderDB.timeOrder}</span>
            <span>
              Hour delivery: {getHourDelivery(orderDB.deliverPriority)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmation;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

import { firestore } from '../../firebase';
import { getDay } from '../../utilities';
import { colors } from '../../colors';

const OrderDetailsContainer = styled.div`
  display: flex;
  flex-direction: vertical;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  h4 {
    margin-top: 64px;
    color: ${colors.red};
  }
  .Row {
    margin-bottom: 8px;
  }
  .Customer {
    margin-top: 24px;
    color: ${colors.grayStrong};
    width: 80%;
  }
  .OrderDetails {
    margin-top: 16px;
    width: 80%;
    color: ${colors.grayStrong};
    ul {
      margin-top: 8px;
      list-style: none;
      margin-bottom: 8px;
    }
    span {
      padding-left: 40px;
    }
    .OrderDetailsTitle {
      padding-left: 0;
    }
  }
  .OtherInfoOrder {
    margin-top: 16px;
    width: 80%;
    color: ${colors.grayStrong};
  }
`;

const OrderConfirmation = () => {
  const { id } = useParams();
  const order = useSelector((state) => state.orders);
  const [orderDB, setOrder] = useState(order[id]);

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

  const getTimeOrder = (time) => {
    const re = /\d+:\d+/;
    return re.exec(time);
  };

  return (
    <div>
      {isEmpty(orderDB) ? (
        <div>What would you like to get =) </div>
      ) : (
        <OrderDetailsContainer>
          <h4>Order Details</h4>
          <div className="Customer">
            <div className="Row">
              <span>Customer: {orderDB.infoCustomer.customerName}</span>
            </div>
            <div className="Row">
              <span>Address: {orderDB.infoCustomer.customerAddress}</span>
            </div>
            <div className="Row">
              <span>
                Office or Apt: {orderDB.infoCustomer.customerofficeOrApt}
              </span>
            </div>
            <div>
              <span className="Row">
                Phone Number: {orderDB.infoCustomer.customerPhoneNumber}
              </span>
            </div>
          </div>
          <div className="OrderDetails">
            <span className="OrderDetailsTitle">Order details</span>
            <ul>
              {Object.values(orderDB.dishes).map((dish) => (
                <li key={dish.dishID}>
                  {dish.totalOrdered} {dish.dishName}
                </li>
              ))}
            </ul>
            <div className="Row">
              <span>Total Order: ${orderDB.totalOrder}</span>
            </div>
          </div>
          <div className="OtherInfoOrder">
            <div className="Row">
              <span>
                Time order: {getTimeOrder(orderDB.timeOrder)}
                {''}
              </span>
            </div>
            <div>
              <span>
                Hour delivery: {getHourDelivery(orderDB.deliverPriority)}
              </span>
            </div>
          </div>
        </OrderDetailsContainer>
      )}
    </div>
  );
};

export default OrderConfirmation;

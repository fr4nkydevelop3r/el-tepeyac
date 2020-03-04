import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import firebase from '../../firebase';
import { handleReceiveOrders } from '../../actions/orders';
import { getDay } from '../../utilities';

const Orders = () => {
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(handleReceiveOrders());
    // eslint-disable-next-line import/no-named-as-default-member
    const getOrders = firebase.functions().httpsCallable('getOrders');

    getOrders({ docPath: `orders/${getDay()}` })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        // Getting the Error details.
        const { code, message, details } = error;
        console.log(code);
        console.log(message);
        console.log(details);
        console.log(error);
        // ...
      });
  }, []);

  return (
    <div className="Orders">
      <div>OrdersView!</div>
    </div>
  );
};

export default Orders;

import React from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

const OrderConfirmation = () => {
  const order = useSelector((state) => state.orders);

  return (
    <div>
      {isEmpty(order) ? (
        <div>What would you like to get =) </div>
      ) : (
        <div>Your order is!</div>
      )}
    </div>
  );
};

export default OrderConfirmation;

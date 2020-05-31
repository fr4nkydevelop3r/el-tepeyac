import React from 'react';
import ListOrders from './ListOrders';

const PendingOrders = ({ orders }) => {
  return (
    <>
      <ListOrders orders={orders} status="pending" />
    </>
  );
};

export default PendingOrders;

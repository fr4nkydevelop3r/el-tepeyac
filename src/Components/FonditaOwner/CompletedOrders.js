import React from 'react';
import ListOrders from './ListOrders';

const CompletedOrders = ({ orders }) => {
  return (
    <>
      <ListOrders orders={orders} status="completed" />
    </>
  );
};

export default CompletedOrders;

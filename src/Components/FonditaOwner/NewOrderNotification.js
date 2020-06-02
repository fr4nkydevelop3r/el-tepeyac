import React from 'react';
import useGetTotalOrders from './useGetTotalOrders';
import OrderNotification from './OrderNotification';

const NewOrderNotification = () => {
  const totalOrders = useGetTotalOrders();

  return (
    <>{totalOrders >= 0 && <OrderNotification totalOrders={totalOrders} />}</>
  );
};

export default NewOrderNotification;

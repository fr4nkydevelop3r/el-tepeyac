import React from 'react';
import Order from './Order';

const ListOrders = (props) => {
  let { orders } = props;
  orders = Object.values(orders);
  return (
    <div className="ListOrders">
      Orders List!
      {orders.map((order) => (
        <Order key={order.idOrder} order={order} />
      ))}
    </div>
  );
};

export default ListOrders;

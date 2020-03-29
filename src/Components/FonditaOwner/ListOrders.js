import React from 'react';
import Order from './Order';

const ListOrders = (props) => {
  let { orders } = props;
  orders = Object.values(orders);
  orders = orders.sort((a, b) => a.deliverPriority - b.deliverPriority);

  return (
    <>
      <div className="ListOrders">
        Orders List!
        {orders.map((order) => (
          <Order
            key={order.idOrder}
            order={order}
            completed={order.orderCompleted}
          />
        ))}
      </div>
    </>
  );
};

export default ListOrders;

import React from 'react';
import styled from 'styled-components';

import Order from './Order';
import { colors } from '../../colors';

const ListOrdersContainer = styled.div`
  width: 100%;
  h4 {
    color: ${colors.grayStrong};
    text-align: center;
    margin-top: 2rem;
    margin-bottom: 2rem;
    @media (min-width: 768px) {
      margin-top: 36px;
    }

    @media (min-width: 992px) {
      margin-top: 48px;
    }
    @media (min-width: 1200px) {
    }
  }
`;

const ListOrders = ({ orders, status }) => {
  orders = Object.values(orders);

  return (
    <>
      <ListOrdersContainer>
        {status === 'pending' ? (
          <h4>Pending Orders! </h4>
        ) : (
          <h4>Completed Orders!</h4>
        )}
        {orders.map((order) => (
          <Order
            key={order.idOrder}
            order={order}
            completed={order.orderCompleted}
          />
        ))}
      </ListOrdersContainer>
    </>
  );
};

export default ListOrders;

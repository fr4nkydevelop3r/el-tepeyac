import React from 'react';
import styled from 'styled-components';

import Order from './Order';
import { colors } from '../../colors';

const ListOrdersContainer = styled.div`
  margin-top: 32px;
  margin-bottom: 32px;
  width: 100%;
  h4 {
    color: ${colors.grayStrong};
    text-align: center;
    margin-top: 24px;
    margin-bottom: 24px;
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

const ListOrders = (props) => {
  let { orders } = props;
  orders = Object.values(orders);
  orders = orders.sort((a, b) => a.deliverPriority - b.deliverPriority);

  return (
    <>
      <ListOrdersContainer>
        <h4>Today orders!</h4>
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

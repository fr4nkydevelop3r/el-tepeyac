import React from 'react';
import styled from 'styled-components';

import Order from './Order';
import { colors } from '../../colors';

const ListOrdersContainer = styled.div`
  margin-top: 32px;
  margin-bottom: 32px;
  h4 {
    color: ${colors.grayStrong};
    text-align: center;
    margin-top: 24px;
    margin-bottom: 24px;
  }
`;

const ListOrders = (props) => {
  let { orders } = props;
  orders = Object.values(orders);
  orders = orders.sort((a, b) => a.deliverPriority - b.deliverPriority);

  return (
    <>
      <ListOrdersContainer>
        <h4>List Orders today!</h4>
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

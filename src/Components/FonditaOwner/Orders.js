/* eslint-disable no-nested-ternary */
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { colors } from '../../colors';

// eslint-disable-next-line import/no-cycle
import ListOrders from './ListOrders';
import HeaderOwner from './HeaderOwner';

const OrdersContainer = styled.div`
  display: flex;
  justify-content: center;
  h5 {
    color: ${colors.red};
    margin-top: 96px;
    @media (min-width: 1200px) {
      margin-top: 128px;
    }
  }
`;

const Orders = () => {
  const orders = useSelector((state) => state.orders);

  return (
    <>
      <HeaderOwner />
      <OrdersContainer>
        <ListOrders orders={orders} />
      </OrdersContainer>
    </>
  );
};

export default Orders;

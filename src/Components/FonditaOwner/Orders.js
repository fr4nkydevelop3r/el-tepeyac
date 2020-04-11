/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import styled from 'styled-components';
import { colors } from '../../colors';

// eslint-disable-next-line import/no-cycle
import SignIn from './SignIn';
import ListOrders from './ListOrders';
import MenuOwner from './MenuOwner';

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

const Orders = (props) => {
  const orders = useSelector((state) => state.orders);
  const authedUser = useSelector((state) => state.authedUser);

  useEffect(() => {
    if (isEmpty(authedUser)) {
      props.history.push('/sign-in');
    }
  }, [authedUser, props]);

  return (
    <>
      <MenuOwner />
      <OrdersContainer>
        {!isEmpty(authedUser) ? (
          !isEmpty(orders) ? (
            <ListOrders orders={orders} />
          ) : (
            <h5>No orders today yet!</h5>
          )
        ) : (
          <div>
            <SignIn />
          </div>
        )}
      </OrdersContainer>
    </>
  );
};

export default Orders;

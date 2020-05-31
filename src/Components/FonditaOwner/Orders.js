/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../../colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faClock,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
// eslint-disable-next-line import/no-cycle
import HeaderOwner from './HeaderOwner';
import { BehindButtonContainer } from '../../styled-components';
import PendingOrders from './PendingOrders';
import CompletedOrders from './CompletedOrders';

const OrdersContainer = styled.div`
  display: flex;
  justify-content: center;
  h5 {
    color: ${colors.red};
  }
`;

const OrderStatus = styled.div`
  width: 50%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  @media (min-width: 1200px) {
    width: 30%;
    margin-bottom: 2rem;
  }
`;

const StatusPending = styled.div`
  display: flex;
  flex-direction: column;
  color: ${(props) => props.color};
  @media (min-width: 768px) {
    font-size: 20px;
  }
  @media (min-width: 992px) {
    font-size: 22px;
  }
  @media (min-width: 1200px) {
    font-size: 18px;
  }
`;

const StatusCompleted = styled.div`
  display: flex;
  flex-direction: column;
  color: ${(props) => props.color};
  @media (min-width: 768px) {
    font-size: 20px;
  }
  @media (min-width: 992px) {
    font-size: 22px;
  }
  @media (min-width: 1200px) {
    font-size: 18px;
  }
`;

const ButtonStatusPending = styled.button`
  color: ${(props) => props.color};
  border: none;
  background: none;
`;
const ButtonStatusCompleted = styled.button`
  color: ${(props) => props.color};
  border: none;
  background: none;
`;

const Orders = () => {
  const orders = useSelector((state) => state.orders);
  let history = useHistory();
  const [ordersStatus, setOrdersStatus] = useState('pending');

  return (
    <>
      <HeaderOwner />
      <BehindButtonContainer>
        <button
          type="button"
          className="Behind"
          onClick={() => history.push('/dashboard')}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </BehindButtonContainer>
      <OrderStatus>
        <StatusPending
          onClick={() => setOrdersStatus('pending')}
          color={ordersStatus === 'pending' ? colors.green : colors.black}>
          <ButtonStatusPending
            color={ordersStatus === 'pending' ? colors.green : colors.black}>
            <FontAwesomeIcon icon={faClock} />
          </ButtonStatusPending>
          <span>Pending</span>
        </StatusPending>
        <StatusCompleted
          onClick={() => {
            setOrdersStatus('completed');
          }}
          color={ordersStatus === 'completed' ? colors.green : colors.black}>
          <ButtonStatusCompleted
            color={ordersStatus === 'completed' ? colors.green : colors.black}>
            <FontAwesomeIcon icon={faCheckCircle} />
          </ButtonStatusCompleted>
          <span>Completed</span>
        </StatusCompleted>
      </OrderStatus>
      <OrdersContainer>
        {ordersStatus === 'pending' ? (
          <PendingOrders
            orders={Object.values(orders).filter(
              (order) => !order.orderCompleted,
            )}
          />
        ) : (
          <CompletedOrders
            orders={Object.values(orders).filter(
              (order) => order.orderCompleted,
            )}
          />
        )}
      </OrdersContainer>
    </>
  );
};

export default Orders;

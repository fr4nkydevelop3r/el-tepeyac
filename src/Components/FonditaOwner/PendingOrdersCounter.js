import React from 'react';
import { useSelector } from 'react-redux';
import { Frame, Color } from 'framer';
import styled from 'styled-components';
import { isEmpty } from 'lodash';

const PendingOrders = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  color: #fff;
  font-size: 1.3rem;
`;

const PendingOrdersCounter = () => {
  const orders = useSelector((state) => state.orders);
  let pendingOrders = 0;
  const darkGreen = Color('#00833e');
  const green = Color.lighten(darkGreen, 10);

  if (!isEmpty(orders)) {
    pendingOrders = Object.values(orders).filter(
      (order) => !order.orderCompleted,
    ).length;
  }

  return (
    <>
      {pendingOrders > 0 && (
        <Frame
          animate={{ scale: 0.8, rotate: 0, opacity: 0.8 }}
          transition={{
            yoyo: Infinity,
            duration: 2,
            ease: 'easeInOut',
          }}
          size={50}
          background={Color.toHexString(green)}
          position="relative"
          radius="100%">
          <PendingOrders>{pendingOrders}</PendingOrders>
        </Frame>
      )}
    </>
  );
};

export default PendingOrdersCounter;

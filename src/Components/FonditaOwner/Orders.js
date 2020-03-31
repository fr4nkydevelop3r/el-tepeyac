/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

// eslint-disable-next-line import/no-cycle
import SignIn from './SignIn';
import ListOrders from './ListOrders';
import MenuOwner from './MenuOwner';

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
      <div className="Orders">
        {!isEmpty(authedUser) ? (
          !isEmpty(orders) ? (
            <div>
              <ListOrders orders={orders} />
            </div>
          ) : (
            <div>No orders today yet!</div>
          )
        ) : (
          <div>
            <SignIn />
          </div>
        )}
      </div>
    </>
  );
};

export default Orders;

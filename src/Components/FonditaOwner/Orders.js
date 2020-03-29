/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';

import { auth } from '../../firebase';
import { restartOrders } from '../../actions/orders';
import { logoutUser } from '../../actions/authedUser';
import SignIn from './SignIn';
import ListOrders from './ListOrders';
import MenuOwner from './MenuOwner';

const Orders = (props) => {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.orders);
  const authedUser = useSelector((state) => state.authedUser);

  useEffect(() => {
    if (isEmpty(authedUser)) {
      props.history.push('/sign-in');
    }
  }, [authedUser]);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        props.history.push('/sign-in');
        dispatch(restartOrders());
        dispatch(logoutUser());
      })
      .catch(() => console.log('No se pudo salir'));
  };
  return (
    <>
      <MenuOwner />
      <div className="Orders">
        {!isEmpty(authedUser) ? (
          !isEmpty(orders) ? (
            <div>
              <ListOrders orders={orders} />
              <button type="button" onClick={handleSignOut}>
                Logout
              </button>
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

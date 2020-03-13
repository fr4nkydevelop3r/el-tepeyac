import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import { Link } from 'react-router-dom';

import { auth } from '../../firebase';

import SignIn from './SignIn';
import ListOrders from './ListOrders';

const Orders = (props) => {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.orders);
  const authedUser = useSelector((state) => state.authedUser);

  useEffect(() => {
    if (isEmpty(authedUser)) {
      auth.onAuthStateChanged((user) => {
        if (!user) {
          props.history.push('/sign-in');
        }
      });
    }
  }, [dispatch, props, authedUser]);

  return (
    <div className="Orders">
      {!isEmpty(authedUser) ? (
        <div>
          <div>Orders!</div>
          <li>
            <Link to="/dashboard">Dashboard</Link>
            <ListOrders orders={orders} />
          </li>
        </div>
      ) : (
        <div>
          <SignIn />
        </div>
      )}
    </div>
  );
};

export default Orders;

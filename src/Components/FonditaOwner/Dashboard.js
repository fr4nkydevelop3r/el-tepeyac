/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import { auth } from '../../firebase';
import { restartOrders } from '../../actions/orders';
import { logoutUser } from '../../actions/authedUser';

import SignIn from './SignIn';

const Dashboard = (props) => {
  const orders = useSelector((state) => state.orders);
  const authedUser = useSelector((state) => state.authedUser);
  const dispatch = useDispatch();

  const handleSignOut = (props) => {
    auth
      .signOut()
      .then(() => {
        dispatch(restartOrders());
        dispatch(logoutUser());
      })
      .catch(() => console.log('No se pudo salir'));
  };

  useEffect(() => {
    //console.log(props);

    if (isEmpty(authedUser)) {
      props.history.push('/sign-in');
    }
  }, [authedUser, props]);
  console.log(orders);
  return (
    <div className="Orders">
      {!isEmpty(authedUser) ? (
        <div>
          <div>Dashboard!</div>
          <button type="button" onClick={handleSignOut}>
            Logout
          </button>
        </div>
      ) : (
        <SignIn />
      )}
    </div>
  );
};

export default Dashboard;

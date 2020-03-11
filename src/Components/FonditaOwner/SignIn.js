/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { keyBy, isEmpty } from 'lodash';

import firebase, { firestore, auth } from '../../firebase';
import { receiveOrders } from '../../actions/orders';
import setUser, { logoutUser } from '../../actions/authedUser';
import { getDay } from '../../utilities';
import Dashboard from './Dashboard';

const SignIn = (props) => {
  const authedUser = useSelector((state) => state.authedUser);

  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();
  const [invalidEmail, setInvalidEmail] = useState('');
  const [invalidPassword, setInvalidPassword] = useState('');

  useEffect(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        firestore.collection('orders').onSnapshot(
          () => {
            // eslint-disable-next-line import/no-named-as-default-member
            const getOrders = firebase.functions().httpsCallable('getOrders');
            getOrders({ docPath: `orders/${getDay()}` })
              .then((result) => {
                const listOrders = keyBy(result.data, 'idOrder');
                dispatch(receiveOrders(listOrders));
              })
              .catch((error) => {
                // Getting the Error details.
                const { code, message, details } = error;
                console.log(code);
                console.log(message);
                console.log(details);
                console.log(error);
                // ...
              });
          },
          (error) => console.log(error),
        );
        if (!isEmpty(props)) {
          props.history.push('/dashboard');
        }
      }
      dispatch(setUser(userAuth));
    });
  }, [dispatch, props]);

  const onSubmit = (data) => {
    auth
      .signInWithEmailAndPassword(data.email, data.password)
      .then(() => {
        props.history.push('/dashboard');
      })
      .catch((error) => {
        const { code } = error;
        if (code === 'auth/wrong-password') {
          setInvalidPassword('Wrong password');
        }
        if (code === 'auth/invalid-email') {
          setInvalidEmail('The email address is not valid');
        }
        if (code === 'auth/user-not-found') {
          setInvalidEmail('There is no user corresponding to the given email');
        }
      });
  };

  const handleOnChange = (event) => {
    if (event.target.name === 'email') {
      setInvalidEmail('');
    }
    if (event.target.name === 'password') {
      setInvalidPassword('');
    }
  };

  // console.log(authedUser);
  return (
    <div className="SignIn">
      {isEmpty(authedUser) ? (
        <div className="SignIn2">
          <div>Sign in</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              name="email"
              placeholder="Your email"
              ref={register({
                required: true,
                pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              })}
              onChange={handleOnChange}
            />
            {errors.email && <span>Please put a valid email</span>}
            <div>{invalidEmail}</div>
            <input
              name="password"
              placeholder="Your password"
              ref={register({ required: true })}
              type="password"
              onChange={handleOnChange}
            />
            {errors.password && <span>Please put your password</span>}
            <div>{invalidPassword}</div>
            <input type="submit" />
          </form>
        </div>
      ) : (
        <Dashboard />
      )}
    </div>
  );
};

export default SignIn;

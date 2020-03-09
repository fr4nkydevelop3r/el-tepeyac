/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import firebase, { firestore, auth } from '../../firebase';
import { handleReceiveOrders } from '../../actions/orders';
import { getDay } from '../../utilities';

const SignIn = () => {
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, control } = useForm();
  const [invalidEmail, setInvalidEmail] = useState('');
  const [invalidPassword, setInvalidPassword] = useState('');

  useEffect(() => {
    const unsubscribeFromFirestore = firestore.collection('orders').onSnapshot(
      () => {
        // eslint-disable-next-line import/no-named-as-default-member
        const getOrders = firebase.functions().httpsCallable('getOrders');
        getOrders({ docPath: `orders/${getDay()}` })
          .then((result) => {
            console.log(orders);
            console.log(result);
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
    return function cleanup() {
      unsubscribeFromFirestore();
    };
  }, []);

  const onSubmit = (data) => {
    auth
      .signInWithEmailAndPassword(data.email, data.password)
      .then(() => {
        console.log('Yep you can use the app');
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

  return (
    <div className="SignIn">
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
  );
};

export default SignIn;

/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { keyBy, isEmpty } from 'lodash';

import firebase, { firestore, auth } from '../../firebase';
import { receiveOrders } from '../../actions/orders';
import setUser from '../../actions/authedUser';
import { getDay } from '../../utilities';
// eslint-disable-next-line import/no-cycle
import Dashboard from './Dashboard';
import { Button, InputContainer, ErrorInput } from '../../styled-components';
import { colors } from '../../colors';

const SignInContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const SignInForm = styled.div`
  width: 350px;
  color: ${colors.grayStrong};
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .Form {
    width: 80%;
  }
  .SignInTitle {
    text-align: center;
  }

  @media (min-width: 768px) {
    box-shadow: 0 0 0 1px #dc35351c, 0 1px 5px 0 rgba(163, 41, 41, 0.08);
    border: 1px solid rgba(67, 41, 163, 0.2);
    border-radius: 5px;
    justify-content: center;
  }
`;

const SubmitContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 32px;
`;

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
        if (code === 'auth/too-many-requests') {
          setInvalidPassword('Too many requests, try again later');
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

  console.log(invalidPassword);
  return (
    <SignInContainer>
      {isEmpty(authedUser) ? (
        <SignInForm>
          <h4 className="SignInTitle">Sign in</h4>

          <div className="Form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputContainer>
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  placeholder="Your email"
                  ref={register({
                    required: true,
                    pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  })}
                  onChange={handleOnChange}
                />
              </InputContainer>
              <ErrorInput>
                <span>{invalidEmail}</span>
              </ErrorInput>
              {errors.email && (
                <ErrorInput>
                  <span>Please put a valid email</span>
                </ErrorInput>
              )}

              <InputContainer>
                <label htmlFor="password">Password</label>
                <input
                  name="password"
                  placeholder="Your password"
                  ref={register({ required: true })}
                  type="password"
                  onChange={handleOnChange}
                />
              </InputContainer>
              {errors.password && (
                <ErrorInput>
                  <span>Please put your password</span>
                </ErrorInput>
              )}
              <ErrorInput>
                <span>{invalidPassword}</span>
              </ErrorInput>
              <SubmitContainer>
                <Button>Sign in</Button>
              </SubmitContainer>
            </form>
          </div>
        </SignInForm>
      ) : (
        <Dashboard />
      )}
    </SignInContainer>
  );
};

export default SignIn;

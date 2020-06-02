/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { keyBy } from 'lodash';

import firebase, { firestore, auth } from '../../firebase';
import { receiveOrders } from '../../actions/orders';
import setUser from '../../actions/authedUser';
import { getDay } from '../../utilities';
// eslint-disable-next-line import/no-cycle
import { Button, InputContainer, ErrorInput } from '../../styled-components';
import { colors } from '../../colors';

const SignInContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  @media (min-width: 768px) {
    align-items: flex-start;
    margin-top: 200px;
  }
  @media (min-width: 1200px) {
    margin-top: 100px;
  }
`;

const SignInForm = styled.div`
  width: 350px;
  color: ${colors.grayStrong};
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  @media (min-width: 768px) {
    width: 450px;
    height: 500px;
    justify-content: center;
  }
  @media (min-width: 992px) {
    width: 650px;
    height: 700px;
  }
  @media (min-width: 1200px) {
    width: 450px;
    height: 500px;
  }
  .Form {
    width: 80%;
  }
  .SignInTitle {
    text-align: center;
    @media (min-width: 768px) {
      font-size: 32px;
    }
  }

  @media (min-width: 768px) {
    box-shadow: 0 0 0 1px #35dc74b8, 0 1px 5px 0 rgba(163, 41, 41, 0.08);
    border: 1px solid rgba(67, 41, 163, 0.2);
    border-radius: 5px;
    padding: 32px;
  }

  .InputCheckout {
    .InputAndError {
      @media (min-width: 768px) {
        margin-left: 16px;
      }
    }

    label {
      @media (min-width: 768px) {
        text-align: left;
        font-size: 24px;
      }
      @media (min-width: 992px) {
        font-size: 32px;
      }
      @media (min-width: 1200px) {
        font-size: 18px;
      }
    }
    input {
      @media (min-width: 768px) {
        font-size: 24px;
        height: 40px;
      }
      @media (min-width: 992px) {
        font-size: 32px;
        height: 50px;
      }
      @media (min-width: 1200px) {
        font-size: 18px;
        height: 30px;
      }
    }
  }
`;

const SubmitContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 32px;
`;

const SignIn = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();
  const [invalidEmail, setInvalidEmail] = useState('');
  const [invalidPassword, setInvalidPassword] = useState('');
  const [redirectedToReferrer, setRedirectedToReferrer] = useState(false);

  let location = useLocation();
  let { from } = location.state || { from: { pathname: '/dashboard' } };

  useEffect(() => {
    const unsubscribeFromFirestore = auth.onAuthStateChanged(
      async (userAuth) => {
        if (userAuth) {
          dispatch(setUser(userAuth));
          setRedirectedToReferrer(true);
          const docRef = firestore.collection('orders').doc(getDay());
          await docRef.get().then((doc) => {
            if (!doc.exists) {
              firestore
                .collection('orders')
                .doc(getDay())
                .set({ totalOrders: 0 })
                .catch((error) => {
                  console.error('Error writing document: ', error);
                });
            }
          });

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
        }
      },
    );

    return function cleanup() {
      unsubscribeFromFirestore();
    };
  }, [dispatch]);

  const onSubmit = (data) => {
    auth
      .signInWithEmailAndPassword(data.email, data.password)
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

  if (redirectedToReferrer === true) {
    return <Redirect to={from} />;
  }

  return (
    <>
      <SignInContainer>
        <SignInForm>
          <h4 className="SignInTitle">Login</h4>

          <div className="Form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputContainer className="InputCheckout">
                <label htmlFor="email">Email</label>

                <div className="InputAndError">
                  <input
                    name="email"
                    placeholder="Your email"
                    ref={register({
                      required: true,
                      pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    })}
                    onChange={handleOnChange}
                  />
                  <ErrorInput>
                    <span>{invalidEmail}</span>
                  </ErrorInput>
                  {errors.email && (
                    <ErrorInput>
                      <span>Please put a valid email</span>
                    </ErrorInput>
                  )}
                </div>
              </InputContainer>

              <InputContainer className="InputCheckout">
                <label htmlFor="password">Password</label>
                <div className="InputAndError">
                  <input
                    name="password"
                    placeholder="Your password"
                    ref={register({ required: true })}
                    type="password"
                    onChange={handleOnChange}
                  />
                  {errors.password && (
                    <ErrorInput>
                      <span>Please put your password</span>
                    </ErrorInput>
                  )}
                  <ErrorInput>
                    <span>{invalidPassword}</span>
                  </ErrorInput>
                </div>
              </InputContainer>

              <SubmitContainer>
                <Button>Sign in</Button>
              </SubmitContainer>
            </form>
          </div>
        </SignInForm>
      </SignInContainer>
    </>
  );
};

export default SignIn;

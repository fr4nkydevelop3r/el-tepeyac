/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { handleCreateOrder } from '../../actions/orders';
import { restartProducts } from '../../actions/products';
import setInstructions from '../../actions/specialInstructions';
import setTip from '../../actions/deliveryTip';
import Input, { isPossiblePhoneNumber } from 'react-phone-number-input/input';
import styled from 'styled-components';
import { getHour, getNumOrder, isValidHour } from '../../utilities';
import { keyBy, isEmpty } from 'lodash';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Row from './CheckoutForm/Row';
import SubmitButton from './CheckoutForm/SubmitButton';
import useTotalOrder from './useTotalOrder';

import { FormUser, InputContainer, ErrorInput } from '../../styled-components';

const CardElementContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;

  .CardStyles {
    font-size: 32px;
  }

  & .StripeElement {
    width: 100%;
    padding: 15px;
  }
`;

const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const initialState = {
  name: '',
  phone: '',
};

function reducer(state, { field, value }) {
  return {
    ...state,
    [field]: value,
  };
}

const PickupForm = () => {
  //FORM
  const [state, dispatch] = useReducer(reducer, initialState);
  const [validateName, setValidateName] = useState('');
  const [validatePhone, setValidatePhone] = useState('');
  const { name } = state;
  const [phoneValue, setPhoneValue] = useState('');

  //STRIPE

  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();
  const stripe = useStripe();
  const elements = useElements();
  const [postalCode, setPostalCode] = useState('');

  //APP
  let [totalOrder] = useTotalOrder();
  let tip = useSelector((state) => state.deliveryTip);
  if (typeof tip === 'number') {
    totalOrder += tip;
    totalOrder = totalOrder.toFixed(2);
  }
  let instructions = useSelector((state) => state.specialInstructions);

  let products = useSelector((state) => state.products);
  let productsOrdered = [];
  //const [errorMessageOrder, setErrorMessageOrder] = useState('');
  const dispatchRedux = useDispatch();
  let history = useHistory();

  let categories = useSelector((state) => state.categories);
  categories = Object.values(categories);

  const onSubmit = (event) => {
    event.preventDefault();

    if (!name) {
      setValidateName('Please enter your full name');
    }

    if (!phoneValue) {
      setValidatePhone('Please enter a phone number');
    }
    if (!isValidHour()) {
      history.push('/menu');
    }

    if (name && isPossiblePhoneNumber(phoneValue)) {
      if (!isEmpty(products)) {
        const numOrder = getNumOrder(phoneValue[phoneValue.length - 1]);
        products = Object.values(products);
        productsOrdered = Object.values(products)
          .filter((product) => product.totalOrdered >= 1)
          .map((product) => {
            const newProduct = {
              productID: product.productID,
              productName: product.productName,
              totalOrdered: product.totalOrdered,
              productPrice: product.productPrice,
              productCategory: categories.filter(
                (category) => category.categoryID === product.productCategory,
              )[0]['categoryName'],
            };
            return newProduct;
          });
        productsOrdered = keyBy(productsOrdered, 'productID');
        const infoCustomer = {
          customerName: name,
          customerPhoneNumber: phoneValue,
        };

        const order = {
          orderCompleted: false,
          timeOrder: getHour(),
          products: productsOrdered,
          infoCustomer,
          totalOrder,
          numOrder: numOrder,
          deliveryTip: 0,
          specialInstructions: instructions,
        };

        const billingDetails = {
          name: infoCustomer.customerName,
          phone: infoCustomer.customerPhoneNumber,
          address: {
            line1: infoCustomer.customerAddress,
            postal_code: postalCode,
          },
        };

        setProcessingTo(true);

        axios
          .post(
            'https://us-central1-el-tepeyac-b5c7a.cloudfunctions.net/getClientSecret',
            {
              productsOrdered: Object.values(productsOrdered),
              tip: 0,
            },
          )
          .catch((error) => {
            setCheckoutError(error.message);
            setProcessingTo(false);
            console.log(error);
          })
          .then(async ({ data: clientSecret }) => {
            const cardElement = elements.getElement(CardElement);
            const { error, paymentMethod } = await stripe.createPaymentMethod({
              type: 'card',
              card: cardElement,
              billing_details: billingDetails,
            });

            if (error) {
              setCheckoutError(error.message);
              setProcessingTo(false);
              console.log(error);
            } else {
              const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id,
              });

              if (result.error) {
                // Show error to your customer (e.g., insufficient funds)
                setProcessingTo(false);
                setCheckoutError(result.error.message);
                console.log(result.error.message);
              } else {
                // The payment has been processed!
                // eslint-disable-next-line no-lonely-if
                if (result.paymentIntent.status === 'succeeded') {
                  dispatchRedux(handleCreateOrder(order))
                    .then((orderCreated) => {
                      history.push(`/order/${orderCreated.idOrder}`);
                      dispatchRedux(restartProducts());
                      dispatchRedux(setInstructions(''));
                      dispatchRedux(setTip(3));
                    })
                    .catch((e) => {
                      console.error(e);
                      history.push(`/order-confirmation`);
                      dispatchRedux(restartProducts());
                      dispatchRedux(setInstructions(''));
                      dispatchRedux(setTip(3));
                      // setProcessingTo(false);
                      /* setErrorMessageOrder(
                        'Something went wrong with the order, could you try again?',
                      ); */
                    });

                  // Show a success message to your customer
                  // There's a risk of the customer closing the window before callback
                  // execution. Set up a webhook or plugin to listen for the
                  // payment_intent.succeeded event that handles any business critical
                  // post-payment actions.
                }
              }
            }
          });
      }
    }
  };

  const handleChange = (event) => {
    if (event.target.value.length > 0) {
      dispatch({ field: event.target.name, value: event.target.value });
      if (event.target.name === 'name') {
        const regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
        // eslint-disable-next-line no-unused-expressions
        regName.test(event.target.value)
          ? setValidateName('')
          : setValidateName('Please enter your full name');
      }
    }
    if (event.target.value.length === 0) {
      dispatch({ field: event.target.name, value: event.target.value });
      if (event.target.name === 'name') {
        setValidateName('Please enter your full name');
      }
    }
  };

  const cardElementOptions = {
    // a way to inject styles into that iframe
    style: {
      base: {
        fontSize: '16px',
        color: '#fff',
        '::placeholder': {
          color: '#F2F3F2',
        },
      },
      invalid: {
        color: '#FFC7EE',
        iconColor: '#FFC7EE',
      },
    },
  };

  const handleChangeCard = (e) => {
    setCheckoutError('');
    setPostalCode(e.value.postalCode);
  };

  // console.log(watch('example')); // you can watch individual input by pass the name of the input
  return (
    <FormUser>
      <form className="Form" onSubmit={onSubmit}>
        <InputContainer className="InputCheckout">
          <label htmlFor="name">Name</label>
          <div className="InputAndError">
            <input
              type="text"
              name="name"
              placeholder="Your full name"
              value={name}
              onChange={handleChange}
            />
            {validateName && (
              <ErrorInput>
                <span>{validateName}</span>
              </ErrorInput>
            )}
          </div>
        </InputContainer>
        <InputContainer className="InputCheckout">
          <label htmlFor="name">Phone number</label>
          <div className="InputAndError">
            <Input
              defaultCountry="US"
              value={phoneValue}
              name="phone"
              placeholder="Your phone number"
              onChange={setPhoneValue}
              error={
                phoneValue
                  ? isPossiblePhoneNumber(phoneValue)
                    ? undefined
                    : 'Invalid phone number'
                  : 'Phone number required'
              }
            />
            {(phoneValue || validatePhone) && (
              <ErrorInput>
                <span>
                  {phoneValue
                    ? isPossiblePhoneNumber(phoneValue)
                      ? undefined
                      : 'Invalid phone number'
                    : 'Please enter a phone number'}{' '}
                </span>
              </ErrorInput>
            )}
          </div>
        </InputContainer>
        <Row>
          <CardElementContainer className="CardStyles">
            <CardElement
              options={cardElementOptions}
              onChange={handleChangeCard}
            />
          </CardElementContainer>
        </Row>
        <ErrorInput>
          <span>{checkoutError}</span>
        </ErrorInput>
        <SubmitButtonContainer>
          <SubmitButton disabled={isProcessing}>
            {isProcessing ? 'Processing...' : `Pay $${totalOrder}`}
          </SubmitButton>
        </SubmitButtonContainer>{' '}
      </form>
    </FormUser>
  );
};

export default PickupForm;

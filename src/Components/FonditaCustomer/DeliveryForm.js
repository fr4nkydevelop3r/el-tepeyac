/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useRef, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import {handleCreateOrder} from '../../actions/orders';
import {restartProducts} from '../../actions/products';
import Input, {isPossiblePhoneNumber} from 'react-phone-number-input/input';
import usePlacesAutocomplete, { getGeocode } from 'use-places-autocomplete';
import styled from 'styled-components';
import { getHour, getNumOrder } from '../../utilities';
import { keyBy, isEmpty } from 'lodash';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Row from './CheckoutForm/Row';
import SubmitButton from './CheckoutForm/SubmitButton';
import { firestore } from '../../firebase';
import { colors } from '../../colors';
import useTotalOrder from './useTotalOrder';

import {
  FormUser,
  InputContainer,
  ErrorInput,
} from '../../styled-components';

// PLACES AUTOCOMPLETE

const AutocompleteContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  border: black;
  background-color: ${colors.grayLight};
`;

const InputAutocomplete = styled.input`
  width: 350px;
  height: 30px;
  border: none;
  border-bottom: 2px solid #e32351;
  color: ${colors.red};
  text-align: center;
  ::placeholder {
    color: ${colors.grayMedium};
    text-align: center;
  }
  :focus {
    outline: none;
  }

  @media (min-width: 768px) {
    font-size: 36px;
    height: 40px;
    width: 550px;
  }
  @media (min-width: 992px) {
    font-size: 42px;
    height: 50px;
    width: 650px;
  }
  @media (min-width: 1200px) {
    width: 450px;
    font-size: 28px;
    height: 30px;
  }
`;

const SuggestionsList = styled.ul`
  list-style-type: none;
  color: ${colors.grayStrong};
  margin-top: 24px;
  font-size: 20px;
  padding-left: 0;
  @media (min-width: 768px) {
    font-size: 32px;
  }
  @media (min-width: 992px) {
    font-size: 38px;
  }
  @media (min-width: 1200px) {
    font-size: 20px;
  }
`;

const Sorry = styled.div`
  font-size: 16px;
  color: ${colors.red};
  @media (min-width: 768px) {
    font-size: 32px;
  }
  @media (min-width: 992px) {
    font-size: 36px;
  }
  @media (min-width: 1200px) {
    font-size: 22px;
  }
`;



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
  apt: '',
  phone: '',
};

function reducer(state, { field, value }) {
  return {
    ...state,
    [field]: value,
  };
}

const DeliveryForm = ({history}) => {
  // PLACES AUTOCOMPLETE
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });
  const ref = useRef();
  const [postCodeUser, setPostCodeUser] = useState('');
  const [validateDirection, setValidateDirection] = useState('');
  const [validPostCodes, setValidPostCodes] = useState([]);

  //FORM
  const [state, dispatch] = useReducer(reducer, initialState);
  const [validateName, setValidateName] = useState('');
  const [validateApt, setValidateApt] = useState('');
  const [validatePhone, setValidatePhone] = useState('');
  const [validPostCode, setValidPostCode] = useState('');
  const { name, apt } = state;
  const [phoneValue, setPhoneValue] = useState('');

  //STRIPE

  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();
  const stripe = useStripe();
  const elements = useElements();
  const [postalCode, setPostalCode] = useState('');


  //APP
    const [totalOrder] = useTotalOrder();
    let products = useSelector((state) => state.products);
    let productsOrdered = [];
    // const [errorMessageOrder, setErrorMessageOrder] = useState('error');
    const dispatchRedux = useDispatch();


  useEffect(() => {
    firestore
      .collection('upperEastSideAndHarlem')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const { postCodes } = doc.data();
          setValidPostCodes(postCodes);
        });
      });
  }, []);

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
    setPostCodeUser('');
    setValidateDirection('');
    if (e.target.value.length === 0) {
      setValidPostCode('');
    }
  };

  const handleSelect = ({ description }) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter as "false"
    setValue(description, false);
    clearSuggestions();

    // Get latitude and longitude via utility functions
    getGeocode({ address: description })
      .then((results) => {
        const addressComponents = results[0].address_components;
        const zipCode = addressComponents
          .filter((item) => item.types.includes('postal_code'))
          .map((item) => item.long_name);
        setPostCodeUser(...zipCode);
        if (validPostCodes.includes(...zipCode)) {
          setValidPostCode(...zipCode);
        } else {
          setValidPostCode('');
        }
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
  };

  const renderSuggestions = () =>
    // eslint-disable-next-line implicit-arrow-linebreak
    data.map((suggestion) => {
      const {
        id,
        structured_formatting: {
          main_text: mainText,
          secondary_text: secondaryText,
        },
      } = suggestion;

      return (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <li key={id} onClick={handleSelect(suggestion)}>
          <strong>{mainText}</strong>
          <small> {secondaryText}</small>
        </li>
      );
    });
  const checkDirection = () => {
    if (status !== 'OK') {
      setValidateDirection('Please enter a valid address');
    } else {
      setValidateDirection('');
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (!name) {
      setValidateName('Please enter your full name');
    }

    if (!validPostCode) {
      setValidateDirection('Please enter a valid address');
    }

    if (!apt) {
      setValidateApt('Please enter an aparment');
    }
    if (!phoneValue) {
      setValidatePhone('Please enter a phone number');
    }

    if (name && validPostCode && apt && isPossiblePhoneNumber(phoneValue)) {
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
                };
              return newProduct;
              });
              productsOrdered = keyBy(productsOrdered, 'productID');
              const infoCustomer = {
                customerName: name,
                customerAddress: value,
                customerApt: apt,
                customerPhoneNumber: phoneValue,
              };

              const order = {
                orderCompleted: false,
                timeOrder: getHour(),
                products: productsOrdered,
                infoCustomer,
                totalOrder,
                numOrder: numOrder,
              }

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
                    })
                    .catch((e) => {
                      console.error(e);
                      history.push(`/order-confirmation`);
                      dispatchRedux(restartProducts());
                      //setProcessingTo(false);
                      /*setErrorMessageOrder(
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
      if (event.target.name === 'apt') {
        const regApt = /^\w{1,100}/;
        // eslint-disable-next-line no-unused-expressions
        regApt.test(event.target.value)
          ? setValidateApt('')
          : setValidateApt('Please enter an aparment');
      }
 
    }
    if (event.target.value.length === 0) {
      dispatch({ field: event.target.name, value: event.target.value });
      if (event.target.name === 'name') {
        setValidateName('Please enter your full name');
      }
      if (event.target.name === 'apt') {
        setValidateApt('Please enter an apartment');
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
          <label htmlFor="address">Address</label>

          <div className="InputAndError">
            <AutocompleteContainer ref={ref}>
              <InputAutocomplete
                value={value}
                onChange={handleInput}
                disabled={!ready}
                placeholder="Delivery address"
                onBlur={checkDirection}
                onFocus={handleInput}
              />
              {/* We can use the "status" to decide whether we should display the dropdown or not */}
              {status === 'OK' && (
                <SuggestionsList>{renderSuggestions()}</SuggestionsList>
              )}
              {validateDirection && (
                <ErrorInput>
                  <span>{validateDirection}</span>
                </ErrorInput>
              )}

              {postCodeUser ? (
                validPostCodes.includes(postCodeUser) ? (
                  <></>
                ) : (
                  <Sorry>
                    <span role="img" aria-label="sad">
                      Sorry 😔
                    </span>
                    <span> We don&apos;t deliver there yet. </span>
                  </Sorry>
                )
              ) : null}
            </AutocompleteContainer>
          </div>
        </InputContainer>
        <InputContainer className="InputCheckout">
          <label htmlFor="name">Apt</label>
          <div className="InputAndError">
            <input
              type="text"
              name="apt"
              placeholder="Your Apartment"
              value={apt}
              onChange={handleChange}
            />
            {validateApt && (
              <ErrorInput>
                <span>{validateApt}</span>
              </ErrorInput>
            )}
          </div>
        </InputContainer>
        <InputContainer className="InputCheckout">
          <label htmlFor="name">Phone number</label>
          <div className="InputAndError">
            <Input  defaultCountry="US" value={phoneValue} name='phone'  placeholder="Your phone number" onChange={setPhoneValue} error={phoneValue ? (isPossiblePhoneNumber(phoneValue) ? undefined : 'Invalid phone number') : 'Phone number required'} />
 {      (phoneValue || validatePhone) && (
              <ErrorInput>
              <span>{phoneValue ? (isPossiblePhoneNumber(phoneValue) ? undefined : 'Invalid phone number') : 'Please enter a phone number'} </span>
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
          </SubmitButtonContainer>     
          </form>
    </FormUser>
  );
};

export default withRouter(DeliveryForm);

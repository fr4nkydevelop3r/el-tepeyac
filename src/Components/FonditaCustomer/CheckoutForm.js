/* eslint-disable object-curly-newline */
import React, { useState } from 'react';
import styled from 'styled-components';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { keyBy, isEmpty } from 'lodash';

import { useForm, Controller } from 'react-hook-form';
import NumberFormat from 'react-number-format';

import { getHour, getDeliverPriority } from '../../utilities';
import { handleCreateOrder } from '../../actions/orders';
import useTotalOrder from './useTotalOrder';
import DeliverPriority from './DeliverPriority';
import Row from './CheckoutForm/Row';
import SubmitButton from './CheckoutForm/SubmitButton';

const CardElementContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;

  & .StripeElement {
    width: 100%;
    padding: 15px;
  }
`;

const UserInfo = (props) => {
  const { register, handleSubmit, errors, control } = useForm();
  let products = useSelector((state) => state.products);
  const address = useSelector((state) => state.customerAddress);
  const [totalOrder] = useTotalOrder();
  let dishesOrdered = [];
  const dispatch = useDispatch();
  const [errorMessageHour, setErrorMessageHour] = useState('');
  const [errorMessageOrder, setErrorMessageOrder] = useState('');

  /* CheckOutForm */

  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();
  const stripe = useStripe();
  const elements = useElements();
  const [postalCode, setPostalCode] = useState('');

  const [deliverPriority, setDeliverPriority] = useState(getDeliverPriority());

  const onSubmit = (data) => {
    if (!isEmpty(products)) {
      products = Object.values(products);
      dishesOrdered = Object.values(products)
        .filter((dish) => dish.totalOrdered >= 1)
        .map((dish) => {
          const newDish = {
            dishID: dish.dishID,
            dishName: dish.dishName,
            totalOrdered: dish.totalOrdered,
            dishPrice: dish.dishPrice,
          };
          return newDish;
        });

      dishesOrdered = keyBy(dishesOrdered, 'dishID');
      const infoCustomer = {
        customerName: data.name,
        customerAddress: data.address,
        customerofficeOrApt: data.officeOrApt,
        customerPhoneNumber: data.phone,
      };

      const order = {
        orderCompleted: false,
        timeOrder: getHour(),
        dishes: dishesOrdered,
        infoCustomer,
        totalOrder,
        deliverPriority,
      };

      if (deliverPriority < getDeliverPriority()) {
        setErrorMessageHour('Please update the hour');
        setDeliverPriority(getDeliverPriority());
      } else {
        /* dispatch(handleCreateOrder(order))
          .then(() => { */
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
            'https://us-central1-mi-fondita-6a42e.cloudfunctions.net/getClientSecret',
            {
              dishesOrdered: Object.values(dishesOrdered),
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
                  dispatch(handleCreateOrder(order))
                    .then(() => {
                      props.history.push('/order-confirmation');
                    })
                    .catch((e) => {
                      console.error(e);
                      setErrorMessageOrder(
                        'Something went wrong with the order, could you try again?',
                      );
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
        // })
        /*  .catch((error) => {
            console.error(error);
            setErrorMessageOrder(
              'Something went wrong with the order, could you try again?',
            );
          }); */
      }
    } else {
      console.log('We need all the data');
    }
  };

  const handlePriorityDeliver = (priority) => {
    setDeliverPriority(priority);
    setErrorMessageHour('');
  };

  const handleResetError = () => {
    setErrorMessageHour('');
  };

  const cardElementOptions = {
    // a way to inject styles into that iframe
    style: {
      base: {
        fontSize: '16px',
        color: '#fff',
        '::placeholder': {
          color: '#87bbfd',
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

  return (
    <div className="UserInfo">
      <button type="button" onClick={() => props.history.goBack()}>
        Atras
      </button>

      <div className="FormUser">
        {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <input
            name="name"
            placeholder="Your name"
            ref={register({ required: true })}
          />
          {errors.name && <span>Please put your name</span>}

          {/* include validation with required or other standard HTML validation rules */}
          <input
            name="address"
            ref={register({ required: true })}
            placeholder="Your address"
            value={address}
            readOnly
          />

          {errors.address && <span>Your address is required</span>}

          <input
            name="officeOrApt"
            ref={register({ required: true })}
            placeholder="Where you work?"
          />

          {errors.officeOrApt && <span>Where you work is required</span>}

          <Controller
            as={<NumberFormat format="(###) ###-####" mask="_" />}
            name="phone"
            control={control}
            placeholder="(___) ____-____"
            rules={{ required: true }}
          />
          {errors.phone && <span>Your phone number is required</span>}

          <span>What time would you like to get your order?</span>
          <DeliverPriority
            handlePriorityDeliver={handlePriorityDeliver}
            handleResetError={handleResetError}
          />
          <div>{errorMessageHour}</div>

          <div>{errorMessageOrder}</div>

          <Row>
            <CardElementContainer>
              <CardElement
                options={cardElementOptions}
                onChange={handleChangeCard}
              />
            </CardElementContainer>
          </Row>
          {checkoutError}

          <Row>
            <SubmitButton disabled={isProcessing}>
              {isProcessing ? 'Processing...' : 'Pay $15'}
            </SubmitButton>
          </Row>
        </form>
      </div>
    </div>
  );
};

export default UserInfo;

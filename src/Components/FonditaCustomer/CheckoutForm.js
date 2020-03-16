import React, { useState } from 'react';
import styled from 'styled-components';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';

import Row from './CheckoutForm/Row';
import BillingDetailsFields from './CheckoutForm/BillingDetailsFields';
import SubmitButton from './CheckoutForm/SubmitButton';
import CheckoutError from './CheckoutForm/CheckoutError';

const CardElementContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;

  & .StripeElement {
    width: 100%;
    padding: 15px;
  }
`;

const CheckoutForm = (props) => {
  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();
  const stripe = useStripe();
  const elements = useElements();

  const handleFormSubmit = async (ev) => {
    ev.preventDefault();

    const billingDetails = {
      name: ev.target.name.value,
      email: ev.target.email.value,
      address: {
        city: ev.target.city.value,
        line1: ev.target.address.value,
        state: ev.target.state.value,
        postal_code: ev.target.zip.value,
      },
    };

    setProcessingTo(true);

    // llamad a la api
    /* const { data: clientSecret } = await axios.post('api/payment_intents', {
      amount: 15 * 100,
    }); 

    // get a reference to the card
    const cardElement = elements.getElement(CardElement);

    const paymentMethodReq = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: billingDetails,
    });

    console.log(paymentMethodReq);

    const confirmedCardPayment = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethodReq.paymentMethod.id,
    }); */

    // redirect compra exitosa

    const { data: clientSecret } = await axios.post(
      'https://us-central1-mi-fondita-6a42e.cloudfunctions.net/getClientSecret',
      {
        amount: 100 * 15,
      },
    );

    console.log(clientSecret);
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
    hidePostalCode: true,
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <Row>
        <BillingDetailsFields />
      </Row>
      <Row>
        <CardElementContainer>
          <CardElement options={cardElementOptions} />
        </CardElementContainer>
      </Row>
      {checkoutError && <CheckoutError>{checkoutError}</CheckoutError>}
      <Row>
        <SubmitButton disabled={isProcessing}>
          {isProcessing ? 'Processing...' : 'Pay $15'}
        </SubmitButton>
      </Row>
    </form>
  );
};

export default CheckoutForm;

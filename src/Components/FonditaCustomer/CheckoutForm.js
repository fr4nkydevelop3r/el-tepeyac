/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable object-curly-newline */
import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faBiking,
  faStore,
} from '@fortawesome/free-solid-svg-icons';

import { BehindButtonContainer } from '../../styled-components';
import Header from './Header';
import { colors } from '../../colors';
import DeliveryForm from './DeliveryForm';
import PickupForm from './PickupForm';

const TitleCheckout = styled.div`
  margin: 1rem 0 2rem 0;
  color: ${colors.green};
  text-align: center;
  @media (min-width: 1200px) {
    margin-top: 0;
    margin-bottom: 1rem;
  }
`;

const Service = styled.div`
  width: 50%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  @media (min-width: 1200px) {
    width: 30%;
    margin-bottom: 2rem;
  }
`;

const ServiceDelivery = styled.div`
  display: flex;
  flex-direction: column;
  color: ${(props) => props.color};
  @media (min-width: 768px) {
    font-size: 20px;
  }
  @media (min-width: 992px) {
    font-size: 22px;
  }
  @media (min-width: 1200px) {
    font-size: 18px;
  }
`;

const ServicePickup = styled.div`
  display: flex;
  flex-direction: column;
  color: ${(props) => props.color};
  @media (min-width: 768px) {
    font-size: 20px;
  }
  @media (min-width: 992px) {
    font-size: 22px;
  }
  @media (min-width: 1200px) {
    font-size: 18px;
  }
`;

const ButtonServiceDelivery = styled.button`
  color: ${(props) => props.color};
  border: none;
  background: none;
`;
const ButtonServicePickup = styled.button`
  color: ${(props) => props.color};
  border: none;
  background: none;
`;

const CheckOutForm = (props) => {
  // PLACES AUTOCOMPLETE

  //  STATE

  /* CheckOutForm */

  const [service, setService] = useState('delivery');

  return (
    <>
      <Header />
      <BehindButtonContainer>
        <button
          type="button"
          className="Behind"
          onClick={() => props.history.push('/menu')}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </BehindButtonContainer>

      <TitleCheckout>
        <h3>Select a service</h3>
      </TitleCheckout>

      <Service>
        <ServiceDelivery
          onClick={() => setService('delivery')}
          color={service === 'delivery' ? colors.green : colors.black}>
          <ButtonServiceDelivery
            color={service === 'delivery' ? colors.green : colors.black}>
            <FontAwesomeIcon icon={faBiking} />
          </ButtonServiceDelivery>
          <span>Delivery</span>
        </ServiceDelivery>
        <ServicePickup
          onClick={() => {
            setService('pickup');
          }}
          color={service === 'pickup' ? colors.green : colors.black}>
          <ButtonServicePickup
            color={service === 'pickup' ? colors.green : colors.black}>
            <FontAwesomeIcon icon={faStore} />
          </ButtonServicePickup>
          <span>Pickup</span>
        </ServicePickup>
      </Service>
      {service === 'delivery' ? <DeliveryForm /> : <PickupForm />}
    </>
  );
};

export default CheckOutForm;

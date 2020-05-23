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
`;

const Service = styled.div`
  width: 50%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
`;

const ServiceDelivery = styled.div`
  display: flex;
  flex-direction: column;
  color: ${(props) => props.color};
`;

const ServicePickup = styled.div`
  display: flex;
  flex-direction: column;
  color: ${(props) => props.color};
`;

const ButtonServiceDelivery = styled.button`
  color: ${(props) => props.color};
`;
const ButtonServicePickup = styled.button`
  color: ${(props) => props.color};
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

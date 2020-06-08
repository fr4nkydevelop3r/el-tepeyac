import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import setTip from '../../actions/deliveryTip';
import styled from 'styled-components';
import { colors } from '../../colors';

const TipTitle = styled.div`
  margin-top: 1rem;
  text-align: center;
  color: ${colors.grayStrong};
`;

const TipContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-top: 1rem;
  display: flex;

  @media (min-width: 768px) {
    width: 60%;
  }
  @media (min-width: 992px) {
    width: 40%;
  }
  @media (min-width: 1200px) {
    font-size: 18px;
  }
`;

const TipsButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const DeliveryThanks = styled.div`
  margin-top: 1rem;
  color: ${colors.grayStrong};
  text-align: center;
`;

const ButtonCeroPercent = styled.button`
  border: none;
  background: ${(props) => props.background};
  color: ${(props) => props.color};
`;

const ButtonTenPercent = styled.button`
  border: none;
  background: ${(props) => props.background};
  color: ${(props) => props.color};
`;

const ButtonFifteenPercent = styled.button`
  border: none;
  background: ${(props) => props.background};
  color: ${(props) => props.color};
`;

const InputOtherAmmount = styled.input`
  width: 60px;
  box-shadow: 0 0 0 1px #35dc74b8, 0 1px 5px 0 rgba(163, 41, 41, 0.08);
  border: 1px solid rgba(67, 41, 163, 0.2);
  border-radius: 5px;
  color: ${colors.grayStrong};
  text-align: center;
`;

const Tip = () => {
  let deliveryTip = useSelector((state) => state.deliveryTip);
  const [tip, setTipDelivery] = useState(deliveryTip);
  const [otherTip, setOtherTip] = useState('');
  const dispatch = useDispatch();

  const handleTip = (e) => {
    if (e.target.value === 'Pickup') {
      setTipDelivery('Pickup');
      setOtherTip('');
      dispatch(setTip('Pickup'));
      return;
    }
    const tip = parseInt(e.target.value);
    setTipDelivery(tip);
    dispatch(setTip(tip));
    setOtherTip('');
  };

  const handleOtherTip = (e) => {
    if (e.target.value === '') {
      const tip = 0;
      dispatch(setTip(tip));
      setOtherTip('');
      return;
    }
    if (e.target.value >= 0) {
      const tip = parseInt(e.target.value);
      setOtherTip(tip);
      setTipDelivery('');
      dispatch(setTip(tip));
    }
  };

  return (
    <>
      <TipTitle>
        <span>Delivery Tip</span>
      </TipTitle>
      <TipContainer>
        <TipsButtonsContainer>
          <ButtonCeroPercent
            type="button"
            value={'Pickup'}
            onClick={handleTip}
            background={tip === 'Pickup' ? '#00833e' : 'none'}
            color={tip === 'Pickup' ? '#fff' : `${colors.grayStrong}`}>
            Pickup
          </ButtonCeroPercent>
          <ButtonCeroPercent
            type="button"
            value={0}
            onClick={handleTip}
            background={tip === 0 ? '#00833e' : 'none'}
            color={tip === 0 ? '#fff' : `${colors.grayStrong}`}>
            $0
          </ButtonCeroPercent>
          <ButtonTenPercent
            type="button"
            value={3}
            onClick={handleTip}
            background={tip === 3 ? '#00833e' : 'none'}
            color={tip === 3 ? '#fff' : `${colors.grayStrong}`}>
            $3
          </ButtonTenPercent>
          <ButtonFifteenPercent
            type="button"
            value={4}
            onClick={handleTip}
            background={tip === 4 ? '#00833e' : 'none'}
            color={tip === 4 ? '#fff' : `${colors.grayStrong}`}>
            $4
          </ButtonFifteenPercent>
          <InputOtherAmmount
            type="number"
            placeholder="Other"
            value={otherTip > 0 ? parseInt(otherTip) : otherTip.toString()}
            onChange={handleOtherTip}
          />
        </TipsButtonsContainer>
      </TipContainer>
      {(tip > 0 || otherTip > 0) && (
        <DeliveryThanks>
          <span>
            Thanks, we really appreciate it{' '}
            <span role="img" aria-label="bike">
              🚴
            </span>
            !
          </span>
        </DeliveryThanks>
      )}
    </>
  );
};

export default Tip;

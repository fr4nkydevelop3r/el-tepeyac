import React from 'react';
import styled from 'styled-components';
import useWindowSize from 'react-use/lib/useWindowSize'
import logo from '../../img/logo2.png';
import Confetti from 'react-confetti'
import { colors } from '../../colors';


const HeaderContainerConfirmation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  align-items: center;
  .Logo {
    width: 100px;
    height: 100px;
  }
  .ButtonLogo {
    border: none;
    background: none;
  }
  @media (min-width: 1200px) {
    padding: 2rem;
  }
`;

const TitleConfirmation = styled.div`
  margin-top: 4rem;
  text-align: center;
  color: ${colors.green};
  .icon{
    font-size: 18px;
  }
`



const OrderError = ({history}) => {
  const { width, height } = useWindowSize()

  return (
    <>
      <Confetti
      width={width}
      height={height}
      numberOfPieces ={50} 
      />
      
    <HeaderContainerConfirmation>
      <div>
        <button
          className="ButtonLogo"
          type="button"
          onClick={() => history.push('/menu')}>
          <img className="Logo" alt="logo" src={logo} />
        </button>
      </div>

    </HeaderContainerConfirmation>
    <TitleConfirmation>
      <h3>Thanks for ordering with us!   
          <span className="icon" role="img" aria-label="hello">
             {' '}👋
          </span>
    </h3>
    </TitleConfirmation>
    
    </>
  );
};

export default OrderError;

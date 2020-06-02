import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../img/logo2.png';
import NewOrderNotification from './NewOrderNotification';
import PendingOrdersCounter from './PendingOrdersCounter';
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  align-items: center;
  @media (min-width: 768px) {
    width: 85%;
    margin: 0 auto;
    padding: 1rem 0;
  }
  @media (min-width: 992px) {
    width: 70%;
  }
  @media (min-width: 1200px) {
    width: 90%;
  }
  .Logo {
    width: 100px;
    height: 100px;
  }
  .ButtonLogo {
    border: none;
    background: none;
  }
`;

const HeaderOwner = () => {
  let history = useHistory();

  return (
    <>
      {' '}
      <NewOrderNotification />
      <HeaderContainer>
        <div>
          <button
            className="ButtonLogo"
            type="button"
            onClick={() => history.push('/dashboard')}>
            <img className="Logo" alt="logo" src={logo} />
          </button>
        </div>

        <PendingOrdersCounter />
      </HeaderContainer>
    </>
  );
};

export default HeaderOwner;

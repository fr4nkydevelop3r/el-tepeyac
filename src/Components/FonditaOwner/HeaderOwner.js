import React from 'react';
import { useHistory } from 'react-router-dom';

import styled from 'styled-components';
import logo from '../../img/logo2.png';
import PendingOrdersCounter from './PendingOrdersCounter';
const HeaderContainer = styled.div`
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

const HeaderOwner = () => {
  let history = useHistory();

  return (
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
  );
};

export default HeaderOwner;

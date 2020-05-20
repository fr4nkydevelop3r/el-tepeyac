import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import logo from '../../img/logo2.png';
import { ShoppingCart } from '../../styled-components';
import useTotalItems from './useTotalItems';

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

const Header = ({ history }) => {
  const [totalItems] = useTotalItems();

  return (
    <HeaderContainer>
      <div>
        <button
          className="ButtonLogo"
          type="button"
          onClick={() => history.push('/menu')}>
          <img className="Logo" alt="logo" src={logo} />
        </button>
      </div>

      <ShoppingCart onClick={() => history.push('/view-order')}>
        <i
          className="fas fa-shopping-cart"
          role="button"
          aria-label="Shopping cart"
          tabIndex={0}
        />
        <span>{totalItems > 0 && totalItems}</span>
      </ShoppingCart>
    </HeaderContainer>
  );
};

export default withRouter(Header);

import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

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
          <img
            src="https://firebasestorage.googleapis.com/v0/b/el-tepeyac-b5c7a.appspot.com/o/logo%2Flogo2.png?alt=media&token=dfe7545d-291c-4034-84d1-72766c478851"
            className="Logo"
            alt="logo"
          />
        </button>
      </div>

      <ShoppingCart>
        <i
          onClick={() => history.push('/view-order')}
          onKeyDown={() => history.push('/view-order')}
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

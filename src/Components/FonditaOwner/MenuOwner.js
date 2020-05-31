import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { auth } from '../../firebase';
import { restartOrders } from '../../actions/orders';
import { logoutUser } from '../../actions/authedUser';

import { Menu } from '../../styled-components';

import { colors } from '../../colors';

const ItemMenu = styled.li`
  .active {
    color: ${colors.red};
  }
  a {
    color: ${colors.grayStrong};
    :hover {
      text-decoration: none;
    }
  }
`;

const MenuOwner = () => {
  const dispatch = useDispatch();
  let history = useHistory();

  const handleLogOut = () => {
    auth
      .signOut()
      .then(() => {
        history.push('/sign-in');
        dispatch(restartOrders());
        dispatch(logoutUser());
      })
      .catch(() => console.log('No se pudo salir'));
  };
  return (
    <div>
      <Menu>
        <ItemMenu>
          <NavLink to="/orders" activeClassName="active">
            Orders
          </NavLink>
        </ItemMenu>

        <ItemMenu>
          <NavLink to="/today-menu-owner" activeClassName="active">
            Today Menu
          </NavLink>
        </ItemMenu>
        <ItemMenu>
          <NavLink to="/products-list" activeClassName="active">
            Products List
          </NavLink>
        </ItemMenu>
        <ItemMenu>
          <NavLink to="/new-product" activeClassName="active">
            New product
          </NavLink>
        </ItemMenu>
        <ItemMenu>
          <a onClick={handleLogOut} href="/sign-in">
            Logout
          </a>
        </ItemMenu>
      </Menu>
    </div>
  );
};

export default MenuOwner;

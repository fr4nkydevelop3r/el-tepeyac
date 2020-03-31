import React from 'react';
import { useDispatch } from 'react-redux';

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

const MenuOwner = (props) => {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    auth
      .signOut()
      .then(() => {
        props.history.push('/sign-in');
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
          <NavLink to="/dishes-list" activeClassName="active">
            Dishes List
          </NavLink>
        </ItemMenu>
        <ItemMenu>
          <NavLink to="/new-dish" activeClassName="active">
            New dish
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

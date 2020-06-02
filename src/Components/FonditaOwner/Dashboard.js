import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../../firebase';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPepperHot,
  faList,
  faPlus,
  faCalendar,
  faPowerOff,
} from '@fortawesome/free-solid-svg-icons';
import { restartOrders } from '../../actions/orders';
import { logoutUser } from '../../actions/authedUser';
import { colors } from '../../colors';
import HeaderOwner from './HeaderOwner';

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 70%;
  margin: 0 auto;
  margin-top: 3rem;
`;

const Button = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  width: 40%;
  padding: 1rem;
  a,
  .Logout,
  span {
    color: ${colors.grayStrong};
    text-align: center;
  }
`;

const Dashboard = () => {
  let history = useHistory();
  const dispatch = useDispatch();

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
    <>
      <HeaderOwner />
      <ButtonsContainer>
        {/*<Link to="/orders">Orders</Link>
        <Link to="/today-menu-owner">Today Menu</Link>
        <Link to="/products-list">Products List</Link>
        <Link to="/new-product">New Product</Link>
        <a onClick={handleLogOut} href="/sign-in">
          Logout
        </a> */}
        <Button>
          <Link to="/orders">
            {' '}
            <FontAwesomeIcon icon={faCalendar} />
          </Link>
          <Link to="/orders">
            <span>Orders</span>
          </Link>
        </Button>
        <Button>
          <Link to="/orders">
            {' '}
            <FontAwesomeIcon icon={faPepperHot} />
          </Link>
          <Link to="/orders">
            <span>Today Menu</span>
          </Link>
        </Button>
        <Button>
          <Link to="/orders">
            {' '}
            <FontAwesomeIcon icon={faList} />
          </Link>
          <Link to="/orders">
            <span>Products List</span>
          </Link>
        </Button>

        <Button>
          <Link to="/orders">
            {' '}
            <FontAwesomeIcon icon={faPlus} />
          </Link>
          <Link to="/orders">
            <span>New Product</span>
          </Link>
        </Button>

        <Button>
          <button onClick={handleLogOut} className="Logout">
            {' '}
            <FontAwesomeIcon icon={faPowerOff} />
          </button>
          <button onClick={handleLogOut}>
            <span>Logout</span>
          </button>
        </Button>
      </ButtonsContainer>
    </>
  );
};

export default Dashboard;

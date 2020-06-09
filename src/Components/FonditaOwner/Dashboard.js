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

  @media (min-width: 768px) {
    margin-top: 8rem;
  }
  @media (min-width: 992px) {
    margin-top: 12rem;
  }

  @media (min-width: 1200px) {
    width: 50%;
      margin-top: 5rem;
    }

  }

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
    background: none;
    border: none;
    @media (min-width: 768px) {
      font-size: 22px;
    }
    @media (min-width: 992px) {
      font-size: 24px;
    }
    @media (min-width: 1200px) {
      font-size: 20px;

      :hover {
        text-decoration: none;
      }
    }
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
          <Link to="/today-menu-owner">
            {' '}
            <FontAwesomeIcon icon={faPepperHot} />
          </Link>
          <Link to="/today-menu-owner">
            <span>Today Menu</span>
          </Link>
        </Button>
        <Button>
          <Link to="/products-list">
            {' '}
            <FontAwesomeIcon icon={faList} />
          </Link>
          <Link to="/products-list">
            <span>Products List</span>
          </Link>
        </Button>

        <Button>
          <Link to="/new-product">
            {' '}
            <FontAwesomeIcon icon={faPlus} />
          </Link>
          <Link to="/new-product">
            <span>New Product</span>
          </Link>
        </Button>

        <Button>
          <button onClick={handleLogOut} className="Logout">
            {' '}
            <FontAwesomeIcon icon={faPowerOff} />
          </button>
          <button onClick={handleLogOut} className="Logout">
            <span>Logout</span>
          </button>
        </Button>
      </ButtonsContainer>
    </>
  );
};

export default Dashboard;

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import useWindowSize from 'react-use/lib/useWindowSize';
import logo from '../../img/logo2.png';
import Confetti from 'react-confetti';
import { isEmpty } from 'lodash';
import { firestore } from '../../firebase';
import { getDay } from '../../utilities';
import { useParams } from 'react-router-dom';
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
  margin-top: 3rem;
  text-align: center;
  color: ${colors.green};
  @media (min-width: 1200px) {
    margin-top: 1rem;
  }
  .icon {
    font-size: 18px;
  }
`;

const Row = styled.div`
  margin-bottom: 8px;
`;

const Customer = styled.div`
  color: ${colors.grayStrong};
  width: 80%;
  margin: 0 auto;
  margin-top: 3rem;

  @media (min-width: 768px) {
    margin-top: 5rem;
    font-size: 20px;
    width: 60%;
    text-align: center;
  }
  @media (min-width: 992px) {
    width: 60%;
    font-size: 26px;
  }
  @media (min-width: 1200px) {
    margin-top: 2rem;
    font-size: 20px;
  }
`;

const OrderDetails = styled.div`
  width: 80%;
  margin: 0 auto;
  color: ${colors.grayStrong};
  margin-top: 2rem;
  margin-bottom: 3rem;
  @media (min-width: 768px) {
    font-size: 20px;
    width: 60%;
    text-align: center;
  }
  @media (min-width: 992px) {
    width: 60%;
    font-size: 26px;
  }
  @media (min-width: 1200px) {
    font-size: 20px;
  }
  ul {
    margin-top: 8px;
    list-style: none;
    margin-bottom: 8px;
    @media (min-width: 768px) {
      padding-left: 0;
    }
  }
  span {
    @media (min-width: 768px) {
      padding-left: 0;
    }
  }
  .OrderDetailsTitle {
    padding-left: 0;
  }
  .NumOrder {
    margin-top: 1rem;
  }
`;

const OrderConfirmation = () => {
  const { id } = useParams();
  let history = useHistory();
  const order = useSelector((state) => state.orders);
  const [orderDB, setOrder] = useState(order[id]);
  const { width, height } = useWindowSize();
  const [orderError, setOrderError] = useState('');

  useEffect(() => {
    const docRef = firestore
      .collection('orders')
      .doc(getDay())
      .collection(id)
      .doc(id);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setOrder(doc.data());
        } else {
          // doc.data() will be undefined in this case
          setOrderError('Order not found!');
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  }, [id]);

  const getTimeOrder = (time) => {
    const re = /\d+:\d+/;
    return re.exec(time);
  };

  return (
    <>
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
      {!isEmpty(orderDB) ? (
        <>
          <Confetti width={width} height={height} numberOfPieces={50} />

          <TitleConfirmation>
            <h3>
              Thanks for ordering with us!
              <span className="icon" role="img" aria-label="hello">
                {' '}
                👋
              </span>
            </h3>
          </TitleConfirmation>

          <Customer>
            <Row>
              <span>Customer: {orderDB.infoCustomer.customerName}</span>
            </Row>

            {orderDB.infoCustomer.customerAddress && (
              <Row>
                <span>Address: {orderDB.infoCustomer.customerAddress}</span>
              </Row>
            )}
            {orderDB.infoCustomer.customerApt && (
              <Row>
                <span>Apt: {orderDB.infoCustomer.customerApt}</span>
              </Row>
            )}
            <Row>
              <span>
                Phone Number: {orderDB.infoCustomer.customerPhoneNumber}
              </span>
            </Row>
          </Customer>

          <OrderDetails>
            <span className="OrderDetailsTitle">Order details</span>
            <Row className="NumOrder">
              <span>
                #Order: <strong> {orderDB.numOrder} </strong>
              </span>
            </Row>
            <ul>
              {Object.values(orderDB.products).map((product) => (
                <li key={product.productID}>
                  {product.totalOrdered} {product.productName}
                </li>
              ))}
            </ul>
            <Row>
              <span>Total order: ${orderDB.totalOrder}</span>
            </Row>
            <Row>
              <span>Time order: {getTimeOrder(orderDB.timeOrder)}</span>
            </Row>
            {orderDB.specialInstructions && (
              <Row>
                <span>Special Instructions: {orderDB.specialInstructions}</span>
              </Row>
            )}
          </OrderDetails>
        </>
      ) : (
        <>
          {' '}
          {orderError && (
            <TitleConfirmation>
              <h3>
                {orderError}
                <span className="icon" role="img" aria-label="hello">
                  {' '}
                  😔
                </span>
              </h3>
            </TitleConfirmation>
          )}{' '}
        </>
      )}
    </>
  );
};

export default OrderConfirmation;

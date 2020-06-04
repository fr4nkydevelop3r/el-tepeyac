/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { isEmpty } from 'lodash';
import styled from 'styled-components';
import { restartProduct } from '../../actions/products';

import useTotalOrder from './useTotalOrder';
import { colors } from '../../colors';
import { BehindButtonContainer } from '../../styled-components';
import { getTotalProductsNoTaxes } from '../../utilities';
import Header from './Header';

const ViewOrderContainer = styled.div`
  margin-bottom: 4rem;
  @media (min-width: 768px) {
    margin-bottom: 6rem;
  }
  @media (min-width: 992px) {
    margin-bottom: 8rem;
  }
`;

const TitleViewOrderContainer = styled.div`
  margin: 1rem 0 3rem 0;
  @media (min-width: 768px) {
    margin: 1rem 0 5rem 0;
  }
  @media (min-width: 992px) {
    margin: 1rem 0 7rem 0;
  }
  @media (min-width: 1200px) {
  }
  h3 {
    text-align: center;
    color: ${colors.green};
  }
  .Icon {
    font-size: 20px;
  }
`;

const ProductDetail = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
  margin-top: 1rem;

  @media (min-width: 768px) {
    font-size: 20px;
    width: 60%;
  }
  @media (min-width: 992px) {
    width: 40%;
    font-size: 26px;
  }
  @media (min-width: 1200px) {
    font-size: 18px;
  }

  .ProductName {
    width: 25%;
    text-align: center;
  }
  .ProductTotalOrdered {
    text-align: center;
    width: 25%;
  }
  .ProductAmmount {
    width: 25%;
    text-align: center;
  }
  .DeleteIcon {
    width: 25%;
    color: ${colors.red};
    text-align: center;
    .DeleteButton {
      padding: 0.2rem;
      cursor: pointer;
      background: none;
      border: none;
      color: ${colors.green};
    }
  }
`;

const TotalOrder = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 0 auto;
  margin-top: 1rem;
  color: ${colors.green};
  @media (min-width: 768px) {
    width: 60%;
    font-size: 20px;
  }
  @media (min-width: 992px) {
    width: 40%;
    font-size: 26px;
  }
  @media (min-width: 1200px) {
    font-size: 18px;
  }
  .TotalOrder {
    font-size: 16px;
    font-weight: bold;
    @media (min-width: 768px) {
      font-size: 20px;
    }
    @media (min-width: 992px) {
      font-size: 26px;
    }
    @media (min-width: 1200px) {
      font-size: 20px;
    }
  }
`;

const OrderEmpty = styled.div`
  margin-top: 124px;
  font-size: 20px;
  color: ${colors.red};
  display: flex;
  justify-content: center;
  @media (min-width: 768px) {
    font-size: 32px;
  }
  @media (min-width: 992px) {
    font-size: 36px;
  }
  @media (min-width: 1200px) {
    font-size: 22px;
  }
`;

const PlaceOrder = styled.div`
  width: 100%;
  margin-top: 32px;
  position: fixed;
  bottom: 0;
  z-index: 1000;
  button {
    width: 100%;
    height: 40px;
    background-color: ${colors.red};
    color: ${colors.grayLight};
    border: none;
    @media (min-width: 768px) {
      font-size: 24px;
      height: 60px;
    }
    @media (min-width: 992px) {
      font-size: 28px;
      height: 70px;
    }
    @media (min-width: 1200px) {
      height: 40px;
      font-size: 18px;
    }
  }
`;

const ViewOrder = () => {
  const dispatch = useDispatch();

  let products = useSelector((state) => state.products);

  const [totalOrder] = useTotalOrder();

  let productsOrdered = [];
  let history = useHistory();

  if (!isEmpty(products)) {
    products = Object.values(products);
    productsOrdered = Object.values(products).filter(
      (dish) => dish.totalOrdered >= 1,
    );
  }

  // console.log(productsOrdered);
  // console.log(totalOrder);

  const getTaxes = (total) => ((total * 8.875) / 100).toFixed(2);

  console.log(productsOrdered);

  return (
    <>
      <Header />
      <BehindButtonContainer>
        <button
          type="button"
          className="Behind"
          onClick={() => history.push('/menu')}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </BehindButtonContainer>

      <ViewOrderContainer>
        {productsOrdered && productsOrdered.length > 0 ? (
          <>
            <TitleViewOrderContainer>
              <h3>
                Order details{' '}
                <span role="img" aria-label="hungry" className="Icon">
                  😋
                </span>{' '}
              </h3>
            </TitleViewOrderContainer>
            {productsOrdered
              .sort(
                (a, b) =>
                  // eslint-disable-next-line implicit-arrow-linebreak
                  a.productCategory.localeCompare(b.productCategory),
                // eslint-disable-next-line function-paren-newline
              )
              .map((productOrdered) => (
                <ProductDetail key={productOrdered.productName}>
                  <div className="ProductName">
                    {productOrdered.productName}
                  </div>
                  <div className="ProductTotalOrdered">
                    {productOrdered.totalOrdered}
                  </div>
                  <div className="ProductAmmount">
                    <span>
                      $
                      {(
                        productOrdered.totalOrdered *
                        productOrdered.productPrice
                      ).toFixed(2)}
                    </span>
                  </div>
                  <div className="DeleteIcon">
                    {' '}
                    <button
                      type="button"
                      className="DeleteButton"
                      onClick={
                        () =>
                          // eslint-disable-next-line implicit-arrow-linebreak
                          dispatch(restartProduct(productOrdered.productID))
                        // eslint-disable-next-line react/jsx-curly-newline
                      }>
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </div>
                </ProductDetail>
              ))}
            <TotalOrder>
              <span>Order {getTotalProductsNoTaxes(products).toFixed(2)}</span>
              <span>
                Taxes ${getTaxes(getTotalProductsNoTaxes(products).toFixed(2))}
              </span>
              <span className="TotalOrder">Total Order ${totalOrder}</span>
            </TotalOrder>
            <PlaceOrder>
              <button
                type="button"
                onClick={() =>
                  history.push('/checkout', { service: 'delivery' })
                }>
                Place Order
              </button>
            </PlaceOrder>
          </>
        ) : (
          <OrderEmpty>
            <span>You haven&apos;t selected any product yet!</span>
          </OrderEmpty>
        )}
      </ViewOrderContainer>
    </>
  );
};

export default ViewOrder;

/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { keyBy, isEmpty } from 'lodash';
import styled from 'styled-components';
import { receiveProducts, restartProducts } from '../../actions/products';
import useGetItems from './useGetItems';
import useTotalItems from './useTotalItems';
import useTotalOrder from './useTotalOrder';
import { colors } from '../../colors';

import { ShoppingCart, BehindButtonContainer } from '../../styled-components';

const ProductsOrdered = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  @media (min-width: 768px) {
    margin-top: 86px;
    flex-direction: column;
    align-items: center;
  }
  @media (min-width: 992px) {
  }
  @media (min-width: 1200px) {
    margin-top: 32px;
  }
`;

const OrdersHeader = styled.div`
  width: 70%;
  margin: 0 auto;
  margin-top: 64px;
  @media (min-width: 768px) {
    margin-top: 72px;
  }
  @media (min-width: 992px) {
    margin-top: 96px;
  }
  @media (min-width: 1200px) {
    margin-top: 64px;
  }
  .Title {
    font-size: 20px;
    @media (min-width: 768px) {
      font-size: 36px;
    }
    @media (min-width: 992px) {
      font-size: 46px;
    }
    @media (min-width: 1200px) {
      font-size: 24px;
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

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  width: 70%;
  @media (min-width: 768px) {
    width: 400px;
    font-size: 32px;
  }
  @media (min-width: 992px) {
    font-size: 38px;
  }
  @media (min-width: 1200px) {
    font-size: 18px;
  }
`;

const TotalOrder = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0 auto;
  margin-top: 32px;
  width: 70%;
  margin-bottom: 64px;
  @media (min-width: 768px) {
    width: 400px;
    font-size: 32px;
  }
  @media (min-width: 992px) {
    font-size: 38px;
  }
  @media (min-width: 1200px) {
    font-size: 18px;
  }
  .Total {
    font-weight: bold;
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
      font-size: 32px;
      height: 60px;
    }
    @media (min-width: 992px) {
      font-size: 36px;
      height: 70px;
    }
    @media (min-width: 1200px) {
      height: 40px;
      font-size: 18px;
    }
  }
`;

const ViewOrder = (props) => {
  const dispatch = useDispatch();

  let products = useSelector((state) => state.products);

  const [items] = useGetItems();

  const [totalItems] = useTotalItems();
  const [totalOrder] = useTotalOrder();

  let productsOrdered = [];
  if (!isEmpty(products)) {
    products = Object.values(products);
    productsOrdered = Object.values(products).filter(
      (dish) => dish.totalOrdered >= 1,
    );
  }

  useEffect(() => {
    if (items) {
      if (products.length !== items.length) {
        dispatch(restartProducts());
        dispatch(receiveProducts(keyBy(items, 'dishID')));
      }
    }
  }, [dispatch, products.length, items]);
  return (
    <div className="ViewOrder">
      <ShoppingCart>
        <i
          onClick={() => props.history.push('view-order')}
          onKeyDown={() => props.history.push('view-order')}
          className="fas fa-shopping-cart"
          role="button"
          aria-label="Shopping cart"
          tabIndex={0}
        />
        <span>{totalItems > 0 && totalItems}</span>
      </ShoppingCart>
      <BehindButtonContainer>
        <BehindButtonContainer>
          <FontAwesomeIcon
            icon={faArrowLeft}
            onClick={() => props.history.push('/menu')}
          />
        </BehindButtonContainer>
      </BehindButtonContainer>

      {productsOrdered && productsOrdered.length > 0 ? (
        <div>
          <OrdersHeader>
            <h4 className="Title">Your order is:</h4>
          </OrdersHeader>
          <ProductsOrdered>
            {productsOrdered.map((product) => (
              <Product key={product.productID}>
                <div>
                  {product.totalOrdered} {product.productName}
                </div>
                <div>${product.productPrice * product.totalOrdered}</div>
              </Product>
            ))}
          </ProductsOrdered>
          <TotalOrder>
            {' '}
            <span className="Total">Total Order ${totalOrder}</span>
          </TotalOrder>
          <PlaceOrder>
            <button
              type="button"
              // eslint-disable-next-line react/jsx-closing-bracket-location
              onClick={() => props.history.push('/checkout')}>
              Place Order
            </button>
          </PlaceOrder>
        </div>
      ) : (
        <OrderEmpty>
          <span>You haven&apos;t selected any dish yet!</span>
        </OrderEmpty>
      )}
    </div>
  );
};

export default ViewOrder;

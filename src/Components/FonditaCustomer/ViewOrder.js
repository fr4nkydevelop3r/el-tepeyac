import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { keyBy, isEmpty } from 'lodash';
import styled from 'styled-components';
import { receiveProducts, restartProducts } from '../../actions/products';
import useGetItems from './useGetItems';
import useTotalItems from './useTotalItems';
import useTotalOrder from './useTotalOrder';
import { colors } from '../../colors';

import { ShoppingCart, BehindButtonContainer } from '../../styled-components';

const DishesOrdered = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const OrdersHeader = styled.div`
  width: 70%;
  margin: 0 auto;
  margin-top: 32px;
  h4 {
    font-size: 20px;
  }
`;

const OrderEmpty = styled.div`
  margin-top: 64px;
  display: flex;
  justify-content: center;
  h4 {
    font-size: 20px;
  }
`;

const Dish = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70%;
  margin-bottom: 16px;
`;

const TotalOrder = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 70%;
  margin: 0 auto;
  margin-top: 32px;
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
  }
`;

const ViewOrder = (props) => {
  const dispatch = useDispatch();

  let products = useSelector((state) => state.products);

  const [dishes] = useGetItems();

  const [totalItems] = useTotalItems();
  const [totalOrder] = useTotalOrder();

  let dishesOrdered = [];
  if (!isEmpty(products)) {
    products = Object.values(products);
    dishesOrdered = Object.values(products).filter(
      (dish) => dish.totalOrdered >= 1,
    );
  }

  useEffect(() => {
    if (dishes) {
      if (products.length !== dishes.length) {
        dispatch(restartProducts());
        dispatch(receiveProducts(keyBy(dishes, 'dishID')));
      }
    }
  }, [dispatch, products.length, dishes]);
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
        <i
          className="fas fa-arrow-left"
          onClick={() => props.history.push('/today-menu')}
          onKeyDown={() => props.history.push('/today-menu')}
          role="button"
          aria-label="Shopping cart"
          tabIndex={0}
        />
      </BehindButtonContainer>

      {dishesOrdered && dishesOrdered.length > 0 ? (
        <div>
          <OrdersHeader>
            <h4>Your order is:</h4>
          </OrdersHeader>
          <DishesOrdered>
            {dishesOrdered.map((dish) => (
              <Dish key={dish.dishID}>
                <div>
                  {dish.totalOrdered} {dish.dishName}
                </div>
                <div>${dish.dishPrice * dish.totalOrdered}</div>
              </Dish>
            ))}
          </DishesOrdered>
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
          <h4>You haven&apos;t selected any dish yet!</h4>
        </OrderEmpty>
      )}
    </div>
  );
};

export default ViewOrder;

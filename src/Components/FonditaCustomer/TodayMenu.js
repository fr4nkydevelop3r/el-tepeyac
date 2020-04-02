/* eslint-disable react/jsx-closing-bracket-location */
// AVISAR AL USUARIO CUANDO EL MENU HA CAMBIADO

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { keyBy, isEmpty } from 'lodash';
import styled from 'styled-components';
import {
  receiveProducts,
  incrementProduct,
  restartProducts,
  decrementProduct,
} from '../../actions/products';

import useTotalOrder from './useTotalOrder';
import useTotalItems from './useTotalItems';
import useGetItems from './useGetItems';
import { colors } from '../../colors';
import { ShoppingCart } from '../../styled-components';

const TodayMenuContainer = styled.div`
  background-color: ${colors.grayLight};
  height: 100vh;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  h4 {
    margin-bottom: 0;
    @media (min-width: 768px) {
      font-size: 32px;
    }
    @media (min-width: 992px) {
      font-size: 42px;
    }
    @media (min-width: 1200px) {
      font-size: 24px;
      z-index: 2000;
    }
  }
  span {
    margin-left: 6px;
    font-size: 22px;
    @media (min-width: 768px) {
      font-size: 32px;
    }
    @media (min-width: 992px) {
      font-size: 42px;
    }
    @media (min-width: 1200px) {
      font-size: 24px;
      z-index: 2000;
    }
  }
`;

const Menu = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  padding: 8px;
  align-items: center;
  margin-bottom: 64px;
  @media (min-width: 768px) {
  }
  @media (min-width: 992px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    padding: 24px;
  }
  @media (min-width: 1200px) {
    justify-content: space-around;
  }
`;

const Dish = styled.div`
  width: 95%;
  height: 110px;
  margin: 8px 0 8px 0;
  box-shadow: 0 0 0 1px #dc35351c, 0 1px 5px 0 rgba(163, 41, 41, 0.08);
  border: 1px solid rgba(67, 41, 163, 0.2);
  border-radius: 5px;
  display: flex;
  @media (min-width: 768px) {
    width: 60%;
    height: 150px;
  }
  @media (min-width: 992px) {
    height: 200px;
    padding: 16px;
  }
  @media (min-width: 1200px) {
    width: 400px;
    margin-bottom: 32px;
  }
`;

const DishInfo = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  .DishDescription {
    font-size: 14px;
    color: ${colors.grayStrong};
    padding-left: 8px;
    padding-top: 12px;
    @media (min-width: 768px) {
      font-size: 20px;
    }
    @media (min-width: 992px) {
      font-size: 24px;
    }
    @media (min-width: 1200px) {
      font-size: 14px;
      padding-right: 8px;
    }
  }
  .DishName {
    padding-left: 8px;
    padding-top: 8px;
    @media (min-width: 768px) {
      font-size: 26px;
    }
    @media (min-width: 992px) {
      font-size: 32px;
    }
    @media (min-width: 1200px) {
      font-size: 18px;
    }
  }
`;

const DishTotalAndImage = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .DishImage {
    padding-right: 8px;
    img {
      width: 115px;
      height: 95px;
      @media (min-width: 768px) {
        width: 135px;
        height: 115px;
      }
      @media (min-width: 992px) {
      }
      @media (min-width: 1200px) {
      }
    }
  }
  .IncrementDecrement {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-right: 16px;
  }
  .TotalItems {
    padding: 8px 0 8px 0;
    color: ${colors.grayStrong};
    @media (min-width: 768px) {
      font-size: 22px;
    }
    @media (min-width: 992px) {
      font-size: 28px;
    }
    @media (min-width: 1200px) {
      font-size: 16px;
    }
  }
  .MinusButton {
    :disabled {
      .minus {
        color: #e3235159;
      }
    }
  }
  .MinusButton,
  .PlusButton {
    @media (min-width: 1200px) {
      border: none;
      background: none;
      :focus {
        outline: none;
      }
    }
  }

  .minus,
  .plus {
    color: ${colors.red};
    font-size: 12px;
    @media (min-width: 768px) {
      font-size: 20px;
    }
    @media (min-width: 992px) {
      font-size: 24px;
    }
    @media (min-width: 1200px) {
      font-size: 16px;
    }
    :focus {
      outline: none;
    }
  }
`;

const EmptyMenu = styled.div`
  margin-top: 124px;
  font-size: 20px;
  color: ${colors.red};
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

const ViewOrder = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 300;
  .ViewOrderButton {
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
      height: 70px;
      font-size: 32px;
    }
    @media (min-width: 1200px) {
      height: 40px;
      font-size: 16px;
    }
  }
`;

const TodayMenu = (props) => {
  const dispatch = useDispatch();
  const [totalOrder] = useTotalOrder();
  const [totalItems] = useTotalItems();

  const menu = useSelector((state) => state.products);
  const [dishes] = useGetItems();

  let dishesList = [];

  if (!isEmpty(menu)) {
    dishesList = Object.values(menu);
  }

  useEffect(() => {
    if (dishes) {
      if (dishesList.length !== dishes.length) {
        dispatch(restartProducts());
        dispatch(receiveProducts(keyBy(dishes, 'dishID')));
      }
    }
  }, [dishes, dishesList.length, dispatch]);

  const handleIncrement = (idDish) => {
    dispatch(incrementProduct(idDish));
  };

  const handleDecrement = (idDish) => {
    dispatch(decrementProduct(idDish));
  };

  return (
    <TodayMenuContainer>
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
      <Title>
        <h4>Our menu today </h4>
        <span role="img" aria-label="yumi">
          😋
        </span>
      </Title>

      <Menu>
        {dishesList.length > 0 ? (
          dishesList.map((dish) => (
            <Dish key={dish.dishID}>
              <DishInfo>
                <div className="DishName">{dish.dishName}</div>
                <div className="DishDescription">{dish.dishDescription}</div>
              </DishInfo>
              <DishTotalAndImage>
                <div className="IncrementDecrement">
                  <div className="Increment">
                    <button
                      type="button"
                      onClick={() => handleIncrement(dish.dishID)}
                      className="PlusButton">
                      <i className="fas fa-plus plus" />
                    </button>
                  </div>
                  <div className="TotalItems">
                    <div>{dish.totalOrdered > 0 && dish.totalOrdered}</div>
                  </div>
                  <div className="Decrement">
                    <button
                      type="button"
                      className="MinusButton"
                      onClick={() => {
                        if (dish.totalOrdered >= 1) {
                          handleDecrement(dish.dishID);
                        }
                      }}
                      disabled={!dish.totalOrdered >= 1}>
                      <i className="fas fa-minus minus" />
                    </button>
                  </div>
                </div>
                <div className="DishImage">
                  <img src={dish.dishPhoto} alt={dish.dishName} />
                </div>
              </DishTotalAndImage>
            </Dish>
          ))
        ) : (
          <EmptyMenu>
            <span>There aren&apos;t dishes in the menu</span>
          </EmptyMenu>
        )}
      </Menu>

      <ViewOrder>
        {totalOrder > 0 && (
          <button
            className="ViewOrderButton"
            type="button"
            onClick={() => {
              props.history.push('view-order');
              // eslint-disable-next-line react/jsx-closing-bracket-location
            }}>
            View Order ${totalOrder}
          </button>
        )}
      </ViewOrder>
    </TodayMenuContainer>
  );
};

export default TodayMenu;

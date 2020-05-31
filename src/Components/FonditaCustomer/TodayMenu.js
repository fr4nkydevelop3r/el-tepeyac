/* eslint-disable react/jsx-closing-bracket-location */
// AVISAR AL USUARIO CUANDO EL MENU HA CAMBIADO

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
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
import useGetCagegories from '../FonditaOwner/useGetCategories';
import { colors } from '../../colors';
import { ShoppingCart } from '../../styled-components';

const TodayMenuContainer = styled.div`
  background-color: ${colors.grayLight};
  height: auto;
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
  height: auto;
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

const Product = styled.div`
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

const ProductInfo = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  .ProductDescription {
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
  .ProductName {
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

const ProductTotalAndImage = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .ProductImage {
    padding-right: 8px;
    img {
      width: 115px;
      height: 95px;
      border-radius: 10px;
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
    border: none;
    background: none;
    @media (min-width: 1200px) {
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

const TodayMenu = () => {
  const dispatch = useDispatch();
  const [totalOrder] = useTotalOrder();
  const [totalItems] = useTotalItems();
  const [categories] = useGetCagegories();
  let history = useHistory();

  const menu = useSelector((state) => state.products);
  const [products] = useGetItems();

  let productsList = [];

  if (!isEmpty(menu)) {
    productsList = Object.values(menu);
  }

  useEffect(() => {
    if (products) {
      if (productsList.length !== products.length) {
        dispatch(restartProducts());
        dispatch(receiveProducts(keyBy(products, 'productID')));
      }
    }
  }, [products, productsList.length, dispatch]);

  const handleIncrement = (idProduct) => {
    dispatch(incrementProduct(idProduct));
  };

  const handleDecrement = (idProduct) => {
    dispatch(decrementProduct(idProduct));
  };
  console.log(categories);
  console.log(productsList);

  return (
    <TodayMenuContainer>
      <ShoppingCart>
        <i
          onClick={() => history.push('view-order')}
          onKeyDown={() => history.push('view-order')}
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
      <div>
        {categories &&
          categories.map((category) => (
            <button type="button">{category.categoryName}</button>
          ))}
      </div>
      <Menu>
        {productsList.length > 0 ? (
          productsList
            .sort((a, b) => (a.productName > b.productName ? 1 : -1))
            .map((product) => (
              <Product key={product.productID}>
                <ProductInfo>
                  <div className="ProductName">{product.productName}</div>
                  <div className="ProductDescription">
                    {product.productDescription}
                  </div>
                </ProductInfo>
                <ProductTotalAndImage>
                  <div className="IncrementDecrement">
                    <div className="Increment">
                      <button
                        type="button"
                        onClick={() => handleIncrement(product.productID)}
                        className="PlusButton">
                        <i className="fas fa-plus plus" />
                      </button>
                    </div>
                    <div className="TotalItems">
                      <div>
                        {product.totalOrdered > 0 && product.totalOrdered}
                      </div>
                    </div>
                    <div className="Decrement">
                      <button
                        type="button"
                        className="MinusButton"
                        onClick={() => {
                          if (product.totalOrdered >= 1) {
                            handleDecrement(product.productID);
                          }
                        }}
                        disabled={!product.totalOrdered >= 1}>
                        <i className="fas fa-minus minus" />
                      </button>
                    </div>
                  </div>
                  <div className="ProductImage">
                    <img src={product.productPhoto} alt={product.productName} />
                  </div>
                </ProductTotalAndImage>
              </Product>
            ))
        ) : (
          <EmptyMenu>
            <span>There aren&apos;t products in the menu</span>
          </EmptyMenu>
        )}
      </Menu>

      <ViewOrder>
        {totalOrder > 0 && (
          <button
            className="ViewOrderButton"
            type="button"
            onClick={() => {
              history.push('view-order');
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

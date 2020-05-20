/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { incrementProduct, decrementProduct } from '../../actions/products';
import {
  TitleProductsCategory,
  BehindButtonContainer,
  ViewOrder,
} from '../../styled-components';
import Header from './Header';
import { getTotalProductsNoTaxes } from '../../utilities';
import useTotalOrder from './useTotalOrder';

import { colors } from '../../colors';

const ProductsCategory = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  padding: 8px;
  align-items: center;
  margin-bottom: 4rem;
  height: auto;
  @media (min-width: 768px) {
    margin-bottom: 6rem;
  }
  @media (min-width: 992px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    padding: 24px;
  }
  @media (min-width: 1200px) {
    margin-bottom: 4rem;
    justify-content: space-around;
  }
`;

const Product = styled.div`
  width: 95%;
  min-height: 110px;
  margin: 8px 0 8px 0;
  box-shadow: 0 0 0 1px #35dc6c87, 0 1px 5px 0 rgba(163, 41, 41, 0.08);
  border: 1px solid rgba(67, 41, 163, 0.2);
  border-radius: 5px;
  display: flex;
  @media (min-width: 768px) {
    padding: 0.5rem;
    width: 60%;
    height: auto;
  }
  @media (min-width: 992px) {
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
  justify-content: space-evenly;
  padding: 1rem;
  .ProductName {
    @media (min-width: 768px) {
      font-size: 20px;
    }
    @media (min-width: 992px) {
      font-size: 26px;
    }
    @media (min-width: 1200px) {
      font-size: 18px;
    }
  }

  .ProductDescription {
    font-size: 14px;
    color: ${colors.grayStrong};
    padding-top: 0.5rem;
    @media (min-width: 768px) {
      font-size: 18px;
    }
    @media (min-width: 992px) {
      font-size: 22px;
    }
    @media (min-width: 1200px) {
      font-size: 12px;
      padding-right: 8px;
    }
  }
  .ProductPrice {
    text-align: right;
    .Price {
      @media (min-width: 768px) {
        font-size: 20px;
      }
      @media (min-width: 992px) {
        font-size: 22px;
      }
      @media (min-width: 1200px) {
        font-size: 16px;
      }
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
        width: 155px;
        height: 135px;
      }
      @media (min-width: 992px) {
        width: 175px;
        height: 155px;
      }
      @media (min-width: 1200px) {
        width: 135px;
        height: 115px;
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

const CategoryProducts = ({ location, history }) => {
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories);
  const [totalOrder] = useTotalOrder();
  let productsCategory = [];
  let categoryID = '';
  let category = {};

  if (location.state) {
    categoryID = location.state.categoryID;
    productsCategory = Object.values(menu).filter(
      (product) => product.productCategory === categoryID,
    );
    category = Object.values(categories).filter(
      (cat) => cat.categoryID === categoryID,
    );
  } else {
    history.push('/menu');
  }

  useEffect(() => {
    if (Object.keys(menu).length === 0) {
      history.push('/menu');
    }
  }, [menu, history]);

  // console.log(category);
  // console.log(productsCategory);

  const handleIncrement = (idProduct) => {
    dispatch(incrementProduct(idProduct));
  };

  const handleDecrement = (idProduct) => {
    dispatch(decrementProduct(idProduct));
  };

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
      {category.length > 0 && (
        <TitleProductsCategory>
          <h3 className="CategoryTitle">{category[0].categoryName}</h3>
          <p className="CategoryDescription">
            {category[0].categoryDescription}
          </p>
        </TitleProductsCategory>
      )}

      <ProductsCategory>
        {productsCategory.length > 0 ? (
          productsCategory
            .sort((a, b) => (a.productName > b.productName ? 1 : -1))
            .map((product) => (
              <Product key={product.productID}>
                <ProductInfo>
                  <div className="NameAndDescription">
                    <div className="ProductName">{product.productName}</div>
                    <div className="ProductDescription">
                      {product.productDescription && (
                        <div>{product.productDescription}</div>
                      )}
                    </div>
                  </div>
                  <div className="ProductPrice">
                    <span className="Price">
                      $
                      {Number.isInteger(product.productPrice)
                        ? product.productPrice
                        : product.productPrice.toFixed(2)}
                    </span>
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
            <span>There aren&apos;t products in this category</span>
          </EmptyMenu>
        )}
      </ProductsCategory>
      <ViewOrder>
        {totalOrder > 0 && (
          <button
            className="ViewOrderButton"
            type="button"
            onClick={() => history.push('/view-order')}>
            Order ${getTotalProductsNoTaxes(menu).toFixed(2)}
          </button>
        )}
      </ViewOrder>
    </>
  );
};

export default CategoryProducts;

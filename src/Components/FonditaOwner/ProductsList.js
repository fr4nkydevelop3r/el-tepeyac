/* eslint-disable no-console */
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { firestore } from '../../firebase';

import { TodayMenuContext } from '../../providers/TodayMenuProvider';
import { ProductsListContext } from '../../providers/ProductsListProvider';
import MenuOwner from './MenuOwner';
import { colors } from '../../colors';
import { MessageEmptyDishes } from '../../styled-components';

const ProductsListContainer = styled.div`
  margin-top: 46px;
  margin-bottom: 32px;
  @media (min-width: 768px) {
    margin-top: 96px;
  }
  h4 {
    color: ${colors.grayStrong};
    text-align: center;
    @media (min-width: 768px) {
      font-size: 28px;
    }
    @media (min-width: 1200px) {
      font-size: 24px;
    }
  }
`;

const Products = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  align-items: center;
`;

const Product = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-around;
  margin-top: 16px;
  @media (min-width: 768px) {
    width: 55%;
  }
  @media (min-width: 1200px) {
    width: 500px;
  }
  .ProductName {
    width: 60%;
    display: flex;
    align-items: center;
    text-align: center;
    @media (min-width: 768px) {
      font-size: 22px;
    }
    @media (min-width: 1200px) {
      font-size: 18px;
    }
  }
`;

const NewProductButton = styled.button`
  background: ${colors.yellow};
  width: 100px;
  height: 50px;
  color: ${colors.grayDark};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border: none;
  border-radius: 5px;
  :focus {
    outline: none;
  }
  @media (min-width: 1200px) {
    width: 90px;
    height: 40px;
    font-size: 14px;
  }
`;

const NewProductContainer = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddProductButton = styled.button`
  background: ${colors.yellow};
  width: 80px;
  height: 40px;
  color: ${colors.grayDark};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border: none;
  border-radius: 5px;
  :focus {
    outline: none;
  }
  @media (min-width: 768px) {
    width: 90px;
    height: 50px;
  }
  @media (min-width: 1200px) {
    width: 80px;
    height: 40px;
    font-size: 14px;
  }
`;

const ProductsList = () => {
  const todayProducts = useContext(TodayMenuContext);
  const products = useContext(ProductsListContext);
  let history = useHistory();

  console.log(products);

  const addToTodayMenu = (product) => {
    firestore
      .collection('todaymenu')
      .doc(product.id)
      .set({
        productName: product.productName,
        productDescription: product.productDescription,
        productPrice: product.productPrice,
        productPhoto: product.productPhoto,
        productCategory: product.productCategory,
      })
      .then(() => {
        console.log('Ok a la BD!');
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  };

  const idsTodayProducts = Object.values(todayProducts).map((d) => d.id);

  const listProducts = products.filter(
    (dish) => idsTodayProducts.indexOf(dish.id) < 0,
  );

  return (
    <>
      <MenuOwner />
      <ProductsListContainer>
        <h4>Products list</h4>
        {listProducts.length > 0 ? (
          <Products>
            {listProducts.map((product) => (
              <Product key={product.id}>
                <div className="ProductName">{product.productName}</div>
                <AddProductButton
                  type="button"
                  onClick={() => addToTodayMenu(product)}>
                  Add
                </AddProductButton>
              </Product>
            ))}
          </Products>
        ) : (
          <MessageEmptyDishes>
            <h5>There aren&apos;t products yet.</h5>
          </MessageEmptyDishes>
        )}

        <NewProductContainer>
          <NewProductButton
            type="button"
            onClick={() => history.push('/new-product')}>
            New Product
          </NewProductButton>
        </NewProductContainer>
      </ProductsListContainer>
    </>
  );
};

export default ProductsList;

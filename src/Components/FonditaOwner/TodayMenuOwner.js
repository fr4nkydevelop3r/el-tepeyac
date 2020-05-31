import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { TodayMenuContext } from '../../providers/TodayMenuProvider';
import { firestore } from '../../firebase';
import MenuOwner from './MenuOwner';
import { colors } from '../../colors';
import { MessageEmptyDishes } from '../../styled-components';

const TodayMenuContainer = styled.div`
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

const DeleteButton = styled.button`
  background: ${colors.red};
  width: 80px;
  height: 40px;
  color: ${colors.grayLight};
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

const AddProductContainer = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddProductButton = styled.button`
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

const TodayMenuOwner = () => {
  const products = useContext(TodayMenuContext);
  let history = useHistory();

  const deleteProduct = (id) => {
    firestore
      .collection('todaymenu')
      .doc(id)
      .delete()
      .catch((error) => console.error('Error removing document: ', error));
  };

  const addProduct = () => {
    history.push('/new-product');
  };

  return (
    <>
      <MenuOwner />
      <TodayMenuContainer>
        <h4>Today&apos;s menu</h4>
        {products.length > 0 ? (
          <Products>
            {products.map((product) => (
              <Product key={product.id}>
                <div className="ProductName">{product.productName}</div>
                <DeleteButton
                  type="button"
                  onClick={() => deleteProduct(product.id)}>
                  Delete
                </DeleteButton>
              </Product>
            ))}
          </Products>
        ) : (
          <MessageEmptyDishes>
            <h5>There aren&apos;t products uploaded today</h5>
          </MessageEmptyDishes>
        )}

        <AddProductContainer>
          <AddProductButton type="button" onClick={addProduct}>
            Add product
          </AddProductButton>
        </AddProductContainer>
      </TodayMenuContainer>
    </>
  );
};

export default TodayMenuOwner;

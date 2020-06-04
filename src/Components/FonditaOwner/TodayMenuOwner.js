import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { TodayMenuContext } from '../../providers/TodayMenuProvider';
import { firestore } from '../../firebase';
import { BehindButtonContainer } from '../../styled-components';
import { colors } from '../../colors';
import HeaderOwner from './HeaderOwner';
import { MessageEmptyDishes } from '../../styled-components';
import useGetCategories from './useGetCategories';
import PillCategory from './PillCategory';

const TodayMenuContainer = styled.div`
  margin-bottom: 3rem;
`;

const TodayMenuTitle = styled.div`
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

const CategoriesContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 1rem;
  margin-top: 1rem;

  @media (min-width: 768px) {
    margin: 0 auto;
    margin-top: 2rem;
    width: 70%;
    justify-content: space-evenly;
  }

  @media (min-width: 1200px) {
    width: 50%;
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
    text-align: left;
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
  const categories = useGetCategories();
  let history = useHistory();
  const [category, setCategory] = useState('');
  const [flag, setFlag] = useState(false);

  const deleteProduct = (id) => {
    firestore
      .collection('todaymenu')
      .doc(id)
      .delete()
      .catch((error) => console.error('Error removing document: ', error));
  };

  const addProduct = () => {
    history.push('/products-list');
  };

  const handleCategory = (category) => {
    setCategory(category);
  };

  useEffect(() => {
    if (categories[0] && categories[0].length > 0 && !flag) {
      setCategory('lzxerJ6f8DlC52llreQJ');
      setFlag(true);
    }
  }, [categories, flag]);

  return (
    <>
      <HeaderOwner />
      <BehindButtonContainer>
        <button
          type="button"
          className="Behind"
          onClick={() => history.push('/dashboard')}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </BehindButtonContainer>{' '}
      <TodayMenuTitle>
        <h4 className="TodayMenuTitle">Today&apos;s menu</h4>
      </TodayMenuTitle>
      <CategoriesContainer>
        {' '}
        {categories && categories[0] && (
          <>
            {categories[0]
              .sort(
                (a, b) => a.categoryShowInMenuRank - b.categoryShowInMenuRank,
              )
              .map((category) => (
                <PillCategory
                  key={category.categoryID}
                  categoryName={category.categoryName}
                  categoryID={category.categoryID}
                  handleCategory={handleCategory}
                />
              ))}
          </>
        )}
      </CategoriesContainer>
      {categories && categories[0] && (
        <TodayMenuContainer>
          {products.length > 0 ? (
            <Products>
              {products
                .filter((product) => product.productCategory === category)
                .map((product) => (
                  <Product key={product.id}>
                    <div className="ProductName">
                      <span>{product.productName}</span>
                    </div>
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
      )}
    </>
  );
};

export default TodayMenuOwner;

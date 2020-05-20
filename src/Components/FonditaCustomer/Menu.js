import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { keyBy, isEmpty } from 'lodash';

import styled from 'styled-components';
import { receiveProducts, restartProducts } from '../../actions/products';
import { receiveCategories } from '../../actions/categories';
import { getTotalProductsNoTaxes } from '../../utilities';
import useGetCategories from '../FonditaOwner/useGetCategories';
import useGetItems from './useGetItems';
import useTotalOrder from './useTotalOrder';
import MenuItem from './MenuItem';
import { colors } from '../../colors';
import Header from './Header';
import { ViewOrder } from '../../styled-components';

const MenuContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 1rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    justify-content: space-between;
    padding: 3rem;
  }
  @media (min-width: 992px) {
    padding: 2rem;
    margin-bottom: 5rem;
  }
  @media (min-width: 1200px) {
    margin-bottom: 3rem;
  }
`;

const TitleContainer = styled.div`
  margin-top: 1rem;
  h3 {
    color: ${colors.green};
    text-align: center;
  }
  .icon {
    font-size: 22px;
  }
`;

const Menu = ({ history }) => {
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.products);
  const [totalOrder] = useTotalOrder();
  const [categories] = useGetCategories();
  const [products] = useGetItems();

  let productsList = [];

  if (!isEmpty(menu)) {
    productsList = Object.values(menu);
  }

  useEffect(() => {
    if (products && categories) {
      if (productsList.length !== products.length) {
        dispatch(restartProducts());
        dispatch(receiveProducts(keyBy(products, 'productID')));
        dispatch(receiveCategories(keyBy(categories, 'categoryID')));
      }
    }
  }, [products, productsList.length, dispatch, categories]);

  return (
    <>
      <Header />
      <TitleContainer>
        <h3>
          The best Mexican food in East Harlem &quot;El barrio&quot;{' '}
          <span className="icon" role="img" aria-label="taco">
            🌮
          </span>
        </h3>
      </TitleContainer>
      <MenuContainer>
        {categories &&
          categories
            .sort((a, b) => a.categoryShowInMenuRank - b.categoryShowInMenuRank)
            .map((category) => (
              <MenuItem key={category.categoryID} category={category} />
            ))}
      </MenuContainer>
      <ViewOrder>
        {totalOrder > 0 && (
          <button
            className="ViewOrderButton"
            type="button"
            onClick={() => {
              history.push('view-order');
              // eslint-disable-next-line react/jsx-closing-bracket-location
            }}>
            View Order ${getTotalProductsNoTaxes(menu).toFixed(2)}
          </button>
        )}
      </ViewOrder>
    </>
  );
};

export default Menu;

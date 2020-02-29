import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { keyBy, isEmpty } from 'lodash';
import { receiveProducts, restartProducts } from '../../actions/products';
import useGetItems from './useGetItems';

const ViewOrder = (props) => {
  const dispatch = useDispatch();

  let products = useSelector((state) => state.products);

  const [dishes] = useGetItems();

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
      <button type="button" onClick={() => props.history.goBack()}>
        Atras
      </button>
      {dishesOrdered && dishesOrdered.length > 0 ? (
        <div>
          <div className="DishesOrdered">
            {dishesOrdered.map((dish) => (
              <div className="dish" key={dish.dishID}>
                <div>{dish.dishName}</div>
                <div>{dish.totalOrdered}</div>
                <div>{dish.dishPrice * dish.totalOrdered}</div>
              </div>
            ))}
          </div>
          <div className="PlaceOrder">
            <button
              type="button"
              // eslint-disable-next-line react/jsx-closing-bracket-location
              onClick={() => props.history.push('/user-info')}>
              Place Order
            </button>
          </div>
        </div>
      ) : (
        <div>You haven&apos;t selected any dish yet!</div>
      )}
    </div>
  );
};

export default ViewOrder;

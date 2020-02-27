// AVISAR AL USUARIO CUANDO EL MENU HA CAMBIADO

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { keyBy, isEmpty } from 'lodash';
import {
  receiveProducts,
  incrementProduct,
  restartProducts,
  decrementProduct,
} from '../../actions/products';
import collectIdsAndDocs from '../../utilities';
import { firestore } from '../../firebase';
import useTotalOrder from './useTotalOrder';

const Home = (props) => {
  const dispatch = useDispatch();
  const [totalOrder] = useTotalOrder();
  const menu = useSelector((state) => state.products);
  let dishesList = [];

  if (!isEmpty(menu)) {
    dishesList = Object.values(menu);
  }

  useEffect(() => {
    const unsubscribeFromFirestore = firestore
      .collection('todaymenu')
      .onSnapshot((snapshot) => {
        let dishes = snapshot.docs.map(collectIdsAndDocs);
        dishes = dishes.map((dish) => ({
          dishID: dish.id,
          dishName: dish.dishName,
          dishPrice: dish.dishPrice,
          totalOrdered: 0,
        }));

        if (dishesList.length !== dishes.length) {
          dishes = keyBy(dishes, 'dishID');
          dispatch(restartProducts());
          dispatch(receiveProducts(dishes));
        }
      });
    return function cleanup() {
      unsubscribeFromFirestore();
    };
  }, [dishesList.length, dispatch]);

  const handleIncrement = (idDish) => {
    dispatch(incrementProduct(idDish));
  };

  const handleDecrement = (idDish) => {
    dispatch(decrementProduct(idDish));
  };

  return (
    <div className="Home">
      <div className="Shopping Cart">
        <div className="TotalOrder">{totalOrder > 0 && totalOrder}</div>
      </div>

      <div className="TodayMenu">
        {dishesList.length > 0 ? (
          dishesList.map((dish) => (
            <div key={dish.dishID} className="MenuItem">
              <div className="DishName">{dish.dishName}</div>
              <div className="Increment">
                <button
                  type="button"
                  // eslint-disable-next-line react/jsx-closing-bracket-location
                  onClick={() => handleIncrement(dish.dishID)}>
                  +
                </button>
              </div>
              <div className="Decrement">
                <button
                  type="button"
                  // eslint-disable-next-line react/jsx-closing-bracket-location
                  onClick={() => {
                    if (dish.totalOrdered >= 1) {
                      handleDecrement(dish.dishID);
                    }
                    // eslint-disable-next-line react/jsx-closing-bracket-location
                  }}>
                  -
                </button>
              </div>
              <div className="TotalItems">
                <div>{dish.totalOrdered}</div>
              </div>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>

      <div>
        {totalOrder > 0 && (
          <div>
            <button
              type="button"
              onClick={() => {
                props.history.push('view-order');
                // eslint-disable-next-line react/jsx-closing-bracket-location
              }}>
              View Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

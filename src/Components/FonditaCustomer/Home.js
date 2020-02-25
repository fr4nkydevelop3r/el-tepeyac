// AVISAR AL USUARIO CUANDO EL MENU HA CAMBIADO

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { keyBy, isEmpty } from 'lodash';
import {
  receiveProducts,
  incrementProduct,
  restartProducts,
} from '../../actions/products';
import collectIdsAndDocs from '../../utilities';
import { firestore } from '../../firebase';

const Home = () => {
  const dispatch = useDispatch();

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
        dishes = keyBy(dishes, 'dishID');
        dispatch(restartProducts());
        dispatch(receiveProducts(dishes));
      });
    return function cleanup() {
      unsubscribeFromFirestore();
    };
  }, [dispatch]);

  const handleIncrement = (idDish) => {
    dispatch(incrementProduct(idDish));
  };

  const dishes = useSelector((state) => state.products);

  let dishesList = [];

  if (!isEmpty(dishes)) {
    dishesList = Object.values(dishes);
  }

  return (
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
              <button type="button">-</button>
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
  );
};

export default Home;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { receiveProducts } from '../../actions/products';

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
          id: dish.id,
          dishName: dish.dishName,
          dishPrice: dish.dishPrice,
          totalItems: 0,
        }));
        dispatch(receiveProducts(dishes));
      });
    return function cleanup() {
      unsubscribeFromFirestore();
    };
  }, [dispatch]);

  const dishes = useSelector((state) => state.products);
  const dishesList = Object.values(dishes);

  return (
    <div className="TodayMenu">
      {dishesList.length > 0 ? (
        dishesList.map((dish) => (
          <div key={dish.id} className="MenuItem">
            <div className="DishName">{dish.dishName}</div>
            <div className="Increment">
              <button type="button">+</button>
            </div>
            <div className="Decrement">
              <button type="button">-</button>
            </div>
            <div className="TotalItems">
              <div>{dish.totalItems}</div>
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

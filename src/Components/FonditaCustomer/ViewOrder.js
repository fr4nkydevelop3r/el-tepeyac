import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { keyBy, isEmpty } from 'lodash';

import collectIdsAndDocs from '../../utilities';
import { firestore } from '../../firebase';
import { receiveProducts, restartProducts } from '../../actions/products';

const ViewOrder = (props) => {
  const dispatch = useDispatch();

  let products = useSelector((state) => state.products);

  let dishesOrdered = [];
  if (!isEmpty(products)) {
    products = Object.values(products);
    dishesOrdered = Object.values(products).filter(
      (dish) => dish.totalOrdered >= 1,
    );
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

        if (products.length !== dishes.length) {
          dishes = keyBy(dishes, 'dishID');
          dispatch(restartProducts());
          dispatch(receiveProducts(dishes));
        }
      });
    return function cleanup() {
      unsubscribeFromFirestore();
    };
  }, [dispatch, products.length]);

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

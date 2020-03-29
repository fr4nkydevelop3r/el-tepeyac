/* eslint-disable no-console */
import React, { useState, useEffect, useContext } from 'react';

import collectIdsAndDocs from '../../utilities';

import { firestore } from '../../firebase';

import { TodayMenuContext } from '../../providers/TodayMenuProvider';
import { DishesListContext } from '../../providers/DishesListProvider';
import MenuOwner from './MenuOwner';

const DishesList = (props) => {
  //const [dishes, setDishes] = useState([]);
  const todayDishes = useContext(TodayMenuContext);
  const dishes = useContext(DishesListContext);

  const addToTodayMenu = (dish) => {
    firestore
      .collection('todaymenu')
      .doc(dish.id)
      .set({
        dishName: dish.dishName,
        dishDescription: dish.dishDescription,
        dishPrice: dish.dishPrice,
        dishPhoto: dish.dishPhoto,
      })
      .then(() => {
        console.log('Ok a la BD!');
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  };

  const idsTodayDishes = Object.values(todayDishes).map((d) => d.id);

  const listDishes = dishes.filter(
    (dish) => idsTodayDishes.indexOf(dish.id) < 0,
  );

  return (
    <>
      <MenuOwner />
      <div>
        <h3>Dishes list</h3>
        {listDishes.length > 0 ? (
          <div className="DishesList">
            {listDishes.map((dish) => (
              <div key={dish.id}>
                <div>{dish.dishName}</div>
                <button type="button" onClick={() => addToTodayMenu(dish)}>
                  Add
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div>There aren&apos;t dishes yet.</div>
        )}

        <div className="NewDish">
          <button type="button" onClick={() => props.history.push('/new-dish')}>
            New Dish
          </button>
        </div>
      </div>
    </>
  );
};

export default DishesList;

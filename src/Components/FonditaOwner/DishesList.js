/* eslint-disable no-console */
import React, { useContext } from 'react';
import styled from 'styled-components';
import { firestore } from '../../firebase';

import { TodayMenuContext } from '../../providers/TodayMenuProvider';
import { DishesListContext } from '../../providers/DishesListProvider';
import MenuOwner from './MenuOwner';
import { colors } from '../../colors';
import { MessageEmptyDishes } from '../../styled-components';

const DishesListContainer = styled.div`
  margin-top: 46px;
  margin-bottom: 32px;
  h4 {
    color: ${colors.grayStrong};
    text-align: center;
  }
`;

const Dishes = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  align-items: center;
`;

const Dish = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-around;
  margin-top: 16px;
  .DishName {
    width: 60%;
    display: flex;
    align-items: center;
    text-align: center;
  }
`;

const NewDishButton = styled.button`
  background: ${colors.yellow};
  width: 100px;
  height: 50px;
  color: ${colors.grayDark};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border-radius: 5px;
  :focus {
    outline: none;
  }
`;

const NewDishContainer = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddDishButton = styled.button`
  background: ${colors.yellow};
  width: 80px;
  height: 40px;
  color: ${colors.grayDark};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border-radius: 5px;
  :focus {
    outline: none;
  }
`;

const DishesList = (props) => {
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
      <DishesListContainer>
        <h4>Dishes list</h4>
        {listDishes.length > 0 ? (
          <Dishes className="DishesList">
            {listDishes.map((dish) => (
              <Dish key={dish.id}>
                <div className="DishName">{dish.dishName}</div>
                <AddDishButton
                  type="button"
                  onClick={() => addToTodayMenu(dish)}>
                  Add
                </AddDishButton>
              </Dish>
            ))}
          </Dishes>
        ) : (
          <MessageEmptyDishes>
            <h5>There aren&apos;t dishes yet.</h5>
          </MessageEmptyDishes>
        )}

        <NewDishContainer>
          <NewDishButton
            type="button"
            onClick={() => props.history.push('/new-dish')}>
            New Dish
          </NewDishButton>
        </NewDishContainer>
      </DishesListContainer>
    </>
  );
};

export default DishesList;

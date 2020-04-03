import React, { useContext } from 'react';
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
  @media (min-width: 768px) {
    width: 55%;
  }
  @media (min-width: 1200px) {
    width: 500px;
  }
  .DishName {
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

const AddDishContainer = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddDishButton = styled.button`
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

const TodayMenuOwner = (props) => {
  const dishes = useContext(TodayMenuContext);

  const deleteDish = (id) => {
    firestore
      .collection('todaymenu')
      .doc(id)
      .delete()
      .catch((error) => console.error('Error removing document: ', error));
  };

  const addDish = () => {
    props.history.push('/dishes-list');
  };

  return (
    <>
      <MenuOwner />
      <TodayMenuContainer>
        <h4>Today&apos;s menu</h4>
        {dishes.length > 0 ? (
          <Dishes>
            {dishes.map((dish) => (
              <Dish key={dish.id}>
                <div className="DishName">{dish.dishName}</div>
                <DeleteButton type="button" onClick={() => deleteDish(dish.id)}>
                  Delete
                </DeleteButton>
              </Dish>
            ))}
          </Dishes>
        ) : (
          <MessageEmptyDishes>
            <h5>There aren&apos;t dishes uploaded today</h5>
          </MessageEmptyDishes>
        )}

        <AddDishContainer>
          <AddDishButton type="button" onClick={addDish}>
            Add dish
          </AddDishButton>
        </AddDishContainer>
      </TodayMenuContainer>
    </>
  );
};

export default TodayMenuOwner;

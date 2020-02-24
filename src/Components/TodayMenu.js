import React, { useContext } from 'react';
import { TodayMenuContext } from '../providers/TodayMenuProvider';
import { firestore } from '../firebase';

const TodayMenu = (props) => {
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
    <div>
      <h3>Today&apos;s menu</h3>
      {dishes.length > 0 ? (
        <div>
          {dishes.map((dish) => (
            <div key={dish.id}>
              <div>{dish.dishName}</div>
              <button type="button" onClick={() => deleteDish(dish.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div>There aren&apos;t dishes uploaded today</div>
      )}

      <div>
        <button type="button" onClick={addDish}>
          Add dish
        </button>
      </div>
    </div>
  );
};

export default TodayMenu;

import React, { createContext, useState, useEffect } from 'react';
import { firestore } from '../firebase';
import collectIdsAndDocs from '../utilities';

export const DishesListContext = createContext();

const DishesListProvider = (props) => {
  const [dishesList, setDishesList] = useState([]);
  const { children } = props;
  useEffect(() => {
    const unsubscribeFromFirestore = firestore
      .collection('dishes')
      .onSnapshot((snapshot) => {
        const dishes = snapshot.docs.map(collectIdsAndDocs);
        setDishesList(dishes);
      });
    return function cleanup() {
      unsubscribeFromFirestore();
    };
  }, []);
  return (
    <DishesListContext.Provider value={dishesList}>
      {children}
    </DishesListContext.Provider>
  );
};

export default DishesListProvider;

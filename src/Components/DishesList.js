/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';

import collectIdsAndDocs from '../utilities';

import { firestore } from '../firebase';

const DishesList = () => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    //  the callback will be called every time de db changes
    const unsubscribeFromFirestore = firestore
      .collection('dishes')
      .onSnapshot((snapshot) => {
        const dishesList = snapshot.docs.map(collectIdsAndDocs);
        setDishes(dishesList);
      });
    return function cleanup() {
      unsubscribeFromFirestore();
    };
  }, []);

  console.log(dishes);

  return (
    <div className="DishesList">
      <div>DishesList</div>
    </div>
  );
};

export default DishesList;

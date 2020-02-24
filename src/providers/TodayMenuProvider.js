import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { firestore } from '../firebase';
import collectIdsAndDocs from '../utilities';

export const TodayMenuContext = createContext();

const TodayMenuProvider = (props) => {
  const [todayMenu, setTodayMenu] = useState([]);
  const { children } = props;
  useEffect(() => {
    const unsubscribeFromFirestore = firestore
      .collection('todaymenu')
      .onSnapshot((snapshot) => {
        const dishes = snapshot.docs.map(collectIdsAndDocs);
        setTodayMenu(dishes);
      });
    return function cleanup() {
      unsubscribeFromFirestore();
    };
  }, []);
  return (
    <TodayMenuContext.Provider value={todayMenu}>
      {children}
    </TodayMenuContext.Provider>
  );
};

TodayMenuProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TodayMenuProvider;

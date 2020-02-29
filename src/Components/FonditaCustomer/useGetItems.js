import { useEffect, useState } from 'react';
import collectIdsAndDocs from '../../utilities';
import { firestore } from '../../firebase';

const useGetItems = () => {
  const [items, setItems] = useState();

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

        setItems(dishes);
      });
    return function cleanup() {
      unsubscribeFromFirestore();
    };
  }, []);

  return [items];
};

export default useGetItems;

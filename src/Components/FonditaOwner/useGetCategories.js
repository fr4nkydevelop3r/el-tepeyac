import { useEffect, useState } from 'react';
import collectIdsAndDocs from '../../utilities';
import { firestore } from '../../firebase';

const useGetCategories = () => {
  const [items, setItems] = useState();

  useEffect(() => {
    const unsubscribeFromFirestore = firestore
      .collection('categories')
      .onSnapshot((snapshot) => {
        let categories = snapshot.docs.map(collectIdsAndDocs);
        categories = categories.map((category) => ({
          categoryID: category.id,
          categoryName: category.categoryName,
          categoryDescription: category.categoryDescription,
          categoryShowInMenuRank: category.showInMenuRank,
          categoryPhoto: category.categoryPhoto,
        }));
        setItems(categories);
      });
    return function cleanup() {
      unsubscribeFromFirestore();
    };
  }, []);

  return [items];
};

export default useGetCategories;

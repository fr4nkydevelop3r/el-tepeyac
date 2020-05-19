import { useEffect, useState } from 'react';
import collectIdsAndDocs from '../../utilities';
import { firestore } from '../../firebase';

const useGetItems = () => {
  const [items, setItems] = useState();

  useEffect(() => {
    const unsubscribeFromFirestore = firestore
      .collection('todaymenu')
      .onSnapshot((snapshot) => {
        let products = snapshot.docs.map(collectIdsAndDocs);
        products = products.map((product) => ({
          productID: product.id,
          productName: product.productName,
          productPrice: product.productPrice,
          totalOrdered: 0,
          productDescription: product.productDescription,
          productPhoto: product.productPhoto,
          productCategory: product.productCategory,
        }));

        setItems(products);
      });
    return function cleanup() {
      unsubscribeFromFirestore();
    };
  }, []);

  return [items];
};

export default useGetItems;

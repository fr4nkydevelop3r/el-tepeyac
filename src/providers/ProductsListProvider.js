import React, { createContext, useState, useEffect } from 'react';
import { firestore } from '../firebase';
import collectIdsAndDocs from '../utilities';

export const ProductsListContext = createContext();

const ProductsListProvider = (props) => {
  const [productsList, setProductsList] = useState([]);
  const { children } = props;
  useEffect(() => {
    const unsubscribeFromFirestore = firestore
      .collection('products')
      .onSnapshot((snapshot) => {
        const products = snapshot.docs.map(collectIdsAndDocs);
        setProductsList(products);
      });
    return function cleanup() {
      unsubscribeFromFirestore();
    };
  }, []);
  return (
    <ProductsListContext.Provider value={productsList}>
      {children}
    </ProductsListContext.Provider>
  );
};

export default ProductsListProvider;

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

const useTotalOrder = () => {
  const [total, setTotal] = useState(0);
  const products = useSelector((state) => state.products);

  useEffect(() => {
    let productsList = [];
    let totalOrder = 0;

    if (!isEmpty(products)) {
      productsList = Object.values(products);
      totalOrder = productsList
        .filter((product) => product.totalOrdered >= 1)
        .reduce(
          (acummulator, currentValue) =>
            // eslint-disable-next-line implicit-arrow-linebreak
            acummulator + currentValue.totalOrdered * currentValue.productPrice,
          0,
        );
      setTotal(totalOrder);
    }
  }, [products]);

  return [total];
};

export default useTotalOrder;

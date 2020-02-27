import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

const useTotalOrder = () => {
  const [total, setTotal] = useState(0);
  const dishes = useSelector((state) => state.products);

  useEffect(() => {
    let dishesList = [];
    let totalOrder = 0;

    if (!isEmpty(dishes)) {
      dishesList = Object.values(dishes);
      totalOrder = dishesList
        .filter((dish) => dish.totalOrdered >= 1)
        .reduce(
          (acummulator, currentValue) =>
            // eslint-disable-next-line implicit-arrow-linebreak
            acummulator + currentValue.totalOrdered * currentValue.dishPrice,
          0,
        );
      setTotal(totalOrder);
    }
  }, [dishes]);

  return [total];
};

export default useTotalOrder;

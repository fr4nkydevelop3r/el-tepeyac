import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

const useTotalItems = () => {
  const [total, setTotal] = useState(0);
  const dishes = useSelector((state) => state.products);

  useEffect(() => {
    let dishesList = [];
    let totalItems = 0;

    if (!isEmpty(dishes)) {
      dishesList = Object.values(dishes);
      totalItems = dishesList
        .filter((dish) => dish.totalOrdered >= 1)
        .reduce(
          (acummulator, currentValue) =>
            // eslint-disable-next-line implicit-arrow-linebreak
            acummulator + currentValue.totalOrdered,
          0,
        );
      setTotal(totalItems);
    }
  }, [dishes]);

  return [total];
};

export default useTotalItems;

import React from 'react';
import { useSelector } from 'react-redux';

const ViewOrder = (props) => {
  const dishesOrdered = Object.values(
    useSelector((state) => state.products),
  ).filter((dish) => dish.totalOrdered >= 1);

  console.log(dishesOrdered);
  return (
    <div className="ViewOrder">
      <button type="button" onClick={() => props.history.goBack()}>
        Atras
      </button>
      {dishesOrdered.length > 0 ? (
        <div>
          <div className="DishesOrdered">
            {dishesOrdered.map((dish) => (
              <div className="dish" key={dish.dishID}>
                <div>{dish.dishName}</div>
                <div>{dish.totalOrdered}</div>
                <div>{dish.dishPrice * dish.totalOrdered}</div>
              </div>
            ))}
          </div>
          <div className="PlaceOrder">
            <button type="button">Place Order</button>
          </div>
        </div>
      ) : (
        <div>You haven&apos;t selected any dish yet!</div>
      )}
    </div>
  );
};

export default ViewOrder;

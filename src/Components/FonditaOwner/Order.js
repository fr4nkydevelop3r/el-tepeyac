/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';

const Order = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const { order } = props;

  let totalDishes = Object.values(order.dishes);
  totalDishes = totalDishes.reduce(
    (accum, current) => accum + current.totalOrdered,
    0,
  );

  const address = order.infoCustomer.customerAddress.slice(
    order.infoCustomer.customerAddress,
    order.infoCustomer.customerAddress.indexOf(','),
  );

  const dishes = Object.values(order.dishes);

  const handleChange = (event) => setOrderCompleted(event.target.value);

  let deliverPriority = '';

  switch (order.deliverPriority) {
    case 1:
      deliverPriority = '9 - 10 am';
      break;
    case 2:
      deliverPriority = '10 - 11 am';
      break;
    case 3:
      deliverPriority = '11 - 12 am';
      break;

    case 4:
      deliverPriority = '12 - 1 pm';

      break;

    case 5:
      deliverPriority = '1 - 2 pm';
      break;

    case 6:
      deliverPriority = '2 - 3 pm';
      break;
    default:
      deliverPriority = '3 - 4 pm';
      break;
  }

  return (
    <div className="Order">
      <div>
        <Button
          color="primary"
          onClick={toggle}
          style={{
            marginBottom: '1rem',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-around',
          }}>
          <span>{order.infoCustomer.customerName} </span>
          <span>{address}</span>
          <span>{order.infoCustomer.customerofficeOrApt}</span>
          <span>{order.infoCustomer.customerPhoneNumber}</span>

          <span>Total Dishes : {totalDishes}</span>

          <span>Time: {order.timeOrder}</span>

          <span>Priority : {deliverPriority}</span>
        </Button>
        <Collapse isOpen={isOpen}>
          <Card>
            <CardBody>
              {dishes.map((dish) => (
                <div key={dish.dishID}>
                  {' '}
                  {dish.totalOrdered} {dish.dishName}
                </div>
              ))}
              <span>Order complete?</span>
              <select value={orderCompleted} onChange={handleChange}>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </CardBody>
          </Card>
        </Collapse>
      </div>
    </div>
  );
};

export default Order;

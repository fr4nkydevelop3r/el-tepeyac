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

          <span>Total Order: ${order.totalOrder}</span>

          <span>Time : {order.timeOrder}</span>
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

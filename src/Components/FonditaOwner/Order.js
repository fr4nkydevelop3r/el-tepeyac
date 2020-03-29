/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import styled from 'styled-components';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import { useDispatch } from 'react-redux';

import { handleUpdateOrder } from '../../actions/orders';
import { colors } from '../../colors';

const OrderContainer = styled.div`
  .Card {
    background: ${colors.grayLight};
    border: none;
  }
  .Order {
    margin-bottom: 1rem;
    width: 100%;
    display: flex;
    justify-content: space-around;
    border: none;
  }
`;

const OrderInfo = styled.div`
  display: flex;
  .DishesInfo {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .CustomerInfo {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const OrderCompleted = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 16px;
  .Select {
    font-size: 12px;
    font-family: sans-serif;
    font-weight: 700;
    color: #444;
    line-height: 1.3;
    padding: 0.6em 1.4em 0.5em 0.8em;
    width: 60px;
    max-width: 100%;
    box-sizing: border-box;
    margin: 0 0 0 8px;
    border: 1px solid #aaa;
    box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
    border-radius: 0.5em;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
      linear-gradient(to bottom, #ffffff 0%, #e5e5e5 100%);
    background-repeat: no-repeat, repeat;
    background-position: right 0.7em top 50%, 0 0;
    background-size: 0.65em auto, 100%;
  }
  .select-css::-ms-expand {
    display: none;
  }
  .select-css:hover {
    border-color: #888;
  }
  .select-css:focus {
    border-color: #aaa;
    box-shadow: 0 0 1px 3px rgba(59, 153, 252, 0.7);
    box-shadow: 0 0 0 3px -moz-mac-focusring;
    color: #222;
    outline: none;
  }
  .select-css option {
    font-weight: normal;
  }
`;

const Order = (props) => {
  const { order } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(order.orderCompleted);
  const dispatch = useDispatch();

  const toggle = () => setIsOpen(!isOpen);

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

  const handleChange = (event) => {
    if (event.target.value === 'True') {
      setOrderCompleted(true);
    } else {
      setOrderCompleted(false);
    }
    dispatch(handleUpdateOrder(order.idOrder));
  };

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
    <OrderContainer ontainer>
      <Button
        className="Order"
        style={{
          backgroundColor: orderCompleted ? '#3CB371' : colors.red,
        }}
        onClick={toggle}>
        <span>{address}</span>

        <span>Total Dishes : {totalDishes}</span>
        <span>Priority : {deliverPriority}</span>
      </Button>
      <Collapse isOpen={isOpen}>
        <Card className="Card">
          <CardBody className="CardBody">
            <OrderInfo>
              <div className="DishesInfo">
                {dishes.map((dish) => (
                  <div key={dish.dishID}>
                    {' '}
                    {dish.totalOrdered} {dish.dishName}
                  </div>
                ))}
              </div>
              <div className="CustomerInfo">
                <div>{order.infoCustomer.customerName} </div>
                <div>{address}</div>
                <div>{order.infoCustomer.customerofficeOrApt}</div>
                <div>{order.infoCustomer.customerPhoneNumber}</div>
              </div>
            </OrderInfo>
            <OrderCompleted>
              <span>Time: {order.timeOrder}</span>
              <div>
                <span>Order complete?</span>
                <select
                  value={orderCompleted ? 'True' : 'False'}
                  onChange={handleChange}
                  className="Select">
                  <option>True</option>
                  <option>False</option>
                </select>
              </div>
            </OrderCompleted>
          </CardBody>
        </Card>
      </Collapse>
    </OrderContainer>
  );
};

export default Order;

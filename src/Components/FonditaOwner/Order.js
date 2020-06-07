/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import styled from 'styled-components';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import { useDispatch } from 'react-redux';

import { handleUpdateOrder } from '../../actions/orders';
import { colors } from '../../colors';
import { Select } from '../../styled-components';
import Modal from './Modal';

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
    .Customer {
      min-width: 200px;
    }
    .Address {
      min-width: 200px;
    }
  }
`;

const OrderInfo = styled.div`
  display: flex;
  @media (min-width: 768px) {
    width: 70%;
    margin: 0 auto;
  }

  @media (min-width: 992px) {
  }
  @media (min-width: 1200px) {
  }
  .ProductsInfo {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 8px;
  }
  .CustomerInfo {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 8px;
    @media (min-width: 768px) {
      align-items: center;
    }
  }
`;

const OrderCompleted = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 16px;
  align-items: center;
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
    :focus {
      outline: none;
    }
  }
`;

const PrintButton = styled.button`
  padding: 0.5rem;
  background: #28a745;
  color: #fff;
  border-radius: 10px;
`;

const Order = ({ order }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(order.orderCompleted);
  const dispatch = useDispatch();
  let address = '';

  const products = Object.values(order.products);

  let categories = Object.values(order.products).map(
    (product) => product.productCategory,
  );

  categories = [...new Set(categories)];

  const toggle = () => setIsOpen(!isOpen);

  /*let totalProducts = Object.values(order.products);
  totalProducts = totalProducts.reduce(
    (accum, current) => accum + current.totalOrdered,
    0,
  ); */

  if (order.infoCustomer.customerAddress) {
    address = order.infoCustomer.customerAddress.slice(
      order.infoCustomer.customerAddress,
      order.infoCustomer.customerAddress.indexOf(','),
    );
  }

  const handleChange = (event) => {
    if (event.target.value === 'True') {
      setOrderCompleted(true);
    } else {
      setOrderCompleted(false);
    }
    dispatch(handleUpdateOrder(order.idOrder));
  };

  console.log(order);

  return (
    <>
      <OrderContainer ontainer>
        <Button
          className="Order"
          style={{
            backgroundColor: orderCompleted ? '#3CB371' : colors.red,
          }}
          onClick={toggle}>
          <span className="Customer">{order.infoCustomer.customerName} </span>

          <span className="Address">
            {address
              ? `${address} - ${order.infoCustomer.customerApt}`
              : 'Pickup'}
          </span>
        </Button>
        <Collapse isOpen={isOpen}>
          <Card className="Card">
            <CardBody className="CardBody">
              <OrderInfo>
                <div className="ProductsInfo">
                  {/*products.map((product) => (
                  <div key={product.productID}>
                    {' '}
                    {product.totalOrdered} {product.productName}
                  </div>
                ))*/}
                  {/*<OrderCompleted>
                  <div>
                    <span>Order complete?</span>
                    <Select
                      value={orderCompleted ? 'True' : 'False'}
                      onChange={handleChange}
                      className="Select">
                      <option>True</option>
                      <option>False</option>
                    </Select>
                  </div>
                </OrderCompleted> */}
                  {categories.map((category) => {
                    return (
                      <div key={category}>
                        <div key={category}>{category}</div>
                        {products
                          .filter(
                            (product) => product.productCategory === category,
                          )
                          .map((product) => (
                            <div key={product.productID}>
                              {product.totalOrdered} - {product.productName}
                            </div>
                          ))}
                      </div>
                    );
                  })}
                </div>
                <div className="CustomerInfo">
                  <div>{order.infoCustomer.customerName} </div>
                  <div>{address && address}</div>
                  <div> {address && order.infoCustomer.customerApt}</div>
                  <div>{order.infoCustomer.customerPhoneNumber}</div>
                  <span>Time: {order.timeOrder}</span>
                </div>
              </OrderInfo>
              <OrderCompleted>
                <div>
                  <span>Order complete?</span>
                  <Select
                    value={orderCompleted ? 'True' : 'False'}
                    onChange={handleChange}
                    className="Select">
                    <option>True</option>
                    <option>False</option>
                  </Select>
                </div>
                <div>
                  <Modal order={order} products={products} />
                </div>
              </OrderCompleted>
            </CardBody>
          </Card>
        </Collapse>
      </OrderContainer>
    </>
  );
};

export default Order;

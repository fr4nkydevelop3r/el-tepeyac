/* eslint-disable object-curly-newline */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { keyBy, isEmpty } from 'lodash';

import { useForm, Controller } from 'react-hook-form';
import NumberFormat from 'react-number-format';

import { getHour, getDeliverPriority } from '../../utilities';
import { handleCreateOrder } from '../../actions/orders';
import useTotalOrder from './useTotalOrder';
import DeliverPriority from './DeliverPriority';

const UserInfo = (props) => {
  const { register, handleSubmit, errors, control } = useForm();
  let products = useSelector((state) => state.products);
  const address = useSelector((state) => state.customerAddress);
  const [totalOrder] = useTotalOrder();
  let dishesOrdered = [];
  const dispatch = useDispatch();
  const [errorMessageHour, setErrorMessageHour] = useState('');

  const [deliverPriority, setDeliverPriority] = useState(getDeliverPriority());

  const onSubmit = (data) => {
    if (!isEmpty(products)) {
      products = Object.values(products);
      dishesOrdered = Object.values(products)
        .filter((dish) => dish.totalOrdered >= 1)
        .map((dish) => {
          const newDish = {
            dishID: dish.dishID,
            dishName: dish.dishName,
            totalOrdered: dish.totalOrdered,
          };
          return newDish;
        });

      dishesOrdered = keyBy(dishesOrdered, 'dishID');
      const infoCustomer = {
        customerName: data.name,
        customerAddress: data.address,
        customerofficeOrApt: data.officeOrApt,
        customerPhoneNumber: data.phone,
      };

      const order = {
        orderCompleted: false,
        timeOrder: getHour(),
        dishes: dishesOrdered,
        infoCustomer,
        totalOrder,
        deliverPriority,
      };

      if (deliverPriority < getDeliverPriority()) {
        setErrorMessageHour('Please update the hour');
      } else {
        dispatch(handleCreateOrder(order));
      }
    } else {
      console.log('We need all the data');
    }
  };

  const handlePriorityDeliver = (priority) => {
    setDeliverPriority(priority);
    setErrorMessageHour('');
  };

  return (
    <div className="UserInfo">
      <button type="button" onClick={() => props.history.goBack()}>
        Atras
      </button>

      <div className="FormUser">
        {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <input
            name="name"
            placeholder="Your name"
            ref={register({ required: true })}
          />
          {errors.name && <span>Please put your name</span>}

          {/* include validation with required or other standard HTML validation rules */}
          <input
            name="address"
            ref={register({ required: true })}
            placeholder="Your address"
            value={address}
            readOnly
          />

          {errors.address && <span>Your address is required</span>}

          <input
            name="officeOrApt"
            ref={register({ required: true })}
            placeholder="Where you work?"
          />

          {errors.officeOrApt && <span>Where you work is required</span>}

          <Controller
            as={<NumberFormat format="(###) ###-####" mask="_" />}
            name="phone"
            control={control}
            placeholder="(___) ____-____"
            rules={{ required: true }}
          />
          {errors.phone && <span>Your phone number is required</span>}

          <span>What time would you like to get your order?</span>
          <DeliverPriority handlePriorityDeliver={handlePriorityDeliver} />
          <div>{errorMessageHour}</div>

          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default UserInfo;

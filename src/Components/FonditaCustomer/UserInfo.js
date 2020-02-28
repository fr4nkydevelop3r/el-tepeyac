/* eslint-disable object-curly-newline */
import React, { useState } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput, {
  isPossiblePhoneNumber,
} from 'react-phone-number-input/input';
import { useForm } from 'react-hook-form';

const UserInfo = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const [phoneNumber, setPhoneNumber] = useState();
  const [validatePhoneNumber, setValidatePhoneNumber] = useState('');

  // console.log(watch('exampleRequired')); // watch input value by passing the name of it

  const handlePhone = () => {
    if (isPossiblePhoneNumber(phoneNumber)) {
      setValidatePhoneNumber('');
    } else {
      setValidatePhoneNumber('Please put a phone number');
    }
  };

  const onSubmit = (data) => {
    if (isPossiblePhoneNumber(phoneNumber)) {
      console.log(data);
      console.log(phoneNumber);
    } else {
      console.log('We need all the data');
      setValidatePhoneNumber('Please put a phone number');
    }
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
          />
          {/* errors will return when field validation fails  */}
          {errors.address && <span>Your address is required</span>}

          <PhoneInput
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={setPhoneNumber}
            country="US"
            onMouseLeave={handlePhone}
          />
          <div>{validatePhoneNumber}</div>

          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default UserInfo;

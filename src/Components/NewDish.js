/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
import React, { useReducer, useState } from 'react';
import { firestore } from '../firebase';

const initialState = {
  name: '',
  description: '',
  price: 12,
};

function reducer(state, { field, value }) {
  return {
    ...state,
    [field]: value,
  };
}

const NewDish = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [validateName, setValidateName] = useState('');
  const [validateDescription, setValidateDescription] = useState('');
  const { name, description, price } = state;
  const prices = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name) {
      setValidateName('Please insert a name');
    }
    if (!description) {
      setValidateDescription('Please insert a description');
    }

    if (name && description) {
      const dish = {
        dishName: name,
        dishDescription: description,
      };
      firestore
        .collection('dishes')
        .add(dish)
        .then(() => {
          // eslint-disable-next-line react/prop-types
          props.history.push('/dishes-list');
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
        });
    }
  };
  const handleChange = (event) => {
    if (event.target.value.length > 0) {
      dispatch({ field: event.target.name, value: event.target.value });
      if (event.target.name === 'name') {
        setValidateName('');
      } else if (event.target.name === 'description') {
        setValidateDescription('');
      }
    }
    if (event.target.value.length === 0) {
      dispatch({ field: event.target.name, value: event.target.value });
      if (event.target.name === 'name') {
        setValidateName('Please insert a name');
      } else if (event.target.name === 'description') {
        setValidateDescription('Please insert a description');
      }
    }
  };

  return (
    <div className="NewDish">
      <form onSubmit={handleSubmit}>
        <div className="DishName">
          <input
            type="text"
            name="name"
            placeholder="Dish name"
            value={name}
            onChange={handleChange}
          />
        </div>
        {validateName && <div>{validateName}</div>}
        <div className="DishDescription">
          <input
            type="text"
            name="description"
            placeholder="Dish Description"
            value={description}
            onChange={handleChange}
          />
        </div>
        {validateDescription && <div>{validateDescription}</div>}

        <div className="DishPrice">
          <label>
            Select a price for the dish
            <select value={price} onChange={handleChange} name="price">
              {prices.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="UploadDish">
          <button type="submit">Upload Dish</button>
        </div>
      </form>
    </div>
  );
};

export default NewDish;

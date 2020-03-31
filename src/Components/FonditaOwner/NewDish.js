/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useReducer, useState } from 'react';
import styled from 'styled-components';
import { firestore, storage } from '../../firebase';
import MenuOwner from './MenuOwner';
import { colors } from '../../colors';
import { ErrorInput, InputContainer, Select } from '../../styled-components';

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

const NewDishContainer = styled.div`
  margin-top: 46px;
  margin-bottom: 32px;
  h4 {
    color: ${colors.grayStrong};
    text-align: center;
  }
  .NewDishForm {
    margin-top: 46px;
  }
  .Price {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
  }
  .SelectPrice {
    margin: 0;
  }
`;

const UploadDishContainer = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UploadDishButton = styled.button`
  background: ${colors.yellow};
  width: 100px;
  height: 50px;
  color: ${colors.grayDark};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border-radius: 5px;
  :focus {
    outline: none;
  }
`;

const NewDish = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [validateName, setValidateName] = useState('');
  const [validateDescription, setValidateDescription] = useState('');
  const [validateImage, setValidateImage] = useState('');
  const { name, description, price } = state;
  const [photo, setPhoto] = useState('');
  const imageInput = React.createRef();

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

  const handleImage = () => {
    if (imageInput.current.files[0]) {
      setValidateImage('');
      setPhoto(imageInput.current.files[0].name);
    } else {
      setValidateImage('Please select a photo for the dish');
      setPhoto('');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name) {
      setValidateName('Please insert a name');
    }
    if (!description) {
      setValidateDescription('Please insert a description');
    }

    if (!photo) {
      setValidateImage('Please select a photo for the dish');
    }

    if (name && description && photo) {
      let idDocument = '';
      const dish = {
        dishName: name,
        dishDescription: description,
        dishPrice: price,
      };
      firestore
        .collection('dishes')
        .add(dish)
        .then((docRef) => {
          idDocument = docRef.id;
          props.history.push('/dishes-list');
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
        });

      storage
        .ref()
        .child('dishes')
        .child(name)
        .child(photo)
        .put(imageInput.current.files[0])
        .then((response) => response.ref.getDownloadURL())
        .then((photoURL) => {
          firestore
            .collection('dishes')
            .doc(idDocument)
            .update({
              dishPhoto: photoURL,
            })
            .catch((error) => console.error('Error updating the photo', error));
        })
        .catch((error) => {
          console.error('Error getting the imageURL: ', error);
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
    <>
      <MenuOwner />
      <NewDishContainer>
        <h4>New dish</h4>
        <form className="NewDishForm" onSubmit={handleSubmit}>
          <InputContainer className="DishName">
            <label htmlFor="name">Name</label>

            <input
              type="text"
              name="name"
              placeholder="Dish name"
              value={name}
              onChange={handleChange}
            />
          </InputContainer>
          {validateName && (
            <ErrorInput>
              <span>{validateName}</span>
            </ErrorInput>
          )}
          <InputContainer>
            <label htmlFor="description">Description</label>

            <input
              type="text"
              name="description"
              placeholder="Dish Description"
              value={description}
              onChange={handleChange}
            />
          </InputContainer>
          {validateDescription && (
            <ErrorInput>
              <span>{validateDescription}</span>
            </ErrorInput>
          )}

          <InputContainer>
            <label className="Price"> Price </label>

            <Select
              value={price}
              onChange={handleChange}
              name="price"
              className="SelectPrice">
              {prices.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </Select>
          </InputContainer>
          <InputContainer>
            <label htmlFor="dishPhoto">Dish photo</label>
            <input type="file" ref={imageInput} onChange={handleImage} />
          </InputContainer>
          {validateImage && (
            <ErrorInput>
              <span>{validateImage}</span>
            </ErrorInput>
          )}

          <UploadDishContainer>
            <UploadDishButton type="submit">Upload Dish</UploadDishButton>
          </UploadDishContainer>
        </form>
      </NewDishContainer>
    </>
  );
};

export default NewDish;

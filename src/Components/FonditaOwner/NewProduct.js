/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable no-console */
/* eslint-disable operator-linebreak */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useReducer, useState } from 'react';
import styled from 'styled-components';
import { firestore, storage } from '../../firebase';
import MenuOwner from './MenuOwner';
import { colors } from '../../colors';
import { ErrorInput, InputContainer, Select } from '../../styled-components';
import useGetCategories from './useGetCategories';

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

const NewProductContainer = styled.div`
  margin-top: 46px;
  margin-bottom: 32px;
  @media (min-width: 768px) {
    margin-top: 86px;
  }
  h4 {
    color: ${colors.grayStrong};
    text-align: center;
  }
  .NewProductForm {
    margin-top: 46px;

    border-radius: 5px;
    @media (min-width: 768px) {
      width: 70%;
      margin: 0 auto;
      margin-top: 56px;
      padding: 32px;
    }
    @media (min-width: 1200px) {
      width: 700px;
      box-shadow: 0 0 0 1px #dc35351c, 0 1px 5px 0 rgba(163, 41, 41, 0.08);
      border: 1px solid rgba(67, 41, 163, 0.2);
    }
  }
  .InputCheckout {
    label {
      @media (min-width: 768px) {
        text-align: left;
        font-size: 24px;
      }
      @media (min-width: 992px) {
        font-size: 32px;
      }
      @media (min-width: 1200px) {
        font-size: 18px;
      }
    }
    input {
      @media (min-width: 768px) {
        font-size: 24px;
        height: 40px;
      }
      @media (min-width: 992px) {
        font-size: 32px;
        height: 50px;
      }
      @media (min-width: 1200px) {
        font-size: 18px;
        height: 30px;
      }
    }
  }

  .DishPhoto {
    @media (min-width: 768px) {
      .File {
        font-size: 20px;
      }
    }
    @media (min-width: 992px) {
      .File {
        font-size: 24px;
      }
    }
    @media (min-width: 1200px) {
      .File {
        font-size: 16px;
      }
    }
  }

  .SelectPrice {
    margin: 0;
    @media (min-width: 768px) {
      font-size: 18px;
      width: 100px;
    }

    @media (min-width: 1200px) {
      font-size: 14px;
      width: 60px;
      :focus {
        outline: none;
      }
    }
  }
  .SelectCategory {
    margin: 0;
    width: auto;
  }
`;

const InputFileContainer = styled.div`
  display: flex;
  margin-top: 16px;
  label {
    width: 30%;
    text-align: center;
  }

  .InputAndError {
    width: 70%;
    padding-right: 30px;
    @media (min-width: 768px) {
      padding-right: 0;
    }
    .Custom-file-input::before {
      content: 'Select Photo';
      display: inline-block;
      background: linear-gradient(top, #f9f9f9, #e3e3e3);
      border: 1px solid ${colors.grayStrong};
      border-radius: 3px;
      padding: 5px 8px;
      outline: none;
      white-space: nowrap;
      -webkit-user-select: none;
      cursor: pointer;
      text-shadow: 1px 1px #fff;
      font-weight: 700;
      font-size: 14px;
      :focus {
        outline: none;
      }
      @media (min-width: 768px) {
        font-size: 18px;
      }
      @media (min-width: 992px) {
        font-size: 24px;
        padding: 2px;
      }
      @media (min-width: 1200px) {
        font-size: 16px;
      }
    }
    .Custom-file-input::-webkit-file-upload-button {
      visibility: hidden;
    }
    .Custom-file-input:hover::before {
      border-color: ${colors.grayStrong};
    }
    .Custom-file-input:active::before {
      background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
    }
  }
`;

const UploadProductContainer = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UploadProductButton = styled.button`
  background: ${colors.yellow};
  width: 120px;
  height: 50px;
  color: ${colors.grayDark};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border: none;
  border-radius: 5px;
  :focus {
    outline: none;
  }
  @media (min-width: 768px) {
    font-size: 18px;
    width: 120px;
    height: 60px;
  }

  @media (min-width: 992px) {
    font-size: 20px;
    width: 140px;
    height: 80px;
  }

  @media (min-width: 1200px) {
    font-size: 16px;
    width: 100px;
    height: 60px;
  }
`;

const NewProduct = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [validateName, setValidateName] = useState('');
  const [validateImage, setValidateImage] = useState('');
  const { name, description, price } = state;
  const [photo, setPhoto] = useState('');
  const imageInput = React.createRef();
  const [category, setCategory] = useState('Tacos');

  const categories = useGetCategories();

  const prices = [
    1,
    1.5,
    2,
    2.5,
    3,
    3.5,
    4,
    4.5,
    5,
    5.5,
    6,
    6.5,
    7,
    7.5,
    8,
    8.5,
    9,
    9.5,
    10,
    10.5,
    11,
    11.5,
    12,
    12.5,
    13,
    13.5,
    14,
    14.5,
    15,
    15.5,
    16,
    16.5,
    17,
    17.5,
    18,
    18.5,
    19,
    19.5,
    20,
    20.5,
    21,
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

    if (!photo) {
      setValidateImage('Please select a photo for the product');
    }

    if (name && photo && category) {
      let idDocument = '';
      const categoryID = categories[0].filter(
        (catSelected) => catSelected.categoryName === category,
      );

      const dish = {
        productName: name,
        productDescription: description,
        productPrice: +parseFloat(price).toFixed(2),
        // eslint-disable-next-line dot-notation
        productCategory: categoryID[0]['categoryID'],
      };
      firestore
        .collection('products')
        .add(dish)
        .then((docRef) => {
          idDocument = docRef.id;
          props.history.push('/products-list');
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
        });

      storage
        .ref()
        .child('products')
        .child(name)
        .child(photo)
        .put(imageInput.current.files[0])
        .then((response) => response.ref.getDownloadURL())
        .then((photoURL) => {
          firestore
            .collection('products')
            .doc(idDocument)
            .update({
              productPhoto: photoURL,
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
      }
    }
    if (event.target.value.length === 0) {
      dispatch({ field: event.target.name, value: event.target.value });
      if (event.target.name === 'name') {
        setValidateName('Please insert a name');
      }
    }
  };

  const handleCategories = (event) => {
    setCategory(event.target.value);
  };

  return (
    <>
      <MenuOwner />
      <NewProductContainer>
        <h4>New product</h4>
        <form className="NewProductForm" onSubmit={handleSubmit}>
          <InputContainer className="InputCheckout">
            <label htmlFor="name">Name</label>
            <div className="InputAndError">
              <input
                type="text"
                name="name"
                placeholder="Product name"
                value={name}
                onChange={handleChange}
              />
              {validateName && (
                <ErrorInput>
                  <span>{validateName}</span>
                </ErrorInput>
              )}
            </div>
          </InputContainer>
          <InputContainer className="InputCheckout">
            <label htmlFor="description">Description</label>
            <div className="InputAndError">
              <input
                type="text"
                name="description"
                placeholder="Product description"
                value={description}
                onChange={handleChange}
              />
            </div>
          </InputContainer>
          <InputFileContainer className="InputCheckout">
            <label htmlFor="dishPhoto">Product photo</label>
            <div className="InputAndError">
              <input
                type="file"
                ref={imageInput}
                onChange={handleImage}
                className="Custom-file-input"
              />
              {validateImage && (
                <ErrorInput>
                  <span>{validateImage}</span>
                </ErrorInput>
              )}
            </div>
          </InputFileContainer>
          <InputContainer className="InputCheckout">
            <label className="Price"> Price </label>
            <div className="InputAndError">
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
            </div>
          </InputContainer>
          <InputContainer className="InputCheckout">
            <label className="Price"> Category</label>
            <div className="InputAndError">
              <Select
                className="SelectCategory"
                value={category}
                // eslint-disable-next-line react/jsx-closing-bracket-location
                onChange={handleCategories}>
                {categories[0] !== undefined &&
                  categories[0].map((cat) => (
                    <option value={cat.categoryName} key={cat.categoryID}>
                      {cat.categoryName}
                    </option>
                  ))}
              </Select>
            </div>
          </InputContainer>
          )
          <UploadProductContainer>
            <UploadProductButton type="submit">
              Upload Product
            </UploadProductButton>
          </UploadProductContainer>
        </form>
      </NewProductContainer>
    </>
  );
};

export default NewProduct;

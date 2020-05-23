/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
import React, { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import usePlacesAutocomplete, { getGeocode } from 'use-places-autocomplete';
import styled from 'styled-components';
import setDirection from '../../actions/customer';
import { firestore } from '../../firebase';
import { colors } from '../../colors';
import { ErrorValidationContainer } from '../../styled-components';

const AutocompleteContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  border: black;
  background-color: ${colors.grayLight};
`;

const InputAutocomplete = styled.input`
  width: 350px;
  height: 30px;
  border: none;
  border-bottom: 2px solid #e32351;
  color: ${colors.red};
  text-align: center;
  ::placeholder {
    color: ${colors.grayMedium};
    text-align: center;
  }
  :focus {
    outline: none;
  }

  @media (min-width: 768px) {
    font-size: 36px;
    height: 40px;
    width: 550px;
  }
  @media (min-width: 992px) {
    font-size: 42px;
    height: 50px;
    width: 650px;
  }
  @media (min-width: 1200px) {
    width: 450px;
    font-size: 28px;
    height: 30px;
  }
`;

const SuggestionsList = styled.ul`
  list-style-type: none;
  color: ${colors.grayStrong};
  margin-top: 24px;
  font-size: 20px;
  padding-left: 0;
  @media (min-width: 768px) {
    font-size: 32px;
  }
  @media (min-width: 992px) {
    font-size: 38px;
  }
  @media (min-width: 1200px) {
    font-size: 20px;
  }
`;

const Sorry = styled.div`
  font-size: 16px;
  color: ${colors.red};
  @media (min-width: 768px) {
    font-size: 32px;
  }
  @media (min-width: 992px) {
    font-size: 36px;
  }
  @media (min-width: 1200px) {
    font-size: 22px;
  }
`;

const PlacesAutocomplete = ({ handleInvalidDirection }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });
  const ref = useRef();

  const [postCodeUser, setPostCodeUser] = useState('');
  const [validateDirection, setValidateDirection] = useState('');
  const [validPostCodes, setValidPostCodes] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    firestore
      .collection('upperEastSideAndHarlem')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const { postCodes } = doc.data();
          setValidPostCodes(postCodes);
        });
      });
  }, []);

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
    setValidateDirection('');
    setPostCodeUser('');
  };

  const handleSelect = ({ description }) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter as "false"
    setValue(description, false);
    clearSuggestions();

    // Get latitude and longitude via utility functions
    getGeocode({ address: description })
      .then((results) => {
        const addressComponents = results[0].address_components;
        const zipCode = addressComponents
          .filter((item) => item.types.includes('postal_code'))
          .map((item) => item.long_name);
        setPostCodeUser(...zipCode);
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
  };

  const renderSuggestions = () =>
    // eslint-disable-next-line implicit-arrow-linebreak
    data.map((suggestion) => {
      const {
        id,
        structured_formatting: {
          main_text: mainText,
          secondary_text: secondaryText,
        },
      } = suggestion;

      return (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <li key={id} onClick={handleSelect(suggestion)}>
          <strong>{mainText}</strong>
          <small> {secondaryText}</small>
        </li>
      );
    });
  const checkDirection = () => {
    if (status !== 'OK') {
      setValidateDirection('Please put a valid address');
    } else {
      setValidateDirection('');
    }
  };

  if (postCodeUser) {
    if (!validPostCodes.includes(postCodeUser)) {
      dispatch(setDirection('wRONG'));
      setPostCodeUser(null);
    }
  }
  return (
    <AutocompleteContainer ref={ref}>
      <InputAutocomplete
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Delivery address"
        onBlur={checkDirection}
        onFocus={handleInput}
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === 'OK' && (
        <SuggestionsList>{renderSuggestions()}</SuggestionsList>
      )}
      {validateDirection && (
        <ErrorValidationContainer>{validateDirection}</ErrorValidationContainer>
      )}
      {postCodeUser ? (
        validPostCodes.includes(postCodeUser) ? (
          <></>
        ) : (
          <Sorry>
            <span role="img" aria-label="sad">
              Sorry 😔
            </span>
            <span> We don&apos;t deliver there yet </span>
          </Sorry>
        )
      ) : null}
    </AutocompleteContainer>
  );
};

export default PlacesAutocomplete;

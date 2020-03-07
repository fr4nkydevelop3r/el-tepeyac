/* eslint-disable no-nested-ternary */
import React, { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import usePlacesAutocomplete, { getGeocode } from 'use-places-autocomplete';
import setDirection from '../../actions/customer';
import { firestore } from '../../firebase';

const PlacesAutocomplete = (props) => {
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
      .collection('upperEastSide')
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
    data.map((suggestion) => {
      const {
        id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
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

  const goodToGo = () => {
    dispatch(setDirection(value));
    props.history.push('/today-menu');
  };

  return (
    <div ref={ref}>
      <input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Where are you going?"
        onBlur={checkDirection}
        onFocus={handleInput}
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === 'OK' && <ul>{renderSuggestions()}</ul>}
      {validateDirection && <div>{validateDirection}</div>}
      {postCodeUser ? (
        validPostCodes.includes(postCodeUser) ? (
          <div>
            <button type="button" onClick={goodToGo}>
              Good to go
            </button>
          </div>
        ) : (
          <div>Sorryyyyyyy</div>
        )
      ) : null}
    </div>
  );
};

export default PlacesAutocomplete;

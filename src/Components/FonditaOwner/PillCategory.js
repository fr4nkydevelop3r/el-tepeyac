import React from 'react';
import styled from 'styled-components';
import { colors } from '../../colors';

const ButtonPill = styled.button`
  display: inline-block;
  padding: 0.25em 0.6em;
  font-size: 16px;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 10rem;
  background-color: ${colors.green};
  color: #fff;
  margin-bottom: 0.5rem;
`;

const PillCategory = ({ categoryName, categoryID, handleCategory }) => {
  const handleSelected = (categoryID) => {
    handleCategory(categoryID);
  };
  return (
    <ButtonPill onClick={() => handleSelected(categoryID)}>
      {categoryName}
    </ButtonPill>
  );
};

export default PillCategory;

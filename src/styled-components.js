/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { colors } from './colors';

export const Button = styled.button`
  background: ${colors.red};
  width: 150px;
  heighy: 100px;
  color: ${colors.grayLight};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border-radius: 5px;
`;

export const ErrorValidationContainer = styled.div`
  margin-top: 16px;
  color: ${colors.red};
`;

export const ShoppingCart = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 16px;
  height: 40px;
  background-color: ${colors.grayLight};
  position: sticky;
  top: 0;
  color: ${colors.red};
  i {
    font-size: 20px;
    :focus {
      outline: none;
    }
  }
  span {
    margin-top: -12px;
    margin-left: 4px;
  }
`;

export const BehindButtonContainer = styled.div`
  color: ${colors.red};
  margin-top: 20px;
  padding-left: 20px;
  i {
    font-size: 20px;
    :focus {
      outline: none;
    }
  }
`;

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
  :focus {
    outline: none;
  }
`;

export const ErrorValidationContainer = styled.div`
  margin-top: 16px;
  color: ${colors.red};
`;

export const ErrorInput = styled.div`
  display: flex;
  justify-content: center;
  span {
    color: ${colors.red};
    text-align: center;
  }
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

export const InputContainer = styled.div`
  display: flex;
  margin-top: 16px;
  label {
    width: 30%;
    text-align: center;
  }
  input {
    height: 30px;

    width: 70%;
    box-shadow: 0 0 0 1px #dc35351c, 0 1px 5px 0 rgba(163, 41, 41, 0.08);
    border: 1px solid rgba(67, 41, 163, 0.2);
    border-radius: 5px;
    margin-right: 16px;
    color: ${colors.grayStrong};
    ::placeholder {
      color: ${colors.grayStrong};
      text-align: center;
    }
    :focus {
      outline: none;
    }
  }
  .Phone {
    text-align: center;
    ::placeholder {
      color: ${colors.grayMedium};
      text-align: center;
    }
  }
`;

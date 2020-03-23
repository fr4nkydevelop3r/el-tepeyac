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

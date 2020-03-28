import styled from 'styled-components';
import { colors } from '../../../colors';
const SubmitButton = styled.button`
  display: block;
  height: 40px;
  width: 100%;
  border: 0;
  margin-top: 32px;
  background-color: ${(props) =>
    props.disabled ? colors.grayStrong : colors.red};
  border-radius: 4px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  color: #fff;
  font-weight: 600;
  cursor: pointer;
`;

export default SubmitButton;

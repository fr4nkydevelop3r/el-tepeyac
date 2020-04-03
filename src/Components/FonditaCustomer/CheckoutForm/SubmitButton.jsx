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
  focus: {
    outline: none;
  }
  @media (min-width: 768px) {
    font-size: 20px;
    height: 50px;
  }
  @media (min-width: 992px) {
    font-size: 24px;
    height: 60px;
  }
  @media (min-width: 1200px) {
    width: 150px;
    height: 40px;
    font-size: 18px;
  }
`;

export default SubmitButton;

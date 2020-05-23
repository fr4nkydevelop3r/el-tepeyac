import styled from 'styled-components';
import { colors } from '../../../colors';

const Row = styled.div`
  width: 100%;
  margin: 30px auto;
  box-shadow: 0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 ${colors.grayLight};
  border-radius: 4px;
  background-color: ${colors.green};
  position: relative;
  @media (min-width: 1200px) {
    width: 400px;
  }
`;

export default Row;

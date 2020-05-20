import React, { useState } from 'react';
import styled from 'styled-components';
import { getDeliverPriority } from '../../utilities';
import { Select } from '../../styled-components';

const DeliverPriorityContainer = styled.div`
  margin-left: 8px;
  .SelectDelivery {
    width: 80px;
    font-size: 14px;
    @media (min-width: 768px) {
      font-size: 18px;
      width: 100px;
    }
    @media (min-width: 992px) {
      font-size: 20px;
      width: 120px;
    }
    @media (min-width: 1200px) {
      font-size: 14px;
      width: 80px;
      :focus {
        outline: none;
      }
    }
  }
`;

const DeliverPriority = (props) => {
  const deliverPriority = getDeliverPriority();

  let hoursAvailable = [];
  switch (deliverPriority) {
    case 1:
      hoursAvailable = [9, 10, 11, 12, 13, 14, 15];
      break;
    case 2:
      hoursAvailable = [10, 11, 12, 13, 14, 15];
      break;
    case 3:
      hoursAvailable = [11, 12, 13, 14, 15];
      break;

    case 4:
      hoursAvailable = [12, 13, 14, 15];
      break;

    case 5:
      hoursAvailable = [13, 14, 15];
      break;

    case 6:
      hoursAvailable = [14, 15];
      break;
    default:
      hoursAvailable = [9, 10, 11, 12, 13, 14, 15];
      break;
  }

  const [timeDeliver, setTimeDeliver] = useState(
    `${hoursAvailable[0]} - ${hoursAvailable[1]}`,
  );

  const handleChange = (event) => {
    const hoursRange = event.target.value;

    switch (hoursRange) {
      case '9 - 10':
        props.handlePriorityDeliver(1);
        break;
      case '10 - 11':
        props.handlePriorityDeliver(2);
        break;
      case '11 - 12':
        props.handlePriorityDeliver(3);

        break;
      case '12 - 13':
        props.handlePriorityDeliver(4);
        break;
      case '13 - 14':
        props.handlePriorityDeliver(5);
        break;
      case '14 - 15':
        props.handlePriorityDeliver(6);
        break;
      case '15 - 16':
        props.handlePriorityDeliver(7);
        break;
      default:
        break;
    }
    setTimeDeliver(hoursRange);
  };

  return (
    <DeliverPriorityContainer>
      <Select
        className="SelectDelivery"
        value={timeDeliver}
        onChange={handleChange}
        // eslint-disable-next-line react/jsx-closing-bracket-location
        onClick={() => props.handleResetError()}>
        {hoursAvailable.map((hour) => (
          <option value={`${hour} - ${hour + 1}`} key={hour}>
            {`${hour} - ${hour + 1}`}
          </option>
        ))}
      </Select>
    </DeliverPriorityContainer>
  );
};

export default DeliverPriority;

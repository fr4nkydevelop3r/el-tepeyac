import React, { useState } from 'react';

import { getDeliverPriority } from '../../utilities';

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
    <select
      value={timeDeliver}
      onChange={handleChange}
      onClick={() => props.handleResetError()}>
      {hoursAvailable.map((hour) => (
        <option value={`${hour} - ${hour + 1}`} key={hour}>
          {`${hour} - ${hour + 1}`}
        </option>
      ))}
    </select>
  );
};

export default DeliverPriority;

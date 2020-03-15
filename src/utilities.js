import moment from 'moment';

export default function collectIdsAndDocs(doc) {
  return { id: doc.id, ...doc.data() };
}

export function getDay() {
  return moment().format('MM-DD-YYYY');
}

function minutesWithZeros(dt) {
  return (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes();
}

export function getHour() {
  const today = new Date();
  const time = `${today.getHours()}:${minutesWithZeros(
    today,
  )}:${today.getSeconds()}`;
  return time;
}

export function getDeliverPriority() {
  const today = new Date();
  const actualHour = today.getHours();
  switch (actualHour) {
    case actualHour < 9:
      return 1;
    case 9:
      return 2;
    case 10:
      return 3;
    case 11:
      return 4;
    case 12:
      return 5;
    case 13:
      return 6;
    case 14:
      return 7;
    default:
      return 1;
  }
}

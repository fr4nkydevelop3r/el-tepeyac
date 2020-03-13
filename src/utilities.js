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

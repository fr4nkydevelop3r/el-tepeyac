import moment from 'moment';

export default function collectIdsAndDocs(doc) {
  return { id: doc.id, ...doc.data() };
}

export function getDay() {
  return moment().format('MM-DD-YYYY');
}

export function getHour() {
  const today = new Date();
  const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  return time;
}

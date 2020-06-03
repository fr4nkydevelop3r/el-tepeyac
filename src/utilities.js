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

function randomNumber(min, max) {
  let minimum = Math.ceil(min);
  let maximum = Math.floor(max);
  return (
    Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
  ).toString();
}

export function getHour() {
  const today = new Date();
  const time = `${today.getHours()}:${minutesWithZeros(
    today,
  )}:${today.getSeconds()}`;
  return time;
}

export function getNumOrder(n) {
  const today = new Date();
  const time =
    today.getSeconds().toString() + randomNumber(1, 10) + n.toString();
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

export function getTotalProductsNoTaxes(menu) {
  const totalOrderNoTaxes = Object.values(menu)
    .filter((product) => product.totalOrdered >= 1)
    .reduce(
      (acummulator, currentValue) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        acummulator + currentValue.totalOrdered * currentValue.productPrice,
      0,
    );
  return totalOrderNoTaxes;
}

export function isValidHour() {
  let format = 'hh:mm:ss';

  let time = moment();
  let afterTime = moment('12:00:00', format);
  let beforeTime = moment('23:45:00', format);

  if (time.isBetween(afterTime, beforeTime)) {
    return true;
  }

  return false;
}

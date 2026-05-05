import moment from 'moment';

const date_now = moment();

console.log(
  `${date_now.format('DD-MM-YYYY')} ${date_now.format('MMM Do YY')} ${date_now.format('dddd')}`,
);

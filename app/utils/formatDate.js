import dateformat from 'dateformat';

export default date => {
  const d = new Date(date);
  return dateformat(d, 'dd.mm.yyyy');
};

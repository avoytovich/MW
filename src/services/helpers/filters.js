import moment from 'moment';
// eslint-disable-next-line
const truthyValue = ['features'];

const generateFilterUrl = (filters, availableFilters) => {
  let url = '';

  Object.entries(filters).forEach(([key, val]) => {
    const filterConfig = availableFilters.filter((item) => item.id === key);
    const subFilter = `&${key}=`;

    if (typeof val !== 'object') {
      if (filterConfig[0]?.exactSearch) {
        url += `${subFilter}${val}`;
      } else if (['id', 'productId'].includes(key)) {
        url += `${subFilter}${val}`;
      } else {
        url += `${subFilter}*${val}*`;
      }
    } else if (Array.isArray(val)) {
      if (truthyValue.includes(key)) {
        val.forEach((v) => { url += `&${v}=true`; });
      } else {
        val.forEach((v) => { url += subFilter + v; });
      }
    } else {
      let dateStr;

      if (val.to && val.from) {
        dateStr = `${moment(val.from).valueOf()}<<${moment(val.to).valueOf()}`;
      } else if (val.to) {
        dateStr = `<${moment(val.to).valueOf()}`;
      } else {
        dateStr = `${moment(val.from).valueOf()}<`;
      }

      if (dateStr) {
        url += subFilter + dateStr;
      }
    }
  });

  return url;
};
export default generateFilterUrl;

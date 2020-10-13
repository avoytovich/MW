import moment from 'moment';
// eslint-disable-next-line
export const generateFilterUrl = (filters, search) => {
  let url = '';

  filters.forEach((filter) => {
    let subFilter = `&${Object.keys(filter)[0]}=`;
    const [params] = Object.values(filter);

    switch (params.type) {
      case 'text': {
        if (search) {
          subFilter += params.exact ? search : `*${search}*`;
        } else {
          subFilter = '';
        }

        break;
      }

      case 'select': subFilter += params.values.join(','); break;

      case 'date': {
        switch (params.variant) {
          case 'unlimited':
          default: subFilter = ''; break;

          case 'after': subFilter += `${moment(params.date).valueOf()}<`; break;

          case 'before': subFilter += `<${moment(params.date).valueOf()}`; break;

          case 'between':
            subFilter += `${moment(params.date).valueOf()}<<${moment(params.dateEnd).valueOf()}`;
            break;
        }

        break;
      }

      default: subFilter = '';
    }

    url += subFilter;
  });

  return url;
};

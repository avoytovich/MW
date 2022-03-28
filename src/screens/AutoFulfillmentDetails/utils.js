const generateData = (data) => ({
  id: {
    value: data.id,
    copyValue: data.id,
  },
  customer: {
    value: '-',
  },
  name: {
    value: data.name || '-',
  },
  url: {
    value: data.url || '-',
  },
});
export default generateData;

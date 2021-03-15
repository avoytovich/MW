const formDesignOptions = (options, customers) => (options
  ? options.map((option) => {
    const curCustomer = customers.find(
      (customer) => customer.id === option.customerId,
    );
    return {
      value: `${curCustomer ? curCustomer.name : option.customerId}: ${
        option.name
      }`,
      id: `${curCustomer ? curCustomer.id : option.customerId}: ${
        option.name
      }`,
    };
  })
  : []);

const filterOptions = (all, selected, currentIndex) => {
  const availableCountries = [...selected].filter(
    (item, i) => i !== 0 && i !== currentIndex,
  );
  let keys = [];
  availableCountries.forEach((item) => {
    keys = [...keys, ...item.countries];
  });
  const res = all.filter(
    (option) => !keys.includes(option.id),
  );
  return res;
};
export { formDesignOptions, filterOptions };

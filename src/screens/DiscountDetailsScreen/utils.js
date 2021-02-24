const filterOptions = (all, selected, currentValue) => {
  const keys = [...selected].map((item) => item.key);
  const res = all.filter(
    (option) => !keys.includes(option.id) || option.id === currentValue,
  );
  return res;
};

export { filterOptions };

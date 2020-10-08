import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const SelectSubFilter = ({ filter, config, setConfig }) => {
  const curValues = config[filter.id]?.values || [];
  const [values, setValues] = useState(curValues);

  useEffect(() => {
    const newConfig = { ...config };

    if (!newConfig[filter.id]) {
      const firstValue = filter.values[0].value;

      newConfig[filter.id] = { values: [firstValue], type: 'select', label: filter.label };
      setValues([firstValue]);
      setConfig(newConfig);
    }
  }, []);

  const updateValues = (e) => {
    const newConfig = { ...config };

    newConfig[filter.id].values = e.target.value;
    setValues(e.target.value);
    setConfig(newConfig);
  };

  return (
    <Select
      multiple
      value={values}
      onChange={updateValues}
    >
      {filter.values.map((v) => (
        <MenuItem key={v.value} value={v.value}>
          {v.label}
        </MenuItem>
      ))}
    </Select>
  );
};

SelectSubFilter.propTypes = {
  filter: PropTypes.object,
  config: PropTypes.object,
  setConfig: PropTypes.func,
};

export default SelectSubFilter;

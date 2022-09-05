import React, { useEffect, useState } from 'react';
import {
  Autocomplete, TextField, Chip, Paper,
} from '@mui/material';
import PropTypes from 'prop-types';
import localization from '../../localization';

const AutocompleteWithChips = ({
  selectOptions,
  label,
  onChange,
  arrayValue,
  arrayTypeValue,
  isDisabled,
}) => {
  const [curArrayOfObjects, setCurArrayOfObjects] = useState([]);

  useEffect(() => {
    if (selectOptions.length && arrayTypeValue) {
      setCurArrayOfObjects(arrayValue.map((it) => selectOptions.find((opt) => opt.id === it)
        || { id: it, value: it }));
    } else if (selectOptions.length) {
      setCurArrayOfObjects([...arrayValue]);
    }
  }, [arrayValue, selectOptions]);

  return (
    <Autocomplete
      fullWidth
      disabled={isDisabled}
      PaperComponent={({ children }) => (
        <Paper style={{ marginBottom: 10 }}>{children}</Paper>
      )}
      isOptionEqualToValue={(option, value) => option.id === value?.id}
      getOptionLabel={(option) => option?.value || ''}
      onChange={(e, newValue) => (arrayTypeValue ? onChange(newValue.map((val) => val.id))
        : onChange(newValue))}
      value={curArrayOfObjects}
      multiple
      id='tags-filled'
      options={selectOptions}
      clearOnBlur
      renderTags={(value, getTagProps) => value?.map((option, index) => (
        <Chip
          variant='outlined'
          label={`${option?.value}`?.split('(')[0] || option}
          {...getTagProps({ index })}
        />
      ))}
      renderInput={(params) => (
        <TextField
          {...params}
          variant='outlined'
          label={localization.t(`labels.${label}`)}
        />
      )}
    />
  );
};

AutocompleteWithChips.propTypes = {
  optionLabelKey: PropTypes.string,
  label: PropTypes.string,
  arrayValue: PropTypes.array,
  selectOptions: PropTypes.array,
  onChange: PropTypes.func,
  isDisabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  arrayTypeValue: PropTypes.bool,
};

export default AutocompleteWithChips;

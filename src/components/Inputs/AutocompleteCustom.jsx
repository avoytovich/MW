import React, { useState, useEffect } from 'react';
import {
  Autocomplete, TextField, Paper,
} from '@mui/material';
import PropTypes from 'prop-types';
import localization from '../../localization';

const AutocompleteCustom = ({
  selectOptions,
  label,
  onSelect,
  curValue,
  isDisabled,
  optionLabelKey,
  isRequired,
  error,
  helperText,
}) => {
  const [curOption, setCurOption] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (curValue) {
      setCurOption(selectOptions.filter((u) => u.id === curValue)[0]);
      setSearch(selectOptions.filter((u) => u.id === curValue)[0]?.[optionLabelKey]?.split('(')[0]?.trim());
    } else {
      setCurOption(null);
      setSearch('');
    }
  }, [curValue]);

  return (
    <Autocomplete
      fullWidth
      disabled={isDisabled}
      PaperComponent={({ children }) => (
        <Paper style={{ marginBottom: 10 }}>{children}</Paper>
      )}
      inputValue={search}
      value={curOption}
      onChange={(event, newValue) => {
        onSelect(newValue?.id || '');
      }}
      onBlur={() => setSearch(curOption?.[optionLabelKey]?.split('(')[0]?.trim() || '')}
      handleHomeEndKeys
      id="autocomplete-select"
      options={selectOptions}
      getOptionLabel={(option) => option?.[optionLabelKey] || ''}
      renderOption={(props, option) => <li {...props} key={option?.id}>{option?.[optionLabelKey] || ''}</li>}
      renderInput={(params) => (
        <TextField
          {...params}
          required={isRequired}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          variant="outlined"
          label={localization.t(`labels.${label}`)}
          error={error}
          helperText={error && helperText}
        />
      )}
    />
  );
};

AutocompleteCustom.propTypes = {
  optionLabelKey: PropTypes.string,
  label: PropTypes.string,
  curValue: PropTypes.string,
  selectOptions: PropTypes.array,
  onSelect: PropTypes.func,
  isDisabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
};

export default AutocompleteCustom;

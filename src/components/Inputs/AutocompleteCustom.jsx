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
  hasFormic,
  uniqueOptionValue,
  usedOptions = [],
  onClear,
}) => {
  const noRepeatingOptions = selectOptions
    .filter((so) => !usedOptions.filter((uo) => (uo.id || uo) === so.id).length);

  const [curOption, setCurOption] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (selectOptions.length) {
      if (curValue) {
        const newCurOption = selectOptions.filter((u) => u.id === curValue)[0] || '';
        setCurOption(newCurOption);
        setSearch(uniqueOptionValue ? uniqueOptionValue(newCurOption) : newCurOption?.[optionLabelKey]?.split('(')[0]?.trim() || '');
      } else {
        setCurOption('');
        setSearch('');
      }
    }
  }, [curValue]);

  return (
    <Autocomplete
      fullWidth
      disabled={isDisabled}
      PaperComponent={({ children }) => (
        <Paper style={{ marginBottom: 10 }}>{children}</Paper>
      )}
      inputValue={search || ''}
      value={curOption}
      onChange={(event, newValue, reason) => {
        const res = hasFormic ? newValue : newValue?.id;
        onSelect(res || '');

        if (reason === 'clear' && onClear) {
          onClear();
        }
      }}
      onBlur={() => setSearch(uniqueOptionValue ? uniqueOptionValue(curOption) : curOption?.[optionLabelKey]?.split('(')[0]?.trim() || '')}
      handleHomeEndKeys
      id="autocomplete-select"
      options={noRepeatingOptions}
      getOptionLabel={(option) => (uniqueOptionValue ? uniqueOptionValue(option) : option?.[optionLabelKey] || '')}
      renderOption={(props, option) => <li {...props} key={option?.id}>{uniqueOptionValue ? uniqueOptionValue(option) : option?.[optionLabelKey] || ''}</li>}
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
  hasFormic: PropTypes.bool,
  uniqueOptionValue: PropTypes.func,
  usedOptions: PropTypes.array,
  onClear: PropTypes.func,
};

export default AutocompleteCustom;

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
  getAdditionalOptions,
}) => {
  const noRepeatingOptions = selectOptions
    .filter((so) => !usedOptions.filter((uo) => (uo.id || uo) === so.id).length);
  const [additionalOptions, setAdditionalOptions] = useState([]);

  const [curOption, setCurOption] = useState('');
  const [search, setSearch] = useState('');
  const handleSetAdditionalOptions = (optionsData) => {
    const newAddOpt = [...additionalOptions];
    const idsArray = additionalOptions.map((o) => o.id);
    optionsData.forEach((el) => {
      if (!idsArray.includes(el.id)) {
        newAddOpt.push(el);
        idsArray.push(el.id);
      }
    });
    setAdditionalOptions(newAddOpt);
  };
  useEffect(() => {
    if (search && getAdditionalOptions) {
      const hasOption = selectOptions.filter((u) => u.id === search)?.[0];
      if (!hasOption) {
        getAdditionalOptions(search)
          .then((res) => {
            handleSetAdditionalOptions(res);
          });
      }
    }
  }, [search]);
  useEffect(() => {
    if (selectOptions.length) {
      if (curValue) {
        const newCurOption = selectOptions.filter((u) => u.id === curValue)[0] || '';
        if (getAdditionalOptions && !newCurOption) {
          getAdditionalOptions(curValue).then((res) => {
            handleSetAdditionalOptions(res);
            setCurOption(res[0]);
            setSearch(uniqueOptionValue ? uniqueOptionValue(res[0]) : res[0]?.[optionLabelKey]?.split('(')[0]?.trim() || '');
          });
        } else {
          setCurOption(newCurOption);
          setSearch(uniqueOptionValue ? uniqueOptionValue(newCurOption) : newCurOption?.[optionLabelKey]?.split('(')[0]?.trim() || '');
        }
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
      options={[...noRepeatingOptions, ...additionalOptions]}
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
  getAdditionalOptions: PropTypes.func,
};

export default AutocompleteCustom;

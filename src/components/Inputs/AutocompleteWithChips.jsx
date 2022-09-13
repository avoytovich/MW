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
  getAdditionalOptionsOptions,
}) => {
  const [curArrayOfObjects, setCurArrayOfObjects] = useState([]);
  const [additionalOptions, setAdditionalOptions] = useState([]);
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
    if (search && getAdditionalOptionsOptions) {
      getAdditionalOptionsOptions(search)
        .then((res) => {
          handleSetAdditionalOptions(res);
        });
    }
  }, [search]);

  useEffect(() => {
    if (selectOptions.length && arrayTypeValue) {
      if (!getAdditionalOptionsOptions) {
        setCurArrayOfObjects(arrayValue.map((it) => selectOptions.find((opt) => opt.id === it)
          || { id: it, value: it }));
      } else {
        const notInOptionIds = [];
        const newCurArrayOfObjects = [];
        arrayValue.forEach((it) => {
          const option = selectOptions.find((opt) => opt.id === it)
            || additionalOptions.find((opt) => opt.id === it);
          if (option) {
            newCurArrayOfObjects.push(option);
          } else {
            notInOptionIds.push(it);
          }
        });
        if (notInOptionIds.length) {
          const requestArray = [];
          notInOptionIds.forEach((id) => {
            requestArray.push(getAdditionalOptionsOptions(id));
          });

          Promise.allSettled(requestArray)
            .then((res) => {
              const newAdOpt = [];
              const currentAdditional = [];
              res.forEach((o) => {
                newAdOpt.push(...o.value);
              });
              notInOptionIds.forEach((id) => {
                currentAdditional.push(newAdOpt.find((it) => it.id === id));
              });
              setCurArrayOfObjects([...newCurArrayOfObjects, ...currentAdditional]);
              handleSetAdditionalOptions(newAdOpt);
            });
        } else {
          setCurArrayOfObjects(newCurArrayOfObjects);
          handleSetAdditionalOptions(additionalOptions);
        }
      }
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
      options={[...selectOptions, ...additionalOptions]}
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
          onChange={(e) => {
            setSearch(e.target.value);
          }}
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
  getAdditionalOptionsOptions: PropTypes.func,
};

export default AutocompleteWithChips;

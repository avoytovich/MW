import React, { useEffect, useState } from 'react';
import {
  Autocomplete, TextField, Chip, Paper, Dialog,
  DialogContentText, DialogContent, DialogActions, Button, DialogTitle,
} from '@mui/material';
import PropTypes from 'prop-types';
import localization from '../../localization';

const AutocompleteMultiple = ({
  selectOptions,
  label,
  onChange,
  arrayValue,
  isDisabled,
  getAdditionalOptions,
  getMultipleOptions,
}) => {
  const [curArrayOfObjects, setCurArrayOfObjects] = useState([]);
  const [additionalOptions, setAdditionalOptions] = useState([]);
  const [search, setSearch] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [unKnownIds, setUnKnownIds] = useState(null);
  const [valueIsArray, setValueIsArray] = useState(false);

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

  const handleGetMultipleOptions = (value) => {
    const newArray = [];
    const newUKnownIds = [];
    value.trim().split(' ').forEach((it) => {
      if (!newArray.includes(it)) {
        newArray.push(it);
      }
    });
    getMultipleOptions(newArray)
      .then((res) => {
        const newAdOpt = [];
        const currentAdditional = [...arrayValue];

        newAdOpt.push(...res);
        newArray.forEach((id) => {
          const opt = newAdOpt.find((it) => it.id === id);
          if (opt && !currentAdditional.includes(id)) {
            currentAdditional.push(id);
          } else if (!opt && id) {
            newUKnownIds.push(id);
          }
        });
        if (newUKnownIds.length) {
          setUnKnownIds(newUKnownIds);
        } else {
          setUnKnownIds(null);
        }
        onChange(currentAdditional);
        handleSetAdditionalOptions(newAdOpt);
      });
  };
  useEffect(() => {
    if (unKnownIds) {
      setOpenDialog(true);
    }
  }, [unKnownIds]);

  useEffect(() => {
    if (search && !valueIsArray) {
      getAdditionalOptions(search)
        .then((res) => {
          handleSetAdditionalOptions(res);
        });
    }
  }, [search]);

  useEffect(() => {
    if (selectOptions.length) {
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
        getMultipleOptions(notInOptionIds)
          .then((res) => {
            const newAdOpt = [];
            const currentAdditional = [];

            newAdOpt.push(...res);
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
    } else if (selectOptions.length) {
      setCurArrayOfObjects([...arrayValue]);
    }
  }, [arrayValue, selectOptions]);

  return (
    <>
      <Autocomplete
        fullWidth
        freeSolo
        inputValue={search}
        autoHighlight
        disabled={isDisabled}
        PaperComponent={({ children }) => (
          <Paper style={{ marginBottom: 10 }}>{children}</Paper>
        )}
        isOptionEqualToValue={(option, value) => option.id === value?.id}
        getOptionLabel={(option) => option?.value || ''}
        onChange={(e, newValue) => {
          const isArray = `${e.target.value}`?.trim()?.split(' ');
          if (e.code === 'Enter' && isArray?.length > 1) {
            handleGetMultipleOptions(e.target.value);
          } else if (e.code !== 'Enter') {
            onChange(newValue.map((val) => val.id));
          }
          setSearch('');
        }}
        value={curArrayOfObjects}
        multiple
        id='tags-filled'
        options={[...selectOptions, ...additionalOptions]}
        renderTags={(value, getTagProps) => value?.map((option, index) => (
          <Chip
            variant='outlined'
            label={`${option?.value}`?.split('(')[0] || option}
            {...getTagProps({ index })}
          />
        ))}
        renderInput={(params) => (
          <TextField
            maxRows={8}
            onChange={(e) => {
              setValueIsArray(e.target.value?.trim()?.split(' ') < 2);
              setSearch(e.target.value);
            }}
            {...params}
            variant='outlined'
            label={localization.t(`labels.${label}`)}
          />
        )}
      />
      <Dialog open={openDialog} onBackdropClick={() => setOpenDialog(false)} aria-labelledby='form-dialog-title'>
        <DialogTitle variant='h4'>
          {localization.t('errorNotifications.nextIdsNotFound')}
        </DialogTitle>
        <DialogContent>
          {unKnownIds?.map((id) => <DialogContentText>{id}</DialogContentText>)}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color='primary' onClick={() => setOpenDialog(false)}>
            ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

AutocompleteMultiple.propTypes = {
  optionLabelKey: PropTypes.string,
  label: PropTypes.string,
  arrayValue: PropTypes.array,
  selectOptions: PropTypes.array,
  onChange: PropTypes.func,
  isDisabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  getAdditionalOptions: PropTypes.func,
  getMultipleOptions: PropTypes.func,
};

export default AutocompleteMultiple;

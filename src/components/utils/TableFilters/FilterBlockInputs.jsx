import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import {
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import SearchIcon from '@mui/icons-material/Search';

import { setSearch } from '../../../redux/actions/TableData';
import { SelectWithChip } from '../../Inputs';

import localization from '../../../localization';
import { placeholderData } from './helper';

const FilterBlockInputs = ({
  type, curData, updateConfig, data, size, search, scope, toUpperCase,
}) => {
  const dispatch = useDispatch();

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      const searchObject = {
        [scope]: {
          [data.id]: event.target.value,
          [data.name ? data.name : data.id]: event.target.value,
        },
      };
      dispatch(setSearch(searchObject));
    }
  };

  const TextSubFilter = () => (
    <TextField
      label={data.label}
      value={curData || ''}
      size={size || 'medium'}
      fullWidth
      variant='outlined'
      placeholder={search ? placeholderData(scope) : ''}
      InputLabelProps={!data.label && { shrink: false }}
      onChange={
        (e) => {
          const searchValue = toUpperCase ? e.target.value.toUpperCase() : e.target.value;
          return search ? updateConfig(data, searchValue) : updateConfig(data.id, searchValue)
        }
      }
      onKeyDown={search ? handleKeyDown : () => { }}
      InputProps={{
        endAdornment: <InputAdornment position='end'><SearchIcon color='secondary' /></InputAdornment>,
      }}
    />
  );

  const DateSubFilter = () => {
    const [fromVal, setFromVal] = useState('');
    const [toVal, setToVal] = useState('');

    useEffect(() => {
      if (!fromVal) {
        setFromVal(curData?.from);
      }
    }, [curData?.from]);

    useEffect(() => {
      if (!toVal) {
        setToVal(curData?.to);
      }
    }, [curData?.to]);

    useEffect(() => {
      if (!curData?.to && toVal) {
        setToVal('');
      }

      if (!curData?.from && fromVal) {
        setFromVal('');
      }
    }, [curData]);

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={localization.t('labels.from')}
          value={fromVal}
          renderInput={(params) => (
            <TextField
              {...params}
              data-test='fromDate'
              fullWidth
              error={false}
              name='fromDate'
              type='date'
              value={fromVal}
              variant='outlined'
              InputLabelProps={{ shrink: true }}
              InputProps={{ endAdornment: () => null }}
              // eslint-disable-next-line react/jsx-no-duplicate-props
              inputProps={{
                style: {
                  fontSize: '12px', height: '56px', boxSizing: 'border-box', color: '#b9b1b1', padding: '8px',
                },
              }}
              onChange={(e) => {
                const toSave = { from: e?.target?.value };

                if (curData?.to) {
                  toSave.to = curData.to;
                }

                updateConfig(data.id, toSave);
                setFromVal(e?.target?.value);
              }}
            />
          )}
        />

        <DatePicker
          label={localization.t('labels.to')}
          value={toVal}
          renderInput={(params) => (
            <TextField
              {...params}
              data-test='toDate'
              fullWidth
              name='toDate'
              type='date'
              value={toVal}
              variant='outlined'
              error={curData?.to && curData?.to !== '' && curData?.from && curData?.from !== '' && moment(curData?.from).isAfter(curData?.to)}
              InputLabelProps={{ shrink: true }}
              InputProps={{ endAdornment: () => null }}
              // eslint-disable-next-line react/jsx-no-duplicate-props
              inputProps={{
                style: {
                  fontSize: '12px', height: '56px', boxSizing: 'border-box', color: '#b9b1b1', padding: '8px',
                },
              }}
              onChange={(e) => {
                const toSave = { to: e?.target?.value };

                if (curData?.from) {
                  toSave.from = curData.from;
                }

                updateConfig(data.id, toSave);
                setToVal(e?.target?.value);
              }}
            />
          )}
        />
      </LocalizationProvider>
    );
  };

  const SelectSubFilter = () => (
    <Select
      label={data.label}
      multiple
      variant='outlined'
      fullWidth
      style={{ maxWidth: '273px', maxHeight: '56px' }}
      placeholder={data.label}
      value={curData || []}
      onChange={(e) => updateConfig(data.id, e.target.value)}
      displayEmpty
      renderValue={(selected) => {
        if (!curData || selected.length === 0) {
          return <Typography color='secondary' variant='h6'>{`Select ${data.label}`}</Typography>;
        }
        const selectedItems = [];
        for (let i = 0; i < data.values.length; i += 1) {
          const curItem = data.values[i];

          if (selected.indexOf(curItem.value) >= 0) {
            selectedItems.push(curItem.label);
          }
        }

        return selectedItems.join(', ');
      }}
    >
      {data.values.map((v) => (
        <MenuItem key={v.value} value={v.value}>
          {v.label}
        </MenuItem>
      ))}
    </Select>
  );

  const SelectWithChipSubFilter = () => (
    <SelectWithChip
      noTranslate
      label={data.label}
      value={curData || []}
      selectOptions={data.values}
      onClickDelIcon={(chip) => {
        const newValue = [...curData].filter(
          (val) => val !== chip,
        );
        updateConfig(data.id, newValue);

        if (!newValue.length) {
          document.activeElement.blur();
        }
      }}
      onChangeSelect={(e) => updateConfig(data.id, e.target.value)}
    />
  );

  switch (type) {
    case 'date': return DateSubFilter();
    case 'select': return SelectSubFilter();
    case 'selectWithChip': return SelectWithChipSubFilter();
    default: return TextSubFilter();
  }
};

FilterBlockInputs.propTypes = {
  type: PropTypes.string,
  curData: PropTypes.any,
  updateConfig: PropTypes.func,
  data: PropTypes.object,
  toUpperCase: PropTypes.bool,
};

export default FilterBlockInputs;

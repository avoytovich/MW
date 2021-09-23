import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  Typography,
} from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';

import localization from '../../../localization';

const FilterBlockInputs = ({
  type, curData, updateConfig, data,
}) => {
  const TextSubFilter = () => (
    <TextField
      value={curData || ''}
      fullWidth
      variant='outlined'
      placeholder={data?.label || 'Write here...'}
      onChange={(e) => updateConfig(data.id, e.target.value)}
      InputProps={{
        endAdornment: <InputAdornment position="end"><SearchIcon color='secondary' /></InputAdornment>,
      }}
    />
  );

  const DateSubFilter = () => (
    <>
      <TextField
        data-test='fromDate'
        fullWidth
        name='fromDate'
        value={curData?.from ? moment(curData.from).format('YYYY-MM-DD') : ''}
        label={localization.t('labels.from')}
        type='date'
        variant='outlined'
        style={{ marginRight: '5px' }}
        InputLabelProps={{ shrink: true }}
        inputProps={{
          style: {
            fontSize: '12px', height: '56px', boxSizing: 'border-box', color: '#b9b1b1', padding: '10px',
          },
        }}
        onChange={(e) => {
          const toSave = { from: e.target.value };

          if (curData?.to) {
            toSave.to = curData.to;
          }

          updateConfig(data.id, toSave);
        }}
      />

      <TextField
        data-test='toDate'
        fullWidth
        name='toDate'
        value={curData?.to ? moment(curData.to).format('YYYY-MM-DD') : ''}
        label={localization.t('labels.to')}
        type='date'
        variant='outlined'
        style={{ marginLeft: '5px' }}
        InputLabelProps={{ shrink: true }}
        inputProps={{
          style: {
            fontSize: '12px', height: '56px', boxSizing: 'border-box', color: '#b9b1b1', padding: '10px',
          },
        }}
        onChange={(e) => {
          const toSave = { to: e.target.value };

          if (curData?.from) {
            toSave.from = curData.from;
          }

          updateConfig(data.id, toSave);
        }}
      />
    </>
  );

  const SelectSubFilter = () => (
    <Select
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

        return selected.join(', ');
      }}
    >
      {data.values.map((v) => (
        <MenuItem key={v.value} value={v.value}>
          {v.label}
        </MenuItem>
      ))}
    </Select>
  );

  switch (type) {
    case 'date': return DateSubFilter();
    case 'select': return SelectSubFilter();
    default: return TextSubFilter();
  }
};

FilterBlockInputs.propTypes = {
  type: PropTypes.string,
  curData: PropTypes.any,
  updateConfig: PropTypes.func,
  data: PropTypes.object,
};

export default FilterBlockInputs;
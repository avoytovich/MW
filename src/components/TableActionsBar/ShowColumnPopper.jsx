import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import {
  FormControlLabel,
  Switch,
  Box,
  TextField,
  Popover,
  InputAdornment,
  Button,
} from '@mui/material';
import setShowColumns from '../../redux/actions/ShowColumns';
import localization from '../../localization';

const ShowColumnPopper = ({ scope, anchorEl, setAnchorEl }) => {
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState('');
  const currentShowColumns = useSelector(({ showColumns }) => showColumns[scope]);
  const regex = new RegExp(
    inputValue.startsWith('*') ? `/${inputValue.toLowerCase()}` : `${inputValue.toLowerCase()}`, 'g',
  );
  const filterObject = () => {
    const result = {};
    Object.keys(currentShowColumns).forEach((key) => {
      if (key.toLowerCase().match(regex)) {
        result[key] = currentShowColumns[key];
      }
    });
    return result;
  };

  const setShowColumn = (e) => {
    dispatch(
      setShowColumns({ [scope]: { ...currentShowColumns, [e.target.name]: e.target.checked } }),
    );
  };

  const handleSwitchAll = (type) => {
    const checkAll = type === 'show';
    const newShowColumns = { ...currentShowColumns };
    Object.keys(newShowColumns).forEach((key) => { newShowColumns[key] = checkAll; });
    dispatch(
      setShowColumns({ [scope]: newShowColumns }),
    );
  };

  const filteredObject = inputValue !== '' ? filterObject() : currentShowColumns;
  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={() => setAnchorEl(null)}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <Box p={3}>
        <TextField
          value={inputValue}
          placeholder={localization.t('general.findColumn')}
          onChange={(e) => setInputValue(e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position='start'><SearchIcon color='secondary' /></InputAdornment>,
          }}
        />
        <Box py={3} pr={4}>
          {
            !!filteredObject && Object.keys(filteredObject).map((key) => (
              <Box px={2} key={key}>
                <FormControlLabel
                  control={(
                    <Switch
                      name={key}
                      onChange={setShowColumn}
                      color="primary"
                      checked={filteredObject[key]}
                    />
                  )}
                  label={localization.t(`labels.${key}`)}
                />
              </Box>
            ))
          }
        </Box>
        <Box display='flex' justifyContent='space-between'>
          <Button data-test='hideAllButton' onClick={() => handleSwitchAll('hide')} color="primary">{localization.t('general.hideAll')}</Button>
          <Button data-test='showAllButton' onClick={() => handleSwitchAll('show')} color="primary">{localization.t('general.showAll')}</Button>
        </Box>
      </Box>
    </Popover>
  );
};

export default ShowColumnPopper;

ShowColumnPopper.propTypes = {
  scope: PropTypes.string,
  anchorEl: PropTypes.instanceOf(Element),
  setAnchorEl: PropTypes.func,
};

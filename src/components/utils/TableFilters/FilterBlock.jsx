import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Close from '@mui/icons-material/Close';

import FilterBlockInputs from './FilterBlockInputs';
import { resetSearch } from '../../../redux/actions/TableData';

const FilterBlock = ({
  data, curData, updateConfig, size, myBox, search, scope,
}) => {
  const dispatch = useDispatch();
  const [curVal, setCurVal] = useState('');

  const onClose = () => {
    const filtersObj = {
      [scope]: { ...JSON.parse(localStorage.getItem('filters'))[scope] },
    };
    delete filtersObj[scope][data.id];
    if (search) {
      dispatch(resetSearch());
    }
    updateConfig(search ? data : data?.id, '');
  };

  useEffect(() => {
    setCurVal(curData);
  }, [curData]);

  return (
    <Box display='flex' alignItems='center' my={myBox || '10px'}>
      <Box minWidth='115px'>
        <Typography variant='h6'>{data?.label}</Typography>
      </Box>

      <FilterBlockInputs
        search={search}
        scope={scope}
        size={size}
        type={data?.type}
        curData={curVal}
        updateConfig={updateConfig}
        data={data}
      />
      <Box minWidth='25px' textAlign='center'>
        {curVal && (
          <Close
            style={{ fill: '#d0caca', cursor: 'pointer' }}
            onClick={onClose}
          />
        )}
      </Box>
    </Box>
  );
};

FilterBlock.propTypes = {
  data: PropTypes.object,
  curData: PropTypes.any,
  updateConfig: PropTypes.func,
  size: PropTypes.string,
  myBox: PropTypes.string,
  search: PropTypes.bool,
  scope: PropTypes.string,
};

export default FilterBlock;

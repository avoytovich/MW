import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Close from '@mui/icons-material/Close';

import FilterBlockInputs from './FilterBlockInputs';

const FilterBlock = ({
  data, curData, updateConfig, size, myBox, search,
}) => {
  const [curVal, setCurVal] = useState('');

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
        size={size}
        type={data?.type}
        curData={curVal}
        updateConfig={updateConfig}
        data={data}
      />

      <Box minWidth='25px' textAlign='center'>
        {curVal && (
          <Close style={{ fill: '#d0caca', cursor: 'pointer' }} onClick={() => updateConfig(data?.id, '')} />
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
};

export default FilterBlock;

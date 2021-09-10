import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import Close from '@material-ui/icons/Close';

import FilterBlockInputs from './FilterBlockInputs';

const FilterBlock = ({ data, curData, updateConfig }) => {
  const [curVal, setCurVal] = useState('');

  useEffect(() => {
    setCurVal(curData);
  }, [curData]);

  return (
    <Box display='flex' alignItems='center' my='10px'>
      <Box minWidth='115px'>
        <Typography variant='h6'>{data?.label}</Typography>
      </Box>

      <FilterBlockInputs
        type={data?.type}
        curData={curVal}
        updateConfig={updateConfig}
        data={data}
      />

      <Box minWidth='25px' ml='10px' textAlign='center'>
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
};

export default FilterBlock;

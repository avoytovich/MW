import React from 'react';

import { Box, Typography } from '@material-ui/core';

import CallMadeIcon from '@material-ui/icons/CallMade';
import CallReceivedIcon from '@material-ui/icons/CallReceived';

const InfoItemBlock = ({ title, price, selected, previousPrice, change }) => (
  <Box className={`info-item-block ${selected ? 'selected' : ''}`} width='100%'>
    {title}
    
    <Box className={`price-info ${change == 0 ? 'no-change' : change > 0 ? 'change-increase' : 'change-decrease'}`}>
      <Typography>{price}</Typography>

      <Box display='flex' alignItems='center'>
        {change > 0 && <CallMadeIcon />}
        {change < 0 && <CallReceivedIcon />}
        
        <Typography className='change-value'>{change}%</Typography>
      </Box>
    </Box>

    <Typography className='previous-change'>Previous year: {previousPrice}</Typography>
  </Box>
);

export default InfoItemBlock;

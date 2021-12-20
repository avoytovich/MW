import React from 'react';

import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

/* eslint-disable no-nested-ternary */
import CallMadeIcon from '@mui/icons-material/CallMade';
import CallReceivedIcon from '@mui/icons-material/CallReceived';

const InfoItemBlock = ({
  title, price, selected, previousPrice, change,
}) => (
  <Box className={`info-item-block ${selected ? 'selected' : ''}`} width='100%'>
    {title}

    {/* eslint-disable-next-line */}
    <Box className={`price-info ${change == 0 ? 'no-change' : change > 0 ? 'change-increase' : 'change-decrease'}`}>
      <Typography>{price}</Typography>

      <Box display='flex' alignItems='center'>
        {change > 0 && <CallMadeIcon />}
        {change < 0 && <CallReceivedIcon />}

        <Typography className='change-value'>
          {change}
          %
        </Typography>
      </Box>
    </Box>

    <Typography className='previous-change'>
      Previous year:
      {previousPrice}
    </Typography>
  </Box>
);

InfoItemBlock.propTypes = {
  title: PropTypes.string,
  price: PropTypes.string,
  selected: PropTypes.bool,
  previousPrice: PropTypes.string,
  change: PropTypes.string,
};

export default InfoItemBlock;

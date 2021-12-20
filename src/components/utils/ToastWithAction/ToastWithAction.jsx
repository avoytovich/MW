import React from 'react';

import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import './toastWithAction.scss';

const ToastWithAction = ({
  actionFn,
  text,
  buttonText,
}) => (
  <Box
    display='flex'
    className='toastWithAction'
    justifyContent='space-between'
    alignItems='center'
  >
    {text}
    <Button onClick={actionFn}>{buttonText}</Button>
  </Box>
);

ToastWithAction.propTypes = {
  buttonText: PropTypes.string,
  text: PropTypes.string,
  actionFn: PropTypes.any,
};

export default ToastWithAction;

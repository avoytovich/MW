import React from 'react';

import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

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

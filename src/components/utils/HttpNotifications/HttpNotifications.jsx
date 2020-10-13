import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import { hideNotification } from '../../../redux/actions/HttpNotifications';

import './HttpNotifications.scss';

const AUTO_HIDE_INTERVAL = 3000;

const HttpActionNotification = () => {
  const dispatch = useDispatch();
  const [hideTimeout, setHideTimeout] = useState(null);
  const {
    message, showNotification, error,
  } = useSelector(({ httpNotifications }) => httpNotifications);

  const severity = error ? 'error' : 'success';

  useEffect(() => {
    hideTimeout && clearTimeout(hideTimeout);

    showNotification
      && setHideTimeout(setTimeout(
        () => {
          dispatch(hideNotification());
        }, AUTO_HIDE_INTERVAL,
      ));
  }, [showNotification]);

  const handleClose = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    hideTimeout && clearTimeout(hideTimeout);
    dispatch(hideNotification());
  };

  return (
    showNotification && (
      <Snackbar open={showNotification} autoHideDuration={AUTO_HIDE_INTERVAL} onClose={handleClose}>
        <Alert
          elevation={6}
          variant='filled'
          onClose={handleClose}
          severity={severity}
          id={`${severity}-notification`}
        >
          {message}
        </Alert>
      </Snackbar>
    )
  );
};

export default HttpActionNotification;

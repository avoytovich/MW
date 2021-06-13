import React from 'react';
import { BrowserRouter as Router, useHistory } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';

import Routes from '../../services/Routes';
import Auth from '../utils/Auth';
import HttpNotifications from '../utils/HttpNotifications';

import '../../styles/main.scss';

const RootComponent = () => {
  const history = useHistory();

  console.log('envObj:', process?.env?.envObj);
  console.log('env:', process?.env);

  return (
    <>
      <CssBaseline />
      <Router history={history}>
        <Auth>
          <Routes />
          <HttpNotifications />
        </Auth>
      </Router>
    </>
  );
};

export default RootComponent;

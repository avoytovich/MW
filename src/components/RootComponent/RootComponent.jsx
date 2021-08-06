import React from 'react';
import { BrowserRouter as Router, useHistory } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ToastContainer } from 'react-toastify';

import Routes from '../../services/Routes';
import Auth from '../utils/Auth';

import 'react-toastify/dist/ReactToastify.css';
import '../../styles/main.scss';

const RootComponent = () => {
  const history = useHistory();

  return (
    <>
      <CssBaseline />
      <Router history={history}>
        <Auth>
          <Routes />
          <ToastContainer position='bottom-right' />
        </Auth>
      </Router>
    </>
  );
};

export default RootComponent;

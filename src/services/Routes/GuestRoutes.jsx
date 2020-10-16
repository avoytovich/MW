import React, { useEffect } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import {
  Switch, Redirect, Route, useLocation,
} from 'react-router-dom';

import Session from '../session';

import AuthScreen from '../../screens/AuthScreen';
import RecoveryPasswordScreen from '../../screens/RecoveryPasswordScreen';
import UpdatePasswordScreen from '../../screens/UpdatePasswordScreen';

import './routes.scss';

const SignedRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;

    Session.setRedirect(pathname);
  }, []);

  return (
    <SwitchTransition mode='out-in'>
      <CSSTransition
        key={location.pathname}
        classNames='fade'
        addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
      >
        <Switch location={location}>
          <Route
            exact
            path='/login'
            component={AuthScreen}
          />

          <Route
            exact
            path='/recover-password'
            component={RecoveryPasswordScreen}
          />

          <Route
            exact
            path='/update-password/:token'
            component={UpdatePasswordScreen}
          />

          {/* <Redirect to='/login' /> */}
        </Switch>
      </CSSTransition>
    </SwitchTransition>
  );
};

export default SignedRoutes;

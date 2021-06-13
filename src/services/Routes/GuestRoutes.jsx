// ToDo[major]: add exact routes for not staging env
import React, { useEffect } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import {
  Switch, Redirect, Route, useLocation,
} from 'react-router-dom';

import Session from '../session';
import defPath from '../helpers/routingHelper';

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
            path={`${defPath}/recover-password`}
            component={RecoveryPasswordScreen}
          />

          <Route
            path={`${defPath}/update-password/:token`}
            component={UpdatePasswordScreen}
          />

          <Route
            path={[`${defPath}/:realm`, '/']}
            exact
            component={AuthScreen}
          />

          <Redirect to={`${defPath}/`} />
        </Switch>
      </CSSTransition>
    </SwitchTransition>
  );
};

export default SignedRoutes;

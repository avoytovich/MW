import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/Account';

const AuthScreen = () => {
  const dispatch = useDispatch();
  const doSignIn = () => {
    const mockCreds = { username: 'mtsybran', password: 'Nexway2020' };
    dispatch(login(mockCreds.username, mockCreds.password));
  };

  return (
    <>
      <div>Sign in</div>
      <button onClick={doSignIn} type="button">
        Sign In
      </button>
      <Link to="/recoverPassword">Forgot password</Link>
    </>
  );
};

export default AuthScreen;

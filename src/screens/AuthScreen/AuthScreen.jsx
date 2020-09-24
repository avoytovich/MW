import React from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import localization from '../../localization';
import LoginForm from '../../components/LoginForm';
import './AuthScreen.scss';

const AuthScreen = () => (
  <Container maxWidth="md" className="loginContainer">
    <Card className="card">
      <CardContent className="content">
        <Box className="headerSignIn">
          <Typography variant="h3" color="textPrimary">
            {localization.t('forms.headers.signIn')}
          </Typography>

          {false && (
            <Typography variant="subtitle2" color="secondary">
              {localization.t('forms.text.signInSso')}
            </Typography>
          )}
        </Box>

        {false && (
          <Box mt={2}>
            <Button
              color="inherit"
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              {localization.t('forms.buttons.googleLogin')}
            </Button>
          </Box>
        )}

        {false && (
          <Typography
            variant="subtitle2"
            color="secondary"
            align="center"
            className="orLogin"
          >
            {localization.t('forms.text.loginWithEmailAddress')}
          </Typography>
        )}

        <Box mt={3}>
          <LoginForm />
        </Box>

        <Box className="signUpContainer" justifyContent='flex-end'>
          <Link
            to="/recover-password"
            color="text.secondary"
            className="forgotPasswordLink"
          >
            {localization.t('forms.text.forgotPassword')}
          </Link>
        </Box>

        {false && (
          <Box className="signUpContainer">
            <Typography color="textPrimary">
              {localization.t('forms.text.dontHaveAccount')}
            </Typography>

            <Link
              to="/register"
              color="primary"
              className="signUpLink"
            >
              {localization.t('forms.links.signUp')}
            </Link>
          </Box>
        )}
      </CardContent>
    </Card>
  </Container>
);

export default AuthScreen;

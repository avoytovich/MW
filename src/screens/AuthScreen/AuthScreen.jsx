import React from 'react';
import './AuthScreen.scss';

import {
  Box,
  Container,
  Card,
  CardContent,
  Divider,
  Link,
  Typography,
} from '@material-ui/core';

import LoginForm from './LoginForm'; 

const AuthScreen = () => {

  return (
      <Container maxWidth="md" className="loginContainer">
      <Card className="card">
        <CardContent className="content">
          <Typography
            variant="h2"
            color="textSecondary"
          >
            Sign in
          </Typography>
          <Box mt={3}>
            <LoginForm/>
          </Box>
          <Box my={2}>
            <Divider />
          </Box>
          <Link
            // component={RouterLink}
            // to="/register"
            // variant="body2"
            color="textSecondary"
          >
            Create new account
          </Link>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AuthScreen;

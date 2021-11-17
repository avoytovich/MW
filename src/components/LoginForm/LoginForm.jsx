import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  Box,
  Button,
  TextField,
  CircularProgress,
} from '@material-ui/core';
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { Formik } from 'formik';

import { login, setNexwayState } from '../../redux/actions/Account';
import localization from '../../localization';

const initialValues = { username: '', password: '' };

const LoginForm = () => {
  const dispatch = useDispatch();
  const { realm } = useParams();

  const handleOnSubmit = async ({ username, password, setSubmitting }) => {
    setSubmitting(true);

    try {
      dispatch(login(username, password, realm));

      const localNxState = JSON.parse(localStorage.getItem('nexwayState'));
      dispatch(setNexwayState(localNxState));
    } catch (e) {
      setSubmitting(false);
    }
  };

  const theme = createMuiTheme();
  theme.palette.loginBtn = theme.palette.augmentColor({
    main: "#19a6ff",
    dark: "#0971b3",
  });

  const isLoginBtn = style => props =>
    props.color === "loginBtn" && props.variant === "contained" ? style : {};

    theme.overrides = {
      MuiButton: {
        root: {
          backgroundColor: isLoginBtn(theme.palette.loginBtn.main),
          "&:hover": {
            backgroundColor: isLoginBtn(theme.palette.loginBtn.dark)
          }
        }
      }
    };

  return (
    <Formik
      className="formik"
      initialValues={initialValues}
      onSubmit={(values, {
        setSubmitting,
      }) => handleOnSubmit({ ...values, setSubmitting })}
    >
      {({
        errors,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            error={touched.username && errors.username}
            fullWidth
            helperText={touched.username && errors.username}
            label={localization.t('forms.inputs.username')}
            margin="normal"
            name="username"
            onChange={handleChange}
            type="text"
            value={values.username}
            variant="outlined"
            inputProps={{ form: { autocomplete: 'off' }, style: { WebkitBoxShadow: "0 0 0 1000px white inset" } }}
          />

          <TextField
            error={touched.password && errors.password}
            fullWidth
            helperText={touched.password && errors.password}
            label={localization.t('forms.inputs.password')}
            margin="normal"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
            inputProps={{ autoComplete: 'new-password', style: { WebkitBoxShadow: "0 0 0 1000px white inset" } }}
          />

          <Box mt={2} >
            <ThemeProvider theme={theme}>
              <Button
                color="loginBtn"
                disabled={
                  Object.keys(errors).length !== 0
                  || !values.username
                  || !values.password
                  || isSubmitting
                }
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                style={{ borderRadius: 0, color: '#ffffff' }}
              >
                {isSubmitting ? <CircularProgress size={26} /> : localization.t('forms.buttons.signIn')}
              </Button>
            </ThemeProvider>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;

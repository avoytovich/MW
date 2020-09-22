import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import {
  Box,
  Button,
  TextField,
  CircularProgress,
} from '@material-ui/core';
import { login } from '../../redux/actions/Account';
import localization from '../../localization';

const initialValues = {
  username: '',
  password: '',
};

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleOnSubmit = async ({ username, password, setSubmitting }) => {
    setSubmitting(true);

    try {
      await dispatch(login(username, password));
    } catch (e) {
      setSubmitting(false);
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
            inputProps={{ form: { autocomplete: 'off' } }}
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
            inputProps={{ autoComplete: 'new-password' }}
          />

          <Box mt={2}>
            <Button
              color="primary"
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
            >
              {isSubmitting ? <CircularProgress size={26} /> : localization.t('forms.buttons.signIn')}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;

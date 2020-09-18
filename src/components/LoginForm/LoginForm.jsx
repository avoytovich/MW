import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  Box,
  Button,
  TextField,
} from '@material-ui/core';
import { login } from '../../redux/actions/Account';
import localization from '../../localization';

function LoginForm({ className, onSubmitSuccess, ...rest }) {
  const dispatch = useDispatch();

  return (
    <Formik
      className="formik"
      initialValues={{
        email: 'mtsybran',
        password: 'Nexway2020'
      }}
      onSubmit={async (values, {
      }) => { dispatch(login(values.email, values.password));
      }}
    >
      {({
        errors,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
      }) => (
        <form
          noValidate
          // className={clsx(classes.root, className)}
          onSubmit={handleSubmit}
          {...rest}
        >
          <TextField
            className="MuiTypography-colorSecondary"
            error={Boolean(touched.email && errors.email)}
            fullWidth
            autoFocus
            helperText={touched.email && errors.email}
            label={localization.t('forms.inputs.email')}
            margin="normal"
            name="email"
            onChange={handleChange}
            type="email"
            value={values.email}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            label={localization.t('forms.inputs.password')}
            margin="normal"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <Box mt={2}>
            <Button
              color="primary"
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              {localization.t('forms.buttons.signIn')}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}

LoginForm.propTypes = {
  className: PropTypes.string,
  onSubmitSuccess: PropTypes.func
};

LoginForm.defaultProps = {
  onSubmitSuccess: () => {}
};

export default LoginForm;

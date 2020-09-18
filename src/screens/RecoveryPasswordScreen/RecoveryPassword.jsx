import React from 'react';
import { Formik } from 'formik';
import {
  Button,
  Typography,
  TextField,
  Box,
  FormHelperText,
} from '@material-ui/core';
import localization from '../../localization';
import api from '../../api';
import * as validators from '../../services/inputValidators';

const RecoveryPassword = () => (
  <>
    <Box mb={10}>
      <Typography m="100px" variant="h3" color="textPrimary">
        {localization.t('general.resetPassword')}
      </Typography>
      <Typography variant="body2" color="secondary">
        {localization.t('general.resetPasswordMessage')}
      </Typography>
    </Box>
    <Formik
      mt={100}
      initialValues={{ email: '' }}
      validate={(values) => validators.email(values)}
      onSubmit={(values, { setSubmitting, setErrors }) => {
        api.recoverPassword({ email: values.email }).catch((error) => {
          setSubmitting(false);
          setErrors({ message: error.response.data.error });
        });
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            error={Boolean(touched.email && errors.email)}
            fullWidth
            autoFocus
            helperText={touched.email && errors.email}
            label="Email Address"
            margin="normal"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
            variant="outlined"
          />
          <Box mt={2}>
            <Button
              color="primary"
              disabled={
                Object.keys(errors).length !== 0
                || !values.email
                || isSubmitting
              }
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              {localization.t('general.reset')}
            </Button>
            {errors.message && (
              <Box mt={3}>
                <FormHelperText error>{errors.message}</FormHelperText>
              </Box>
            )}
          </Box>
        </form>
      )}
    </Formik>
  </>
);

export default RecoveryPassword;

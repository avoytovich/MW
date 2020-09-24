import React, { useState } from 'react';
import { Formik } from 'formik';
import {
  Button,
  Typography,
  TextField,
  Box,
  FormHelperText,
  CircularProgress,
  Container,
} from '@material-ui/core';
import localization from '../../localization';
import api from '../../api';
import * as validators from '../../services/inputValidators';

const initialRecoveryValues = { email: '' };

const RecoveryPassword = () => {
  const [emailSend, setEmailSend] = useState(false);
  const handleOnSubmit = (values, setSubmitting, setErrors) => {
    setSubmitting(true);

    api
      .recoverPassword({ email: values.email })
      .then(() => setEmailSend(true))
      .catch((error) => {
        setSubmitting(false);
        setErrors({ message: error.response.data.error });
      });
  };

  return emailSend ? (
    <Box mb={4}>
      <Typography m="100px" variant="h3" color="textPrimary">
        {localization.t('general.checkYourEmailToResetThePassword')}
      </Typography>
    </Box>
  ) : (
    <>
      <Container>
        <Box mb={4}>
          <Typography m="100px" variant="h3" color="textPrimary">
            {localization.t('general.resetPassword')}
          </Typography>

          <Typography variant="body2" color="secondary">
            {localization.t('general.resetPasswordMessage')}
          </Typography>
        </Box>

        <Formik
          mt={100}
          initialValues={initialRecoveryValues}
          validate={(values) => validators.email(values)}
          onSubmit={(values, {
            setSubmitting, setErrors,
          }) => handleOnSubmit(values, setSubmitting, setErrors)}
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
            <form
              noValidate
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <TextField
                style={{ marginRight: '210px' }}
                error={touched.email && !!errors.email}
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
                  {isSubmitting ? <CircularProgress size={26} /> : localization.t('general.reset')}
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
      </Container>
    </>
  );
};
export default RecoveryPassword;

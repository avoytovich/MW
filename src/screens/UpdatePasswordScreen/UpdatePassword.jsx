import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import {
  Button,
  TextField,
  Box,
  FormHelperText,
  Typography,
  CircularProgress,
} from '@mui/material';
import { toast } from 'react-toastify';

import { Formik } from 'formik';

import * as validators from '../../services/helpers/inputValidators';
import localization from '../../localization';
import api from '../../api';

const initialUpdateValues = { newPassword: '', confirmedPassword: '' };

const UpdatePassword = () => {
  const { token } = useParams();
  const history = useHistory();

  const handleOnSubmit = (values, setSubmitting, setErrors) => {
    setSubmitting(true);
    api
      .setNewPassword(token, { password: values.newPassword })
      .then(() => {
        toast(localization.t('general.passwordUpdated'));
        history.push('/');
      })
      .catch((error) => {
        setSubmitting(false);
        setErrors({ message: error.response.data.error });
      });
  };

  return (
    <>
      <Box mb={4}>
        <Typography color="textPrimary" variant="h3" component="h2">
          {localization.t('general.setNewPassword')}
        </Typography>
      </Box>

      <Formik
        validate={(values) => validators.updatePassword(values)}
        initialValues={initialUpdateValues}
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
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              error={touched.newPassword && !!errors?.notifications?.length}
              fullWidth
              label=" New Password"
              margin="normal"
              name="newPassword"
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              value={values.newPassword}
              variant="outlined"
            />

            <TextField
              error={touched.confirmedPassword && errors.matches}
              fullWidth
              label="Confirm Password"
              margin="normal"
              name="confirmedPassword"
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              value={values.confirmedPassword}
              variant="outlined"
            />

            <Box mt={2}>
              <Button
                color="primary"
                disabled={
                  Object.keys(errors).length !== 0
                  || !values.newPassword
                  || isSubmitting
                }
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                {isSubmitting ? <CircularProgress size={26} /> : localization.t('general.setNewPassword')}
              </Button>

              {errors.notifications && (
                <Box mt={3}>
                  {errors.notifications.map((note) => (
                    <FormHelperText
                      key={note}
                      className="MuiFormHelperText-contained MuiFormHelperText-filled"
                      error
                    >
                      {note}
                    </FormHelperText>
                  ))}
                </Box>
              )}

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
};

export default UpdatePassword;

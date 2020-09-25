import React from 'react';
import {
  Button,
  TextField,
  Box,
  FormHelperText,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Formik } from 'formik';
import { showNotification } from '../../redux/actions/HttpNotifications';
import localization from '../../localization';
import * as validators from '../../services/inputValidators';
import api from '../../api';

const initialUpdateValues = { newPassword: '', confirmedPassword: '' };

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const { token } = useParams();
  const history = useHistory();

  const handleOnSubmit = (values, setSubmitting, setErrors) => {
    setSubmitting(true);
    api
      .setNewPassword(token, { password: values.newPassword })
      .then(() => {
        dispatch(showNotification('Password updated!'));
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

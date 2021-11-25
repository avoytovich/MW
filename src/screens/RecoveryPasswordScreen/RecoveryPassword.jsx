import React, { useState } from 'react';

import {
  Button,
  Typography,
  TextField,
  Box,
  FormHelperText,
  CircularProgress,
} from '@material-ui/core';
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { Formik } from 'formik';

import * as validators from '../../services/helpers/inputValidators';
import localization from '../../localization';
import api from '../../api';

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

  const theme = createMuiTheme();
  theme.palette.resetBtn = theme.palette.augmentColor({
    main: "#19a6ff",
    dark: "#0971b3",
  });

  const isResetBtn = style => props =>
    props.color === "resetBtn" && props.variant === "contained" ? style : {};

    theme.overrides = {
      MuiButton: {
        root: {
          backgroundColor: isResetBtn(theme.palette.resetBtn.main),
          "&:hover": {
            backgroundColor: isResetBtn(theme.palette.resetBtn.dark)
          }
        }
      }
    };

  return emailSend ? (
    <Box mb={4}>
      <Typography m="100px" variant="h3" color="textPrimary">
        {localization.t('general.checkYourEmailToResetThePassword')}
      </Typography>
    </Box>
  ) : (
    <>
      <Box width={420} display='contents'>
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
              width={1420}
            >
              <TextField
                error={touched.email && !!errors.email}
                fullWidth
                helperText={touched.email && errors.email}
                label="Email Address"
                margin="normal"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                type="email"
                value={values.email}
                variant="outlined"
                inputProps={{style: { WebkitBoxShadow: "0 0 0 1000px white inset" }}}
              />
              <Box mt={2}>
                <ThemeProvider theme={theme}>
                  <Button
                    color="resetBtn"
                    disabled={
                      Object.keys(errors).length !== 0
                      || !values.email
                      || isSubmitting
                    }
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    style={{ borderRadius: 0, color: '#ffffff' }}
                    >
                    {isSubmitting ? <CircularProgress size={26} /> : localization.t('general.reset')}
                  </Button>
                </ThemeProvider>
                {errors.message && (
                  <Box mt={3}>
                    <FormHelperText error>{errors.message}</FormHelperText>
                  </Box>
                )}
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default RecoveryPassword;

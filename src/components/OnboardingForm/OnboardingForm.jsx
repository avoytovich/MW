import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Button,
  TextField,
  CircularProgress,
  Typography,
} from '@mui/material';

import { Formik } from 'formik';
import localization from '../../localization';
import api from '../../api';
import Recaptcha from '../Recaptcha';

const initialValues = {
  companyName: '', email: '', confirmEmail: '', firstName: '', lastName: '',
};

const OnboardingForm = ({ realmData }) => {
  const captchaRef = useRef(null);
  const [isCaptha, setCaptha] = useState(true);
  const [isSent, setSent] = useState(false);
  const [error, setError] = useState(false);

  const handleOnSubmit = async ({
    companyName, email, confirmEmail, firstName, lastName, setSubmitting,
  }) => {
    setSubmitting(true);
    const token = captchaRef.current.getValue();
    let data = {
      companyName,
      email,
      confirmEmail,
      firstName,
      lastName,
      platformTarget: 'IAP',
    };
    if (realmData.id !== 'Nexway') {
      data = {
        customerId: realmData.id, ...data,
      };
    }
    try {
      await api.sendConfirmationMailOnboardScreen(token, data)
        .catch((err) => {
          setError(!!err);
          setSubmitting(false);
        });
      setSent(!isSent);
    } catch (e) {
      setError(!!e);
      setSubmitting(false);
    }
  };

  return (
    <>
      {isSent && !error ? (
        <Box pt={4} pb={2}>
          <Typography variant="h2" color='green'>{localization.t('forms.text.onboardTextAfterSending')}</Typography>
        </Box>
      ) : (
        <Formik
          className="formik"
          initialValues={initialValues}
          onSubmit={(values, {
            setSubmitting,
          }) => handleOnSubmit({ ...values, setSubmitting })}
          validate={(values) => {
            const errors = {};
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
              errors.email = 'Invalid email address';
            } else if (values.email !== values.confirmEmail) {
              errors.confirmEmail = 'does not match `Email`';
            }
            return errors;
          }}
        >
          {({
            errors,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
          }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                required
                error={touched.companyName && errors.companyName}
                fullWidth
                helperText={touched.companyName && errors.companyName}
                label={localization.t('forms.inputs.companyName')}
                margin="normal"
                name="companyName"
                onChange={handleChange}
                type="text"
                value={values.companyName}
                variant="outlined"
                inputProps={{ form: { autocomplete: 'off' }, style: { WebkitBoxShadow: '0 0 0 1000px white inset' } }}
              />
              <TextField
                required
                error={touched.email && errors.email}
                fullWidth
                helperText={touched.email && errors.email}
                label={localization.t('forms.inputs.email')}
                margin="normal"
                name="email"
                onChange={handleChange}
                type="email"
                value={values.email}
                variant="outlined"
                inputProps={{ autoComplete: 'new-email', style: { WebkitBoxShadow: '0 0 0 1000px white inset' } }}
              />
              <TextField
                error={touched.confirmEmail && errors.confirmEmail}
                required
                fullWidth
                helperText={touched.confirmEmail && errors.confirmEmail}
                label={localization.t('forms.inputs.confirmEmail')}
                margin="normal"
                name="confirmEmail"
                onChange={handleChange}
                type="email"
                value={values.confirmEmail}
                variant="outlined"
                inputProps={{ autoComplete: 'new-email', style: { WebkitBoxShadow: '0 0 0 1000px white inset' } }}
              />
              <TextField
                error={touched.firstName && errors.firstName}
                required
                fullWidth
                helperText={touched.firstName && errors.firstName}
                label={localization.t('forms.inputs.firstName')}
                margin="normal"
                name="firstName"
                onChange={handleChange}
                type="text"
                value={values.firstName}
                variant="outlined"
                inputProps={{ autoComplete: 'off', style: { WebkitBoxShadow: '0 0 0 1000px white inset' } }}
              />
              <TextField
                error={touched.lastName && errors.lastName}
                required
                fullWidth
                helperText={touched.lastName && errors.lastName}
                label={localization.t('forms.inputs.lastName')}
                margin="normal"
                name="lastName"
                onChange={handleChange}
                type="text"
                value={values.lastName}
                variant="outlined"
                inputProps={{ autoComplete: 'off', style: { WebkitBoxShadow: '0 0 0 1000px white inset' } }}
              />

              <Recaptcha setCaptha={setCaptha} ref={captchaRef} />

              <Box m='auto' width='20%'>
                <Button
                  color='loginBtns'
                  disabled={
                    isCaptha || isSubmitting
                  }
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  style={{ borderRadius: 0, color: '#ffffff', margin: '10px 0px 30px 0px' }}
                >
                  {isSubmitting ? <CircularProgress size={26} /> : localization.t('forms.buttons.signUp')}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      )}
    </>
  );
};

OnboardingForm.propTypes = {
  realmData: PropTypes.object,
};

export default OnboardingForm;

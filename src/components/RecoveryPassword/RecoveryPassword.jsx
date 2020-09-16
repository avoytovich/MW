import React from 'react';
import localization from '../../localization';
import { Formik } from 'formik';
import {
    Button, Typography,
    TextField,
    Box,
    Container,
    FormHelperText
} from '@material-ui/core';
import api from '../../api'
import * as validators from '../../services/inputValidators'

const RecoveryPassword = () => {
    return (
        <Container maxWidth="md">
            <Box mt={3}>
                <Typography variant='h1' color="textSecondary">{localization.t('general.forgotPassword')}</Typography>
                <Typography variant="body1">{localization.t('general.forgotPasswordMessage')}</Typography>
                <Formik
                    initialValues={{ email: '' }}
                    validate={(values) => validators.email(values)}
                    onSubmit={(values, { setSubmitting, setErrors }) => {
                        api.recoverPassword({ email: values.email })
                            .catch(error => { setSubmitting(false); setErrors({ message: error.response.data.error }) })
                    }}
                >{({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting
                }) =>
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
                                color="secondary"
                                disabled={Object.keys(errors).length !== 0 || !values.email || isSubmitting}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                            >
                                {localization.t('general.getInstructions')}
                            </Button>
                            {errors.message && (
                                <Box mt={3}>
                                    <FormHelperText error>
                                        {errors.message}
                                    </FormHelperText>
                                </Box>
                            )}
                        </Box>
                    </form>
                    }
                </Formik>
            </Box>
        </Container >)

}

export default RecoveryPassword;

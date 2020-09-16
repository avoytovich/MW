import React, { useState } from 'react';
import localization from '../../localization';
import { Formik } from 'formik';
import * as validators from '../../services/inputValidators'
import api from '../../api'
import {
    Button, Typography,
    TextField,
    Box,
    Container, FormHelperText
} from '@material-ui/core';
import { useHistory, useParams } from "react-router-dom";

const UpdatePassword = (props) => {
    let { token } = useParams()
    let history = useHistory();
    return (
        <Container maxWidth="md">
            <Box mt={3}>
                <Formik
                    validate={(values) => validators.updatePassword(values)}

                    initialValues={{ newPassword: '', confirmedPassword: '' }}
                    onSubmit={(values, { setSubmitting, setErrors }) => {
                        setSubmitting(true)
                        api.setNewPassword(token, { password: values.newPassword }).then(() => history.push('/'))
                            .catch(error => { setSubmitting(false); setErrors({ message: error.response.data.error }) })
                    }}
                >{({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) =>
                    <form noValidate onSubmit={handleSubmit}>
                        <TextField
                            // error={Boolean(touched.newPassword && errors.length || touched.newPassword && errors.letterCase)}
                            fullWidth
                            // helperText={touched.newPassword && errors.length}
                            // helperText={touched.newPassword && errors.letterCase}

                            label=" New Password"
                            margin="normal"
                            name="newPassword"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="text"
                            value={values.newPassword}
                            variant="outlined"
                        />
                        <TextField
                            error={Boolean(touched.confirmedPassword && errors.matches)}
                            fullWidth
                            helperText={touched.confirmedPassword && errors.matches}
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
                                color="secondary"
                                disabled={Object.keys(errors).length !== 0 || !values.newPassword || isSubmitting}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                            >
                                {localization.t('general.setNewPassword')}
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

export default UpdatePassword

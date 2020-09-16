import React, { useState } from 'react';
import localization from '../../localization';
import api from '../../api'
import {
    Button, Typography,
    TextField,
    Box,
    Container
} from '@material-ui/core';
import { useParams } from "react-router-dom";

const RecoveryPassword = () => {

    return (
        <Container maxWidth="md">
            <Box mt={3}>
                <Formik
                    initialValues={{ newPassword: '', confirmedPassword: '' }}
                    onSubmit={}
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
                            error={Boolean(touched.password && errors.password)}
                            fullWidth
                            helperText={touched.password && errors.password}
                            label="Password"
                            margin="normal"
                            name="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="password"
                            value={values.newPassword}
                            variant="outlined"
                        />
                        <TextField
                            error={Boolean(touched.password && errors.password)}
                            fullWidth
                            helperText={touched.password && errors.password}
                            label="Confirm Password"
                            margin="normal"
                            name="confirmPassword"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="password"
                            value={values.confirmedPassword}
                            variant="outlined"
                        />
                        <Box mt={2}>
                            <Button
                                color="secondary"
                                // disabled={isSubmitting}
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
                    </form>}
                </Formik>
            </Box>
        </Container>)

}

export default RecoveryPassword;

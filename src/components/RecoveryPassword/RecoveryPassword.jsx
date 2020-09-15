import React, { useState } from 'react';
import localization from '../../localization';
import api from '../../api'
import {
    Button, Typography,
    TextField,
    Box,
    Container
} from '@material-ui/core';


const RecoveryPassword = () => {
    const [inputValue, setInputValue] = useState('')
    return (
        <Container maxWidth="md">
            <Box mt={3}>
                <Typography variant='h1' color="textSecondary">{localization.t('general.forgotPassword')}</Typography>
                <Typography variant="body1">{localization.t('general.forgotPasswordMessage')}</Typography>
                <form
                    noValidate
                    onSubmit={(e) => {
                        e.preventDefault()
                        api.recoverPassword({ email: inputValue })
                    }}
                >
                    <TextField
                        // error={Boolean(touched.email && errors.email)}
                        fullWidth
                        autoFocus
                        // helperText={touched.email && errors.email}
                        label="Email Address"
                        margin="normal"
                        name="email"
                        // onBlur={handleBlur}
                        onChange={(e) => setInputValue(e.target.value)}
                        type="email"
                        value={inputValue}
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
                            {localization.t('general.getInstructions')}
                        </Button>
                        {/* {errors.submit && (
                <Box mt={3}>
                    <FormHelperText error>
                        {errors.submit}
                    </FormHelperText>
                </Box>
            )} */}
                    </Box>
                </form>
            </Box>
        </Container>)

}

export default RecoveryPassword;

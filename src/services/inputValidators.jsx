
export const email = (values) => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Required';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address';
    }
    return errors;
}


export const updatePassword = (values) => {
    const errors = {};
    if (values.newPassword !== values.confirmedPassword) {
        errors.confirmedPassword = 'Confirmed password should match to new password'
    }
    return errors;
}
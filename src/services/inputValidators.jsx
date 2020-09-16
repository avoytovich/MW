
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
        errors.matches = 'Confirmed password should match to new password'
    }
    if (values.newPassword.length < 6) {
        errors.length = 'at least 6 characters'
    } else if (values.newPassword.length > 20) {
        errors.length = 'less than 20 characters'
    }
    if (!/(?=.*[a-z])/.test(values.newPassword)) {
        errors.letterCase = 'contains at least 1 lowercase character'
    } else if (!/(?=.*[A-Z])/.test(values.newPassword)) {
        errors.letterCase = 'contains at least 1 uppercase character'
    }
    if (!/(?=.*\d)/.test(values.newPassword)) {
        errors.digit = 'contains at least 1 digit from 0-9'

    }
    if (!/(^\S*$)/.test(values.newPassword)) {
        errors.space = 'contains no space'
    }
    return errors;
}
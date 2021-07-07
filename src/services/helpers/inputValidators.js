import localization from '../../localization';

export const email = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = localization.t('errorNotifications.required');
  } else if (!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i).test(values.email)) {
    errors.email = localization.t('errorNotifications.invalidEmailAddress');
  }

  return errors;
};

// eslint-disable-next-line no-useless-escape
export const urlIsValid = (value) => (/(http(s)?:\/\/.)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g).test(value);

export const updatePassword = (values) => {
  const errors = {};
  const notifications = [];

  if (values.newPassword !== values.confirmedPassword) {
    errors.matches = localization.t('errorNotifications.passwordConfirmationMatch');
    notifications.push(localization.t('errorNotifications.passwordConfirmationMatch'));
  }

  if (values.newPassword.length < 6) {
    notifications.push(localization.t('errorNotifications.atLeast6Characters'));
  }

  if (values.newPassword.length > 20) {
    notifications.push(localization.t('errorNotifications.lessThan20Characters'));
  }

  if (!(/(?=.*[a-z])/).test(values.newPassword)) {
    notifications.push(localization.t('errorNotifications.containsAtLeast1LowercaseCharacter'));
  }

  if (!(/(?=.*[A-Z])/).test(values.newPassword)) {
    notifications.push(localization.t('errorNotifications.containsAtLeast1UppercaseCharacter'));
  }

  if (!(/(?=.*\d)/).test(values.newPassword)) {
    notifications.push(localization.t('errorNotifications.containsAtLeast1DigitFrom0to9'));
  }

  if (!(/(^\S*$)/).test(values.newPassword)) {
    notifications.push(localization.t('errorNotifications.containsNoSpace'));
  }

  if (notifications.length) {
    errors.notifications = [...notifications];
  }

  return errors;
};

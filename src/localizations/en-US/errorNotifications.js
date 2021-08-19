const errorNotifications = {
  passwordConfirmationMatch: 'password confirmation match',
  atLeast6Characters: 'at least 6 characters',
  lessThan20Characters: ' less than 20 characters',
  containsAtLeast1LowercaseCharacter: 'contains at least 1 lowercase character',
  containsAtLeast1UppercaseCharacter: 'contains at least 1 uppercase character',
  containsAtLeast1DigitFrom0to9: 'contains at least 1 digit from 0-9',
  containsNoSpace: 'contains no space',
  required: 'Required',
  invalidEmailAddress: 'Invalid email address',
  badRequest: 'Bad Request',
  unauthorized: 'Unauthorized',
  forbidden: 'Forbidden',
  notFound: 'Not Found',
  conflict: 'Conflict',
  preconditionFailed: 'Precondition Failed',
  internalServerError: 'Internal Server Error',
  timeout: 'Timeout',
  network: 'Network',
  otherError: 'Something went wrong, please try again later!',
  sourceProductIsAmongstItsOwnRecommendations:
    'Source product is amongst its own recommendations',
  invalidUrl: 'Must be a valid https:// scheme URL',
};

export default errorNotifications;

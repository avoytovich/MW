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
  invalidVatNumber: 'Invalid vat number',
  hasNotGivenConsent: ' Has not given consent (refused or not asked yet)',
  loadingError: 'Loading error',
  couldNotLoadNeededResources: 'Could not load needed resources :(',
  minShouldBeSmallerThanMax: 'Min should be < than max',
  maxShouldBeBiggerThanMin: 'Max should be > than min',
  defaultValueShouldBeBetweenMinOrMaxOrEqual: 'Default value should be between min or max, or equal to one of them',
  alreadyExists: 'Already exists',
  fieldIsRequired: 'Field is required',
  groupDoesNotReferenceAnyPaymentType: 'Group does not reference any payment type',
  groupDoesNotReferenceAnyCountry: 'Group does not reference any country',
  deliveryRemarkIsMandatory: 'Delivery remark is mandatory on default locale as soon as a delivery remark is set for some locale',
  canNotBeEmpty: 'Cannot be empty',
  pleaseUploadTheLicenseKeyPackageInCsvFormat: 'Please upload the license key package in CSV format',
  googleTagManagerIdShouldContains: 'Google Tag Manager ID should start with "GTM" prefix and contain only uppercase letters and numbers',
  forDefaultLanguageCanNotBeEmpty: 'for default language can not be empty',
  nothingFound: 'Nothing found',
  senderNameExactly: 'Must be exactly as: ',
  senderNameStartWith: 'or start with: ',
  senderNameEnd: 'and contain only email-friendly characters.',
  urlIsNotValid: 'url is not valid',
  isNotValid: 'is not valid',
  isMandatoryForTheDefaultLanguage: 'is mandatory for the default language, as soon as it is set for some language.',
  isRequired: 'is required',
  subscriptionCanBeCoppedOnlyWithGeneralSection: 'Subscription can be copped only with General section',
};

export default errorNotifications;

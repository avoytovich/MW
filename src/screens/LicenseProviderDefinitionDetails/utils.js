const defaultObject = {
  id: '',
  name: '',
  status: 'Enable',
  bodyType: '',
  baseUrl: '',
  customerId: '',
  httpClientConfiguration: {
    httpHeaders: { 'Content-Type': [], Version: [] },
    tlsConfiguration: {
      tlsAuthMode: '', serverCACertificates: '', privateKey: '', clientCertificates: '',
    },
    clientCredentialOauth2Config: {
      clientId: '', clientSecret: '', tokenUrl: '', scopes: [],
    },
  },
  operationDefinitions: {
    fallback: {
      bodyTemplate: '',
      urlComplement: '',
      httpHeaders: { 'Content-Type': [] },
      responsePaths: {
        activationCode: {
          conversionTemplate: '',
          path: '',
        },
        downloadExpireDate: { path: '' },
        downloadURI: { path: '' },
        errorMessage: { path: '' },
      },
    },
  },
  testModeParameters: {
    baseUrl: '',
    httpClientConfiguration: {
      clientCredentialOauth2Config: {
        clientId: '', clientSecret: '', scopes: [], tokenUrl: '',
      },
      httpHeaders: { 'Content-Type': [], Version: [] },
      tlsConfiguration: {
        clientCertificates: '', privateKey: '', serverCACertificates: '', tlsAuthMode: '',
      },
    },
  },
  permanentErrorsDefinition: { httpStatusCodes: [] },
};

const combineObjects = (def, fetched) => {
  const defaultObj = { ...def };
  const fetchedObj = { ...fetched };
  return Object.keys(defaultObj).reduce((accumulator, key) => {
    const isObject = typeof defaultObj[key] === 'object';
    const isArray = Array.isArray(defaultObj[key]);
    const emptyArray = isArray && !Array.isArray(fetchedObj[key]);
    let value;
    if (isObject && !isArray) {
      value = combineObjects(defaultObj[key], fetchedObj[key]);
    } else if (emptyArray) {
      value = defaultObj[key];
    } else {
      value = fetched ? fetched[key] : undefined;
    }
    const isEmptyObject = isObject && !Object.keys(value).length;
    if (value === '' || value === undefined || isEmptyObject) {
      value = defaultObj[key];
    }
    return Object.assign(accumulator, { [key]: value });
  }, {});
};

const checkRequiredFields = (data) => combineObjects(defaultObject, data);

export { checkRequiredFields, defaultObject };

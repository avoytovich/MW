const defInputs = ['localizedShortDesc', 'localizedLongDesc'];

const generateLocals = (longDesc, shortDesc) => {
  const res = {};
  Object.keys(shortDesc).forEach((shortKey) => {
    res[shortKey] = { localizedShortDesc: shortDesc[shortKey], localizedLongDesc: '' };
  });
  Object.keys(longDesc).forEach((longKey) => {
    res[longKey] = { ...res[longKey], localizedLongDesc: longDesc[longKey] };
  });
  return res;
};
const beforeSend = (data) => {
  const res = { ...data };
  const localizedLongDesc = {};
  const localizedShortDesc = {};
  Object.keys(data.localizedContent).forEach((key) => {
    localizedLongDesc[key] = data.localizedContent[key].localizedLongDesc;
    localizedShortDesc[key] = data.localizedContent[key].localizedShortDesc;
  });
  delete res.localizedContent;
  return { ...res, localizedLongDesc, localizedShortDesc };
};
const defaultEndUserGroup = {
  fallbackLocale: 'en-US',
  localizedBanner: {},
  localizedLogo: {},
  localizedLongDesc: { 'en-US': '' },
  localizedShortDesc: { 'en-US': '' },
};
export {
  defInputs,
  generateLocals,
  defaultEndUserGroup,
  beforeSend,
};

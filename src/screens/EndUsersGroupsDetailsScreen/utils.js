/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import { urlIsValid } from '../../services/helpers/inputValidators';
import localization from '../../localization';

const localizedContentDefObject = {
  localizedShortDesc: '',
  localizedLongDesc: '',
  localizedLogo: '',
  bannerImageUrl: '',
  bannerLinkUrl: '',
};
const defInputs = ['localizedShortDesc', 'localizedLongDesc', 'localizedLogo', 'bannerImageUrl', 'bannerLinkUrl'];
const tinyInputs = ['localizedShortDesc', 'localizedLongDesc'];
const requiredFields = ['localizedShortDesc'];
const generateLocals = (longDesc = {}, shortDesc = {}, locLogo = {}, locBanner = {}) => {
  const res = {};
  Object.keys(shortDesc).forEach((shortKey) => {
    res[shortKey] = { ...localizedContentDefObject, localizedShortDesc: shortDesc[shortKey] };
  });
  Object.keys(longDesc).forEach((longKey) => {
    res[longKey] = { ...res[longKey], localizedLongDesc: longDesc[longKey] };
  });
  Object.keys(locLogo).forEach((logoKey) => {
    res[logoKey] = { ...res[logoKey], localizedLogo: locLogo[logoKey].url };
  });
  Object.keys(locBanner).forEach((bannerKey) => {
    res[bannerKey] = { ...res[bannerKey], bannerImageUrl: locBanner[bannerKey].url };
    res[bannerKey] = { ...res[bannerKey], bannerLinkUrl: locBanner[bannerKey].href };
  });
  return res;
};

const beforeSend = (data) => {
  const res = { ...data };
  const localizedLongDesc = {};
  const localizedShortDesc = {};
  const localizedBanner = {};
  const localizedLogo = {};
  Object.keys(data.localizedContent).forEach((key) => {
    if (data.localizedContent[key].localizedLongDesc) {
      localizedLongDesc[key] = data.localizedContent[key].localizedLongDesc;
    }
    if (data.localizedContent[key]?.localizedShortDesc) {
      localizedShortDesc[key] = data.localizedContent[key].localizedShortDesc;
    }
    if (data.localizedContent[key].localizedLogo) {
      localizedLogo[key] = {};
      localizedLogo[key].url = data.localizedContent[key].localizedLogo;
    }
    if (data.localizedContent[key].bannerImageUrl) {
      localizedBanner[key] = {};
      localizedBanner[key].url = data.localizedContent[key].bannerImageUrl;
    }
    if (data.localizedContent[key].bannerLinkUrl) {
      localizedBanner[key] = localizedBanner[key] ? { ...localizedBanner[key] } : {};
      localizedBanner[key].href = data.localizedContent[key].bannerLinkUrl;
    }
  });
  delete res.localizedContent;
  return {
    ...res,
    localizedLongDesc,
    localizedShortDesc,
    localizedBanner,
    localizedLogo,
  };
};
const defaultEndUserGroup = {
  fallbackLocale: 'en-US',
  localizedBanner: {},
  localizedLogo: {},
  localizedLongDesc: {},
  localizedShortDesc: { 'en-US': '' },
};
const validateFields = (currentData, errors, defaultLocale) => {
  const newErrors = { ...errors };

  const notValidFields = Object.keys(currentData).filter((item) => {
    if (currentData[item]?.localizedShortDesc === '' && defaultLocale !== item) {
      return item;
    }
  });

  const notValidRequiredFields = [];
  Object.keys(currentData).forEach((it) => {
    Object.keys(currentData[it]).forEach((u) => {
      if (currentData[it][u] && !currentData[defaultLocale][u]
        && !notValidRequiredFields.includes(localization.t(`forms.inputs.localizedContent.${u}`))) {
        notValidRequiredFields.push(localization.t(`forms.inputs.localizedContent.${u}`));
      }
    });
  });
  const notValidLogoUrl = Object.keys(currentData).filter((item) => (
    !urlIsValid(currentData[item].localizedLogo) && currentData[item].localizedLogo));
  const notValidBannerImageUrl = Object.keys(currentData).filter((item) => (
    !urlIsValid(currentData[item].bannerImageUrl) && currentData[item].bannerImageUrl));
  const notValidLinkImageUrl = Object.keys(currentData).filter((item) => (
    !urlIsValid(currentData[item].bannerLinkUrl) && currentData[item].bannerLinkUrl));

  if (currentData[defaultLocale]?.localizedShortDesc === '' && !notValidRequiredFields.includes(localization.t('forms.inputs.localizedContent.localizedShortDesc'))) {
    notValidRequiredFields.push(localization.t('forms.inputs.localizedContent.localizedShortDesc'));
  }
  if (notValidFields.length > 0) {
    newErrors.localizedContent = [...notValidFields];
  } else {
    delete newErrors.localizedContent;
  }

  if (notValidRequiredFields.length > 0) {
    newErrors.defaultLocalizedContent = [...notValidRequiredFields];
  } else {
    delete newErrors.defaultLocalizedContent;
  }

  if (notValidLogoUrl.length) {
    newErrors.localizedLogo = [...notValidLogoUrl];
  } else {
    delete newErrors.localizedLogo;
  }
  if (notValidBannerImageUrl.length) {
    newErrors.bannerImageUrl = [...notValidBannerImageUrl];
  } else {
    delete newErrors.bannerImageUrl;
  }
  if (notValidLinkImageUrl.length) {
    newErrors.bannerLinkUrl = [...notValidLinkImageUrl];
  } else {
    delete newErrors.bannerLinkUrl;
  }
  return newErrors;
};
export {
  defInputs,
  generateLocals,
  defaultEndUserGroup,
  beforeSend,
  tinyInputs,
  validateFields,
  localizedContentDefObject,
  requiredFields,
};

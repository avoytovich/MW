import { urlIsValid } from '../../../services/helpers/inputValidators';
import localization from '../../../localization';

const tinyApiKey = 'se7x7gpvgb27p864drb8azmziv0pjikrjogirc7hqcsd5fng';

const textEditorInputs = [
  'deliveryRemark',
  'localizedShortDesc',
  'localizedLongDesc',
  'recommendationDescription',
  'localizedLongDesc',
  'localizedManualRenewalEmailDesc',
  'localizedMarketingName',
  'localizedPurchaseEmailDesc',
  'localizedShortDesc',
  'localizedThankYouDesc',
];

const inputValidations = {
  endusergroups: { inputs: ['localizedLogo', 'bannerImageUrl', 'bannerLinkUrl'], func: urlIsValid, message: 'isNotValid' },
};
const inputOrder = {
  productlist: [
    'localizedMarketingName',
    'localizedShortDesc',
    'localizedLongDesc',
    'localizedThankYouDesc',
    'localizedPurchaseEmailDesc',
    'localizedManualRenewalEmailDesc',
  ],
};

const defaultObj = {
  stores: { deliveryRemark: '' },
  endusergroups: {
    localizedShortDesc: '',
    localizedLongDesc: '',
    localizedLogo: '',
    bannerImageUrl: '',
    bannerLinkUrl: '',
  },
  discountrules: { discountLabel: '' },
  recommendations: { recommendationDescription: '' },
  productlist:
  {
    localizedLongDesc: '',
    localizedManualRenewalEmailDesc: '',
    localizedMarketingName: '',
    localizedPurchaseEmailDesc: '',
    localizedShortDesc: '',
    localizedThankYouDesc: '',
  },
  productVariation: {
    localizedLongDesc: { parentValue: '', state: 'overrides', value: '' },
    localizedManualRenewalEmailDesc: { parentValue: '', state: 'overrides', value: '' },
    localizedMarketingName: { parentValue: '', state: 'overrides', value: '' },
    localizedPurchaseEmailDesc: { parentValue: '', state: 'overrides', value: '' },
    localizedShortDesc: { parentValue: '', state: 'overrides', value: '' },
    localizedThankYouDesc: { parentValue: '', state: 'overrides', value: '' },
  },
};
const requiredFields = { endusergroups: ['localizedShortDesc'], productlist: ['localizedMarketingName'] };

const verticalStyles = {
  tabs: { borderRight: '1px solid #e2e2e2', height: '100%' },
  inputBox: {
    paddingLeft: '24px',
    paddingRight: '24px',
  },
  errorText: { paddingLeft: ' 24px' },
};
const horizontalStyles = {
  tabs: { borderBottom: '1px solid #e2e2e2' },

  box: {
    paddingLeft: '12px',
    paddingRight: '12px',
  },
  inputBox: {
    paddingTop: '12px',
  },
};
const getStyles = (isVertical, key) => {
  const res = isVertical ? verticalStyles[key] : horizontalStyles[key];
  return res || {};
};
localization.t('labels.naming[scope].content');
const naming = {
  recommendations: { content: 'description', defaultLocale: 'fallbackLocale' },
  stores: { content: 'localizedContent', defaultLocale: 'defaultLanguage' },
  productlist: { content: 'localizedContent', defaultLocale: 'defaultLanguage' },
  endusergroups: { content: 'localizedContent', defaultLocale: 'fallbackLocale' },
};

const getNaming = (scope) => {
  const content = localization.t(`labels.${naming[scope]?.content}`);
  const defaultLocale = localization.t(`labels.${naming[scope]?.defaultLocale}`);
  return `${localization.t('general.forAdding')}  ${content}, ${defaultLocale} ${localization.t('general.needsToBeSelected')}`;
};
const tooltips = { discountrules: { discountLabel: localization.t('tooltips.discountLabel') } };
export {
  textEditorInputs,
  inputValidations,
  tinyApiKey,
  defaultObj,
  requiredFields,
  verticalStyles,
  horizontalStyles,
  getStyles,
  inputOrder,
  getNaming,
  tooltips,
};

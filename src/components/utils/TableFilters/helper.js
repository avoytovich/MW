import localization from '../../../localization';

const placeholderData = (scope) => {
  switch (scope) {
    case 'orderlist':
      return localization.t('labels.searchById');
    case 'subscriptions':
      return localization.t('labels.searchByIdName');
    case 'licenses':
      return localization.t('labels.searchById');
    case 'carts':
      return localization.t('labels.searchById');
    case 'stores':
      return localization.t('labels.searchByIdName');
    case 'productlist':
      return localization.t('labels.searchByIdName');
    case 'prices':
      return localization.t('labels.searchByIdName');
    case 'recommendations':
      return localization.t('labels.searchByRuleName');
    case 'discountrules':
      return localization.t('labels.searchByRuleName');
    case 'marketingCampaigns':
      return localization.t('labels.searchByName');
    case 'marketingAbandoned':
      return localization.t('labels.searchByName');
    case 'enduserlist':
      return localization.t('labels.searchByEmail');
    case 'endusergroups':
      return localization.t('labels.searchByIdName');
    case 'resellers':
      return localization.t('labels.searchByIdEmail');
    case 'realms':
      return localization.t('labels.searchById');
    default:
      return null;
  }
};

export {
  placeholderData,
};

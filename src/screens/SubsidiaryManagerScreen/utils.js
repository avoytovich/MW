import api from '../../api';
import { generateData as generateSubsidiaries, defaultShow as defaultShowSubsidiaries, markUp as markSubsidiaries } from '../../services/useData/tableMarkups/subsidiary';
import localization from '../../localization';
import parentPaths from '../../services/paths';

const tabsData = [
  {
    label: 'subsidiaries',
    path: parentPaths.subsidiaryManager.subsidiariesTab,
    request: api.getSubsidiary,
    sortKey: 'subsidiaries',
    generateData: generateSubsidiaries,
    defaultShow: defaultShowSubsidiaries,
    scope: 'subsidiaries',
    headers: markSubsidiaries.headers,
    button: `${localization.t('general.add')} ${localization.t(
      'labels.subsidiary',
    )}`,
    deleteFunc: api.deleteSubsidiaryById,
  },
  // {
  //   label: 'subsidiaryRules',
  //   path: parentPaths.subsidiaryManager.subsidiaryRulesTab,
  //   request:,
  //   generateData: ,
  //   defaultShow: ,
  //   sortKey: 'subsidiaryrules',
  //   scope: 'subsidiaryrules',
  //   headers:
  //   button:,
  //   )}`,
  //   deleteFunc: api.deleteLocaleById,
  // },

];

export default tabsData;

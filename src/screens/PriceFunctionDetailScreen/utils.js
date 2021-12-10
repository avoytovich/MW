import { removeEmptyPropsInObject } from '../../services/helpers/dataStructuring';
import localization from '../../localization';

const defaultLabelObj = { id: '', translation: '' };

const defParameterObj = {
  defaultValue: '',
  field: '',
  labels: {},
  max: '',
  min: '',

};
const defPriseFuncObj = {
  variables: [],
  expression: '',
  parameters: [],
  productFields: [],
};
const parametersToObj = (data) => {
  const res = {};
  if (data) {
    data.forEach((item, index) => {
      const labels = {};
      if (item.labels) {
        Object.keys(item.labels).forEach((label, i) => {
          labels[i] = { id: label, translation: item.labels[label] };
        });
      }
      const keys = Object.keys(labels);
      labels[keys.length] = { ...defaultLabelObj };
      res[index] = { ...defParameterObj, ...item, labels };
    });
  }
  return res;
};

const checkRequiredFields = (data, customerName) => ({ ...defPriseFuncObj, ...data, customerName });

const beforeSend = (data, curParameters) => {
  const newData = { ...data };
  const newParams = removeEmptyPropsInObject(curParameters);

  delete newData.customerName;
  const parameters = Object.keys(newParams).map((param) => {
    const labels = {};
    newParams[param].type = 'INTEGER';
    if (newParams[param].labels) {
      Object.keys(newParams[param].labels).forEach((item) => {
        if (newParams[param]?.labels[item]?.id) {
          labels[newParams[param].labels[item].id] = newParams[param].labels[item].translation;
        }
      });
    }
    return Object.keys(labels).length > 0 ? {
      ...newParams[param], labels,
    } : { ...newParams[param] };
  });
  const res = removeEmptyPropsInObject({ ...newData, parameters });
  return res;
};

const validateMinMaxDefault = (minVal, maxVal, defaultVal) => {
  let res = { min: '', max: '', defaultValue: '' };
  const min = localization.t('errorNotifications.minShouldBeSmallerThanMax');
  const max = localization.t('errorNotifications.maxShouldBeBiggerThanMin');
  const defaultValue = localization.t('errorNotifications.defaultValueShouldBeBetweenMinOrMaxOrEqual');

  if (Number(minVal) >= Number(maxVal)) {
    res = { ...res, min, max };
  } else if (res?.min) {
    delete res.min;
    delete res.max;
  }
  if (Number(defaultVal) > Number(maxVal) || Number(defaultVal) < Number(minVal)) {
    res = { ...res, defaultValue };
  } else if (res?.defaultValue) {
    delete res.defaultValue;
  }
  return Object.keys(res).length > 0 ? res : {};
};

const validateParamField = (curValue, data, curKey) => {
  const existError = localization.t('errorNotifications.alreadyExists');
  const isRequired = localization.t('errorNotifications.fieldIsRequired');
  const res = { field: '' };
  const isExist = Object.keys(data).filter((key) => key !== curKey && curValue === data[key].field);
  if (!curValue) {
    res.field = isRequired;
  } else if (isExist.length > 0) {
    res.field = existError;
  } else if (res[curKey]) {
    delete res.field;
  }
  return res;
};

export {
  parametersToObj,
  checkRequiredFields,
  defParameterObj,
  defaultLabelObj,
  beforeSend,
  validateMinMaxDefault,
  validateParamField,
};

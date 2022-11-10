/* eslint-disable import/prefer-default-export */
import { removeEmptyPropsInObject } from '../../../services/helpers/dataStructuring';
import { requiredFields } from './inputsConfig';

const handleValidate = (allLang, defaultLang, scope, additionalValidation, requiredOnlyDefault) => {
  const allErrors = {};
  const defaultLangObj = { ...allLang[defaultLang] };
  const langObj = { ...allLang };
  delete langObj[defaultLang];

  Object.keys(allLang).forEach((it) => { allErrors[it] = {}; });
  const emptyDefFields = Object.keys(defaultLangObj).filter((el) => !defaultLangObj[el]);

  emptyDefFields.forEach((emptyField) => {
    Object.keys(langObj).forEach((lang) => {
      if (langObj[lang][emptyField]
        && !allErrors[defaultLang].canNotBeEmpty?.includes(emptyField)
        && !requiredFields?.[scope]?.includes(emptyField)) {
        if (allErrors[defaultLang].canNotBeEmpty) {
          allErrors[defaultLang].canNotBeEmpty.push(emptyField);
        } else {
          allErrors[defaultLang].canNotBeEmpty = [emptyField];
        }
      }
    });
  });
  requiredFields[scope]?.forEach((reqField) => {
    Object.keys(allLang).forEach((lang) => {
      const isNew = lang !== defaultLang
        && Object.keys(removeEmptyPropsInObject(allLang[lang])).length === 0;
      if (!allLang[lang][reqField]
        && !allErrors[lang]?.isRequired?.includes(reqField) && !isNew) {
        if (allErrors[lang].isRequired) {
          allErrors[lang].isRequired.push(reqField);
        } else if ((lang === defaultLang && requiredOnlyDefault) || !requiredOnlyDefault) {
          allErrors[lang].isRequired = [reqField];
        }
      }
    });
  });

  if (additionalValidation) {
    const { inputs, func, message } = additionalValidation;
    inputs.forEach((additionalField) => {
      Object.keys(allLang).forEach((lang) => {
        if (allLang[lang][additionalField] && !func(allLang[lang][additionalField])
          && !allErrors[lang]?.[message]?.includes(additionalField)) {
          if (allErrors[lang][message]) {
            allErrors[lang][message].push(additionalField);
          } else {
            allErrors[lang][message] = [additionalField];
          }
        }
      });
    });
  }
  return removeEmptyPropsInObject(allErrors);
};

export { handleValidate };

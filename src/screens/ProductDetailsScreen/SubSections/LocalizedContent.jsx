/* eslint-disable react/prop-types */
import React, { useState, useEffect, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Box,
  Tabs,
  Tab,
  LinearProgress,
  Button,
} from '@mui/material';

import { toast } from 'react-toastify';
import ClearIcon from '@mui/icons-material/Clear';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CodeIcon from '@mui/icons-material/Code';
import CodeOffIcon from '@mui/icons-material/CodeOff';

import api from '../../../api';
import { LocalizationInputs, DefaultLanguage } from './LocalizationInputs';

import { SelectCustom } from '../../../components/Inputs';
import { getLanguagesOptions } from '../../../components/utils/OptionsFetcher/OptionsFetcher';
import JsonEditor from '../../../components/JsonEditor';

import {
  checkValue,
  backToFront,
  localizedValues,
  createInheritableValue,
} from '../../../services/helpers/dataStructuring';

import { setTempProductLocales, setTempProductDescription } from '../../../redux/actions/TempData';
import store from '../../../redux/store';

import { saveLocalizationDetails } from '../utils';

const LocalizedContent = ({
  setHasNewData,
  currentProductData,
  parentId,
  storeLanguages,
  setDisabledWithMandLocal,
  setCodeMode,
  codeMode,
  jsonIsValid,
  setJsonIsValid,
}) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [availLocales, setAvailLocales] = useState([]);
  const [curData, setCurData] = useState(null);
  const [newTabValues, setNewTabValues] = useState({});
  const [newLangValue, setNewLangValue] = useState('');
  const [descrRequestData, setDescrRequestData] = useState(null);
  const [descrRequestUpd, setDescrRequestUpd] = useState(0);
  const availableLocales = getLanguagesOptions();
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);

  const makeNewData = (locale, newDef) => {
    const { tempData } = store.getState();

    const dataToSave = {
      ...curData,
      ...tempData?.description,
      i18nFields: {
        ...curData?.i18nFields,
        ...tempData?.i18nFields,
      },
    };

    if (!dataToSave.i18nFields[locale || value]) {
      dataToSave.i18nFields[locale || value] = newDef ? {} : { ...newTabValues };
    }

    if (newDef) {
      if (!curData?.i18nFields[locale] || !curData?.i18nFields[locale]?.localizedMarketingName) {
        setDisabledWithMandLocal(true);
      } else {
        setDisabledWithMandLocal(false);
      }

      dataToSave.fallbackLocale = locale;
    }

    setCurData({ ...dataToSave });
    setAvailLocales(() => [...Object.keys(dataToSave?.i18nFields)]);
    dispatch(setTempProductLocales({ ...dataToSave.i18nFields }));
    setHasNewData(true);
  };

  const getValues = (val = value) => {
    const defValues = localizedValues.reduce(
      (acc, cur) => ({
        ...acc,
        [cur]: parentId
          ? {
            value: '',
            state: 'overrides',
            parentValue: '',
          }
          : '',
      }),
      {},
    );

    const inputValues = !checkValue(val)
      ? { ...defValues }
      : { ...defValues, ...curData.i18nFields[checkValue(val)] };

    setNewTabValues({ ...inputValues });
  };

  const removeLocale = (e, locale) => {
    e.stopPropagation();

    const { tempData } = store.getState();

    const dataToSave = {
      ...tempData?.description,
      ...curData,
      i18nFields: {
        ...tempData?.i18nFields,
        ...curData?.i18nFields,
      },
    };

    delete dataToSave.i18nFields[locale];

    setAvailLocales(() => Object.keys(dataToSave.i18nFields).filter((l) => l !== locale));
    setCurData({ ...dataToSave });
    dispatch(setTempProductLocales({ ...dataToSave.i18nFields }));
    setHasNewData(true);

    if (value === locale) {
      setValue(0);
    }
  };

  const addLocale = (defLanguage) => {
    if (newLangValue) {
      if (availLocales.indexOf(newLangValue) < 0) {
        makeNewData(newLangValue);
        setValue(newLangValue);
        setNewLangValue('');
      } else {
        toast.error('Locale already exists!');
      }
    } else if (defLanguage) {
      makeNewData(defLanguage, true);
      setValue(defLanguage);
    }
  };

  const handleChangeDefaultLanguage = (defLanguage) => {
    if (typeof defLanguage === 'string') {
      addLocale(defLanguage);

      setAvailLocales((avail) => [
        defLanguage,
        ...avail.filter((localLanguage) => localLanguage !== defLanguage),
      ]);

      if (curData.i18nFields[value]?.localizedMarketingName) {
        setHasNewData(true);
      }
    } else {
      const curLocale = defLanguage.fallbackLocale.state === 'inherits' ? defLanguage.fallbackLocale.parentValue : defLanguage.fallbackLocale.value;
      addLocale(curLocale);
      setCurData({ ...defLanguage });
      setHasNewData(true);
    }

    dispatch(setTempProductDescription({
      ...curData,
      fallbackLocale: typeof defLanguage === 'string' ? defLanguage : { ...defLanguage?.fallbackLocale },
    }));
  };

  const updateContentByEditor = (content) => {
    if (descrRequestData !== content) {
      try {
        const data = JSON.parse(content);
        const avail = [];

        localizedValues.forEach((it) => {
          if (data[it]) {
            Object.keys(data[it]).forEach((loc) => {
              if (avail.indexOf(loc) < 0) {
                avail.push(loc);
              }
            });
          }
        });

        const i18nFields = avail.reduce((accumulator, current) => {
          const childLocalizedValues = localizedValues.reduce(
            (acc, curr) => ({ ...acc, [curr]: data[curr] ? data[curr][current] : '' }),
            {},
          );

          return {
            ...accumulator,
            [current]: childLocalizedValues,
          };
        }, {});

        const newDescr = saveLocalizationDetails({
          description: { ...data },
          i18nFields,
        }, currentProductData, nxState);

        setCurData({ ...newDescr, i18nFields });
        setAvailLocales([...new Set(Object.keys(i18nFields), ...avail)]);

        dispatch(setTempProductLocales({ ...i18nFields }));
        dispatch(setTempProductDescription({ ...newDescr }));

        setDescrRequestData(content);
        setDescrRequestUpd((c) => c + 1);
        setHasNewData(true);
      } catch (e) {
        setDescrRequestData(content);
        setDescrRequestUpd((c) => c + 1);
      }
    }
  };

  const getSortedLocales = () => {
    const first = checkValue(curData?.fallbackLocale);

    // eslint-disable-next-line no-nested-ternary
    return availLocales.sort((x, y) => (x === first ? -1 : y === first ? 1 : 0)) || [];
  };

  useEffect(() => {
    if (currentProductData?.descriptionId?.state) {
      Promise.all([
        api.getProductDescriptionById(currentProductData?.descriptionId?.value),
        api.getProductDescriptionById(currentProductData?.descriptionId?.parentValue),
      ]).then(([productDescr, parentDescr]) => {
        const avail = [];

        localizedValues.forEach((it) => {
          if (productDescr?.data[it]) {
            Object.keys(productDescr?.data[it]).forEach((loc) => {
              if (avail.indexOf(loc) < 0) {
                avail.push(loc);
              }
            });
          }
        });
        const { data } = productDescr;
        const { data: dataParent } = parentDescr;
        storeLanguages.forEach((language) => {
          if (!avail.includes(language)) {
            avail.push(language);
          }
        });
        const inheritedFallbackLocale = createInheritableValue(
          data.fallbackLocale, dataParent.fallbackLocale,
        );
        const i18nFields = avail.reduce((accumulator, current) => {
          const childLocalizedValues = localizedValues.reduce(
            (acc, curr) => ({ ...acc, [curr]: data[curr] ? data[curr][current] : '' }),
            {},
          );
          const parentLocalizedValues = localizedValues.reduce(
            (acc, curr) => ({
              ...acc,
              [curr]: dataParent[curr] ? dataParent[curr][current] : '',
            }),
            {},
          );
          return {
            ...accumulator,
            [current]: backToFront(parentLocalizedValues, childLocalizedValues),
          };
        }, {});

        const { tempData } = store.getState();
        const productDescrData = { ...productDescr?.data };

        localizedValues.forEach((item) => delete productDescrData[item]);
        const newi18n = { ...i18nFields, ...tempData.i18nFields };
        const newDescr = { ...productDescrData, ...tempData.description };

        productDescrData.i18nFields = i18nFields;
        productDescrData.fallbackLocale = inheritedFallbackLocale;
        setCurData({ ...productDescrData });
        setAvailLocales([...new Set(Object.keys(newi18n), ...avail)]);
        dispatch(setTempProductLocales({ ...newi18n }));
        dispatch(setTempProductDescription({ ...newDescr }));

        setValue(checkValue(productDescrData?.fallbackLocale) || 0);
      });
      return;
    }

    const productDescriptionRequest = !currentProductData.descriptionId
      ? Promise.resolve({
        data: {
          customerId: nxState?.selectedCustomer?.id,
        },
      }) : api.getProductDescriptionById(currentProductData.descriptionId);

    productDescriptionRequest.then(({ data }) => {
      const avail = [];
      localizedValues.forEach((it) => {
        if (data[it]) {
          Object.keys(data[it]).forEach((loc) => {
            if (avail.indexOf(loc) < 0) {
              avail.unshift(loc);
            }
          });
        }
      });
      storeLanguages.forEach((language) => {
        if (!avail.includes(language)) {
          avail.push(language);
        }
      });
      const i18nFields = avail.reduce((accumulator, current) => {
        const childLocalizedValues = localizedValues.reduce(
          (acc, curr) => ({ ...acc, [curr]: data[curr] ? data[curr][current] : '' }),
          {},
        );
        return {
          ...accumulator,
          [current]: childLocalizedValues,
        };
      }, {});

      const { tempData } = store.getState();
      const productDescrData = { ...data };

      localizedValues.forEach((item) => delete productDescrData[item]);
      const newi18n = { ...i18nFields, ...tempData?.i18nFields };
      const newDescr = { ...productDescrData, ...tempData.description };

      if (!newDescr?.fallbackLocale) {
        newDescr.fallbackLocale = 'en-US';
      }

      let defI18nFields = {};
      if (!newi18n[newDescr?.fallbackLocale]) {
        defI18nFields = {
          'en-US': localizedValues.reduce((acc, curr) => ({ ...acc, [curr]: '' }), {}),
        };
      }

      setCurData({ ...newDescr, i18nFields: { ...i18nFields, ...defI18nFields } });

      const locales = Object.keys(newi18n).length
        ? [...new Set(Object.keys(newi18n), avail)]
        : [...avail, newDescr?.fallbackLocale];

      setAvailLocales(locales);
      setDescrRequestData({ ...data });
      setDescrRequestUpd((c) => c + 1);

      dispatch(setTempProductLocales({ ...newi18n, ...defI18nFields }));
      dispatch(setTempProductDescription({ ...newDescr }));

      setValue(checkValue(newDescr?.fallbackLocale) || 0);
    });
  }, [currentProductData.descriptionId]);

  useEffect(() => getValues(), [value]);

  useEffect(() => {
    const savedData = descrRequestData || {};

    const stringifyCustomSample = typeof savedData === 'object' ? JSON.stringify(savedData, 0, 4) : savedData;
    setDescrRequestData(stringifyCustomSample);
  }, [descrRequestUpd]);

  if (!curData) return <LinearProgress />;

  return (
    <>
      <Box position='absolute' right='15px' top='20px'>
        <Button onClick={() => setCodeMode((c) => !c)}>
          {codeMode ? <CodeOffIcon /> : <CodeIcon />}
        </Button>
      </Box>

      {
        !codeMode ? (
          <>
            <DefaultLanguage
              curData={curData}
              selectOptions={availableLocales}
              onChange={handleChangeDefaultLanguage}
              parentId={parentId}
            />
            <Box display='flex' width='100%'>
              <Box width='20%'>
                <Tabs
                  orientation='vertical'
                  indicatorColor='primary'
                  variant='scrollable'
                  value={value}
                  style={{ borderRight: '1px solid #e2e2e2', height: '100%' }}
                  onChange={(e, newTab) => setValue(newTab)}
                  aria-label='Localizations'
                >
                  {getSortedLocales().map((locale) => (
                    <Tab
                      label={`${locale}${locale === curData?.fallbackLocale || (curData?.fallbackLocale?.state === 'inherits' ? locale === curData?.fallbackLocale?.parentValue : locale === curData?.fallbackLocale?.value)
                        ? ' (default)'
                        : ''
                      }`}
                      key={locale}
                      value={locale}
                      component={forwardRef(({ children, ...props }, ref) => (
                        <div role='button' {...props} ref={ref}>
                          <span className='localization-label'>{children}</span>
                          {(locale !== curData?.fallbackLocale && (curData?.fallbackLocale?.state === 'inherits' ? locale !== curData?.fallbackLocale?.parentValue : locale !== curData?.fallbackLocale?.value)) && (
                            <ClearIcon onClick={(e) => removeLocale(e, locale)} />
                          )}
                        </div>
                      ))}
                    />
                  ))}

                  <Tab
                    label='Add Language'
                    value={0}
                    component={forwardRef(({ children, ...props }, ref) => (
                      <div role='button' {...props} style={{ minWidth: '100%' }} ref={ref}>
                        <SelectCustom
                          label='addLanguage'
                          value={newLangValue}
                          selectOptions={availableLocales}
                          onChangeSelect={(e) => setNewLangValue(e.target.value)}
                        />

                        <div hidden>{children}</div>
                        <AddCircleIcon
                          color='primary'
                          style={{
                            marginLeft: 15,
                            opacity: !newLangValue ? 0.3 : 1,
                            pointerEvents: !newLangValue ? 'none' : 'auto',
                          }}
                          onClick={addLocale}
                        />
                      </div>
                    ))}
                  />
                </Tabs>
              </Box>

              <Box display='flex' flexDirection='row' alignItems='baseline' width='80%'>
                {!!value && (
                  <LocalizationInputs
                    data={curData?.i18nFields}
                    isDefault={value === curData?.fallbackLocale
                      || value === curData?.fallbackLocale?.value}
                    parentId={parentId}
                    defaultLocale={curData?.fallbackLocale?.value || curData?.fallbackLocale}
                    curLocal={value}
                    setHasLocalizationChanges={setHasNewData}
                    setDisabledWithMandLocal={setDisabledWithMandLocal}
                  />
                )}
              </Box>
            </Box>
          </>
        ) : (
          <JsonEditor
            currentData={typeof descrRequestData === 'object' ? JSON.stringify(descrRequestData, 0, 4) : descrRequestData}
            setCurrentData={(content) => updateContentByEditor(content)}
            jsonIsValid={jsonIsValid}
            setJsonIsValid={setJsonIsValid}
          />
        )
      }
    </>
  );
};

LocalizedContent.propTypes = {
  setHasNewData: PropTypes.func,
  currentProductData: PropTypes.object,
  parentId: PropTypes.string,
  storeLanguages: PropTypes.array,
  setDisabledWithMandLocal: PropTypes.func,
  setCodeMode: PropTypes.func,
  codeMode: PropTypes.bool,
  jsonIsValid: PropTypes.bool,
  setJsonIsValid: PropTypes.func,
};

export default LocalizedContent;

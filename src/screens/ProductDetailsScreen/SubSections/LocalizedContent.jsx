/* eslint-disable react/prop-types */
import React, { useState, useEffect, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Box, Tabs, Tab, LinearProgress,
} from '@mui/material';

import { toast } from 'react-toastify';
import ClearIcon from '@mui/icons-material/Clear';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import api from '../../../api';
import { LocalizationInputs, DefaultLanguage } from './LocalizationInputs';
import { SelectCustom } from '../../../components/Inputs';

import { getLanguagesOptions } from '../../../components/utils/OptionsFetcher/OptionsFetcher';
import {
  backToFront, localizedValues, createInheritableValue,
} from '../../../services/helpers/dataStructuring';
import { setTempProductLocales, setTempProductDescription } from '../../../redux/actions/TempData';
import store from '../../../redux/store';

const LocalizedContent = ({
  setHasNewData,
  currentProductData,
  parentId,
  storeLanguages,
  setDisabledWithMandLocal,
}) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [availLocales, setAvailLocales] = useState([]);
  const [curData, setCurData] = useState(null);
  const [newTabValues, setNewTabValues] = useState({});
  const [newLangValue, setNewLangValue] = useState('');
  const availableLocales = getLanguagesOptions();
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);

  const makeNewData = (locale) => {
    const { tempData } = store.getState();
    const dataToSave = {
      ...tempData?.description,
      ...curData,
      i18nFields: {
        ...tempData?.i18nFields,
        ...curData?.i18nFields,
      },
    };
    dataToSave.i18nFields[value || locale] = { ...newTabValues };
    setCurData({ ...dataToSave });
    setAvailLocales(() => [...Object.keys(dataToSave?.i18nFields)]);
    dispatch(setTempProductLocales({ ...dataToSave.i18nFields }));
    setHasNewData(true);
  };

  const getValues = () => {
    const inputValues = !value
      ? localizedValues.reduce(
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
      ) : { ...curData.i18nFields[value] };

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
        setNewLangValue('');
      } else {
        toast.error('Locale already exists!');
      }
    } else if (defLanguage) {
      const languageIndex = availLocales.indexOf(defLanguage);
      if (languageIndex < 0) {
        makeNewData(defLanguage);
        setValue(defLanguage);
      } else {
        setValue(defLanguage);
      }
    }
  };

  const handleChangeDefaultLanguage = (defLanguage) => {
    if (typeof defLanguage === 'string') {
      addLocale(defLanguage);

      setCurData({ ...curData, fallbackLocale: defLanguage });

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
      fallbackLocale: typeof defLanguage === 'string' ? defLanguage : { ...defLanguage },
    }));
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

      dispatch(setTempProductLocales({ ...newi18n, ...defI18nFields }));
      dispatch(setTempProductDescription({ ...newDescr }));
    });
  }, [currentProductData.descriptionId]);

  useEffect(() => getValues(), [value]);

  if (!curData) return <LinearProgress />;

  return (
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
            {availLocales.map((locale) => (
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
  );
};

LocalizedContent.propTypes = {
  setHasNewData: PropTypes.func,
  currentProductData: PropTypes.object,
  parentId: PropTypes.string,
  storeLanguages: PropTypes.array,
  setDisabledWithMandLocal: PropTypes.func,
};

export default LocalizedContent;

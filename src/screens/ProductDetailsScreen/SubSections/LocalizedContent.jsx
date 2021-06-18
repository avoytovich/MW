/* eslint-disable react/prop-types */
import React, { useState, useEffect, forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Box, Tabs, Tab, LinearProgress,
} from '@material-ui/core';

import ClearIcon from '@material-ui/icons/Clear';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import { showNotification } from '../../../redux/actions/HttpNotifications';
import api from '../../../api';

import LocalizationInputs from './LocalizationInputs';
import { SelectCustom } from '../../../components/Inputs';

import { getLanguagesOptions } from '../../../components/utils/OptionsFetcher/OptionsFetcher';
import { backToFront, localizedValues } from '../../../services/helpers/dataStructuring';

const LocalizedContent = ({ setNewData, currentProductData, parentId }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [availLocales, setAvailLocales] = useState([]);
  const [curData, setCurData] = useState(null);
  const [initData, setInitData] = useState({});
  const [curTabValues, setCurTabValues] = useState({});
  const [newTabValues, setNewTabValues] = useState({});
  const [newLangValue, setNewLangValue] = useState('');
  const availableLocales = getLanguagesOptions();

  const makeNewData = (locale) => {
    const dataToSave = { ...curData };
    dataToSave.i18nFields[value || locale] = { ...newTabValues };
    setCurData({ ...dataToSave });
    setNewData({ ...dataToSave });
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
      )
      : { ...curData.i18nFields[value] };

    setCurTabValues({ ...inputValues });
    setNewTabValues({ ...inputValues });
  };

  const handleChange = (name, val) => setNewTabValues((c) => ({ ...c, [name]: val }));

  const removeLocale = (e, locale) => {
    e.stopPropagation();

    const dataToSave = { ...curData };

    delete dataToSave.i18nFields[locale];

    setAvailLocales((c) => c.filter((l) => l !== locale));
    setCurData({ ...dataToSave });
    setNewData({ ...dataToSave });

    if (value === locale) {
      setValue(0);
    }
  };

  const addLocale = () => {
    if (newLangValue) {
      if (availLocales.indexOf(newLangValue) < 0) {
        makeNewData(newLangValue);
        setNewLangValue('');
        setAvailLocales((c) => [...c, newLangValue]);
      } else {
        dispatch(showNotification('Locale already exists!', true));
      }
    }
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

        const productDescrData = { ...productDescr?.data };
        localizedValues.forEach((item) => delete productDescrData[item]);
        productDescrData.i18nFields = i18nFields;

        setCurData({ ...productDescrData });
        setInitData(JSON.stringify({ ...productDescrData }));
        setAvailLocales(avail);
      });
      return;
    }
    api.getProductDescriptionById(currentProductData.descriptionId).then(({ data }) => {
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

      const productDescrData = { ...data };
      localizedValues.forEach((item) => delete productDescrData[item]);
      productDescrData.i18nFields = i18nFields;

      setCurData({ ...productDescrData });
      setInitData(JSON.stringify({ ...productDescrData }));
      setAvailLocales(avail);
    });
  }, [currentProductData.descriptionId]);

  useEffect(() => getValues(), [value]);

  useEffect(() => {
    const hasChanges = JSON.stringify(curTabValues) !== JSON.stringify(newTabValues) && !!value;

    if (hasChanges) {
      makeNewData();
    } else if (JSON.stringify(curData) === initData) {
      setNewData(false);
    }
  }, [newTabValues]);

  if (!curData) return <LinearProgress />;

  return (
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
              label={`${locale}${
                locale === curData?.fallbackLocale || locale === curData?.fallbackLocale?.value
                  ? ' (default)'
                  : ''
              }`}
              key={locale}
              value={locale}
              component={forwardRef(({ children, ...props }, ref) => (
                <div role='button' {...props} ref={ref}>
                  {children}
                  {locale !== curData?.fallbackLocale && (
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
                  style={{ marginLeft: 15 }}
                  onClick={addLocale}
                />
              </div>
            ))}
          />
        </Tabs>
      </Box>

      <Box display='flex' flexDirection='row' alignItems='baseline' width='80%'>
        <LocalizationInputs
          handleChange={handleChange}
          setNewTabValues={setNewTabValues}
          data={newTabValues}
          isDefault={
            value === curData?.fallbackLocale || value === curData?.fallbackLocale?.value
          }
          parentId={parentId}
        />
      </Box>
    </Box>
  );
};

LocalizedContent.propTypes = {
  setNewData: PropTypes.func,
  currentProductData: PropTypes.object,
  parentId: PropTypes.string,
};

export default LocalizedContent;

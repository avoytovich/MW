/* eslint-disable react/prop-types */
import React, { useState, useEffect, forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { Box, Tabs, Tab, LinearProgress } from '@material-ui/core';

import ClearIcon from '@material-ui/icons/Clear';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import { showNotification } from '../../../redux/actions/HttpNotifications';
import api from '../../../api';

import LocalizationInputs from './LocalizationInputs';
import { SelectCustom } from '../../../components/Inputs';

import { availableLocales } from '../../../services/selectOptions/selectOptions';

const localizedValues = [
  'localizedLongDesc',
  'localizedManualRenewalEmailDesc',
  'localizedMarketingName',
  'localizedPurchaseEmailDesc',
  'localizedShortDesc',
  'localizedThankYouDesc',
];

const LocalizedContent = ({ setNewData, currentProductData }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [availLocales, setAvailLocales] = useState([]);
  const [curData, setCurData] = useState(null);
  const [initData, setInitData] = useState({});
  const [curTabValues, setCurTabValues] = useState({});
  const [newTabValues, setNewTabValues] = useState({});
  const [newLangValue, setNewLangValue] = useState('');

  const makeNewData = (locale) => {
    const dataToSave = { ...curData };

    Object.entries(newTabValues).forEach(([v, k]) => {
      if (newTabValues[v] !== curTabValues[v]) {
        const dataKey = `localized${v.charAt(0).toUpperCase() + v.slice(1)}`;

        if (!k) {
          delete dataToSave[dataKey][locale || value];
        } else {
          dataToSave[dataKey][locale || value] = k;
        }
      }
    });

    setCurData({ ...dataToSave });
    setNewData({ ...dataToSave });
  };

  const getValues = () => {
    const inputValues = {};

    localizedValues.forEach((v) => {
      if (curData && curData[v] && curData[v][value]) {
        let newKey = v.replace('localized', '');
        newKey = newKey.charAt(0).toLowerCase() + newKey.slice(1);

        inputValues[newKey] = curData[v][value];
      }
    });

    setCurTabValues({ ...inputValues });
    setNewTabValues({ ...inputValues });
  };

  const handleChange = (name, val) => setNewTabValues((c) => ({ ...c, [name]: val }));

  const removeLocale = (e, locale) => {
    e.stopPropagation();

    const dataToSave = { ...curData };

    localizedValues.forEach((it) => delete dataToSave[it][locale]);

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
    api
      .getProductDescriptionById(currentProductData.descriptionId)
      .then(({ data }) => {
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

        setCurData({ ...data });
        setInitData(JSON.stringify({ ...data }));
        setAvailLocales(avail);
      });
  }, []);

  useEffect(() => getValues(), [value]);

  useEffect(() => {
    const hasChanges =
      JSON.stringify(curTabValues) !== JSON.stringify(newTabValues) && !!value;

    if (hasChanges) {
      makeNewData();
    } else if (JSON.stringify(curData) === initData) {
      setNewData(false);
    }
  }, [newTabValues]);

  if (!curData) return <LinearProgress />;

  return (
    <Box display="flex" width="100%">
      <Box width="20%">
        <Tabs
          orientation="vertical"
          indicatorColor="primary"
          variant="scrollable"
          value={value}
          style={{ borderRight: '1px solid #e2e2e2', height: '100%' }}
          onChange={(e, newTab) => setValue(newTab)}
          aria-label="Localizations"
        >
          {availLocales.map((locale) => (
            <Tab
              label={`${locale}${
                locale === curData?.fallbackLocale ? ' (default)' : ''
              }`}
              key={locale}
              value={locale}
              component={forwardRef(({ children, ...props }, ref) => (
                <div role="button" {...props} ref={ref}>
                  {children}
                  {locale !== curData?.fallbackLocale && (
                    <ClearIcon onClick={(e) => removeLocale(e, locale)} />
                  )}
                </div>
              ))}
            />
          ))}

          <Tab
            label="Add Language"
            value={0}
            component={forwardRef(({ children, ...props }, ref) => (
              <div
                role="button"
                {...props}
                style={{ minWidth: '100%' }}
                ref={ref}
              >
                <SelectCustom
                  label="addLanguage"
                  value={newLangValue}
                  selectOptions={availableLocales}
                  onChangeSelect={(e) => setNewLangValue(e.target.value)}
                />

                <div hidden>{children}</div>
                <AddCircleIcon
                  color="primary"
                  style={{ marginLeft: 15 }}
                  onClick={addLocale}
                />
              </div>
            ))}
          />
        </Tabs>
      </Box>

      <Box display="flex" flexDirection="row" alignItems="baseline" width="80%">
        <LocalizationInputs
          handleChange={handleChange}
          data={newTabValues}
          isDefault={value === curData?.fallbackLocale}
        />
      </Box>
    </Box>
  );
};

LocalizedContent.propTypes = {
  setNewData: PropTypes.func,
  currentProductData: PropTypes.object,
};

export default LocalizedContent;
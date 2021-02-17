import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Tabs,
  Tab,
} from '@material-ui/core';

import { SelectCustom } from '../../../components/Inputs';

import ClearIcon from '@material-ui/icons/Clear';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import api from '../../../api';

import LocalizationInputs from './LocalizationInputs';

import { availableLocales } from '../../../services/selectOptions/selectOptions';

import localization from '../../../localization';

const LocalizedContent = ({
  setProductData,
  currentProductData,
  selectOptions,
  inputErrors,
  setInputErrors,
}) => {
  const [value, setValue] = useState(0);
  const [availLocales, setAvailLocales] = useState([]);
  const [curData, setCurData] = useState(null);
  const [curTabValues, setCurTabValues] = useState({});

  useEffect(() => {
    api
      .getProductDescriptionById(currentProductData.descriptionId)
      .then(({ data }) => {
        const { localizedMarketingName } = data;

        if (localizedMarketingName) {
          setAvailLocales(Object.keys(localizedMarketingName));
        }

        setCurData(data);
      });
  }, []);

  const getValues = () => {
    const inputValues = {};

    [
      'localizedLongDesc',
      'localizedManualRenewalEmailDesc',
      'localizedMarketingName',
      'localizedPurchaseEmailDesc',
      'localizedShortDesc',
      'localizedThankYouDesc',
    ].forEach((v) => {
      if (curData && curData[v] && curData[v][value]) {
        let newKey = v.replace('localized', '');
        newKey = (newKey.charAt(0).toLowerCase() + newKey.slice(1));

        inputValues[newKey] = curData[v][value];
      }
    });

    setCurTabValues(inputValues);
  };

  useEffect(() => getValues(), [value]);

  const handleChange = () => {

  };

  return (
    <Box display='flex' width='100%'>
      <Box width='20%'>
        <Tabs
          orientation='vertical'
          indicatorColor='primary'
          variant='scrollable'
          value={value}
          onChange={(e, newTab) => setValue(newTab)}
          aria-label='Localizations'
        >
          {availLocales.map((locale) => (
            <Tab
              label={`${locale}${locale === curData?.fallbackLocale ? ' (default)' : ''}`}
              key={locale}
              value={locale}
              component={({ children, ...props }) => (
                <div {...props}>
                  {children}
                  {locale !== curData?.fallbackLocale && <ClearIcon onClick={(e) => { e.stopPropagation(); console.log('do close'); }} />}
                </div>
              )}
            />
          ))}

          <Tab
            label='Add Language'
            value={0}
            component={({ ...props }) => (
              <div {...props} style={{ minWidth: '100%' }}>
                <SelectCustom
                  label='addLanguage'
                  selectOptions={availableLocales}
                />

                <AddCircleIcon color='primary' style={{ marginLeft: 15 }} />
              </div>
            )}
          />
        </Tabs>
      </Box>

      <Box display="flex" flexDirection="row" alignItems="baseline" width='80%'>
        <LocalizationInputs handleChange={handleChange} data={curTabValues} />
      </Box>
    </Box>
  );
};

LocalizedContent.propTypes = {
  setProductData: PropTypes.func,
  currentProductData: PropTypes.object,
  selectOptions: PropTypes.object,
  inputErrors: PropTypes.object,
  setInputErrors: PropTypes.func,
};

export default LocalizedContent;

/* eslint-disable react/prop-types */
import React, { useState, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';

import {
  Box, Tabs, Tab,
} from '@material-ui/core';

import { toast } from 'react-toastify';

import ClearIcon from '@material-ui/icons/Clear';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import { SelectCustom } from '../../../components/Inputs';
import LocalizationInputs from './LocalizationInputs';

import { getLanguagesOptions } from '../../../components/utils/OptionsFetcher/OptionsFetcher';

const LocalizedContent = ({
  currentStoreData,
  setCurrentStoreData,
  selectedLang,
  setSelectedLang,
}) => {
  const [value, setValue] = useState(0);
  const [availLocales, setAvailLocales] = useState([]);
  const [newLangValue, setNewLangValue] = useState('');
  const availableLocales = getLanguagesOptions();

  const removeLocale = (e, locale) => {
    e.stopPropagation();

    if (value === locale) {
      setSelectedLang(0);
      setValue(0);
    }

    setCurrentStoreData((cur) => {
      const newDesc = cur.thankYouDesc;

      if (newDesc) {
        delete newDesc[locale];
      }

      return {
        ...cur,
        saleLocales: [...cur.saleLocales.filter((l) => l !== locale)],
        thankYouDesc: newDesc,
      };
    });
  };

  const addLocale = () => {
    if (newLangValue) {
      if (availLocales.indexOf(newLangValue) < 0) {
        setCurrentStoreData((cur) => ({ ...cur, saleLocales: [...cur.saleLocales, newLangValue] }));
        setSelectedLang(newLangValue);
        setNewLangValue('');
      } else {
        toast.error('Locale already exists!');
      }
    }
  };

  useEffect(() => {
    setAvailLocales(currentStoreData?.saleLocales || []);
  }, [currentStoreData]);

  useEffect(() => setValue(selectedLang), [selectedLang]);

  return (
    <Box display='flex' width='100%'>
      <Box width='20%'>
        <Tabs
          orientation='vertical'
          indicatorColor='primary'
          variant='scrollable'
          scrollButtons='off'
          value={value}
          style={{ borderRight: '1px solid #e2e2e2', height: '100%' }}
          onChange={(e, newTab) => setValue(newTab)}
          aria-label='Localizations'
        >
          {availLocales.map((locale) => (
            <Tab
              label={locale}
              key={locale}
              value={locale}
              component={forwardRef(({ children, ...props }, ref) => locale && (
                <div role='button' {...props} ref={ref}>
                  {children}
                  <ClearIcon onClick={(e) => removeLocale(e, locale)} />
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

      {!!value && (
        <Box display='flex' flexDirection='row' alignItems='baseline' width='80%'>
          <LocalizationInputs
            handleChange={setCurrentStoreData}
            lang={value}
            data={value && currentStoreData?.thankYouDesc[value]}
          />
        </Box>
      )}
    </Box>
  );
};

LocalizedContent.propTypes = {
  setCurrentStoreData: PropTypes.func,
  currentStoreData: PropTypes.object,
  selectedLang: PropTypes.any,
  setSelectedLang: PropTypes.func,
};

export default LocalizedContent;

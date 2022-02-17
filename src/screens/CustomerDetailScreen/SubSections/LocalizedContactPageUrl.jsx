import React, { useState, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';

import {
  Box, Tabs, Tab,
} from '@mui/material';

import { toast } from 'react-toastify';

import ClearIcon from '@mui/icons-material/Clear';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { SelectCustom } from '../../../components/Inputs';
import LocalizationInputs from './LocalizationInputs';

import { getLanguagesOptions } from '../../../components/utils/OptionsFetcher/OptionsFetcher';

const LocalizedContent = ({
  currentCustomer,
  setCurrentCustomer,
}) => {
  const [availLocales, setAvailLocales] = useState([]);
  const [newLangValue, setNewLangValue] = useState('');
  const availableLocales = getLanguagesOptions();
  const [value, setValue] = useState(availLocales[0] || 0);

  const handleUpdateCurrentCustomer = (lang, curContent) => setCurrentCustomer((c) => ({
    ...c, localizedZendeskGuideUrls: { ...c.localizedZendeskGuideUrls, [lang]: curContent },
  }));

  const removeLocale = (e, locale) => {
    e.stopPropagation();
    if (value === locale) {
      setValue(0);
    }
    setCurrentCustomer((cur) => {
      const seekLocale = { ...cur.localizedZendeskGuideUrls };
      if (seekLocale) {
        delete seekLocale[locale];
      }
      return {
        ...cur,
        localizedZendeskGuideUrls: { ...seekLocale },
      };
    });
  };

  const addLocale = () => {
    if (newLangValue) {
      if (availLocales.indexOf(newLangValue) < 0) {
        setCurrentCustomer((cur) => ({ ...cur, localizedZendeskGuideUrls: { ...cur.localizedZendeskGuideUrls, [newLangValue]: '' } }));
        setValue(newLangValue);
        setNewLangValue('');
      } else {
        toast.error('Locale already exists!');
      }
    }
  };

  useEffect(() => {
    const getLocales = Object.keys(currentCustomer?.localizedZendeskGuideUrls || {});
    setAvailLocales(getLocales || []);
  }, [currentCustomer]);

  return (
    <Box display='flex' width='100%'>
      <Box width='20%'>
        <Tabs
          orientation='vertical'
          indicatorColor='primary'
          variant='scrollable'
          scrollButtons={false}
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
                  <span className='localization-label'>{children}</span>
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
        <Box display='flex' flexDirection='column' alignItems='baseline' width='80%'>
          <LocalizationInputs
            currentCustomer={currentCustomer}
            handleChange={handleUpdateCurrentCustomer}
            lang={value}
            data={value && currentCustomer?.localizedZendeskGuideUrls[value]}
          />
        </Box>
      )}
    </Box>
  );
};

LocalizedContent.propTypes = {
  setCurrentCustomer: PropTypes.func,
  currentCustomer: PropTypes.object,
};

export default LocalizedContent;

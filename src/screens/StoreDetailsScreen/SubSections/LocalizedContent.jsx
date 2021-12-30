/* eslint-disable react/prop-types */
import React, { useState, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';

import {
  Box, Tabs, Tab, Typography,
} from '@mui/material';

import { toast } from 'react-toastify';

import ClearIcon from '@mui/icons-material/Clear';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import { SelectCustom } from '../../../components/Inputs';
import LocalizationInputs from './LocalizationInputs';

import { getLanguagesOptions } from '../../../components/utils/OptionsFetcher/OptionsFetcher';
import localization from '../../../localization';

const LocalizedContent = ({
  currentStoreData,
  setCurrentStoreData,
  errors,
  setErrors,
}) => {
  const [availLocales, setAvailLocales] = useState([]);
  const [newLangValue, setNewLangValue] = useState('');
  const availableLocales = getLanguagesOptions();
  const [value, setValue] = useState(availLocales[0] || 0);

  const handleUpdateCurrentStoreData = (lang, curContent) => {
    if (lang === currentStoreData.defaultLocale
      && !curContent
      && Object.keys(currentStoreData.thankYouDesc).length > 1) {
      setErrors({ ...errors, thankYouDesc: true });
    } else {
      const newErrors = { ...errors };
      delete newErrors.thankYouDesc;
      setErrors({ ...newErrors });
    }
    setCurrentStoreData((c) => ({
      ...c,
      thankYouDesc: { ...c.thankYouDesc, [lang]: curContent },
    }));
  };

  const removeLocale = (e, locale) => {
    e.stopPropagation();

    if (value === locale) {
      setValue(0);
    }

    setCurrentStoreData((cur) => {
      const newDesc = { ...cur.thankYouDesc };

      if (newDesc) {
        delete newDesc[locale];
      }

      return {
        ...cur,
        thankYouDesc: { ...newDesc },
      };
    });
  };
  const addLocale = () => {
    if (newLangValue) {
      if (availLocales.indexOf(newLangValue) < 0) {
        setCurrentStoreData((cur) => ({ ...cur, thankYouDesc: { ...cur.thankYouDesc, [newLangValue]: '' } }));
        setValue(newLangValue);
        setNewLangValue('');
      } else {
        toast.error('Locale already exists!');
      }
    }
  };

  useEffect(() => {
    const newThankYouDesc = Object.keys(currentStoreData?.thankYouDesc)
      .filter((key) => key !== currentStoreData.defaultLocale);
    const res = [currentStoreData.defaultLocale, ...newThankYouDesc];
    setAvailLocales(res || []);
  }, [currentStoreData]);

  useEffect(() => {
    setValue(currentStoreData.defaultLocale);
    if (currentStoreData.thankYouDesc[currentStoreData.defaultLocale] === '' && Object.keys(currentStoreData.thankYouDesc).length > 1) {
      setErrors({ ...errors, thankYouDesc: true });
    } else {
      const newErrors = { ...errors };
      delete newErrors.thankYouDesc;
      setErrors({ ...newErrors });
    }
  }, [currentStoreData.defaultLocale]);

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
              disabled={errors.thankYouDesc}
              label={locale === currentStoreData.defaultLocale ? `${locale} (default)` : locale}
              key={locale}
              value={locale}
              component={forwardRef(({ children, ...props }, ref) => locale && (
                <div role='button' {...props} ref={ref}>
                  <span className='localization-label'>{children}</span>
                  {locale !== currentStoreData.defaultLocale
                    && <ClearIcon onClick={(e) => removeLocale(e, locale)} />}
                </div>
              ))}
            />
          ))}

          <Tab
            disabled={errors.thankYouDesc || currentStoreData.thankYouDesc[currentStoreData.defaultLocale] === '' || Object.keys(currentStoreData.thankYouDesc).length === 0}
            label='Add Language'
            value={0}
            component={forwardRef(({ children, ...props }, ref) => (
              <div role='button' {...props} style={{ minWidth: '100%' }} ref={ref}>
                <SelectCustom
                  isDisabled={errors.thankYouDesc}
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
            currentStoreData={currentStoreData}
            handleChange={handleUpdateCurrentStoreData}
            lang={value}
            data={value && currentStoreData?.thankYouDesc[value]}
          />
          {errors.thankYouDesc && (
            <Box px={4}>
              <Typography style={{ color: '#FF0000' }}>
                {localization.t('errorNotifications.deliveryRemarkIsMandatory')}
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

LocalizedContent.propTypes = {
  setCurrentStoreData: PropTypes.func,
  currentStoreData: PropTypes.object,
  errors: PropTypes.object,
  setErrors: PropTypes.func,
};

export default LocalizedContent;

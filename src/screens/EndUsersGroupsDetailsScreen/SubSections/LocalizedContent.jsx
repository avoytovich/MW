/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
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
import { defInputs } from '../utils';
import localization from '../../../localization';
import { getLanguagesOptions } from '../../../components/utils/OptionsFetcher/OptionsFetcher';

const LocalizedContent = ({
  currentData,
  handleSaveLocale,
  defaultLocale,
  errors,
  setErrors,
}) => {
  const newInputs = {};
  defInputs.forEach((input) => { newInputs[input] = ''; });
  const [availLocales, setAvailLocales] = useState([]);
  const [newLangValue, setNewLangValue] = useState('');
  const availableLocales = getLanguagesOptions();
  const [value, setValue] = useState(availLocales[0] || 0);

  const addLocale = () => {
    if (newLangValue) {
      if (availLocales.indexOf(newLangValue) < 0) {
        handleSaveLocale({ ...currentData, [newLangValue]: { ...newInputs } });
        setValue(newLangValue);
        setNewLangValue('');
      } else {
        toast.error('Locale already exists!');
      }
    }
  };
  const removeLocale = (e, locale) => {
    e.stopPropagation();

    if (value === locale) {
      setValue(0);
    }
    const newDesc = { ...currentData };
    if (newDesc) {
      delete newDesc[locale];
    }

    handleSaveLocale({ ...newDesc });
  };

  useEffect(() => {
    const newLocalized = Object.keys(currentData)
      .filter((key) => key !== defaultLocale);
    const res = [defaultLocale, ...newLocalized];
    setAvailLocales(res || []);
  }, [currentData]);

  useEffect(() => {
    setValue(defaultLocale);
  }, [defaultLocale]);

  useEffect(() => {
    const notValidFields = Object.keys(currentData).filter((item) => {
      if (currentData[item].localizedShortDesc === '' && defaultLocale !== item) {
        return item;
      }
    });

    const notValidRequiredFields = [];

    Object.keys(currentData).forEach((it) => {
      Object.keys(currentData[it]).forEach((u) => {
        if (currentData[it][u] && !currentData[defaultLocale][u]
          && !notValidRequiredFields.includes(localization.t(`forms.inputs.localizedContent.${u}`))) {
          notValidRequiredFields.push(localization.t(`forms.inputs.localizedContent.${u}`));
        }
      });
    });
    if (currentData[defaultLocale].localizedShortDesc === '' && !notValidRequiredFields.includes(localization.t('forms.inputs.localizedContent.localizedShortDesc'))) {
      notValidRequiredFields.push(localization.t('forms.inputs.localizedContent.localizedShortDesc'));
    }
    const newErrors = { ...errors };
    if (notValidFields.length > 0) {
      newErrors.localizedContent = [...notValidFields];
    } else {
      delete newErrors.localizedContent;
    }

    if (notValidRequiredFields.length > 0) {
      newErrors.defaultLocalizedContent = [...notValidRequiredFields];
    } else {
      delete newErrors.defaultLocalizedContent;
    }
    setErrors({ ...newErrors });
  }, [currentData]);
  return (
    <>
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
                style={(locale === defaultLocale && errors.defaultLocalizedContent)
                  || (locale !== defaultLocale && errors.localizedContent?.includes(locale)) ? { border: '1px solid #FF0000' } : {}}
                label={locale === defaultLocale ? `${locale} (default)` : locale}
                key={locale}
                value={locale}
                component={forwardRef(({ children, ...props }, ref) => locale && (
                  <div role='button' {...props} ref={ref}>
                    <span className='localization-label'>{children}</span>
                    {locale !== defaultLocale
                      && <ClearIcon onClick={(e) => removeLocale(e, locale)} />}
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

        <Box display='flex' flexDirection='column' position='relative' alignItems='baseline' width='80%'>
          <LocalizationInputs
            currentData={currentData}
            handleChange={(lang, curContent, inputKey) => handleSaveLocale(
              { ...currentData, [lang]: { ...currentData[lang], [inputKey]: curContent } },
            )}
            lang={value}
            data={value && currentData[value]}
          />

        </Box>

      </Box>
      <Box pl='20%'>
        {errors.defaultLocalizedContent && (
          <Box px={4} py={2}>
            <Typography style={{ fontStyle: 'italic', color: '#ff0202' }}>
              {`${errors.defaultLocalizedContent.length > 1 ? localization.t('labels.fields') : localization.t('labels.field')} ${errors.defaultLocalizedContent.join(', ')} ${localization.t('errorNotifications.forDefaultLanguageCanNotBeEmpty')}`}
            </Typography>
          </Box>
        )}
        {errors.localizedContent && (
          <Box px={4} py={2}>
            <Typography style={{ fontStyle: 'italic', color: '#ff0202' }}>
              {`Field Short Description for ${errors.localizedContent.join(', ')} is required`}
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
};

LocalizedContent.propTypes = {
  handleSaveLocale: PropTypes.func,
  currentData: PropTypes.object,
  errors: PropTypes.object,
  setErrors: PropTypes.func,
  defaultLocale: PropTypes.string,
};

export default LocalizedContent;

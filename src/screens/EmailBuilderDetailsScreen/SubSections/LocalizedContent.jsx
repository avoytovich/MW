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
  data, setData, selectedLang, setSelectedLang,
}) => {
  const [availLocales, setAvailLocales] = useState([]);
  const [newLangValue, setNewLangValue] = useState('');
  const [curTab, setCurTab] = useState(0);
  const availableLocales = getLanguagesOptions();

  const removeLocale = (e, locale) => {
    e.stopPropagation();

    if (selectedLang === locale) {
      setSelectedLang(0);
      setCurTab(0);
    }

    setData((cur) => {
      const newLocale = cur.templates;

      if (newLocale) {
        delete newLocale[locale];
      }

      return {
        ...cur,
        templates: { ...newLocale },
      };
    });
  };

  const addLocale = () => {
    if (newLangValue) {
      if (availLocales.indexOf(newLangValue) < 0) {
        setData((cur) => ({
          ...cur,
          templates: {
            ...cur.templates,
            [newLangValue]: {
              subject: '',
              body: '',
            },
          },
        }));

        setSelectedLang(newLangValue);
        setCurTab(newLangValue);
        setNewLangValue('');
      } else {
        toast.error('Locale already exists!');
      }
    }
  };

  useEffect(() => {
    const newAvailLocales = [];

    if (data?.templates && Object.keys(data?.templates).length) {
      newAvailLocales.push(...Object.keys(data.templates));
    }

    setAvailLocales(newAvailLocales);
  }, [data]);

  useEffect(() => setCurTab(selectedLang), [selectedLang]);

  return (
    <Box display='flex' width='100%'>
      <Box width='20%'>
        <Tabs
          orientation='vertical'
          indicatorColor='primary'
          variant='scrollable'
          scrollButtons='off'
          value={curTab}
          style={{ borderRight: '1px solid #e2e2e2', height: '100%' }}
          onChange={(e, newTab) => {
            setSelectedLang(newTab);
            setCurTab(newTab);
          }}
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
                  <ClearIcon onClick={(e) => removeLocale(e, locale)} className={locale !== data.fallbackLocale ? '' : 'disabled'} />
                </div>
              ))}
            />
          ))}

          <Tab
            label='Add Language'
            value={0}
            component={forwardRef(({ children, ...props }, ref) => (
              <div role='button' {...props} style={{ minWidth: '100%', cursor: 'pointer' }} ref={ref}>
                <SelectCustom
                  label='addLanguage'
                  isDisabled={curTab !== 0}
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

      <Box display='flex' flexDirection='row' alignItems='baseline' width='80%' position='relative'>
        {!!curTab && (
          <LocalizationInputs
            handleChange={setData}
            lang={curTab}
            data={data}
          />
        )}
      </Box>
    </Box>
  );
};

LocalizedContent.propTypes = {
  setData: PropTypes.func,
  data: PropTypes.object,
  selectedLang: PropTypes.any,
  setSelectedLang: PropTypes.func,
};

export default LocalizedContent;

/* eslint-disable react/prop-types */
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
  data, setData, selectedLang, setSelectedLang,
}) => {
  const [availLocales, setAvailLocales] = useState([]);
  const [newLangValue, setNewLangValue] = useState('');
  const [curTab, setCurTab] = useState(0);
  const availableLocales = [{ id: 'neutral', value: 'neutral' }, ...getLanguagesOptions()];

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

  const addLocale = (val) => {
    if (newLangValue || val) {
      if (availLocales.indexOf(newLangValue || val) < 0) {
        setData((cur) => ({
          ...cur,
          templates: {
            ...cur.templates,
            [newLangValue || val]: {
              subject: '',
              body: '',
            },
          },
        }));

        setSelectedLang(newLangValue || val);
        setCurTab(newLangValue || val);
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
    <Box display='flex' width='100%' flexDirection='column'>
      <Box width='100%'>
        <Tabs
          indicatorColor='primary'
          variant='scrollable'
          scrollButtons={false}
          value={curTab}
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
                <div role='button' {...props} ref={ref} style={{ fontSize: '16px' }}>
                  {children}
                  <ClearIcon
                    style={{
                      marginLeft: '10px',
                    }}
                    onClick={(e) => removeLocale(e, locale)}
                    className={locale !== data.fallbackLocale ? '' : 'disabled'}
                  />
                </div>
              ))}
            />
          ))}

          <Tab
            label='Add Language'
            value={0}
            component={forwardRef(({ children, ...props }, ref) => (
              <div
                role='button'
                style={{
                  minWidth: curTab === 0 ? '240px' : 'unset',
                  padding: '10px 15px',
                  cursor: 'pointer',
                  minHeight: '76px',
                }}
                ref={ref}
                {...props}
              >
                {curTab === 0 && (
                  <SelectCustom
                    label='addLanguage'
                    isDisabled={curTab !== 0}
                    value={newLangValue}
                    selectOptions={availableLocales
                      .filter((l) => !availLocales?.filter((a) => a === l.id)?.length)}
                    onChangeSelect={(e) => {
                      setNewLangValue(e.target.value);
                      addLocale(e.target.value);
                    }}
                  />
                )}

                <div hidden>{children}</div>
                {curTab !== 0 && (
                  <AddCircleIcon
                    color='primary'
                    style={{ marginLeft: curTab === 0 ? 15 : 0 }}
                    // onClick={() => addLocale(null)}
                  />
                )}
              </div>
            ))}
          />
        </Tabs>
      </Box>

      <Box display='flex' flexDirection='row' alignItems='baseline' width='100%' position='relative' mt='10px'>
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

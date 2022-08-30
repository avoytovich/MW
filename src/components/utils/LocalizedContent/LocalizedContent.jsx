/* eslint-disable no-confusing-arrow */
/* eslint-disable react/prop-types */
import React, {
  useState, useEffect, forwardRef, useRef,
} from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import {
  Box, Tabs, Tab, LinearProgress, Button, Typography,
} from '@mui/material';

import ClearIcon from '@mui/icons-material/Clear';
import localization from '../../../localization';
import LocalizedInputs from './LocalizedInputs';
import {
  inputValidations, defaultObj, getStyles, getNaming,
} from './inputsConfig';
import LanguagesMenu from './LanguagesMenu';
import { checkValue } from '../../../services/helpers/dataStructuring';
import { handleValidate } from './utils';

const LocalizedContent = ({
  setLocalizedData,
  errors,
  setErrors,
  localizedData,
  defaultLocale,
  isVertical,
  parentId,
}) => {
  const location = useLocation().pathname.split('/');
  const scope = location[location.length - 2];
  const [anchorEl, setAnchorEl] = useState(null);
  const addButtonRef = useRef(null);
  const TabsRef = useRef(null);
  const [selectedLocales, setSelectedLocales] = useState(null);
  const [newLangValue, setNewLangValue] = useState('');
  const [tabValue, setTabValue] = useState(null);
  const [prevLangTab, setPrevLangTab] = useState(null);

  const handleClose = () => { setAnchorEl(null); setTabValue(prevLangTab); };

  const onChangeVariation = (e, langKey, inputLabel) => {
    const curContent = e.target.getContent();
    const correctContent = curContent === '<p></p>' ? '' : curContent;
    const newlangObj = {
      ...localizedData,
      [langKey]: {
        ...localizedData[langKey],
        [inputLabel]: {
          ...localizedData[langKey][inputLabel],
          value: correctContent,
        },
      },
    };

    setLocalizedData(newlangObj);
  };

  const removeLocale = (e, locale) => {
    e.stopPropagation();

    if (tabValue === locale) {
      setTabValue(selectedLocales?.[0]);
      setPrevLangTab(selectedLocales?.[0]);
    }

    const newLocalizedData = { ...localizedData };

    if (newLocalizedData) {
      delete newLocalizedData[locale];
    }
    setLocalizedData({ ...newLocalizedData });
  };
  useEffect(() => {
    if (newLangValue) {
      setLocalizedData({
        ...localizedData,
        [newLangValue]:
          parentId ? { ...defaultObj.productVariation } : { ...defaultObj[scope] },
      });
      setTabValue(newLangValue);
      setPrevLangTab(newLangValue);
      setNewLangValue('');
    }
  }, [newLangValue]);

  useEffect(() => {
    if (!localizedData[defaultLocale]) {
      setNewLangValue(defaultLocale);
    }
    if (defaultLocale) {
      setTabValue(defaultLocale);
      setPrevLangTab(defaultLocale);
    }
  }, [defaultLocale]);

  useEffect(() => {
    const newLocalized = Object.keys(localizedData)
      .filter((key) => key !== defaultLocale);
    const res = defaultLocale ? [defaultLocale, ...newLocalized] : [...newLocalized];
    setSelectedLocales(res || []);
    const validateLang = handleValidate(
      localizedData, checkValue(defaultLocale), scope, inputValidations[scope], parentId,
    );
    if (Object.keys(validateLang).length
      || (!Object.keys(validateLang).length && Object.keys(errors).length)) {
      setErrors(validateLang);
    }
  }, [localizedData, defaultLocale]);

  useEffect(() => {
    if (!tabValue && selectedLocales) {
      setTabValue(selectedLocales[0]);
      setPrevLangTab(selectedLocales[0]);
    }
  }, [selectedLocales]);

  return (!selectedLocales || !Object.keys(localizedData).length) && defaultLocale
    ? <LinearProgress /> : (
      <Box width='100%'>
        {defaultLocale
          ? (
            <Box display='flex' flexDirection={isVertical ? 'row' : 'column'} style={getStyles(isVertical, 'box')}>
              <Box>
                <Tabs
                  ref={TabsRef}
                  orientation={isVertical ? 'vertical' : 'horizontal'}
                  indicatorColor='primary'
                  variant="scrollable"
                  value={tabValue}
                  style={getStyles(isVertical, 'tabs')}
                  onChange={(e, newTab) => {
                    setTabValue(newTab);
                    if (newTab !== 0) {
                      setPrevLangTab(newTab);
                    }
                    if (newTab === 0 && !anchorEl) setTabValue(prevLangTab);
                  }}
                  aria-label='Localizations'
                >
                  <Tab
                    ref={addButtonRef}
                    value={0}
                    component={forwardRef(({ children, ...props }, ref) => (
                      <div role='button' {...props} ref={ref}>
                        <Button
                          size="small"
                          variant="contained"
                          onClick={(event) => setAnchorEl(event.currentTarget)}
                        >
                          {`+ ${localization.t('general.addLanguage')}`}
                        </Button>
                      </div>
                    ))}
                  />
                  {selectedLocales.map((locale) => (
                    <Tab
                      style={errors?.[locale] ? { color: '#ff6341' } : {}}
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
                </Tabs>
              </Box>
              <Box display='flex' width='100%' flexDirection='column'>
                {localizedData[tabValue] && (
                  <LocalizedInputs
                    isDefaultLang={defaultLocale === tabValue}
                    setLocalizedData={setLocalizedData}
                    localizedData={localizedData}
                    onChangeVariation={onChangeVariation}
                    parentId={parentId}
                    errors={errors[tabValue]}
                    handleChange={(lang, curContent, inputKey) => setLocalizedData(
                      {
                        ...localizedData,
                        [lang]: { ...localizedData[lang], [inputKey]: curContent },
                      },
                    )}
                    localizedLangData={localizedData[tabValue]}
                    lang={tabValue}
                    scope={scope}
                    isVertical={isVertical}
                  />
                )}
              </Box>
            </Box>
          ) : (
            <Box px={2}>
              <Typography color='secondary'>{getNaming([scope])}</Typography>
            </Box>
          )}

        <LanguagesMenu
          top={addButtonRef?.current?.offsetTop}
          left={addButtonRef?.current?.offsetLeft + 300}
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          handleClose={handleClose}
          setNewLangValue={setNewLangValue}
          usedOptions={Object.keys(localizedData)}
        />
      </Box>
    );
};

LocalizedContent.propTypes = {
  setLocalizedData: PropTypes.func,
  errors: PropTypes.object,
  setErrors: PropTypes.func,
  localizedData: PropTypes.object,
  defaultLocale: PropTypes.string,
  isVertical: PropTypes.bool,
  parentId: PropTypes.string,
};

export default LocalizedContent;

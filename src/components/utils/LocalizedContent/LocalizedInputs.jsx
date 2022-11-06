/* eslint-disable no-confusing-arrow */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import {
  Box, TextField,
} from '@mui/material';

import localization from '../../../localization';
import InheritanceField from '../../../screens/ProductDetailsScreen/InheritanceField';

import {
  textEditorInputs, getStyles, inputOrder, tooltips,
} from './inputsConfig';
import { checkValue } from '../../../services/helpers/dataStructuring';
import TinyEditor from '../../TinyEditor';
import './localizations.scss';

const LocalizedInputs = ({
  lang,
  scope,
  localizedLangData,
  isVertical,
  handleChange,
  errors,
  isDisabled,
  parentId,
  onChangeVariation,
  setLocalizedData,
  localizedData,
  isDefaultLang,
}) => {
  const getInputOrder = () => inputOrder[scope] ? inputOrder[scope]
    : Object.keys(localizedLangData);

  const containsError = (inputErrors, inputLabel) => {
    const textArray = [];
    Object.keys(inputErrors).forEach((er) => {
      if (inputErrors[er]?.includes(inputLabel)) {
        const input = localization.t(`forms.inputs.localizedContent.${inputLabel}`);
        const translatedError = (isDefaultLang && er === 'canNotBeEmpty') ? localization.t('errorNotifications.isMandatoryForTheDefaultLanguage') : localization.t(`errorNotifications.${er}`);
        textArray.push(`${input} ${translatedError}`);
      }
    });
    return (
      textArray.length ? (
        <Box className='errorText' style={getStyles(isVertical, 'errorText')}>
          {textArray.map((el) => <>{el}</>)}
        </Box>
      ) : <></>
    );
  };
  return lang === 0 ? <Box height='56px' mb={3} /> : getInputOrder()
    .map((inputLabel) => (
      <Box key={`${lang}_${inputLabel}`} className='inputsWrapper'>
        <Box mb={4} style={getStyles(isVertical, 'inputBox')} className='localizedContentWrapper'>
          <InheritanceField
            field={inputLabel}
            onChange={setLocalizedData}
            value={localizedLangData[inputLabel]}
            parentId={parentId}
            localizedLang={lang}
            currentProductData={localizedData}
            isTinymce
          >
            {textEditorInputs.includes(inputLabel)
              ? (
                <TinyEditor
                  onChangeVariation={(e) => onChangeVariation(e, lang, inputLabel)}
                  prodVariation={!!parentId}
                  isDisabled={isDisabled}
                  initialValue={checkValue(localizedLangData[inputLabel]) || ''}
                  placeholder={localization.t(`forms.inputs.localizedContent.${inputLabel}`)}
                  onChange={(e) => handleChange(lang, e.target.getContent(), inputLabel)}
                />
              ) : (
                <TextField
                  placeholder={localization.t(`forms.inputs.localizedContent.${inputLabel}`)}
                  value={checkValue(localizedLangData[inputLabel] || '')}
                  fullWidth
                  type='text'
                  InputProps={{
                    form: { autocomplete: 'off' },
                  }}
                  disabled={localizedLangData[inputLabel]?.state === 'inherits'}
                  onChange={(e) => {
                    if (inputLabel === 'localizedMarketingName' && parentId) {
                      handleChange(lang, {
                        ...localizedLangData[inputLabel],
                        value: e.target.value,
                      }, inputLabel);
                    } else {
                      handleChange(lang, e.target.value, inputLabel);
                    }
                  }}
                  variant='outlined'
                />
              )}
          </InheritanceField>
          {tooltips[scope]?.[inputLabel] && (
            <Box className='notificationText'>
              {tooltips[scope]?.[inputLabel]}
            </Box>
          )}
        </Box>
        {errors && containsError(errors, inputLabel)}
      </Box>
    ));
};

LocalizedInputs.propTypes = {
  localizedLangData: PropTypes.object,
  scope: PropTypes.string,
  lang: PropTypes.string,
  handleChange: PropTypes.func,
  isDisabled: PropTypes.bool,
  parentId: PropTypes.string,
  onChangeVariation: PropTypes.func,
  setLocalizedData: PropTypes.func,
  localizedData: PropTypes.object,
  isDefaultLang: PropTypes.bool,
};

export default LocalizedInputs;

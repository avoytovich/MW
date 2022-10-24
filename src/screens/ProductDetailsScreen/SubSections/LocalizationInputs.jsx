import React from 'react';

import PropTypes from 'prop-types';

import { Box } from '@mui/material';

import InheritanceField from '../InheritanceField';

import TinyEditor from '../../../components/TinyEditor/TinyProductEditor';
import { AutocompleteCustom } from '../../../components/Inputs';

import { checkValue } from '../../../services/helpers/dataStructuring';

import localization from '../../../localization';

import './localizations.scss';

const LocalizationInputs = ({
  data = {},
  isDefault,
  parentId,
  setHasLocalizationChanges,
  curLocal,
  setDisabledWithMandLocal,
  defaultLocale,
}) => {
  const LocalizationInput = ({ val }) => (
    <TinyEditor
      val={val}
      data={data}
      parentId={parentId}
      curLocal={checkValue(curLocal)}
      placeholder={localization.t(`labels.${val}`)}
      setHasLocalizationChanges={setHasLocalizationChanges}
      setDisabledWithMandLocal={setDisabledWithMandLocal}
      isDefault={isDefault}
      defaultLocale={defaultLocale}
    />
  );

  LocalizationInput.propTypes = {
    val: PropTypes.string,
  };

  const stylesForVariations = parentId ? {
    display: 'grid',
    gridTemplateColumns: '1fr 50px',
  } : {};

  return (
    <Box display='flex' width='100%' flexDirection='column'>
      <Box width='60%' px={4} mb={4} position='relative' {...stylesForVariations}>
        <LocalizationInput val='localizedMarketingName' />
      </Box>

      <Box width='100%' px={4} mb={4} {...stylesForVariations}>
        <LocalizationInput val='localizedShortDesc' />
      </Box>

      <Box width='100%' px={4} mb={4} {...stylesForVariations}>
        <LocalizationInput val='localizedLongDesc' />
      </Box>

      <Box width='100%' px={4} mb={4} {...stylesForVariations}>
        <LocalizationInput val='localizedThankYouDesc' />
      </Box>

      <Box width='100%' px={4} mb={4} {...stylesForVariations}>
        <LocalizationInput val='localizedPurchaseEmailDesc' />
      </Box>

      <Box width='100%' px={4} mb={4} {...stylesForVariations}>
        <LocalizationInput val='localizedManualRenewalEmailDesc' />
      </Box>
    </Box>
  );
};

LocalizationInputs.propTypes = {
  data: PropTypes.object,
  parentId: PropTypes.string,
  isDefault: PropTypes.bool,
  setHasLocalizationChanges: PropTypes.func,
  curLocal: PropTypes.string,
  setDisabledWithMandLocal: PropTypes.func,
  defaultLocale: PropTypes.string,
};

const DefaultLanguage = ({
  myRef, curData, selectOptions, onChange, parentId, errors,
}) => (
  <Box p={2} width='50%' display='flex' ref={myRef}>
    <InheritanceField
      field='fallbackLocale'
      onChange={onChange}
      value={curData.fallbackLocale}
      selectOptions={selectOptions || []}
      parentId={parentId}
      currentProductData={curData}
    >
      <AutocompleteCustom
        optionLabelKey='value'
        label="defaultLanguage"
        onSelect={(newValue) => onChange(newValue)}
        selectOptions={selectOptions || []}
        curValue={checkValue(curData.fallbackLocale)}
        error={errors?.localizedContent?.defaultLanguage}
        helperText={errors?.localizedContent?.defaultLanguage && 'Required'}
      />
    </InheritanceField>
  </Box>
);

DefaultLanguage.propTypes = {
  errors: PropTypes.object,
  curData: PropTypes.object,
  selectOptions: PropTypes.array,
  onChange: PropTypes.func,
  parentId: PropTypes.string,
  myRef: PropTypes.object,
};

export { LocalizationInputs, DefaultLanguage };

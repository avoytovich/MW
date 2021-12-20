import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import { Box } from '@mui/material';
import { SelectCustom } from '../../../components/Inputs';

import InheritanceField from '../InheritanceField';
import { checkValue } from '../../../services/helpers/dataStructuring';

import localization from '../../../localization';

import './localizations.scss';
import TinyEditor from '../../../components/TinyEditor';

const LocalizationInputs = ({
  data = {},
  handleChange,
  isDefault,
  parentId,
  setNewTabValues,
}) => {
  const [newData, setNewData] = useState({ ...data });

  useEffect(() => {
    if (JSON.stringify(data) !== JSON.stringify(newData)) {
      setNewData(() => ({ ...data }));
    }
  }, [data]);

  useEffect(() => {
    const hasChanges = JSON.stringify(data) !== JSON.stringify(newData);

    if (hasChanges) {
      setNewTabValues({ ...newData });
    }

    return () => {};
  }, [newData]);

  const updateNewData = (e, name) => {
    const curContent = e.target.getContent();
    if (!name
        || (!curContent && !checkValue(newData[name], newData[name]?.state))
        || (JSON.stringify(curContent) === JSON.stringify(
          checkValue(newData[name], newData[name]?.state),
        ))) return;

    newData[name]?.state
      ? handleChange(
        name,
        {
          ...newData[name],
          value: curContent,
        },
      )
      : handleChange(name, curContent);
  };

  const LocalizationInput = ({ val }) => (
    <InheritanceField
      field={val}
      onChange={setNewData}
      value={newData[val] || ''}
      parentId={parentId}
      currentProductData={newData}
    >
      <TinyEditor
        initialValue={newData[val] ? (checkValue(newData[val], newData[val]?.state) || '') : ''}
        placeholder={localization.t(`labels.${val}`)}
        onChange={(e) => updateNewData(e, val)}
      />
    </InheritanceField>
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
      <Box width='50%' px={4} mb={4} position='relative' {...stylesForVariations}>
        <LocalizationInput val='localizedMarketingName' />

        {isDefault && !data?.localizedMarketingName && (
          <div className='error-message'>
            {localization.t('general.marketingNameMandatory')}
          </div>
        )}
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
  handleChange: PropTypes.func,
  parentId: PropTypes.string,
  isDefault: PropTypes.bool,
  setNewTabValues: PropTypes.func,
};

const DefaultLanguage = ({
  curData, selectOptions, onChange, parentId,
}) => (
  <Box p={2} width='50%' display='flex'>
    <InheritanceField
      field='fallbackLocale'
      onChange={onChange}
      value={curData.fallbackLocale}
      selectOptions={selectOptions || []}
      parentId={parentId}
      currentProductData={curData}
    >
      <SelectCustom
        label='defaultLanguage'
        value={checkValue(curData.fallbackLocale, curData.fallbackLocale?.state)}
        selectOptions={selectOptions}
        onChangeSelect={(e) => onChange(e.target.value)}
      />
    </InheritanceField>
  </Box>
);

DefaultLanguage.propTypes = {
  curData: PropTypes.object,
  selectOptions: PropTypes.array,
  onChange: PropTypes.func,
  parentId: PropTypes.string,
};
export { LocalizationInputs, DefaultLanguage };

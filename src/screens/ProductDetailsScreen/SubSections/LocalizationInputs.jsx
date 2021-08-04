import React, { useState, useEffect, useRef } from 'react';

import ReactQuill from 'react-quill';
import PropTypes from 'prop-types';

import { Box } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

import InheritanceField from '../InheritanceField';
import { checkValue } from '../../../services/helpers/dataStructuring';

import localization from '../../../localization';

import 'react-quill/dist/quill.bubble.css';
import './localizations.scss';

const LocalizationInputs = ({
  data = {},
  handleChange,
  isDefault,
  parentId,
  setNewTabValues,
}) => {
  const [newData, setNewData] = useState({ ...data });
  const [isEditing, setEditing] = useState(false);
  const editor = useRef();

  useEffect(() => {
    setNewData(() => ({ ...data }));
  }, [data]);

  useEffect(() => {
    const hasChanges = JSON.stringify(data) !== JSON.stringify(newData);
    if (hasChanges) {
      setNewTabValues({ ...newData });
    }
    return () => {};
  }, [newData]);

  const updateNewData = (name) => {
    const curContent = editor.current.getEditorContents();

    newData[name]?.state
      ? handleChange(
          name,
          curContent === '<p><br></p>'
            ? {
                ...newData[name],
                value: '',
              }
            : {
                ...newData[name],
                value: curContent,
              },
        )
      : handleChange(name, curContent === '<p><br></p>' ? '' : curContent);
    setEditing(false);
  };

  const LocalizationInput = ({ val }) => (
    <InheritanceField
      field={val}
      onChange={setNewData}
      value={newData[val]}
      parentId={parentId}
      currentProductData={newData}
    >
      {isEditing === val ? (
        <Box position='relative'>
          <ReactQuill
            theme='bubble'
            value={checkValue(newData[val], newData[val]?.state)}
            placeholder={localization.t(`labels.${val}`)}
            ref={editor}
          />

          <SaveIcon
            className='edit-loc-field'
            color='secondary'
            onClick={() => updateNewData(val)}
          />
        </Box>
      ) : (
        <Box position='relative' className='localization-input-holder'>
          <div className={`localization-text-legend ${newData[val] ? '' : 'empty'}`}>
            <span className='MuiFormLabel-root'>{localization.t(`labels.${val}`)}</span>
          </div>

          <div
            className='localization-text-block'
            dangerouslySetInnerHTML={{
              __html: checkValue(newData[val], newData[val]?.state),
            }}
          />

          {!newData[val]?.state || newData[val]?.state === 'overrides' ? (
            <EditIcon
              className='edit-loc-field'
              color='secondary'
              onClick={() => setEditing(val)}
            />
          ) : null}
        </Box>
      )}
    </InheritanceField>
  );

  LocalizationInput.propTypes = {
    val: PropTypes.string,
  };

  const stylesForVariations = parentId
    ? {
        display: 'grid',
        gridTemplateColumns: '1fr 50px',
      }
    : {};

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

export default LocalizationInputs;

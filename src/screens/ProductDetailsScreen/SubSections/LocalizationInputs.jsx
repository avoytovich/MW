/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';

import ReactQuill from 'react-quill';
import PropTypes from 'prop-types';

import { Box } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

import InheritanceField from '../../../components/ProductDetails/InheritanceField';

import localization from '../../../localization';

import 'react-quill/dist/quill.bubble.css';
import './localizations.scss';

const initValues = {
  marketingName: '',
  shortDesc: '',
  longDesc: '',
  thankYouDesc: '',
};

const initValuesWithInheritance = {
  marketingName: {
    value: '',
    state: 'overrides',
    parentValue: '',
  },
  shortDesc: {
    value: '',
    state: 'overrides',
    parentValue: '',
  },
  longDesc: {
    value: '',
    state: 'overrides',
    parentValue: '',
  },
  thankYouDesc: {
    value: '',
    state: 'overrides',
    parentValue: '',
  },
  purchaseEmailDesc: {
    value: '',
    state: 'overrides',
    parentValue: '',
  },
  manualRenewalEmailDesc: {
    value: '',
    state: 'overrides',
    parentValue: '',
  },
};

const LocalizationInputs = ({ data = {}, handleChange, isDefault, parentId }) => {
  const [newData, setNewData] = useState({ ...data });
  const [isEditing, setEditing] = useState(false);
  const editor = useRef();

  useEffect(() => {
    const innitData = parentId ? initValuesWithInheritance : initValues;
    setNewData(() => ({ ...innitData, ...data }));
  }, [data]);

  const updateNewData = (name) => {
    const curContent = editor.current.getEditorContents();

    newData[name]?.state
      ? handleChange(
          name,
          curContent === '<p><br></p>'
            ? ''
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
            value={
              !newData[val]?.state
                ? newData[val]
                : newData[val]?.state === 'inherits'
                ? newData[val]?.parentValue
                : newData[val]?.value
            }
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
              __html: !newData[val]?.state
                ? newData[val]
                : newData[val]?.state === 'inherits'
                ? newData[val]?.parentValue
                : newData[val]?.value,
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

  return (
    <Box display='flex' width='100%' flexDirection='column'>
      <Box width='50%' px={4} mb={4} position='relative'>
        <LocalizationInput val='marketingName' />

        {isDefault && !data?.marketingName && (
          <div className='error-message'>
            {localization.t('general.marketingNameMandatory')}
          </div>
        )}
      </Box>

      <Box width='100%' px={4} mb={4}>
        <LocalizationInput val='shortDesc' />
      </Box>

      <Box width='100%' px={4} mb={4}>
        <LocalizationInput val='longDesc' />
      </Box>

      <Box width='100%' px={4} mb={4}>
        <LocalizationInput val='thankYouDesc' />
      </Box>

      <Box width='100%' px={4} mb={4}>
        <LocalizationInput val='purchaseEmailDesc' />
      </Box>

      <Box width='100%' px={4} mb={4}>
        <LocalizationInput val='manualRenewalEmailDesc' />
      </Box>
    </Box>
  );
};

LocalizationInputs.propTypes = {
  data: PropTypes.object,
  handleChange: PropTypes.func,
  parentId: PropTypes.string,
};

export default LocalizationInputs;

/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';

import ReactQuill from 'react-quill';
import PropTypes from 'prop-types';

import { Box } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

import localization from '../../../localization';

import 'react-quill/dist/quill.bubble.css';
import './localizations.scss';

const initValues = {
  marketingName: '',
  shortDesc: '',
  longDesc: '',
  thankYouDesc: '',
};

const LocalizationInputs = ({ data = {}, handleChange }) => {
  const [newData, setNewData] = useState({ ...data });
  const [isEditing, setEditing] = useState(false);
  const editor = useRef();

  useEffect(() => setNewData(() => ({ ...initValues, ...data })), [data]);

  const updateNewData = (name) => {
    const curContent = editor.current.getEditorContents();

    handleChange(name, curContent === '<p><br></p>' ? '' : curContent);
    setEditing(false);
  };

  const LocalizationInput = ({ val }) => (
    <>
      {isEditing === val ? (
        <Box position='relative'>
          <ReactQuill
            theme='bubble'
            value={newData[val]}
            placeholder={localization.t(`labels.${val}`)}
            ref={editor}
          />

          <SaveIcon className='edit-loc-field' color='secondary' onClick={() => updateNewData(val)} />
        </Box>
      ) : (
        <Box position='relative' className='localization-input-holder'>
          <div className={`localization-text-legend ${newData[val] ? '' : 'empty'}`}>
            <span className='MuiFormLabel-root'>{localization.t(`labels.${val}`)}</span>
          </div>

          <div
            className='localization-text-block'
            dangerouslySetInnerHTML={{ __html: newData[val] }}
          />

          <EditIcon className='edit-loc-field' color='secondary' onClick={() => setEditing(val)} />
        </Box>
      )}
    </>
  );

  return (
    <Box display='flex' width='100%' flexDirection='column'>
      <Box width='50%' px={4} mb={4}>
        <LocalizationInput val='marketingName' />
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
};

export default LocalizationInputs;

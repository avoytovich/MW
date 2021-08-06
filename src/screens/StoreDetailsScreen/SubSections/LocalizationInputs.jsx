import React, { useState, useRef } from 'react';

import ReactQuill from 'react-quill';
import PropTypes from 'prop-types';

import { Box } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

import localization from '../../../localization';

import 'react-quill/dist/quill.bubble.css';
import './localizations.scss';

const LocalizationInputs = ({
  data,
  lang,
  handleChange,
}) => {
  const [isEditing, setEditing] = useState(false);
  const editor = useRef();

  const updateNewData = () => {
    const curContent = editor.current.getEditorContents();

    handleChange((c) => ({
      ...c,
      thankYouDesc: { ...c.thankYouDesc, [lang]: curContent === '<p><br></p>' ? '' : curContent },
    }));

    setEditing(false);
  };

  const LocalizationInput = ({ val }) => (
    isEditing === val ? (
      <Box position='relative'>
        <ReactQuill
          theme='bubble'
          value={data}
          placeholder={localization.t(`forms.inputs.localizedContent.${val}`)}
          ref={editor}
        />

        <SaveIcon
          className='edit-loc-field'
          color='secondary'
          onClick={updateNewData}
        />
      </Box>
    ) : (
      <Box position='relative' className='localization-input-holder'>
        <div className={`localization-text-legend ${data ? '' : 'empty'}`}>
          <span className='MuiFormLabel-root'>{localization.t(`forms.inputs.localizedContent.${val}`)}</span>
        </div>

        <div
          className='localization-text-block'
          dangerouslySetInnerHTML={{ __html: data }}
        />

        <EditIcon
          className='edit-loc-field'
          color='secondary'
          disabled={!lang}
          onClick={() => setEditing(val)}
        />
      </Box>
    )
  );

  LocalizationInput.propTypes = {
    val: PropTypes.string,
  };

  return (
    <Box display='flex' width='100%' flexDirection='column'>
      <Box width='100%' px={4} mb={4}>
        <LocalizationInput val='deliveryRemark' />
      </Box>
    </Box>
  );
};

LocalizationInputs.propTypes = {
  data: PropTypes.any,
  handleChange: PropTypes.func,
  lang: PropTypes.string,
};

export default LocalizationInputs;

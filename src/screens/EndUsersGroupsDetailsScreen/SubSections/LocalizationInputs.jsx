import React from 'react';

import PropTypes from 'prop-types';

import { Box, Typography } from '@mui/material';

import localization from '../../../localization';
import TinyEditor from '../../../components/TinyEditor';
import './localizations.scss';

const LocalizationInputs = ({
  data,
  lang,
  handleChange,
}) => {
  const updateNewData = (editor, inputKey) => {
    const curContent = editor.target.getContent();
    handleChange(lang, curContent, inputKey);
  };

  return (
    <Box display='flex' width='100%' flexDirection='column'>
      {Object.keys(data).map((itemKey) => (
        <Box width='100%' px={4} mb={4} key={itemKey}>
          <Typography color='secondary'>{localization.t(`forms.inputs.localizedContent.${itemKey}`)}</Typography>
          <TinyEditor
            initialValue={data[itemKey] || ''}
            placeholder=''
            onChange={(e) => updateNewData(e, itemKey)}
          />
        </Box>
      ))}
    </Box>
  );
};

LocalizationInputs.propTypes = {
  data: PropTypes.any,
  handleChange: PropTypes.func,
  lang: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default LocalizationInputs;

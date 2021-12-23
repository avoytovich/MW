import React from 'react';

import PropTypes from 'prop-types';

import { Box } from '@mui/material';

import localization from '../../../localization';
import TinyEditor from '../../../components/TinyEditor';

import './localizations.scss';

const LocalizationInputs = ({
  data,
  lang,
  handleChange,
}) => {
  const updateNewData = (editor, v) => {
    const curContent = editor.target.getContent();

    handleChange((c) => ({
      ...c,
      [v]: { ...c[v], [lang]: curContent },
    }));
  };

  const LocalizationInput = ({ val }) => (
    <Box display='flex' width='100%' flexDirection='column'>
      <Box width='100%' px={4} mb={4}>
        <TinyEditor
          initialValue={data[val][lang] || ''}
          placeholder={localization.t(`forms.inputs.localizedContent.${[val]}`)}
          onChange={(editor) => updateNewData(editor, val)}
        />
      </Box>
    </Box>
  );

  LocalizationInput.propTypes = {
    val: PropTypes.string,
  };

  return (
    <Box display='flex' width='100%' flexDirection='column'>
      <Box width='100%' px={4} mb={4}>
        <LocalizationInput val='localizedShortDesc' />
        <LocalizationInput val='localizedLongDesc' />
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

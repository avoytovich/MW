import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Box, TextField } from '@material-ui/core';
import { InputCustom } from '../../../components/Inputs';
import { b64DecodeUnicode, b64EncodeUnicode } from '../../../services/helpers/utils';

import localization from '../../../localization';

const LocalizationInputs = ({
  data,
  lang,
  handleChange,
}) => {
  const [curSubj, setCurSubj] = useState('');
  const [curBody, setCurBody] = useState('');

  useEffect(() => {
    setCurSubj(data?.templates[lang].subject ? b64DecodeUnicode(data?.templates[lang].subject) : '');
    setCurBody(data?.templates[lang].body ? b64DecodeUnicode(data?.templates[lang].body) : '');
  }, [lang]);

  const onChangeInput = (type, text) => {
    handleChange((c) => ({
      ...c,
      templates: {
        ...c.templates,
        [lang]: {
          ...c.templates[lang],
          [type]: b64EncodeUnicode(text),
        },
      },
    }));
  };

  return (
    <Box display='flex' width='100%' flexDirection='column' px={4}>
      <Box py={2} pt={4} width="50%">
        <InputCustom
          label='subj'
          isRequired
          helperText={localization.t('general.subjectIsMandatory')}
          value={curSubj}
          onChangeInput={(e) => setCurSubj(e.target.value)}
          onBlur={(e) => onChangeInput('subject', e.target.value)}
        />
      </Box>

      <Box display="flex">
        <TextField
          fullWidth
          multiline
          rows={15}
          label={localization.t('labels.body')}
          value={curBody}
          variant="outlined"
          onChange={(e) => setCurBody(e.target.value)}
          onBlur={(e) => onChangeInput('body', e.target.value)}
        />
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

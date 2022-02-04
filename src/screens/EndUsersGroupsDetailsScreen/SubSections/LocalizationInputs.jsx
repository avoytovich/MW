import React from 'react';

import PropTypes from 'prop-types';
import { TextField, Box, Typography } from '@mui/material';
import { urlIsValid } from '../../../services/helpers/inputValidators';

import localization from '../../../localization';
import { tinyInputs } from '../utils';
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
          {tinyInputs.includes(itemKey) ? (
            <TinyEditor
              initialValue={data[itemKey] || ''}
              placeholder=''
              onChange={(e) => updateNewData(e, itemKey)}
            />
          ) : (
            <TextField
              error={data[itemKey] ? !urlIsValid(data[itemKey]) : false}
              value={data[itemKey] || ''}
              fullWidth
              type='text'
              InputProps={{
                form: { autocomplete: 'off' },
              }}
              onChange={(e) => handleChange(lang, e.target.value, itemKey)}
              variant='outlined'
            />
          )}
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

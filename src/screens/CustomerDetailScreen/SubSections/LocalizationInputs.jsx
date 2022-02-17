import React from 'react';

import PropTypes from 'prop-types';

import { Box } from '@mui/material';

import TinyEditor from '../../../components/TinyEditor';
import localization from '../../../localization';

const LocalizationInputs = ({
  data,
  lang,
  handleChange,
}) => {
  const updateNewData = (editor, e) => {
    const curContent = e.$().context.textContent;
    handleChange(lang, curContent);
  };

  return (
    <Box display='flex' width='100%' flexDirection='column'>
      <Box width='100%' px={4} mb={4}>
        <TinyEditor
          initialValue={data || ''}
          placeholder={localization.t('forms.inputs.localizedContent.localizedZendeskGuideUrls')}
          onChange={updateNewData}
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

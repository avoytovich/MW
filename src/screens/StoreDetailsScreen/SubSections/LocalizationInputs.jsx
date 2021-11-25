import React from 'react';

import PropTypes from 'prop-types';

import { Box } from '@material-ui/core';

import localization from '../../../localization';

import 'react-quill/dist/quill.bubble.css';
import './localizations.scss';
import TinyEditor from '../../../components/TinyEditor';

const LocalizationInputs = ({
  data,
  lang,
  handleChange,
}) => {
  const updateNewData = (editor) => {
    const curContent = editor.target.getContent();

    handleChange((c) => ({
      ...c,
      thankYouDesc: { ...c.thankYouDesc, [lang]: curContent },
    }));
  };

  return (
    <Box display='flex' width='100%' flexDirection='column'>
      <Box width='100%' px={4} mb={4}>
        <TinyEditor
          initialValue={data || ''}
          placeholder={localization.t('forms.inputs.localizedContent.deliveryRemark')}
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

import React from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import {
  Box, Typography,
} from '@material-ui/core';
import 'ace-builds/src-noconflict/ext-searchbox';
import 'ace-builds/src-noconflict/theme-tomorrow';
import localization from '../../localization';
import './codeEditor.scss';

const languages = [
  'html',
  'handlebars',
  'css',
  'java',
];

languages.forEach((lang) => {
  import(`ace-builds/src-noconflict/mode-${lang}`);
});

const CodeEditor = ({
  onChangeHandler = null,
  value,
  mode,
  isReadOnly,
  editorName = 'codeEditor',
  title,
  isRequired,
}) => {
  const label = title ? localization.t(`labels.${title}`) : `${mode} ${localization.t('labels.editor')}`;
  return (
    <Box display='flex' flexDirection='column' width='100%'>
      <Box pt={2} pb={1}>
        <Typography>{`${label} ${isRequired ? '*' : ''}`}</Typography>
      </Box>
      <Box
        bgcolor='#fff'
        p={1}
        boxShadow={2}
      >
        <AceEditor
          readOnly={isReadOnly}
          mode={mode}
          theme='tomorrow'
          name={editorName}
          width='100%'
          setOptions={{
            showInvisibles: true,
            showPrintMargin: false,
            useWorker: false,
          }}
          minLines={10}
          onChange={onChangeHandler}
          fontSize={14}
          highlightActiveLine
          value={value}
        />
      </Box>
    </Box>
  );
};

CodeEditor.propTypes = {
  value: PropTypes.any,
  onChangeHandler: PropTypes.func,
  mode: PropTypes.string,
  isReadOnly: PropTypes.bool,
  editorName: PropTypes.string,
  title: PropTypes.string,
  isRequired: PropTypes.bool,

};

export default CodeEditor;

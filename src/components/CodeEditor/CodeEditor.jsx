import React from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import {
  Box, Typography,
} from '@mui/material';
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
  noTitle,
  isRequired,
  height,
  fontSize = 14,
}) => {
  const label = title ? localization.t(`labels.${title}`) : `${mode} ${localization.t('labels.editor')}`;
  return (
    <Box display='flex' flexDirection='column' width='100%'>
      {!noTitle && (
        <Box pt={2} pb={1}>
          <Typography>{`${label} ${isRequired ? '*' : ''}`}</Typography>
        </Box>
      )}

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
          height={height}
          fontSize={fontSize}
          setOptions={{
            showInvisibles: true,
            showPrintMargin: false,
            useWorker: false,
          }}
          minLines={10}
          onChange={onChangeHandler}
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
  noTitle: PropTypes.bool,
  height: PropTypes.string,
  fontSize: PropTypes.string,
};

export default CodeEditor;

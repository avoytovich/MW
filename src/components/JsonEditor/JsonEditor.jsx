/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/ext-searchbox';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-tomorrow';

import {
  Button, Box, Typography, Divider,
} from '@mui/material';
import PropTypes from 'prop-types';
import PublishIcon from '@mui/icons-material/Publish';

import localization from '../../localization';
import './jsonEditor.scss';

const JsonEditor = ({
  currentData,
  setCurrentData,
  title = 'JSON',
  jsonKey,
  // jsonIsValid = true,
  // setJsonIsValid = () => { },
  onSave,
  isReadOnly,
  showUploadButton,
}) => {
  const [jsonIsValid, setJsonIsValid] = useState(true);
  const [editorData, setEditorData] = useState('');

  const handleChange = (newValue) => {
    setEditorData(newValue);

    if (jsonKey) {
      setCurrentData && setCurrentData({ ...currentData, [jsonKey]: newValue });
    } else {
      setCurrentData && setCurrentData(newValue);
    }

    try {
      if (newValue !== '') {
        JSON.parse(newValue);
      }
      setJsonIsValid(true);
    } catch {
      setJsonIsValid(false);
    }
  };

  useEffect(() => {
    try {
      const newValue = jsonKey ? currentData[jsonKey] : currentData;
      JSON.parse(newValue);
      setJsonIsValid(true);
    } catch {
      setJsonIsValid(false);
    }
  }, []);

  useEffect(() => {
    setEditorData(currentData);
  }, [currentData]);

  const handleJsonUpload = (e) => {
    e.persist();

    const reader = new FileReader();
    reader.readAsText(e.target.files[0]);
    reader.onload = () => {
      setEditorData(reader.result);

      if (jsonKey) {
        setCurrentData && setCurrentData({
          ...currentData,
          [jsonKey]: reader.result,
        });
      } else {
        setCurrentData && setCurrentData(reader.result);
      }
    };
  };

  return (
    <>
      {!isReadOnly
        && (
          <Box display='flex' p={2}>
            <Box pr={2}>
              <Typography color='secondary'>{localization.t('labels.jsonValidation')}</Typography>
            </Box>
            <Box>
              <Typography style={jsonIsValid ? { color: '#00A300' } : { color: '#FF0000' }}>{jsonIsValid ? localization.t('labels.success') : localization.t('labels.failed')}</Typography>
            </Box>
          </Box>
        )}
      <Box
        my={3}
        bgcolor='#fff'
        boxShadow={2}
        p={3}
      >
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Box display='flex' justifyContent='space-between'>
            <Typography variant='h4'>{title}</Typography>
          </Box>
          {!isReadOnly && !showUploadButton
            && (
              <Box display='flex'>
                {onSave && (
                  <Button
                    disabled={!jsonIsValid || currentData === editorData}
                    onClick={() => onSave(editorData)}
                    variant='outlined'
                    style={{ marginRight: '10px' }}
                  >
                    SAVE
                  </Button>
                )}

                <Button
                  variant='outlined'
                  component='label'
                >
                  {localization.t('general.upload')}
                  <PublishIcon style={{ marginLeft: 5, fontSize: 20 }} />
                  <input
                    type='file'
                    accept="application/JSON"
                    onChange={handleJsonUpload}
                    hidden
                  />
                </Button>
              </Box>
            )}
        </Box>
        <Box mt={3}><Divider light /></Box>
        <Box>
          <AceEditor
            name="jsonEditor"
            theme='tomorrow'
            value={jsonKey ? currentData[jsonKey] : editorData}
            mode="json"
            readOnly={isReadOnly}
            onChange={handleChange}
            setOptions={{
              showInvisibles: true,
              showPrintMargin: false,
              // useWorker: false,
            }}
            width="100%"
            highlightActiveLine
            // debounceChangePeriod={1000}
          />
        </Box>
      </Box>
    </>
  );
};

JsonEditor.propTypes = {
  currentData: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  setCurrentData: PropTypes.func,
  title: PropTypes.string,
  jsonKey: PropTypes.string,
  // jsonIsValid: PropTypes.bool,
  // setJsonIsValid: PropTypes.func,
  isReadOnly: PropTypes.bool,
  showUploadButton: PropTypes.bool,
  onSave: PropTypes.func,
};

export default JsonEditor;

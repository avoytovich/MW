import React from 'react';
import PropTypes from 'prop-types';

import { Box, Grid } from '@mui/material';

import { InputCustom } from '../../../components/Inputs';
import CodeEditor from '../../../components/CodeEditor';

import 'ace-builds/src-noconflict/mode-handlebars';
import 'ace-builds/src-noconflict/theme-tomorrow';

const Templating = ({ setCurNotification, curNotification }) => (
  <Grid container spacing={1}>
    <Grid item md={12} sm={12}>
      <Box px={2}>
        <InputCustom
          label='mailSubjectTemplate'
          value={curNotification?.mailSubjectTemplate}
          onChangeInput={(e) => {
            setCurNotification({ ...curNotification, mailSubjectTemplate: e.target.value });
          }}
        />
      </Box>
    </Grid>

    <Grid item md={12} sm={12}>
      <Box px={2} width={1}>
        <Grid item md={12} sm={12} px={2}>
          <CodeEditor
            title='mailBodyTemplate'
            editorName='mailBodyTemplateEditor'
            mode='handlebars'
            onChangeHandler={(newVal) => {
              setCurNotification({ ...curNotification, mailBodyTemplate: newVal });
            }}
            value={curNotification?.mailBodyTemplate}
          />
        </Grid>
      </Box>
    </Grid>

    <Grid item md={12} sm={12}>
      <Box px={2} width={1}>
        <Grid item md={12} sm={12} px={2}>
          <CodeEditor
            title='webHookPayloadTemplate'
            editorName='webHookPayloadTemplateEditor'
            mode='handlebars'
            onChangeHandler={(newVal) => {
              setCurNotification({ ...curNotification, webHookPayloadTemplate: newVal });
            }}
            value={curNotification?.webHookPayloadTemplate}
          />
        </Grid>
      </Box>
    </Grid>
  </Grid>
);

Templating.propTypes = {
  curNotification: PropTypes.object,
  setCurNotification: PropTypes.func,
};

export default Templating;

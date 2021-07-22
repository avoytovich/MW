import React from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';

import { Box, Grid, Typography } from '@material-ui/core';

import { InputCustom } from '../../../components/Inputs';

import localization from '../../../localization';

import 'ace-builds/src-noconflict/mode-json';
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
      <Box p={2}>
        <Typography gutterBottom variant='h5'>{localization.t('labels.mailBodyTemplate')}</Typography>
      </Box>

      <Box px={2} width={1}>
        <Grid item md={12} sm={12} px={2}>
          <AceEditor
            mode='json'
            theme='tomorrow'
            name='mailBodyTemplate'
            width='100%'
            maxLines={15}
            minLines={10}
            onChange={(newVal) => {
              setCurNotification({ ...curNotification, mailBodyTemplate: newVal });
            }}
            fontSize={14}
            highlightActiveLine
            value={curNotification?.mailBodyTemplate}
          />
        </Grid>
      </Box>
    </Grid>

    <Grid item md={12} sm={12}>
      <Box p={2}>
        <Typography gutterBottom variant='h5'>{localization.t('labels.webHookPayloadTemplate')}</Typography>
      </Box>

      <Box px={2} width={1}>
        <Grid item md={12} sm={12} px={2}>
          <AceEditor
            mode='json'
            theme='tomorrow'
            name='webHookPayloadTemplate'
            width='100%'
            maxLines={15}
            minLines={10}
            onChange={(newVal) => {
              setCurNotification({ ...curNotification, webHookPayloadTemplate: newVal });
            }}
            fontSize={14}
            highlightActiveLine
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

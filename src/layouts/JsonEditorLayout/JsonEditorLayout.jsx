/* eslint-disable camelcase */
import React from 'react';
import { Link } from 'react-router-dom';
import ReactJson from 'react-json-view';
import {
  Box, Typography, Zoom, Button, TextField, Tabs, Tab,
} from '@material-ui/core';
import PropTypes from 'prop-types';

import PublishIcon from '@material-ui/icons/Publish';

import CustomCard from '../../components/utils/CustomCard';

import localization from '../../localization';

import './jsonEditorLayout.scss';

const JsonEditorLayout = ({
  hasChanges,
  doSave,
  currentData,
  staticData,
  setCurrentData,
  customer,
  title,
  isNew,
}) => {
  const editTranslations = (edit) => {
    const { updated_src } = edit;
    setCurrentData({ ...currentData, data: { ...updated_src } });
  };

  const handleJsonUpload = (e) => {
    e.persist();

    const reader = new FileReader();
    reader.readAsText(e.target.files[0]);

    reader.onload = () => setCurrentData({
      ...currentData,
      data: { ...JSON.parse(reader.result) },
    });

    // reader.onerror = () => setCurrentData({ ...currentData, data: {} });
  };

  return (
    <div className='json-editor-screen'>
      <Tabs
        value={0}
        indicatorColor='primary'
        textColor='primary'
      >
        <Tab label={staticData.name || 'new'} />
      </Tabs>

      <Zoom in={hasChanges}>
        <Button
          id="save-json-button"
          color="primary"
          size="large"
          type="submit"
          variant="contained"
          onClick={doSave}
        >
          {localization.t('forms.buttons.save')}
        </Button>
      </Zoom>

      <CustomCard title='General'>
        <Box py={5} pb={2}>
          <Box width="100%" flexWrap="nowrap" display="flex" flexDirection="row">
            <Box width="50%">
              <TextField
                fullWidth
                label={localization.t('labels.name')}
                name="name"
                type="text"
                value={currentData.name}
                onChange={(e) => setCurrentData({ ...currentData, name: e.target.value })}
                variant="outlined"
              />
            </Box>

            <Box display='flex' flexDirection="row" width="50%">
              <Box width="100%" display="flex" flexDirection='column'>
                <Box display="flex">
                  {!isNew && (
                    <Box pr={4} pt="0" pl={6}>
                      <Typography color="secondary">
                        {localization.t('labels.id')}
                      </Typography>
                    </Box>
                  )}

                  <Box pr={4} pt="0" pl={2}>
                    <Typography>{currentData.id}</Typography>
                  </Box>
                </Box>

                <Box display="flex">
                  <Box pr={4} pt="7px" pl={6}>
                    <Typography color="secondary">
                      {localization.t('labels.customer')}
                    </Typography>
                  </Box>

                  <Box pr={4} pt="7px" pl={2}>
                    <Link to={`/settings/administration/${customer}`} className='link-to-customer'>
                      <Typography>{customer}</Typography>
                    </Link>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </CustomCard>

      <CustomCard title={title || 'JSON'} style={{ position: 'relative' }}>
        <Button
          variant='outlined'
          className='json-file-upload'
          component='label'
        >
          Upload
          <PublishIcon style={{ marginLeft: 5, fontSize: 20 }} />
          <input
            type='file'
            accept="application/JSON"
            onChange={handleJsonUpload}
            hidden
          />
        </Button>

        <ReactJson
          src={currentData.data}
          name={false}
          displayDataTypes={false}
          collapseStringsAfterLength={100}
          defaultValue=''
          sortKeys
          collapsed
          onAdd={editTranslations}
          onEdit={editTranslations}
          onDelete={editTranslations}
          iconStyle='square'
          theme={{
            base00: 'rgba(255, 255, 255, 1)',
            base01: 'rgba(206, 200, 197, 1)',
            base02: 'rgba(71, 145, 219, 1)',
            base03: 'rgba(206, 200, 197, 1)',
            base04: 'rgba(206, 200, 197, 1)',
            base05: 'rgba(71, 145, 219, 1)',
            base06: 'rgba(206, 200, 197, 1)',
            base07: 'rgba(0, 0, 0, 1)',
            base08: 'rgba(71, 145, 219, 1)',
            base09: 'rgba(255, 0, 0, 1)',
            base0A: 'rgba(0, 0, 0, 1)',
            base0B: 'rgba(71, 145, 219, 1)',
            base0C: 'rgba(71, 145, 219, 1)',
            base0D: 'rgba(71, 145, 219, 1)',
            base0E: 'rgba(71, 145, 219, 1)',
            base0F: 'rgba(71, 145, 219, 1)',
          }}
        />
      </CustomCard>
    </div>
  );
};

JsonEditorLayout.propTypes = {
  hasChanges: PropTypes.bool,
  doSave: PropTypes.func,
  currentData: PropTypes.object,
  staticData: PropTypes.object,
  setCurrentData: PropTypes.func,
  isNew: PropTypes.bool,
  customer: PropTypes.string,
  title: PropTypes.string,
};

export default JsonEditorLayout;

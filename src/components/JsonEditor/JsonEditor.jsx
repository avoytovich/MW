/* eslint-disable camelcase */
import React from 'react';
import ReactJson from 'react-json-view';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

import PublishIcon from '@material-ui/icons/Publish';

import CustomCard from '../utils/CustomCard';

import localization from '../../localization';
import './jsonEditor.scss';

const JsonEditorLayout = ({
  currentData,
  setCurrentData,
  title,
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
    <CustomCard title={title || 'JSON'} style={{ position: 'relative' }} className='json-editor-screen'>
      <Button
        variant='outlined'
        className='json-file-upload'
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
  );
};

JsonEditorLayout.propTypes = {
  currentData: PropTypes.object,
  setCurrentData: PropTypes.func,
  title: PropTypes.string,
};

export default JsonEditorLayout;

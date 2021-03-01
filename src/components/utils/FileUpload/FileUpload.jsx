import React from 'react';

import { DropzoneArea } from 'material-ui-dropzone';

import Box from '@material-ui/core/Box';
import LandscapeIcon from '@material-ui/icons/Landscape';

import localization from '../../../localization';
import './fileUpload.scss';

const FileUpload = () => {
  const onload = () => {};

  return (
    <DropzoneArea
      Icon={LandscapeIcon}
      dropzoneText={localization.t('labels.selectFile')}
      width='50px'
    />
  );
};

export default FileUpload;

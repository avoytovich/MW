import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { DropzoneArea } from 'react-mui-dropzone';
import LandscapeIcon from '@mui/icons-material/Landscape';

import localization from '../../../localization';
import api from '../../../api';
import './fileUpload.scss';

const FileUpload = ({
  setFileUrl,
  setUrlFetching,
  initialFiles,
  setHasSave,
}) => {
  const [curImage, setCurImage] = useState(null);

  const onAddImage = (files) => {
    const [newFile] = files;

    if (newFile) {
      setUrlFetching(true);

      api
        .addNewAsset(newFile)
        .then(({ headers: { location } }) => {
          setFileUrl(location);
        })
        .finally(() => {
          setUrlFetching(false);
          setHasSave(false);
        });
    }
  };

  const onRemoveImage = () => {
    setFileUrl('');
  };

  useEffect(() => {
    if (initialFiles) {
      axios({
        url: initialFiles,
        method: 'GET',
        responseType: 'blob',
      })
        .then(({ data }) => setCurImage(data))
        .catch(() => setCurImage(initialFiles));
    }

    return () => setCurImage(null);
  }, []);

  return (
    (curImage || !initialFiles) && (
      <DropzoneArea
        Icon={LandscapeIcon}
        dropzoneText={localization.t('labels.selectFile')}
        showAlerts={false}
        onDrop={onAddImage}
        onDelete={onRemoveImage}
        initialFiles={curImage ? [curImage] : []}
        filesLimit={1}
      />
    )
  );
};

FileUpload.propTypes = {
  setFileUrl: PropTypes.func,
  setUrlFetching: PropTypes.func,
  setHasSave: PropTypes.func,
  initialFiles: PropTypes.string,
};

export default FileUpload;

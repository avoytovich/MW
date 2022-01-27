import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { DropzoneArea } from 'react-mui-dropzone';
import { toast } from 'react-toastify';

import LandscapeIcon from '@mui/icons-material/Landscape';
import {
  Box, Typography,
} from '@mui/material';
import api from '../../../api';
import TableComponent from '../../../components/TableComponent';
import {
  generateData,
  defaultShow,
} from '../utils';

import localization from '../../../localization';
import '../../../components/utils/FileUpload/fileUpload.scss';

const Batches = ({
  curFulfillment,
  setUpdate,
}) => {
  const [batches, setBatches] = useState(null);
  const scope = 'manualFulfillmentBatches';
  useEffect(() => {
    const batchesTableData = curFulfillment?.stock
      ? generateData(curFulfillment?.stock) : [];
    setBatches(batchesTableData);

    return () => setBatches(null);
  }, []);

  const onAdd = (acceptedFiles) => {
    acceptedFiles[0]?.name;
    const parts = acceptedFiles[0]?.name.split('.');
    if (parts[parts.length - 1].toLowerCase() === 'csv') {
      const data = new FormData();
      acceptedFiles.forEach((item, index) => {
        data.append(`file-${item.name}-${index}`, item);
      });
      api.addBatchesToManualFulfillmentById(curFulfillment.id, data).then(() => {
        toast(localization.t('general.updatesHaveBeenSaved'));
        setUpdate((u) => u + 1);
      });
    } else {
      toast.error(localization.t('errorNotifications.pleaseUploadTheLicenseKeyPackageInCsvFormat'));
    }
  };
  return (
    <Box p={2}>
      <TableComponent
        customPath='disabled'
        defaultShowColumn={defaultShow}
        tableData={batches}
        scope={scope}
        noActions
        noTableActionsBar
        isAutoHeight
        noEditDeleteActions
        wrapperStyles={{
          paddingBottom: '24px',
        }}
      />
      {curFulfillment.id
        && (
          <Box py={2} display='flex' flexDirection='row' alignItems='center'>
            <Box>
              <DropzoneArea
                showPreviewsInDropzone={false}
                Icon={LandscapeIcon}
                onDrop={onAdd}
                filesLimit={1}
                showAlerts={false}
              />
            </Box>
            <Box px={3}>
              <Typography>{localization.t('general.pleaseEitherDropAKeyfileHere')}</Typography>
              <Typography>{localization.t('general.validKeyfile')}</Typography>
            </Box>
          </Box>
        )}
    </Box>
  );
};

Batches.propTypes = {
  curFulfillment: PropTypes.object,
  setUpdate: PropTypes.func,

};

export default Batches;

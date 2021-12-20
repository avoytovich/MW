import React, { useState } from 'react';
import {
  Box,
  Zoom,
  Button,
  Typography,
} from '@mui/material';

import { SelectCustom } from '../../components/Inputs';

import JsonEditor from '../../components/JsonEditor';
import { serviceConfigs } from '../../services/selectOptions/selectOptions';

import api from '../../api';

import './serviceConfigScreen.scss';

const ServiceConfigScreen = () => {
  const [serviceDataName, setServiceDataName] = useState('');
  const [editorData, setEditorData] = useState({});
  const [jsonIsValid, setJsonIsValid] = useState(true);

  const getConfigData = (value) => {
    setServiceDataName(value);
    const selectedConfig = serviceConfigs.find((obj) => obj.id === value);
    api.getServiceConfig(selectedConfig.configName).then((response) => {
      setEditorData({
        ...editorData,
        data: JSON.stringify(response.data, 0, 4),
      });
    });
  };

  return (
    <Box overflow='auto' p='2px'>
      <Typography style={{ marginLeft: 10 }} variant='h3'>Service Configuration</Typography>
      <div className="service-config-screen">
        <Zoom in={serviceDataName}>
          <Button
            id="save-account-button"
            color="primary"
            size="large"
            type="submit"
            variant="contained"
            disabled
          >
            Save
          </Button>
        </Zoom>
      </div>
      <Box p={2} mt={2} pr={0}>
        <SelectCustom
          label='serviceConfiguration'
          value={serviceDataName}
          selectOptions={serviceConfigs}
          onChangeSelect={(e) => getConfigData(e.target.value)}
          name='serviceConfig'
        />
        <JsonEditor
          jsonKey='data'
          currentData={editorData}
          setCurrentData={setEditorData}
          jsonIsValid={jsonIsValid}
          setJsonIsValid={setJsonIsValid}
          showUploadButton
        />
      </Box>
    </Box>
  );
};
export default ServiceConfigScreen;

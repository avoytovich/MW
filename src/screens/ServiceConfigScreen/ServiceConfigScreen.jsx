import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Zoom, Button, Typography } from '@material-ui/core';

import { SelectCustom } from '../../components/Inputs';

import JsonEditorLayout from '../../layouts/JsonEditorLayout';

import api from '../../api';

import './serviceConfigScreen.scss';

const ServiceConfigScreen = () => {
  const [serviceDataName, setServiceDataName] = useState('')
  const [editorData, setEditorData] = useState({})
  const location = useLocation();

  const serviceConfigs = [
    { id:'DE', value: 'dexter' },
    { id:'KP', value:'kaspersky-proxy' }, 
    { id:'OG', value:'ordersgs' }, 
    { id:'OB', value:'onboarding' }, 
    { id:'AP', value:'avast-proxy' }, 
    { id:'PP', value:'payment-proxy' }, 
    { id:'EB', value:'email-builder' }, 
    { id:'BD', value:'bitdefender' }
  ]

  const getConfigData = (value) => {
    setServiceDataName(value);
    const selectedConfig = serviceConfigs.find(obj => obj.id === value);
    api.getServiceConfig(selectedConfig.value).then((response) => {
      setEditorData({
        ...editorData,
        data: JSON.stringify(response.data, 0, 4)
      })
    });
  };

  return (
    <>
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
      <Box p={2} mt={9} pr={0}>
        <SelectCustom
          label='serviceConfiguration'
          value={serviceDataName}
          selectOptions={serviceConfigs}
          onChangeSelect={(e) => getConfigData(e.target.value)}
        />
        <JsonEditorLayout currentData={editorData} jsonKey='data' title='Serive Configuration' />
      </Box>
    </>
  );
};
export default ServiceConfigScreen;

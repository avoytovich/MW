import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box, Typography, LinearProgress,
} from '@material-ui/core';

import api from '../../api';
import { generateData, defaultShow } from '../../services/useData/tableMarkups/LicenseDetails';

import OrderDetailsTableComponent from '../../components/TableComponent/OrderDetailsTableComponent';
import SelectCustom from '../../components/Inputs/SelectCustom';

import localization from '../../localization';

const LicenseScreen = () => {
  const { id } = useParams();

  const [license, setLicense] = useState(null);
  const [tableData, settableData] = useState(null);
  const [newStatus, setStatus] = useState('');

  useEffect(() => {
    api
      .getLicenseById(id)
      .then(({ data }) => {
        setLicense(data);
        const eventsTableData = generateData(data);
        settableData(eventsTableData);
        setStatus(data.status);
      });
  }, []);

  if (license === null) return <LinearProgress />;

  const markup = [
    { label: localization.t('labels.general'), header: true },
    { label: localization.t('labels.licenseId'), value: license.id },
    { label: localization.t('labels.status'), dropdown: true, dropDownValue: [{ id: license.status, value: license.status }] },
    { label: localization.t('labels.customer'), value: license.customerId },
    { label: localization.t('labels.orderId'), value: license.checkout.orderId },
    { label: localization.t('labels.orderLineId'), value: license.checkout.orderLineId },
    { label: localization.t('labels.user'), header: true },
    { label: localization.t('labels.firstName'), value: license.user.firstName },
    { label: localization.t('labels.lastName'), value: license.user.lastName },
    { label: localization.t('labels.email'), value: license.user.email },
    { label: localization.t('labels.city'), value: license.user.city },
    { label: localization.t('labels.zipCode'), value: license.user.zipCode },
    { label: localization.t('labels.country'), value: license.user.country },
    { label: localization.t('labels.locale'), value: license.user.locale },
    { label: localization.t('labels.product'), header: true },
    { label: localization.t('labels.productId'), value: license.product.id },
    { label: localization.t('labels.licenseProviderDefinitionId'), value: license.product.licenseProviderDefinitionId },
    { label: localization.t('labels.publisherProductId'), value: license.product.publisherProductId },
    { label: localization.t('labels.name'), value: license.product.name },
    { label: localization.t('labels.operationExecutions'), header: true },
  ];

  return (
    <>

      {markup.map((val) => (
        <Box key={val.label}>

          {val.dropdown && (
            <Box my={2} width='100%'>
              <SelectCustom
                isDisabled
                value={newStatus}
                selectOptions={val.dropDownValue}
                onChangeSelect={(e) => setStatus(e.target.value)}
                label='status'
              />
            </Box>
          )}

          {val.header && (
            <Box my={2} width='100%'>
              <Typography variant='h2'>
                {val.label}
              </Typography>
            </Box>
          )}
          {val.value && (
            <Box display='flex' flexDirection='row'>
              <Box my={2} width='30%'>
                <Typography variant='h5'>
                  {val.label}
                </Typography>
              </Box>

              <Box my={2} width='70%'>
                <Typography>
                  {val.value}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      ))}

      <OrderDetailsTableComponent
        showColumn={defaultShow}
        tableData={tableData}
        isLoading={tableData === null}
        customPath='disabled'
        errorHighlight='processingError'
        noActions
      />

    </>
  );
};

export default LicenseScreen;

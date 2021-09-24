import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box, Typography, LinearProgress, Tabs, Tab, Grid, Link,
} from '@material-ui/core';
import parentPaths from '../../services/paths';

import api from '../../api';
import { generateData, defaultShow } from '../../services/useData/tableMarkups/LicenseDetails';

import CustomBreadcrumbs from '../../components/utils/CustomBreadcrumbs';
import TableComponent from '../../components/TableComponent';
import OrderRow from '../OrderDetailsScreen/OrderRow';

import localization from '../../localization';

const LicenseDetailsScreen = () => {
  const { id } = useParams();
  const scope = 'licensesDetails';

  const tabLabels = ['general', 'operationExecutions'];

  const [curTab, setCurTab] = useState(0);
  const [license, setLicense] = useState(null);
  const [tableData, settableData] = useState(null);

  useEffect(() => {
    api
      .getLicenseById(id)
      .then(({ data }) => {
        setLicense(data);
        const eventsTableData = generateData(data);
        settableData(eventsTableData);
      });
  }, []);

  if (license === null) return <LinearProgress />;

  const general = [
    { label: localization.t('labels.status'), value: license.status },
    { label: localization.t('labels.customer'), value: <Link href={`${parentPaths.customers}/${license.customerId}`}>{license.customerId}</Link>, key: 'customerId' },
    { label: localization.t('labels.orderId'), value: license.checkout.orderId },
    { label: localization.t('labels.orderLineId'), value: license.checkout.orderLineId },
  ];
  const user = [
    { label: localization.t('labels.firstName'), value: license.user.firstName },
    { label: localization.t('labels.lastName'), value: license.user.lastName },
    { label: localization.t('labels.email'), value: license.user.email },
    { label: localization.t('labels.city'), value: license.user.city },
    { label: localization.t('labels.zipCode'), value: license.user.zipCode },
    { label: localization.t('labels.country'), value: license.user.country },
    { label: localization.t('labels.locale'), value: license.user.locale },
  ];
  const product = [
    { label: localization.t('labels.productId'), value: license.product.id },
    { label: localization.t('labels.licenseProviderDefinitionId'), value: license.product.licenseProviderDefinitionId },
    { label: localization.t('labels.publisherProductId'), value: license.product.publisherProductId },
    { label: localization.t('labels.name'), value: license.product.name },
  ];

  return (
    <>
      <Box mx={2}>
        <CustomBreadcrumbs
          url={`${parentPaths.licenses}`}
          section={localization.t('general.licenses')}
          id={id}
        />
      </Box>
      <Box py={2} mt={3}>
        <Typography gutterBottom variant='h3'>
          {localization.t('labels.licenseId')} {id}
        </Typography>
      </Box>
      <Box my={2} bgcolor='#fff'>
        <Tabs
          value={curTab}
          indicatorColor='primary'
          textColor='primary'
          onChange={(event, newValue) => {
            setCurTab(newValue);
          }}
          aria-label='disabled tabs example'
        >
          {tabLabels.map((tab) => (
            <Tab key={tab} label={localization.t(`labels.${tab}`)} />
          ))}
        </Tabs>
      </Box>

      {curTab === 0 && (
        <Grid container spacing={2}>
          <Grid item md={4} xs={12}>
            <Box my={3} bgcolor='#fff' boxShadow={2} height='100%'>
              <Box py={3} pl={2}>
                <Typography gutterBottom variant='h4'>
                  {localization.t('labels.general')}
                </Typography>
              </Box>
              <OrderRow rowData={general} />
            </Box>
          </Grid>
          <Grid item md={4} xs={12}>
            <Box my={3} bgcolor='#fff' boxShadow={2} height='100%'>
              <Box py={3} pl={2}>
                <Typography gutterBottom variant='h4'>
                  {localization.t('labels.user')}
                </Typography>
              </Box>

              <OrderRow rowData={user} />
            </Box>
          </Grid>
          <Grid item md={4} xs={12}>
            <Box my={3} bgcolor='#fff' boxShadow={2} height='100%'>
              <Box py={3} pl={2}>
                <Typography gutterBottom variant='h4'>
                  {localization.t('labels.product')}
                </Typography>
              </Box>
              <OrderRow rowData={product} />
            </Box>
          </Grid>
        </Grid>
      )}

      {curTab === 1 && (
      <>
        <Box my={2} pt={2} pb={2} width='100%'>
          <Typography variant='h2'>
            {localization.t('labels.operationExecutions')}
          </Typography>
        </Box>
        <TableComponent
          defaultShowColumn={defaultShow}
          tableData={tableData}
          scope={scope}
          noActions
          noTableActionsBar
          noEditDeleteActions
          customPath
        />
      </>
      )}

    </>
  );
};

export default LicenseDetailsScreen;

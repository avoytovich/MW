import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

import InheritanceField from '../InheritanceField';

import { InputCustom, SelectWithDeleteIcon } from '../../../components/Inputs';
import { checkValue } from '../../../services/helpers/dataStructuring';
import localization from '../../../localization';
import api from '../../../api';

import './FulfillmentAndSubscription.scss';

const Fulfillment = ({
  setProductData,
  currentProductData,
  selectOptions,
  parentId,
}) => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const { id, publisherRefId, customerId } = currentProductData;

    api
      .getManualFulfillmentsForProduct(id, publisherRefId, customerId)
      .then(({ data }) => {
        setPackages(data?.items || []);
      });
  }, [currentProductData.id]);

  return (
    <>
      <Box display="flex" flexDirection="row" alignItems="baseline">
        <Box p={2} width="50%">
          <InheritanceField
            field='fulfillmentTemplate'
            onChange={setProductData}
            value={currentProductData?.fulfillmentTemplate}
            parentId={parentId}
            currentProductData={currentProductData}
          >
            <SelectWithDeleteIcon
              label="fulfillmentTemplate"
              value={checkValue(currentProductData.fulfillmentTemplate)}
              selectOptions={selectOptions.fulfillmentTemplates}
              onChangeSelect={(e) => {
                setProductData({ ...currentProductData, fulfillmentTemplate: e.target.value });
              }}
              onClickDelIcon={() => setProductData({
                ...currentProductData,
                fulfillmentTemplate: '',
                releaseDate: '',
              })}
            />
          </InheritanceField>
        </Box>
      </Box>

      <Box width={1} display="flex" flexDirection='column' px={1}>
        <Box p={2}>
          <Typography color="secondary">{localization.t('labels.licenseKeyPackages')}</Typography>
        </Box>

        {
          !packages.length ? (
            <Box px={2} mb='25px'><Typography>{localization.t('general.noPackagesFound')}</Typography></Box>
          ) : (
            <Box px={2} className='packages-table' mb='25px'>
              <TableContainer component={Paper}>
                <Table aria-label='simple table'>
                  <TableHead>
                    <TableRow style={{ background: '#eee' }}>
                      <TableCell align='center'>ID</TableCell>
                      <TableCell align='center'>Name</TableCell>
                      <TableCell align='center'>Status</TableCell>
                      <TableCell align='center'>Available</TableCell>
                      <TableCell align='center'>Threshold</TableCell>
                      <TableCell align='center'>Blacklisted</TableCell>
                      <TableCell align='center'>Canceled</TableCell>
                      <TableCell align='center'>Occupied</TableCell>
                      <TableCell align='center'>Renewed</TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {packages.map((pckg) => (
                      <TableRow key={pckg.id}>
                        <TableCell align='center'>{pckg.id}</TableCell>
                        <TableCell align='center'>{pckg.name}</TableCell>
                        <TableCell align='center'>{pckg.status}</TableCell>
                        <TableCell align='center'>{pckg?.stock?.available || 0}</TableCell>
                        <TableCell align='center'>{pckg?.threshold}</TableCell>
                        <TableCell align='center'>{pckg?.stock?.blacklisted || 0}</TableCell>
                        <TableCell align='center'>{pckg?.stock?.canceled || 0}</TableCell>
                        <TableCell align='center'>{pckg?.stock?.occupied || 0}</TableCell>
                        <TableCell align='center'>{pckg?.stock?.renewed || 0}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )
        }
      </Box>

      <Box p={2} width="50%">
        <InheritanceField
          field='externalContext'
          onChange={setProductData}
          value={currentProductData?.externalContext}
          parentId={parentId}
          currentProductData={currentProductData}
        >
          <InputCustom
            isMultiline
            tooltip={localization.t('tooltips.externalContext')}
            label='externalContext'
            value={checkValue(currentProductData?.externalContext)}
            onChangeInput={(e) => setProductData({
              ...currentProductData,
              externalContext: e.target.value,
            })}
          />
        </InheritanceField>
      </Box>
    </>
  );
};

Fulfillment.propTypes = {
  setProductData: PropTypes.func,
  currentProductData: PropTypes.object,
  selectOptions: PropTypes.object,
  parentId: PropTypes.string,
};

export default Fulfillment;

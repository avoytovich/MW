import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
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
  TableFooter,
} from '@mui/material';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import InheritanceField from '../InheritanceField';

import { InputCustom, SelectWithDeleteIcon, AutocompleteCustom } from '../../../components/Inputs';
import { checkValue } from '../../../services/helpers/dataStructuring';
import { copyText } from '../../../services/helpers/utils';
import parentPaths from '../../../services/paths';
import localization from '../../../localization';
import api from '../../../api';

import './FulfillmentAndSubscription.scss';

const Fulfillment = ({
  myRef,
  setProductData,
  currentProductData,
  selectOptions,
  parentId,
}) => {
  const history = useHistory();
  const [packages, setPackages] = useState([]);

  const getTotal = (val1, val2) => {
    let total = 0;

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i <= packages.length; i++) {
      if (packages && packages[i]) {
        const val = val2 ? packages[i][val1][val2] : packages[i][val1];
        total += val || 0;
      }
    }

    return total;
  };

  useEffect(() => {
    const { id, publisherRefId, customerId } = currentProductData;

    const productId = id || parentId;

    api
      .getManualFulfillmentsForProduct(productId, checkValue(publisherRefId), customerId)
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
            <AutocompleteCustom
              optionLabelKey='value'
              label="fulfillmentTemplate"
              onSelect={(newValue) => setProductData({
                ...currentProductData,
                fulfillmentTemplate: newValue,
              })}
              selectOptions={selectOptions?.fulfillmentTemplates || []}
              curValue={checkValue(currentProductData?.fulfillmentTemplate)}
            />
          </InheritanceField>
        </Box>
      </Box>

      <Box width={1} display="flex" flexDirection='column' px={1} ref={myRef}>
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
                      <TableCell align='center' style={{ color: packages.filter((i) => !i?.stock?.available).length ? '#ff0202' : 'inherit' }}>
                        Available
                      </TableCell>
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
                      <TableRow
                        key={pckg.id}
                        onClick={() => history.push(`${parentPaths.fulfillment.manualFulfillmentsTab}/${pckg.id}`)}
                        style={{
                          cursor: 'pointer',
                        }}
                      >
                        <TableCell align='center'>
                          {pckg.id}
                          <ContentCopyIcon
                            onClick={(e) => { e.stopPropagation(); copyText(pckg.id); }}
                            color='secondary'
                            style={{
                              position: 'relative',
                              top: '4px',
                              marginLeft: '7px',
                              fontSize: '18px',
                            }}
                            className='copyIcon'
                          />
                        </TableCell>
                        <TableCell align='center'>{pckg.name}</TableCell>
                        <TableCell align='center'>{pckg.status}</TableCell>
                        <TableCell align='center' style={{ color: pckg?.stock?.available ? 'inherit' : '#ff0202' }}>
                          {pckg?.stock?.available || 0}
                        </TableCell>
                        <TableCell align='center'>{pckg?.threshold}</TableCell>
                        <TableCell align='center'>{pckg?.stock?.blacklisted || 0}</TableCell>
                        <TableCell align='center'>{pckg?.stock?.canceled || 0}</TableCell>
                        <TableCell align='center'>{pckg?.stock?.occupied || 0}</TableCell>
                        <TableCell align='center'>{pckg?.stock?.renewed || 0}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>

                  <TableFooter>
                    <TableRow>
                      <TableCell />
                      <TableCell />
                      <TableCell align='center'>{localization.t('labels.total')}</TableCell>
                      <TableCell align='center'>{getTotal('stock', 'available')}</TableCell>
                      <TableCell align='center'>{getTotal('threshold')}</TableCell>
                      <TableCell align='center'>{getTotal('stock', 'blacklisted')}</TableCell>
                      <TableCell align='center'>{getTotal('stock', 'canceled')}</TableCell>
                      <TableCell align='center'>{getTotal('stock', 'occupied')}</TableCell>
                      <TableCell align='center'>{getTotal('stock', 'renewed')}</TableCell>
                    </TableRow>
                  </TableFooter>
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
  myRef: PropTypes.object,
};

export default Fulfillment;

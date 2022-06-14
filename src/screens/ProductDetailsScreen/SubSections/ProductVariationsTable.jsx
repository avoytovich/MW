import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableSortLabel,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';

import ClearIcon from '@mui/icons-material/Clear';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import localization from '../../../localization';

import parentPaths from '../../../services/paths';
import { copyText } from '../../../services/helpers/utils';

import DeletePopup from '../../../components/Popup/DeletePopup';
import SectionLayout from '../../../components/SectionLayout';

import './productFile.scss';

const ProductVariationsTable = ({
  currentProductData,
  handleDeleteVariation,
  productVariations,
  setSortedBundledProducts,
  history,
  productId,
  sortedBundledProducts,
}) => {
  const [orderBy, setOrderBy] = useState('updateLast');
  const [order, setOrder] = useState('desc');

  const getSeatsText = (seat) => {
    if (!seat) return '';

    const seatNum = seat.replace('val', '');

    return `${seatNum} PC${seatNum > 1 ? 's' : ''}`;
  };
  const onRequestSort = (event, property) => {
    setOrder(order === 'asc' ? 'desc' : 'asc');
    setOrderBy(property);
    let compareFn = () => { };
    if (order === 'asc') {
      compareFn = (a, b) => b.updateDate - a.updateDate;
    }
    if (order === 'desc') {
      compareFn = (a, b) => a.updateDate - b.updateDate;
    }
    setSortedBundledProducts(productVariations?.bundledProducts.sort(compareFn));
  };

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <SectionLayout label='productVariations' wrapperWidth='initial'>
      <Box mt={3}>
        <Typography>Emphasized values override parent product's values.</Typography>
      </Box>
      <Box mt={3}>
        <TableContainer component={Paper}>
          <Table aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align='center' sortDirection='asc'>
                  <TableSortLabel
                    active
                    direction={order}
                    onClick={createSortHandler('updateLast')}
                  >
                    Last Update
                  </TableSortLabel>
                </TableCell>
                <TableCell align='center'>Status</TableCell>
                <TableCell align='center'>Publisher reference</TableCell>
                <TableCell align='center'>Lifetime</TableCell>
                <TableCell align='center'>Fulfillment Model</TableCell>
                <TableCell align='center'>Subscription Model</TableCell>
                <TableCell align='center'>Seats</TableCell>
                <TableCell align='center' width='75px' />
              </TableRow>
            </TableHead>
            <TableBody data-test='productVariants'>
              {sortedBundledProducts?.map((item) => {
                const {
                  id,
                  updateDate,
                  status,
                  publisherRefId,
                  lifeTime,
                  fulfillmentTemplate,
                  subscriptionTemplate,
                  seats,
                } = item;

                return (
                  <TableRow
                    key={id}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      history.push(`${parentPaths.productlist}/${id}`, {
                        parentId: productId,
                      });
                    }}
                  >
                    <TableCell component='th' scope='row'>
                      <ContentCopyIcon
                        onClick={(e) => { e.stopPropagation(); copyText(id); }}
                        color="secondary"
                        style={{
                          marginRight: '5px', fontSize: '16px', position: 'relative', top: '2px',
                        }}
                        className="copyIcon"
                      />
                      <Link to={`${parentPaths.productlist}/${id}`} className='link-to-variation'>{id}</Link>
                    </TableCell>
                    <TableCell
                      align='center'
                    >
                      {moment(updateDate).format('D MMM YYYY HH:mm:ss') || ''}
                    </TableCell>
                    <TableCell
                      align='center'
                      className={`status-${status === 'ENABLED' ? 'enabled' : 'disabled'}`}
                    >
                      {status || ''}
                    </TableCell>
                    <TableCell
                      align='center'
                      style={{ color: currentProductData.publisherRefId !== publisherRefId && '#719ded' }}
                    >
                      {publisherRefId || '-'}
                    </TableCell>
                    <TableCell
                      align='center'
                      style={{ color: currentProductData.lifeTime !== lifeTime && '#719ded' }}
                    >
                      {lifeTime || ''}
                    </TableCell>
                    <TableCell align='center'>
                      {(fulfillmentTemplate === undefined ? currentProductData?.fulfillmentTemplateName : fulfillmentTemplate) || ''}
                    </TableCell>
                    <TableCell
                      align='center'
                      style={{ color: currentProductData.subscriptionTemplate !== subscriptionTemplate && '#719ded' }}
                    >
                      {subscriptionTemplate || ''}
                    </TableCell>

                    <TableCell align='center' style={{ color: '#719ded' }}>
                      {getSeatsText(seats || currentProductData?.seats)}
                    </TableCell>

                    <TableCell align='center'>
                      <Box onClick={(e) => { e.stopPropagation(); }}>
                        <DeletePopup
                          id={id}
                          deleteFunc={handleDeleteVariation}
                          deleteIcon={<ClearIcon />}
                          title={`${localization.t('labels.areYouSureYouWantToDeleteTheVariation')}`}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <Box mt={3}>
          <Button
            variant='outlined'
            data-test='addVariant'
            color='primary'
            onClick={() => {
              history.push(`${parentPaths.productlist}/add`, {
                parentId: productId,
              });
            }}
            disabled={!currentProductData?.availableVariables?.length}
          >
            Add variant
          </Button>
        </Box>
      </Box>
    </SectionLayout>
  );
};

ProductVariationsTable.propTypes = {
  setSortedBundledProducts: PropTypes.func,
  currentProductData: PropTypes.object,
  productVariations: PropTypes.shape({
    bundledProducts: PropTypes.array,
    variations: PropTypes.object,
  }),
  handleDeleteVariation: PropTypes.func,
  history: PropTypes.object,
  productId: PropTypes.string,
  sortedBundledProducts: PropTypes.array,
};

export default ProductVariationsTable;

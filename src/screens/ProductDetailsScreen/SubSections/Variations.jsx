import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import parentPaths from '../../../services/paths';
import SectionLayout from '../../../components/SectionLayout';

import AddVariationModal from '../../../components/utils/Modals/AddVariationModal';

import './productFile.scss';

const Variations = ({
  setProductData,
  currentProductData,
  productVariations: { bundledProducts = [], variations },
  setProductDetails,
  productDetails,
}) => {
  // MOCK !!!
  const defaultLocale = 'en-US';
  //
  const history = useHistory();
  const { id: productId } = useParams();

  const [open, setOpen] = useState(false);

  const counts = {};
  const subProductsList = currentProductData?.subProducts || [];

  subProductsList.forEach((x) => {
    counts[x] = (counts[x] || 0) + 1;
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteVariable = (field) => {
    const newAvailableVariables = currentProductData.availableVariables.filter(
      (item) => item.field !== field,
    );
    const newVariableDescriptions = productDetails.variableDescriptions.filter(
      ({ description }) => description !== field,
    );
    setProductData({
      ...currentProductData,
      availableVariables: newAvailableVariables,
    });
    setProductDetails({
      ...productDetails,
      variableDescriptions: newVariableDescriptions,
    });
  };

  return (
    <Box display='flex' flexDirection='column' width='100%'>
      {currentProductData.id && (
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
                    <TableCell align='center'>Status</TableCell>
                    <TableCell align='center'>Publisher reference</TableCell>
                    <TableCell align='center'>Lifetime</TableCell>
                    <TableCell align='center'>Fulfillment Model</TableCell>
                    <TableCell align='center'>Subscription Model</TableCell>
                    {variations?.availableVariables?.map(({ field }) => (
                      <TableCell key={field} align='center'>
                        {field}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody data-test='productVariants'>
                  {bundledProducts?.map((item) => {
                    const {
                      id,
                      status,
                      publisherRefId,
                      lifeTime,
                      fulfillmentTemplate,
                      subscriptionTemplate,
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
                          {id}
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
                        <TableCell
                          align='center'
                          style={{ color: currentProductData.fulfillmentTemplate !== fulfillmentTemplate && '#719ded' }}
                        >
                          {fulfillmentTemplate || ''}
                        </TableCell>
                        <TableCell
                          align='center'
                          style={{ color: currentProductData.subscriptionTemplate !== subscriptionTemplate && '#719ded' }}
                        >
                          {subscriptionTemplate || ''}
                        </TableCell>
                        {variations?.availableVariables?.map(
                          ({ fieldValue, field, localizedValue }) => (
                            <TableCell key={field} align='center'>
                              {localizedValue[fieldValue][defaultLocale]}
                            </TableCell>
                          ),
                        )}
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
      )}
      <Box display='flex'>
        <SectionLayout label='variationParameters' width='100%'>
          <TableContainer component={Paper}>
            <Table aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Parameter Name</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {currentProductData?.availableVariables?.map(({ field, type }) => (
                  <TableRow key={field}>
                    <TableCell>{field}</TableCell>
                    <TableCell>{type}</TableCell>
                    <TableCell>
                      <IconButton
                        color='secondary'
                        aria-label='clear'
                        onClick={() => handleDeleteVariable(field)}
                        size='large'
                      >
                        <ClearIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box marginTop='30px'>
            <Button variant='outlined' color='primary' onClick={handleOpen}>
              Add Variation
            </Button>
          </Box>
          <AddVariationModal
            open={open}
            onClose={handleClose}
            setProductData={setProductData}
            currentProductData={currentProductData}
            setProductDetails={setProductDetails}
            productDetails={productDetails}
          />
        </SectionLayout>
      </Box>
    </Box>
  );
};
Variations.propTypes = {
  setProductData: PropTypes.func,
  currentProductData: PropTypes.object,
  productVariations: PropTypes.shape({
    bundledProducts: PropTypes.array,
    variations: PropTypes.object,
  }),
  setProductDetails: PropTypes.func,
  productDetails: PropTypes.object,
};

export default Variations;

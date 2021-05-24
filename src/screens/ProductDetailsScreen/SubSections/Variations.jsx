import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';

import {
  Box,
  Button,
  ButtonGroup,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ClearIcon from '@material-ui/icons/Clear';

import SectionLayout from '../../../components/SectionLayout';
import { SelectCustom } from '../../../components/Inputs';

import Popup from '../../../components/Popup';
import AddVariationModal from '../../../components/utils/Modals/AddVariationModal';

const Variations = ({
  selectOptions,
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

  const [selectedBundledProduct, setSelectedBundledProduct] = useState(null);
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

  return (
    <Box display='flex' flexDirection='column' width='100%'>
      <SectionLayout label='productVariations' wrapperWidth='initial'>
        <Box mt={3}>
          <Typography>Emphasized values override parent product's values.</Typography>
        </Box>
        <Box mt={3}>
          <TableContainer component={Paper}>
            <Table className='table' aria-label='simple table'>
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
              <TableBody>
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
                        history.push(`/overview/products/${id}`, {
                          parentId: productId,
                        });
                      }}
                    >
                      <TableCell component='th' scope='row'>
                        {id}
                      </TableCell>
                      <TableCell align='center'>{status || ''}</TableCell>
                      <TableCell align='center'>{publisherRefId || '-'}</TableCell>
                      <TableCell align='center'>{lifeTime || ''}</TableCell>
                      <TableCell align='center'>{fulfillmentTemplate || ''}</TableCell>
                      <TableCell align='center'>{subscriptionTemplate || ''}</TableCell>
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
              color='primary'
              onClick={() => {
                history.state = {
                  parentId: productId,
                };
                history.push(`/products/add`);
              }}
              disabled={!currentProductData?.availableVariables?.length}
            >
              Add variant
            </Button>
          </Box>
        </Box>
      </SectionLayout>
      <Box display='flex'>
        <SectionLayout label='bundledProducts' contentWidth='100%'>
          {Object.entries(counts).map(([key, value]) => {
            const selectValue =
              selectOptions?.renewingProducts?.find(({ id }) => id === key) || '';

            return (
              <Box
                key={key}
                display='flex'
                justifyContent='space-between'
                marginBottom='30px'
                marginRight='30px'
              >
                <Popup
                  text={selectValue.value}
                  childrenComponent={(props) => (
                    <TextField
                      name={key}
                      aria-owns={props.open ? `mouse-over-popover ${key}` : undefined}
                      aria-haspopup='true'
                      disabled
                      value={selectValue.value || ''}
                      fullWidth
                      label={'Name or Id'}
                      type='text'
                      variant='outlined'
                      onMouseEnter={props.handlePopoverOpen}
                      onMouseLeave={props.handlePopoverClose}
                    />
                  )}
                />
                <Box marginLeft='17px' height='inherit'>
                  <ButtonGroup
                    size='large'
                    aria-label='large outlined button group'
                    style={{ height: '100%' }}
                  >
                    <Button
                      onClick={() => {
                        const index = currentProductData?.subProducts?.findIndex(
                          (item) => item === selectValue.id,
                        );
                        const newSubProducts = [...currentProductData.subProducts];
                        newSubProducts.splice(index, 1);
                        setProductData({
                          ...currentProductData,
                          subProducts: newSubProducts,
                        });
                      }}
                    >
                      -
                    </Button>
                    <Button disabled>{value}</Button>
                    <Button
                      onClick={() => {
                        setProductData({
                          ...currentProductData,
                          subProducts: [...currentProductData.subProducts, selectValue.id],
                        });
                      }}
                    >
                      +
                    </Button>
                  </ButtonGroup>
                </Box>
                <Box marginLeft='20px'>
                  <IconButton
                    color='secondary'
                    aria-label='clear'
                    onClick={() => {
                      setProductData({
                        ...currentProductData,
                        subProducts: currentProductData.subProducts.filter(
                          (item) => item !== selectValue.id,
                        ),
                      });
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                </Box>
              </Box>
            );
          })}
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            marginBottom='30px'
            marginRight='30px'
          >
            <SelectCustom
              label='nameOrId'
              value={selectedBundledProduct || ''}
              selectOptions={selectOptions?.renewingProducts || []}
              onChangeSelect={(e) => {
                setSelectedBundledProduct(e.target.value);
              }}
            />
            <Box marginLeft='20px'>
              <IconButton
                color={selectedBundledProduct ? 'primary' : 'secondary'}
                aria-label='add to shopping cart'
                disabled={!selectedBundledProduct}
                onClick={() => {
                  setProductData({
                    ...currentProductData,
                    subProducts: currentProductData?.subProducts
                      ? [...currentProductData.subProducts, selectedBundledProduct]
                      : [selectedBundledProduct],
                  });
                  setSelectedBundledProduct(null);
                }}
              >
                <AddCircleOutlineIcon size='medium' color='primary' />
              </IconButton>
            </Box>
          </Box>
        </SectionLayout>
        <SectionLayout label='variationParameters' width='100%'>
          <TableContainer component={Paper}>
            <Table className='table' aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Parameter Name</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell></TableCell>
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
                        onClick={() => {
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
                        }}
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
  selectOptions: PropTypes.object,
  open: PropTypes.bool,
  handlePopoverClose: PropTypes.func,
  handlePopoverOpen: PropTypes.func,
  productVariations: PropTypes.shape({
    bundledProducts: PropTypes.array,
    variations: PropTypes.object,
  }),
  setProductDetails: PropTypes.func,
  productDetails: PropTypes.object,
};

export default Variations;

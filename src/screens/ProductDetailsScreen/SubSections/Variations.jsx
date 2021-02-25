import React, { useState } from 'react';
import PropTypes from 'prop-types';

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

import SectionLayout from '../SectionLayout';
import { SelectCustom } from '../../../components/Inputs';
import Popup from '../../../components/Popup';

const Variations = ({
  inputErrors,
  setInputErrors,
  selectOptions,
  setProductData,
  currentProductData,
  productData,
  subProducts: { subProducts, variations },
}) => {
  // MOCK !!!
  const defaultLocale = 'en-US';
  //
  const [selectedBundledProduct, setSelectedBundledProduct] = useState(null);

  const counts = {};
  currentProductData.subProducts.forEach((x) => {
    counts[x] = (counts[x] || 0) + 1;
  });

  return (
    <Box display="flex" flexDirection="column" width="auto">
      <SectionLayout label="productVariations" wrapperWidth="inherit">
        <Box mt={3}>
          <Typography>
            Emphasized values override parent product's values.
          </Typography>
        </Box>
        <Box mt={3}>
          <TableContainer component={Paper}>
            <Table className="table" aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Publisher reference</TableCell>
                  <TableCell align="center">Lifetime</TableCell>
                  <TableCell align="center">Fulfillment Model</TableCell>
                  <TableCell align="center">Subscription Model</TableCell>
                  {variations?.availableVariables.map(({ field }) => (
                    <TableCell key={field} align="center">
                      {field}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {subProducts.map((item) => {
                  const {
                    id,
                    status,
                    publisherRefId,
                    lifeTime,
                    fulfillmentTemplate,
                    subscriptionTemplate,
                  } = item;
                  return (
                    <TableRow key={id}>
                      <TableCell component="th" scope="row">
                        {id}
                      </TableCell>
                      <TableCell align="center">{status || ''}</TableCell>
                      <TableCell align="center">
                        {publisherRefId || '-'}
                      </TableCell>
                      <TableCell align="center">{lifeTime || ''}</TableCell>
                      <TableCell align="center">
                        {fulfillmentTemplate || ''}
                      </TableCell>
                      <TableCell align="center">
                        {subscriptionTemplate || ''}
                      </TableCell>
                      {variations?.availableVariables.map(
                        ({ field, localizedValue }) => (
                          <TableCell key={field} align="center">
                            {localizedValue[item[field]][defaultLocale]}
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
            <Button variant="outlined" color="primary" onClick={() => null}>
              Add variant
            </Button>
          </Box>
        </Box>
      </SectionLayout>
      <Box display="flex">
        <SectionLayout label="bundledProducts" contentWidth="100%">
          {Object.entries(counts).map(([key, value]) => {
            const selectValue =
              selectOptions?.renewingProducts.find(({ id }) => id === key) ||
              '';
            return (
              <Box
                key={key}
                display="flex"
                justifyContent="space-between"
                marginBottom="30px"
                marginRight="30px"
              >
                <Popup
                  text={selectValue.value}
                  childrenComponent={(props) => (
                    <TextField
                      name={key}
                      aria-owns={
                        props.open ? `mouse-over-popover ${key}` : undefined
                      }
                      aria-haspopup="true"
                      disabled
                      value={selectValue.value}
                      fullWidth
                      label={'Name or Id'}
                      type="text"
                      variant="outlined"
                      onMouseEnter={props.handlePopoverOpen}
                      onMouseLeave={props.handlePopoverClose}
                    />
                  )}
                />
                <Box marginLeft="17px" height="inherit">
                  <ButtonGroup
                    size="large"
                    aria-label="large outlined button group"
                    style={{ height: '100%' }}
                  >
                    <Button
                      onClick={() => {
                        const index = currentProductData?.subProducts.findIndex(
                          (item) => item === selectValue.id,
                        );
                        console.log('INDEX', index);
                        const newSubProducts = [
                          ...currentProductData.subProducts,
                        ];
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
                          subProducts: [
                            ...currentProductData.subProducts,
                            selectValue.id,
                          ],
                        });
                      }}
                    >
                      +
                    </Button>
                  </ButtonGroup>
                </Box>
                <Box marginLeft="20px">
                  <IconButton
                    color="secondary"
                    aria-label="clear"
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
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginBottom="30px"
            marginRight="30px"
          >
            <SelectCustom
              label="price"
              value={selectedBundledProduct || ''}
              selectOptions={selectOptions?.renewingProducts || []}
              onChangeSelect={(e) => {
                setSelectedBundledProduct(e.target.value);
              }}
            />
            <Box marginLeft="20px">
              <IconButton
                color={selectedBundledProduct ? 'primary' : 'secondary'}
                aria-label="add to shopping cart"
                disabled={!selectedBundledProduct}
                onClick={() => {
                  setProductData({
                    ...currentProductData,
                    subProducts: [
                      ...currentProductData.subProducts,
                      selectedBundledProduct,
                    ],
                  });
                  setSelectedBundledProduct(null);
                }}
              >
                <AddCircleOutlineIcon size="medium" color="primary" />
              </IconButton>
            </Box>
          </Box>
        </SectionLayout>
        <SectionLayout label="variationParameters">
          <TableContainer component={Paper}>
            <Table className="table" aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Parameter Name</TableCell>
                  <TableCell>Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {variations?.availableVariables.map(({ field, type }) => (
                  <TableRow key={field}>
                    <TableCell>{field}</TableCell>
                    <TableCell>{type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </SectionLayout>
      </Box>
    </Box>
  );
};
Variations.propTypes = {
  setProductData: PropTypes.func,
  currentProductData: PropTypes.object,
  selectOptions: PropTypes.object,
  inputErrors: PropTypes.object,
  setInputErrors: PropTypes.func,
  subProducts: PropTypes.shape({
    subProducts: PropTypes.array,
    variations: PropTypes.object,
  }),
};

export default Variations;

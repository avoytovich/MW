import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  ButtonGroup,
  FormControlLabel,
  IconButton,
  Button,
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ClearIcon from '@material-ui/icons/Clear';

import { SelectCustom } from '../../../components/Inputs';
import SectionLayout from '../../../components/SectionLayout';
import InheritanceField from '../../../components/ProductDetails/InheritanceField';
import Popup from '../../../components/Popup';

const SubProductVariations = ({
  setProductData,
  currentProductData,
  parentId,
  selectOptions,
  variablesDescriptions,
  open,
  handlePopoverOpen,
  handlePopoverClose,
}) => {
  const [selectedBundledProduct, setSelectedBundledProduct] = useState(null);

  const counts = {};
  const subProductsList =
    currentProductData?.subProducts?.state === 'inherits'
      ? currentProductData?.subProducts.parentValue
      : currentProductData?.subProducts.value;

  subProductsList?.forEach((x) => {
    counts[x] = (counts[x] || 0) + 1;
  });

  const bundledDisabled = currentProductData?.subProducts?.state === 'inherits';
  return (
    <Box display='flex' width='100%'>
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
                childrenComponent={() => (
                  <TextField
                    name={key}
                    aria-owns={open ? `mouse-over-popover ${key}` : undefined}
                    aria-haspopup='true'
                    disabled
                    value={selectValue.value || ''}
                    fullWidth
                    label='Name or Id'
                    type='text'
                    variant='outlined'
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                  />
                )}
              />
              <Box marginLeft='17px' height='inherit'>
                <ButtonGroup
                  disabled={bundledDisabled}
                  size='large'
                  aria-label='large outlined button group'
                  style={{ height: '100%' }}
                >
                  <Button
                    data-test='decrementSubProduct'
                    disabled={bundledDisabled}
                    onClick={() => {
                      const index = currentProductData?.subProducts?.value?.findIndex(
                        (item) => item === selectValue.id,
                      );
                      const newSubProducts = [...currentProductData?.subProducts?.value];
                      newSubProducts.splice(index, 1);
                      setProductData({
                        ...currentProductData,
                        subProducts: {
                          ...currentProductData.subProducts,
                          value: newSubProducts,
                        },
                      });
                    }}
                  >
                    -
                  </Button>
                  <Button data-test='subProductCount' disabled>
                    {value}
                  </Button>
                  <Button
                    disabled={bundledDisabled}
                    data-test='incrementSubProduct'
                    onClick={() => {
                      setProductData({
                        ...currentProductData,
                        subProducts: {
                          ...currentProductData?.subProducts,
                          value: [...currentProductData?.subProducts?.value, selectValue.id],
                        },
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
                  disabled={bundledDisabled}
                  onClick={() => {
                    setProductData({
                      ...currentProductData,
                      subProducts: {
                        ...currentProductData.subProducts,
                        value: currentProductData.subProducts.value.filter(
                          (item) => item !== selectValue.id,
                        ),
                      },
                    });
                  }}
                >
                  <ClearIcon />
                </IconButton>
              </Box>
            </Box>
          );
        })}

        {!bundledDisabled && (
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            marginBottom='30px'
            marginRight='30px'
            data-test='bundledSectionDisabled'
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
                    subProducts: {
                      ...currentProductData.subProducts,
                      value: [...currentProductData.subProducts.value, selectedBundledProduct],
                    },
                  });
                  setSelectedBundledProduct(null);
                }}
              >
                <AddCircleOutlineIcon size='medium' color='primary' />
              </IconButton>
            </Box>
          </Box>
        )}
        <Box>
          <InheritanceField
            field='subProducts'
            onChange={setProductData}
            value={currentProductData?.subProducts}
            parentId={parentId}
            currentProductData={currentProductData}
          >
            <Box style={{ display: 'none' }} />
          </InheritanceField>
        </Box>
      </SectionLayout>
      <SectionLayout label='variationParameters' width='100%'>
        <Box display='flex' flexDirection='column'>
          {variablesDescriptions?.map(
            ({ label, description, variableValueDescriptions }, i) => {
              const disabled = currentProductData[description]?.state === 'inherits';
              return (
                <Box display='flex' alignItems='center' key={label || description}>
                  <Typography>{label || description}</Typography>
                  <Box
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                    marginLeft='20px'
                    width='100%'
                  >
                    <InheritanceField
                      field={description}
                      valuePath={i}
                      onChange={setProductData}
                      value={currentProductData[description]}
                      parentId={parentId}
                      currentProductData={currentProductData}
                    >
                      <RadioGroup
                        aria-label={description}
                        name={description}
                        data-test='variationParameter'
                      >
                        <Box display='flex'>
                          {variableValueDescriptions?.map(
                            ({ descValue, description: _description }) => (
                              <FormControlLabel
                                key={_description}
                                className='radio'
                                value={_description}
                                disabled={disabled}
                                control={<Radio color='primary' />}
                                label={
                                  descValue || '?'
                                  // localizedValue
                                  //   ? `${localizedValue[test]}`
                                  //   : !descValue || typeof descValue == 'undefined'
                                  //   ? '?'
                                  //   : descValue
                                }
                              />
                            ),
                          )}
                        </Box>
                      </RadioGroup>
                    </InheritanceField>
                  </Box>
                </Box>
              );
            },
          )}
        </Box>
      </SectionLayout>
    </Box>
  );
};

SubProductVariations.propTypes = {
  setProductData: PropTypes.func,
  currentProductData: PropTypes.object,
  parentId: PropTypes.string,
  selectOptions: PropTypes.object,
  open: PropTypes.bool,
  handlePopoverOpen: PropTypes.func,
  handlePopoverClose: PropTypes.func,
  variablesDescriptions: PropTypes.array,
};

export default SubProductVariations;

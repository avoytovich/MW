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

const defaultLocale = 'en-US';
const test = 'fr-FR';

const SubProductVariations = ({
  setProductData,
  setProductDetails,
  currentProductData,
  productVariations,
  productDetails,
  parentId,
  selectOptions,
}) => {
  const [selectedBundledProduct, setSelectedBundledProduct] = useState(null);

  const variables =
    productVariations?.state === 'inherits'
      ? productVariations?.parentValue
      : productVariations?.value;

  const counts = {};
  const subProductsList =
    currentProductData?.subProducts?.state === 'inherits'
      ? currentProductData?.subProducts.parentValue
      : currentProductData?.subProducts.value;

  subProductsList.forEach((x) => {
    counts[x] = (counts[x] || 0) + 1;
  });

  return (
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
                  disabled={productVariations?.state === 'inherits'}
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
                  disabled={productVariations?.state === 'inherits'}
                  onClick={() => {
                    setProductData({
                      ...currentProductData,
                      subProducts: currentProductData.subProducts.value.filter(
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
        {productVariations?.state !== 'inherits' && (
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
        )}
        <Box>
          <InheritanceField
            field={'availableVariables'}
            onChange={setProductData}
            value={currentProductData?.availableVariables}
            parentId={parentId}
            currentProductData={currentProductData}
          >
            <Box style={{ display: 'none' }}></Box>
          </InheritanceField>
        </Box>
      </SectionLayout>
      <SectionLayout label='variationParameters' width='100%'>
        <Box display='flex' flexDirection='column'>
          {variables?.map(({ field, defaultValue, localizedValue, value }, i) => {
            return (
              <Box display='flex' alignItems='center' key={field}>
                <Typography>{field}</Typography>
                <InheritanceField
                  field='availableVariables'
                  valuePath={i}
                  onChange={setProductData}
                  value={currentProductData?.availableVariables}
                  parentId={parentId}
                  currentProductData={currentProductData}
                >
                  <RadioGroup
                    aria-label='type'
                    name='type'
                    // value={defaultValue}
                    // onChange={(e) => {
                    //   let newVariables = [...currentProductData.availableVariables];
                    //   newVariables[i].defaultValue = e.target.value;
                    //   setProductData({
                    //     ...currentProductData,
                    //     availableVariables: newVariables,
                    //   });
                    //   console.log('E', e.target.value);
                    // }}
                  >
                    <Box display='flex'>
                      {value.map((item) => {
                        return (
                          <FormControlLabel
                            key={item}
                            className='radio'
                            value={item}
                            disabled={productVariations?.state === 'inherits'}
                            control={<Radio color='primary' />}
                            label={localizedValue ? `${localizedValue[item][test]}` : item}
                          />
                        );
                      })}
                    </Box>
                  </RadioGroup>
                </InheritanceField>
              </Box>
            );
          })}
        </Box>
      </SectionLayout>
    </Box>
  );
};

SubProductVariations.propTypes = {
  setProductData: PropTypes.func,
  setProductDetails: PropTypes.func,
  currentProductData: PropTypes.object,
  productVariations: PropTypes.object,
  productDetails: PropTypes.object,
  parentId: PropTypes.string,
  selectOptions: PropTypes.object,
};

export default SubProductVariations;

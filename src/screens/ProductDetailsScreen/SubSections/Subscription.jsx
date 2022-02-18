import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Switch,
  Typography,
  TextField,
  Autocomplete,
} from '@mui/material';

import InheritanceField from '../InheritanceField';

import { NumberInput, SelectWithDeleteIcon } from '../../../components/Inputs';
import { checkValue } from '../../../services/helpers/dataStructuring';
import localization from '../../../localization';

import './FulfillmentAndSubscription.scss';

const Subscription = ({
  setProductData,
  currentProductData,
  selectOptions,
  parentId,
}) => {
  const [searchVal, setSearchVal] = useState('');

  const changeProducts = (e, newProduct) => {
    setProductData({ ...currentProductData, nextGenerationOf: [newProduct?.id || ''] });
  };

  const toFilter = (arr) => {
    const newArr = [...arr.reduce((acc, each) => (
      [...acc, { id: each.id, name: each.value }]
    ), [])];

    return newArr.filter(
      (item) => item?.name?.toLowerCase().indexOf(searchVal?.toLowerCase()) >= 0,
    );
  };

  const filteredArr = toFilter(selectOptions.renewingProducts)
    .filter((i) => i.id !== currentProductData?.id);

  const autoOptions = filteredArr.length
    ? [...filteredArr]
    : [{ id: 'none', name: 'No Results' }];

  const resolveValue = () => {
    const resolveArr = autoOptions.filter(
      (item) => item.id === checkValue(currentProductData.nextGenerationOf[0]),
    );

    return resolveArr[0];
  };

  return (
    <>
      <Box display="flex" flexDirection="row" alignItems="baseline">
        <Box p={2} width="50%">
          <InheritanceField
            field='subscriptionTemplate'
            onChange={setProductData}
            value={currentProductData?.subscriptionTemplate}
            parentId={parentId}
            currentProductData={currentProductData}
          >
            <SelectWithDeleteIcon
              label="subscriptionModel"
              value={checkValue(currentProductData.subscriptionTemplate)}
              selectOptions={selectOptions.subscriptionModels}
              onChangeSelect={(e) => {
                setProductData({ ...currentProductData, subscriptionTemplate: e.target.value });
              }}
              onClickDelIcon={() => setProductData({ ...currentProductData, subscriptionTemplate: '' })}
            />
          </InheritanceField>
        </Box>
      </Box>

      <Box display="flex" flexDirection="row" alignItems="center" width="50%">
        <Box p={2} width="50%" display="flex" flexDirection="row" alignItems="center">
          <Box p={2}>
            <Typography color="secondary">{localization.t('labels.allowTrial')}</Typography>
          </Box>

          <Box p={2}>
            <InheritanceField
              field='trialAllowed'
              onChange={setProductData}
              value={currentProductData?.trialAllowed}
              parentId={parentId}
              currentProductData={currentProductData}
            >
              <Switch
                disabled={!checkValue(currentProductData?.subscriptionTemplate)}
                name="allowTrial"
                onChange={(e) => {
                  setProductData({ ...currentProductData, trialAllowed: e.target.checked });
                }}
                color="primary"
                checked={checkValue(currentProductData?.trialAllowed) || false}
              />
            </InheritanceField>
          </Box>
        </Box>

        <Box p={2} width="50%">
          <InheritanceField
            field='trialDuration'
            onChange={setProductData}
            value={currentProductData?.trialDuration}
            parentId={parentId}
            currentProductData={currentProductData}
          >
            <NumberInput
              isDisabled={!checkValue(currentProductData.trialAllowed)}
              label="trialDuration"
              value={checkValue(currentProductData.trialDuration)}
              onChangeInput={(e) => {
                setProductData({ ...currentProductData, trialDuration: e.target.value });
              }}
              minMAx={{ min: 0 }}
            />
          </InheritanceField>
        </Box>
      </Box>

      <Box display="flex" flexDirection="row" alignItems="center">
        <Box p={2} width="50%">
          <Autocomplete
            data-test='renewingProducts'
            id="products-select"
            options={autoOptions}
            value={resolveValue() || ''}
            onChange={changeProducts}
            filterOptions={(opts) => opts}
            getOptionLabel={(option) => option.name || ''}
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                id="outlined-search"
                label="Renewing Products"
                type="search"
                variant="outlined"
                onChange={(e) => setSearchVal(e.target.value)}
              />
            )}
          />
        </Box>
      </Box>
    </>
  );
};

Subscription.propTypes = {
  setProductData: PropTypes.func,
  currentProductData: PropTypes.object,
  selectOptions: PropTypes.object,
  parentId: PropTypes.string,
};

export default Subscription;
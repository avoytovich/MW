import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { makeStyles } from '@mui/styles';

import {
  Box,
  Switch,
  Typography,
} from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';

import InheritanceField from '../InheritanceField';

import { NumberInput, SelectWithDeleteIcon, AutocompleteCustom } from '../../../components/Inputs';
import { checkValue } from '../../../services/helpers/dataStructuring';
import parentPaths from '../../../services/paths';
import { sortByAlphabetical } from '../../../services/helpers/utils';
import localization from '../../../localization';

import './FulfillmentAndSubscription.scss';

const useStyles = makeStyles({
  copyRelatedProductId: {
    color: '#4791db',
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'underline',
    },
  },
});

const Subscription = ({
  setProductData,
  currentProductData,
  selectOptions,
  parentId,
  relatedProduct,
}) => {
  const [searchVal, setSearchVal] = useState('');
  const [errorSubscription, setErrorSubscription] = useState(false);
  const [errorTextSubscription, setErrorTextSubscription] = useState('');

  const history = useHistory();
  const classes = useStyles();

  const makeCopy = (value) => {
    navigator.clipboard.writeText(value)
      .then(() => toast(localization.t('general.itemHasBeenCopied')));
  };

  const changeProducts = (newProduct) => {
    setProductData({ ...currentProductData, nextGenerationOf: [newProduct] });
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

  const { lifeTime, subscriptionTemplate } = currentProductData;

  useEffect(() => {
    if (lifeTime === 'PERMANENT' && subscriptionTemplate) {
      setErrorSubscription(true);
      setErrorTextSubscription(localization.t('labels.errorProductPerAndSub'));
    } else {
      setErrorSubscription(false);
    }
  }, [lifeTime, subscriptionTemplate]);

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
              hasError={errorSubscription}
              helperText={errorTextSubscription}
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
          <AutocompleteCustom
            optionLabelKey='name'
            label='renewingNameOrId'
            onSelect={changeProducts}
            selectOptions={filteredArr?.sort(sortByAlphabetical) || []}
            curValue={checkValue(currentProductData?.nextGenerationOf[0])}
            isDisabled={currentProductData?.subProducts?.state === 'inherits'}
          />
        </Box>
      </Box>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Box p={2}>
          <Typography variant='h6' color="secondary">
            {localization.t('labels.relatedProduct')}
          </Typography>
        </Box>
        {relatedProduct && (
          <>
            <Box pl={2}>
              <Typography variant='subtitle1' color="secondary">
                {`${relatedProduct.genericName},`}
              </Typography>
            </Box>
            <Box pl={1}>
              <Typography variant='subtitle1' className={classes.copyRelatedProductId}>
                <span
                  onClick={() => history.push(`${parentPaths.productlist}/${relatedProduct.id}`)}
                >
                  {relatedProduct.id}
                </span>
              </Typography>
            </Box>
            <Box p={1}>
              <FileCopyIcon
                onClick={() => makeCopy(relatedProduct.id)}
                color="secondary"
              />
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

Subscription.propTypes = {
  setProductData: PropTypes.func,
  currentProductData: PropTypes.object,
  selectOptions: PropTypes.object,
  parentId: PropTypes.string,
  relatedProduct: PropTypes.object,
};

export default Subscription;

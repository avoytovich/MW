import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import CancelIcon from '@material-ui/icons/Cancel';

import {
  Box,
  Switch,
  FormControlLabel,
  Typography,
  TextField,
} from '@material-ui/core';
import { SelectWithChip, SelectWithDeleteIcon, NumberInput } from '../../Inputs';
import localization from '../../../localization';
import './FulfillmentSubscriptionSection.scss';

const FulfillmentSubscriptionSection = ({
  setProductData,
  currentProductData,
  selectOptions,
}) => (
  <>
    <SelectWithDeleteIcon
      label="subscriptionModel"
      value={currentProductData.subscriptionTemplate}
      selectOptions={selectOptions.subscriptionModels}
      onChangeSelect={(e) => {
        setProductData({
          ...currentProductData,
          subscriptionTemplate: e.target.value,
        });
      }}
      onClickDelIcon={() => setProductData({
        ...currentProductData,
        subscriptionTemplate: '',
      })}
    />

    {currentProductData.subscriptionTemplate && (
      <Box display="flex" flexDirection="row" alignItems="baseline">
        <Box width="30%">
          <Typography color="secondary">
            {localization.t('labels.allowTrial')}
          </Typography>
        </Box>
        <FormControlLabel
          control={(
            <Switch
              name="allowTrial"
              onChange={(e) => {
                setProductData({
                  ...currentProductData,
                  trialAllowed: e.target.checked,
                });
              }}
              color="primary"
              checked={currentProductData.trialAllowed}
            />
          )}
        />
      </Box>
    )}
    {currentProductData.trialAllowed && (
      <NumberInput
        label="trialDuration"
        value={currentProductData.trialDuration}
        onChangeInput={(e) => {
          setProductData({
            ...currentProductData,
            trialDuration: e.target.value,
          });
        }}
        minMAx={{ min: 0 }}
      />
    )}
    <SelectWithDeleteIcon
      label="fulfillmentTemplate"
      value={currentProductData.fulfillmentTemplate}
      selectOptions={selectOptions.fulfillmentTemplates}
      onChangeSelect={(e) => {
        setProductData({
          ...currentProductData,
          fulfillmentTemplate: e.target.value,
        });
      }}
      onClickDelIcon={() => setProductData({
        ...currentProductData,
        fulfillmentTemplate: '',
        releaseDate: '',
      })}
    />
    {currentProductData.fulfillmentTemplate && (
      <Box my={3}>
        <form noValidate className="cancelDateIconParent">
          <TextField
            fullWidth
            name="datetime"
            value={
              currentProductData.releaseDate
                ? moment(currentProductData.releaseDate).format(
                  'YYYY-MM-DDTkk:mm',
                )
                : ''
            }
            label={localization.t('labels.PreorderReleaseDate')}
            type="datetime-local"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              setProductData({
                ...currentProductData,
                releaseDate: e.target.value,
              });
            }}
          />
          {currentProductData.releaseDate && (
            <CancelIcon
              className="cancelDateIcon"
              fontSize="small"
              color="primary"
              onClick={() => {
                setProductData({
                  ...currentProductData,
                  releaseDate: '',
                });
              }}
              onMouseDown={(e) => {
                e.stopPropagation();
              }}
            />
          )}
        </form>
      </Box>
    )}
    <SelectWithChip
      optionName={(item) => (item?.genericName
        ? `${item.genericName} (${item.publisherRefId}${
          item.subscriptionTemplate ? ', ' : ''
        }
                ${item.subscriptionTemplate || ''})`
        : item?.id)}
      label="renewingProducts"
      value={currentProductData.nextGenerationOf}
      selectOptions={selectOptions.renewingProducts}
      onChangeSelect={(e) => {
        setProductData({
          ...currentProductData,
          nextGenerationOf: e.target.value,
        });
      }}
      onClickDelIcon={(chip) => {
        const newValue = [...currentProductData.nextGenerationOf].filter(
          (val) => val !== chip,
        );
        setProductData({
          ...currentProductData,
          nextGenerationOf: newValue,
        });
      }}
    />
    <Box my={3} display="flex" flexDirection="row" alignItems="baseline">
      <Box width="30%">
        <Typography color="secondary">
          {localization.t('labels.licenseKeyPackages')}
        </Typography>
      </Box>
      <Typography>{localization.t('general.noPackagesFound')}</Typography>
    </Box>
  </>
);

FulfillmentSubscriptionSection.propTypes = {
  setProductData: PropTypes.func,
  currentProductData: PropTypes.object,
  selectOptions: PropTypes.object,
};

export default FulfillmentSubscriptionSection;

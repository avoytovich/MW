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
  InputAdornment,
} from '@material-ui/core';
import {
  NumberInput,
  SelectWithDeleteIcon,
  SelectWithChip,
} from '../../../components/Inputs';
import localization from '../../../localization';

const FulfillmentAndSubscription = ({
  setProductData,
  currentProductData,
  selectOptions,
}) => (
  <>
    <Box display="flex" flexDirection="row" alignItems="baseline">
      <Box p={2}>
        <Typography color="secondary">
          {localization.t('labels.allowTrial')}
        </Typography>
      </Box>
      <Box p={2}>
        <FormControlLabel
          control={(
            <Switch
              disabled={!currentProductData.subscriptionTemplate}
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
    </Box>
    <Box display="flex" flexDirection="row" alignItems="center">
      <Box p={2} width="50%">
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
      </Box>
      <Box p={2}>
        <NumberInput
          isDisabled={!currentProductData.trialAllowed}
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
      </Box>
    </Box>
    <Box display="flex" flexDirection="row" alignItems="center">
      <Box p={2} width="50%">
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
      </Box>
      <Box p={2} width="50%">
        <form noValidate>
          <TextField
            disabled={!currentProductData.fulfillmentTemplate}
            name="datetime"
            value={
              currentProductData.releaseDate
                ? moment(currentProductData.releaseDate).format(
                  'YYYY-MM-DDTkk:mm',
                )
                : ''
            }
            label={localization.t('labels.preorderReleaseDate')}
            type="datetime-local"
            variant="outlined"
            InputProps={{
              endAdornment: currentProductData.releaseDate && (
                <InputAdornment>
                  <CancelIcon
                    fontSize="small"
                    color="secondary"
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
                </InputAdornment>
              ),
            }}
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
        </form>
      </Box>
    </Box>
    <Box display="flex" flexDirection="row" alignItems="center">
      <Box p={2} width="50%">
        <SelectWithChip
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
      </Box>
      <Box width="50%" display="flex" flexDirection="row" alignItems="baseline">
        <Box p={2}>
          <Typography color="secondary">
            {localization.t('labels.licenseKeyPackages')}
          </Typography>
        </Box>
        <Box p={2}>
          <Typography>{localization.t('general.noPackagesFound')}</Typography>
        </Box>
      </Box>
    </Box>
  </>
);

FulfillmentAndSubscription.propTypes = {
  setProductData: PropTypes.func,
  currentProductData: PropTypes.object,
  selectOptions: PropTypes.object,
};

export default FulfillmentAndSubscription;

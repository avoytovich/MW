import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  FormControlLabel,
  Switch,
  RadioGroup,
  Radio,
  Grid,
} from '@material-ui/core';
import {
  availableLocales,
  priceCurrency,
} from '../../../services/selectOptions/selectOptions';

import EditKeyValueInputs from '../EditKeyValueInputs';
import localization from '../../../localization';
import {
  NumberInput,
  InputCustom,
  SelectWithDeleteIcon,
} from '../../../components/Inputs';

const General = ({
  curDiscount,
  setCurDiscount,
  curAmountCurrency,
  setCurAmountCurrency,
  curDiscountLabels,
  setCurDiscountLabels,
  selectOptions,
  setCurDiscountCodes,
  curDiscountCodes,
  setAmountType,
  amountType,
}) => {
  const handleUpdateAmount = (value) => {
    if (value === 'byPercentage' && !curDiscount.discountRate) {
      setCurDiscount({ ...curDiscount, discountRate: 0.1 });
    }
    setAmountType(value);
  };

  return (
    <>
      <Grid item md={6} sm={12}>
        <Box display="flex" p={2} flexDirection="row" alignItems="baseline">
          <Box>
            <Typography>{localization.t('labels.status')}</Typography>
          </Box>
          <Box px={2}>
            <FormControlLabel
              control={(
                <Switch
                  name="status"
                  onChange={(e) => {
                    setCurDiscount({
                      ...curDiscount,
                      status: e.target.checked ? 'ENABLED' : 'DISABLED',
                    });
                  }}
                  color="primary"
                  checked={curDiscount.status === 'ENABLED'}
                />
              )}
              label={localization.t(
                `labels.${
                  curDiscount.status === 'ENABLED' ? 'enabled' : 'disabled'
                }`,
              )}
            />
          </Box>
        </Box>
        <Box p={2}>
          <SelectWithDeleteIcon
            label="endUser"
            value={curDiscount.enduserId}
            selectOptions={selectOptions.endUsers}
            onChangeSelect={(e) => {
              setCurDiscount({
                ...curDiscount,
                enduserId: e.target.value,
              });
            }}
            onClickDelIcon={() => {
              setCurDiscount({
                ...curDiscount,
                enduserId: '',
              });
            }}
          />
        </Box>
        <Box p={2}>
          <InputCustom
            label="discountRuleName"
            isRequired
            value={curDiscount.name}
            onChangeInput={(e) => setCurDiscount({
              ...curDiscount,
              name: e.target.value,
            })}
          />
        </Box>
      </Grid>
      <Grid item md={6} sm={12}>
        <Box p={2}>
          <Typography style={{ lineHeight: '38px' }}>
            {localization.t('labels.discountLabels')}
          </Typography>
        </Box>
        <EditKeyValueInputs
          curValue={curDiscountLabels}
          setCurValue={setCurDiscountLabels}
          selectOptions={availableLocales}
          additionalOption={{ value: 'neutral', id: 'neutral' }}
          labels={['language', 'discountLabel']}
        />
        <Box p={2}>
          <InputCustom
            isMultiline
            label="externalContext"
            value={curDiscount.externalContext}
            onChangeInput={(e) => setCurDiscount({
              ...curDiscount,
              externalContext: e.target.value,
            })}
          />
        </Box>
      </Grid>
      <Grid item md={6} sm={12}>
        <Box pt={4} pl={2}>
          <Typography>{localization.t('labels.amount')}</Typography>
        </Box>
        <Box p={2}>
          <RadioGroup
            row
            aria-label="Amount"
            name="Amount"
            value={amountType}
            onChange={(e) => handleUpdateAmount(e.target.value)}
          >
            <FormControlLabel
              value="byPercentage"
              control={<Radio color="primary" />}
              label={localization.t('labels.byPercentage')}
            />
            <FormControlLabel
              value="byCurrency"
              control={<Radio color="primary" />}
              label={localization.t('labels.byCurrency')}
            />
          </RadioGroup>
        </Box>
        <Box>
          {amountType === 'byPercentage' ? (
            <Box p={2}>
              <NumberInput
                label="percents"
                value={curDiscount.discountRate * 100}
                onChangeInput={(e) => {
                  setCurDiscount({
                    ...curDiscount,
                    discountRate: e.target.value / 100,
                  });
                }}
                minMAx={{ min: 1, max: 100 }}
              />
            </Box>
          ) : (
            curAmountCurrency && (
              <EditKeyValueInputs
                curValue={curAmountCurrency}
                setCurValue={setCurAmountCurrency}
                selectOptions={priceCurrency}
                labels={['currency', 'amount']}
                canNotBeEmpty
              />
            )
          )}
        </Box>
      </Grid>
      <Grid item md={6} sm={12}>
        <Box pt={4} pl={2}>
          <Typography>{localization.t('labels.model')}</Typography>
        </Box>
        <Box p={2}>
          <RadioGroup
            row
            aria-label="Model"
            name="Model"
            value={curDiscount.model}
            onChange={(e) => setCurDiscount({ ...curDiscount, model: e.target.value })}
          >
            <FormControlLabel
              value="CAMPAIGN"
              control={<Radio color="primary" />}
              label="Campaign"
            />
            <FormControlLabel
              value="COUPON"
              control={<Radio color="primary" />}
              label="Coupon"
            />
            <FormControlLabel
              value="SINGLE_USE_CODE"
              control={<Radio color="primary" />}
              label="Single use code"
            />
          </RadioGroup>
        </Box>
        {curDiscount.model === 'COUPON' && (
          <EditKeyValueInputs
            labels={['language', 'code']}
            curValue={curDiscountCodes}
            setCurValue={setCurDiscountCodes}
            selectOptions={availableLocales}
            additionalOption={{ value: 'default', id: 'default' }}
          />
        )}
      </Grid>
    </>
  );
};

General.propTypes = {
  curDiscount: PropTypes.object,
  setCurDiscount: PropTypes.func,
  curAmountCurrency: PropTypes.array,
  setCurAmountCurrency: PropTypes.func,
  curDiscountLabels: PropTypes.array,
  setCurDiscountLabels: PropTypes.func,
  selectOptions: PropTypes.object,
  setCurDiscountCodes: PropTypes.func,
  curDiscountCodes: PropTypes.array,
  setAmountType: PropTypes.func,
  amountType: PropTypes.string,
};

export default General;

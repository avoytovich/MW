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
  selectOptions,
  setAmountType,
  amountType,
}) => {
  const handleUpdateAmount = (e) => {
    if (e.target.value === 'byPercentage' && !curDiscount.discountRate) {
      setCurDiscount({ ...curDiscount, discountRate: 1 });
    }
    setAmountType(e.target.value);
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
          curValue={curDiscount.localizedLabels}
          setCurValue={(value) => setCurDiscount({ ...curDiscount, localizedLabels: value })}
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
            data-test='amountRadioGroup'
            aria-label="Amount"
            name="Amount"
            value={amountType}
            onChange={handleUpdateAmount}
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
                value={curDiscount.discountRate}
                onChangeInput={(e) => {
                  setCurDiscount({
                    ...curDiscount,
                    discountRate: Number(e.target.value),
                  });
                }}
                minMAx={{ min: 1, max: 100, step: 1 }}
              />
            </Box>
          ) : (
            curDiscount.amountByCurrency && (
            <EditKeyValueInputs
              curValue={curDiscount.amountByCurrency}
              setCurValue={(value) => setCurDiscount(
                { ...curDiscount, amountByCurrency: value },
              )}
              selectOptions={priceCurrency}
              labels={['currency', 'amount']}
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
            curValue={curDiscount.codes}
            setCurValue={(value) => setCurDiscount({ ...curDiscount, codes: value })}
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
  selectOptions: PropTypes.object,
  setAmountType: PropTypes.func,
  amountType: PropTypes.string,
};

export default General;

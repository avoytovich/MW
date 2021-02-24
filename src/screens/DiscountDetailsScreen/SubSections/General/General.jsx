import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  FormControlLabel,
  Switch,
  RadioGroup,
  Radio,
} from '@material-ui/core';
import AmountByCurrency from './AmountByCurrency';
import DiscountLabels from './DiscountLabels';
import localization from '../../../../localization';
import {
  NumberInput,
  InputCustom,
  SelectWithDeleteIcon,
} from '../../../../components/Inputs';

const General = ({
  curDiscount,
  setCurDiscount,
  curAmountCurrency,
  setCurAmountCurrency,
  curDiscountLabels,
  setCurDiscountLabels,
  selectOptions,
}) => {
  const [amountType, setAmountType] = useState(
    curDiscount.discountRate ? 'byPercentage' : 'byCurrency',
  );

  const handleUpdateAmount = (value) => {
    if (value === 'byPercentage' && !curDiscount.discountRate) {
      setCurDiscount({ ...curDiscount, discountRate: 0.1 });
    } else if (value === 'byCurrency' && !curDiscount.amountByCurrency) {
      setCurDiscount({ ...curDiscount, amountByCurrency: { AED: 1 } });
    }
    setAmountType(value);
  };

  return (
    <Box display="flex" flexDirection="row" alignItems="baseline">
      <Box display="flex" flexDirection="column" width="50%">
        <Box display="flex" py={2} flexDirection="row" alignItems="baseline">
          <Box px={2}>
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
        <Box>
          <Box pt={2} pl={2}>
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
            ) : (
              curAmountCurrency && (
                <AmountByCurrency
                  curAmountCurrency={curAmountCurrency}
                  setCurAmountCurrency={setCurAmountCurrency}
                />
              )
            )}
          </Box>
        </Box>
      </Box>

      <Box display="flex" flexDirection="column" width="50%">
        <Box p={2}>
          <Typography style={{ lineHeight: '38px' }}>
            {localization.t('labels.discountLabels')}
          </Typography>
        </Box>
        {curDiscountLabels && (
          <DiscountLabels
            curDiscountLabels={curDiscountLabels}
            setCurDiscountLabels={setCurDiscountLabels}
          />
        )}
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
        <Box>
          <Box p={2}>
            <Typography>{localization.t('labels.model')}</Typography>
          </Box>
          <Box px={2}>
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
        </Box>
      </Box>
    </Box>
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
};

export default General;

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  FormControlLabel,
  Switch,
  RadioGroup,
  Radio,
  Grid,
} from '@mui/material';
import {
  priceCurrency,
} from '../../../services/selectOptions/selectOptions';
import { getLanguagesOptions } from '../../../components/utils/OptionsFetcher/OptionsFetcher';
import EditKeyValueInputs from '../EditKeyValueInputs';
import localization from '../../../localization';
import {
  NumberInput,
  InputCustom,
} from '../../../components/Inputs';
import api from '../../../api';

const General = ({
  id,
  curDiscount,
  setCurDiscount,
  selectOptions,
  setAmountType,
  amountType,
  setCheckedSingleUseCode,
  setPrevSaveSingleUseCode,
  setUsedDiscounts,
}) => {
  const handleUpdateAmount = (e) => {
    if (e.target.value === 'byPercentage' && !curDiscount.discountRate) {
      setCurDiscount({ ...curDiscount, discountRate: 1 });
    }
    setAmountType(e.target.value);
  };
  const availableLocales = getLanguagesOptions();

  useEffect(() => {
    if (curDiscount.model === 'SINGLE_USE_CODE') {
      if (id) {
        api.getDiscountsUsagesById(id).then((data) => {
          setUsedDiscounts(data.data.items.length);
          setPrevSaveSingleUseCode(data.data.last);
        });
      } else {
        api.getDiscountsUsages().then((data) => {
          setPrevSaveSingleUseCode(data.data.last);
        });
      }
    }
    setCheckedSingleUseCode(curDiscount.model === 'SINGLE_USE_CODE');
  }, [curDiscount.model]);

  return (
    <>
      <Grid item md={6} sm={12}>
        <Box display="flex" p={2} flexDirection="row" alignItems="baseline">
          <Box>
            <Typography>{localization.t('labels.status')}</Typography>
          </Box>
          <Box px={2}>
            <FormControlLabel
              data-test='status'
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
          <InputCustom
            data-test='discountRuleName'
            label="discountRuleName"
            isRequired
            value={curDiscount.name}
            onChangeInput={(e) => setCurDiscount({
              ...curDiscount,
              name: e.target.value,
            })}
          />
        </Box>
        <Box pt={4} pl={2}>
          <Typography>{localization.t('labels.discountAmount')}</Typography>
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
              label={localization.t('labels.byFixedPrice')}
            />
          </RadioGroup>
        </Box>
        <Box>
          {amountType === 'byPercentage' ? (
            <Box p={2}>
              <NumberInput
                data-test='percents'
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
              data-test='amountByCurrency'
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
        <Box p={2}>
          <Typography style={{ lineHeight: '38px' }}>
            {localization.t('labels.discountLabels')}
          </Typography>
        </Box>
        <EditKeyValueInputs
          data-test='localizedLabels'
          curValue={curDiscount.localizedLabels}
          setCurValue={(value) => setCurDiscount({ ...curDiscount, localizedLabels: value })}
          selectOptions={availableLocales}
          additionalOption={{ value: 'neutral', id: 'neutral' }}
          labels={['language', 'discountLabel']}
        />
        <Box p={2}>
          <InputCustom
            data-test='externalContext'
            isMultiline
            label="externalContext"
            value={curDiscount.externalContext}
            onChangeInput={(e) => setCurDiscount({
              ...curDiscount,
              externalContext: e.target.value,
            })}
          />
        </Box>
        <Box pt={4} pl={2}>
          <Typography>{localization.t('labels.model')}</Typography>
        </Box>
        <Box p={2}>
          <RadioGroup
            row
            data-test='model'
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
            data-test='codes'
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
  id: PropTypes.string,
  curDiscount: PropTypes.object,
  setCurDiscount: PropTypes.func,
  selectOptions: PropTypes.object,
  setAmountType: PropTypes.func,
  amountType: PropTypes.string,
  setCheckedSingleUseCode: PropTypes.func,
  setPrevSaveSingleUseCode: PropTypes.func,
  setUsedDiscounts: PropTypes.func,
};

export default General;

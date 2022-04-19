// ToDo: consider making a common layout for such type of settings screens + refactor
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import {
  Box,
  TextField,
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel,
  InputAdornment,
} from '@mui/material';
import { FileCopy as FileCopyIcon } from '@mui/icons-material';
import { getCountriesOptions } from '../../components/utils/OptionsFetcher/OptionsFetcher';
import { SelectCustom, AutocompleteCustom } from '../../components/Inputs';
import CustomCard from '../../components/utils/CustomCard';
import { priceCurrency } from '../../services/selectOptions/selectOptions';
import { copyText, sortByAlphabetical } from '../../services/helpers/utils';
import localization from '../../localization';

import './pricesDetailsScreen.scss';

const PricesDetailsView = ({
  price, availProducts, setCurPrice, curPrice,
}) => {
  const countriesOptions = getCountriesOptions();
  const [validPeriod, setValidPeriod] = useState('between');

  const handleChange = (e) => {
    e.persist();
    const { name, value } = e.target;
    setCurPrice({ ...curPrice, [name]: value });
  };

  const handleChangeDate = (e) => {
    e.persist();
    const { name, value } = e.target;
    setCurPrice({ ...curPrice, [name]: moment(value).valueOf() });
  };

  const handleCountry = (e) => {
    if (e.target.value === 'default' && curPrice?.country) {
      const newPrice = { ...curPrice };
      delete newPrice.country;

      setCurPrice({ ...newPrice });
    } else {
      setCurPrice((c) => ({ ...c, country: e.target.value }));
    }
  };

  useEffect(() => {
    if (validPeriod === 'between') return;

    const newPrice = { ...curPrice };

    if (validPeriod === 'before') {
      delete newPrice.startDate;
    } else if (validPeriod === 'after') {
      delete newPrice.endDate;
    }
    setCurPrice(newPrice);
  }, [validPeriod]);

  useEffect(() => {
    let curVariant = 'between';

    if (curPrice.startDate && curPrice.endDate) {
      curVariant = 'between';
    } else if (curPrice.startDate) {
      curVariant = 'after';
    } else if (curPrice.endDate) {
      curVariant = 'before';
    }

    setValidPeriod(curVariant);
  }, []);

  return (
    <div className="price-details-screen">
      <CustomCard title="General">
        {
          price?.productId ? (
            <Box mt={4} display="flex">
              <Typography gutterBottom variant="h5" style={{ marginRight: '10px' }}>
                {localization.t('labels.productId')}
              </Typography>

              <Typography variant="h6">{price?.productId}</Typography>

              <FileCopyIcon
                onClick={() => copyText(price?.productId)}
                color="secondary"
                style={{ marginLeft: '5px', cursor: 'pointer' }}
                className="copyIcon"
              />
            </Box>
          ) : (
            <Box width='50%' pr={4}>
              <AutocompleteCustom
                isRequired
                optionLabelKey='value'
                label='productNameOrId'
                onSelect={(newValue) => setCurPrice((c) => ({ ...c, productId: newValue }))}
                selectOptions={availProducts?.sort(sortByAlphabetical) || []}
                curValue={curPrice?.productId}
              />
            </Box>
          )
        }

        <Box width='50%' pr={4}>
          <TextField
            fullWidth
            name="marketingCampaignId"
            label="Marketing Campaign ID"
            type="text"
            value={curPrice.marketingCampaignId}
            onChange={handleChange}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <FileCopyIcon
                    onClick={() => copyText(curPrice.marketingCampaignId)}
                    color="secondary"
                    style={{ marginLeft: '5px', cursor: 'pointer' }}
                    className="copyIcon"
                    onMouseDown={(e) => {
                      e.stopPropagation();
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box display="flex" mb={4}>
          <Box width="50%" mr={4} display='flex'>
            <Box minWidth="200px">
              <SelectCustom
                label="currency"
                isRequired
                value={curPrice?.currency}
                selectOptions={priceCurrency}
                onChangeSelect={(e) => setCurPrice((c) => ({ ...c, currency: e.target.value }))}
              />
            </Box>

            <Box ml={4}>
              <TextField
                fullWidth
                name="value"
                label="Value"
                type="text"
                required
                value={curPrice.value}
                onChange={handleChange}
                variant="outlined"
              />

              <TextField
                fullWidth
                name="msrp"
                label="MSRP"
                type="text"
                value={curPrice.msrp}
                onChange={handleChange}
                variant="outlined"
              />

              <TextField
                fullWidth
                name="upSell"
                type="text"
                label="Upsell price"
                value={curPrice.upSell}
                onChange={handleChange}
                variant="outlined"
              />

              <TextField
                fullWidth
                name="crossSell"
                type="text"
                label="Cross-sell price"
                value={curPrice.crossSell}
                onChange={handleChange}
                variant="outlined"
              />
            </Box>
          </Box>

          <Box width="50%" ml={4}>
            <SelectCustom
              label="priceCountry"
              value={curPrice?.country || 'default'}
              selectOptions={[{ id: 'default', value: 'default' }, ...countriesOptions]}
              onChangeSelect={handleCountry}
            />

            <Box pt={4}>
              <Typography variant="h5">VAT Included *</Typography>
            </Box>

            <Box py={2}>
              <RadioGroup
                row
                aria-label="vat"
                name="vatIncluded"
                value={curPrice.vatIncluded ? 'YES' : 'NO'}
                onChange={(e) => setCurPrice((c) => ({ ...c, vatIncluded: e.target.value === 'YES' }))}
              >
                <FormControlLabel
                  value="YES"
                  control={<Radio color="primary" />}
                  label="YES"
                />

                <FormControlLabel
                  value="NO"
                  control={<Radio color="primary" />}
                  label="NO"
                />
              </RadioGroup>
            </Box>

            <Box mt='8px'>
              <Typography variant="h5">
                {localization.t('labels.periodOfValidity')}
                {' '}
                *
              </Typography>

              <Box py={2}>
                <Box>
                  <SelectCustom
                    label="periodOfValidity"
                    onChangeSelect={(e) => setValidPeriod(e.target.value)}
                    selectOptions={[
                      { id: 'between', value: 'between' },
                      { id: 'after', value: 'after' },
                    ]}
                    value={validPeriod}
                  />
                </Box>
                <Box>
                  {validPeriod === 'after' && (
                    <Box>
                      <TextField
                        fullWidth
                        name="startDate"
                        value={curPrice.startDate ? moment(curPrice.startDate).format('YYYY-MM-DDTHH:mm') : ''}
                        label={localization.t('labels.startDate')}
                        type="datetime-local"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        onChange={handleChangeDate}
                      />
                    </Box>
                  )}
                  {validPeriod === 'between' && (
                    <Box>
                      <TextField
                        fullWidth
                        name="startDate"
                        value={curPrice.startDate ? moment(curPrice.startDate).format('YYYY-MM-DDTHH:mm') : ''}
                        label={localization.t('labels.startDate')}
                        type="datetime-local"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        onChange={handleChangeDate}
                      />
                      <Box pt={2}>
                        <TextField
                          fullWidth
                          name="endDate"
                          value={curPrice.endDate ? moment(curPrice.endDate).format('YYYY-MM-DDTHH:mm') : ''}
                          label={localization.t('labels.endDate')}
                          type="datetime-local"
                          variant="outlined"
                          InputLabelProps={{ shrink: true }}
                          onChange={handleChangeDate}
                        />
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </CustomCard>
    </div>
  );
};

PricesDetailsView.propTypes = {
  price: PropTypes.object,
  availProducts: PropTypes.array,
  curPrice: PropTypes.object,
  setCurPrice: PropTypes.func,
};
export default PricesDetailsView;

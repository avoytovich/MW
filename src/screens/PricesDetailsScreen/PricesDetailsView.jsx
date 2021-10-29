// ToDo: consider making a common layout for such type of settings screens + refactor
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import moment from 'moment';
import {
  Box,
  TextField,
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@material-ui/core';

import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import { getCountriesOptions } from '../../components/utils/OptionsFetcher/OptionsFetcher';
import { SelectCustom } from '../../components/Inputs';
import CustomCard from '../../components/utils/CustomCard';
import DateRangePicker from '../../components/utils/Modals/DateRangePicker';
import parentPaths from '../../services/paths';
import {
  priceCurrency,
} from '../../services/selectOptions/selectOptions';
import localization from '../../localization';

import './pricesDetailsScreen.scss';

const PricesDetailsView = ({
  price, availProducts, setCurPrice, curPrice,
}) => {
  const countriesOptions = getCountriesOptions();
  const history = useHistory();
  const [validPeriod, setValidPeriod] = useState('between');

  const handleChange = (e) => {
    e.persist();
    const { name, value } = e.target;
    setCurPrice({ ...curPrice, [name]: value });
  };

  const handleSelectDate = (ranges) => {
    const { startDate, endDate } = ranges;
    setCurPrice((c) => ({
      ...c,
      startDate: moment(startDate).valueOf(),
      endDate: moment(endDate).valueOf(),
    }));
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
  const selectionRange = {
    startDate: curPrice?.startDate ? new Date(curPrice?.startDate) : new Date(),
    endDate: curPrice?.endDate ? new Date(curPrice?.endDate) : new Date(),
    key: 'selection',
  };

  return (
    <div className="price-details-screen">
      <CustomCard title="General" style={{ marginTop: '20px' }}>
        {
          price?.productId ? (
            <Box mt={4} display="flex">
              <Typography gutterBottom variant="h5" style={{ marginRight: '10px' }}>
                {localization.t('labels.productId')}
              </Typography>

              <Typography variant="h6">{price?.productId}</Typography>

              <FileCopyOutlinedIcon
                style={{ opacity: 0.25, marginLeft: 10, cursor: 'pointer' }}
                onClick={() => history.push(`${parentPaths.productlist}/${price?.productId}`)}
              />
            </Box>
          ) : (
            <Box width='50%' pr={4}>
              <SelectCustom
                label="productId"
                value={curPrice?.productId}
                isRequired
                selectOptions={availProducts}
                onChangeSelect={(e) => setCurPrice((c) => ({ ...c, productId: e.target.value }))}
              />
            </Box>
          )
        }

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
              value={curPrice?.country || ''}
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

              <Box py={2} display='flex'>
                <Box width='200px'>
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

                <Box ml={4}>
                  {validPeriod === 'between' ? (
                    <Box display='flex' alignItems='center' mt='8px' height='100%'>
                      <DateRangePicker
                        values={selectionRange}
                        handleChange={handleSelectDate}
                      />
                    </Box>
                  ) : (
                    <form noValidate>
                      <TextField
                        fullWidth
                        name="startDate"
                        value={curPrice.startDate ? moment(curPrice.startDate).format('YYYY-MM-DD') : ''}
                        label={localization.t('labels.startDate')}
                        type="date"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        onChange={handleChange}
                      />
                    </form>
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

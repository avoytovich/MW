// ToDo: consider making a common layout for such type of settings screens + refactor
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import moment from 'moment';
import { toast } from 'react-toastify';

import {
  Box,
  TextField,
  LinearProgress,
  Zoom,
  Button,
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@material-ui/core';

import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import { getCountriesOptions } from '../../components/utils/OptionsFetcher/OptionsFetcher';
import { SelectCustom } from '../../components/Inputs';
import CustomCard from '../../components/utils/CustomCard';
import CustomBreadcrumbs from '../../components/utils/CustomBreadcrumbs';
import DateRangePicker from '../../components/utils/Modals/DateRangePicker';
import parentPaths from '../../services/paths';
import {
  priceCurrency,
} from '../../services/selectOptions/selectOptions';
import { getCustomerName } from '../../services/helpers/customersHelper';

import api from '../../api';
import localization from '../../localization';

import './pricesDetailsScreen.scss';

const PricesDetailsScreen = () => {
  const countriesOptions = getCountriesOptions();
  const { id } = useParams();
  const history = useHistory();
  const [customerName, setCustomerName] = useState(null);
  const [price, setPrice] = useState(null);
  const [curPrice, setCurPrice] = useState(null);
  const [availProducts, setAvailProducts] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [validPeriod, setValidPeriod] = useState('between');
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);

  const handleChange = (e) => {
    e.persist();
    const { name, value } = e.target;
    setCurPrice({ ...curPrice, [name]: value });
  };

  const doSave = () => {
    if (id === 'add') {
      api
        .addNewPrice(curPrice)
        .then(() => {
          toast(localization.t('general.updatesHaveBeenSaved'));
          history.push(`${parentPaths.marketing}/prices`);
        });
    } else {
      api
        .updatePriceById(id, curPrice)
        .then(() => {
          toast(localization.t('general.updatesHaveBeenSaved'));
          setPrice(curPrice);
        });
    }
  };

  useEffect(() => {
    if (price?.customerId) {
      getCustomerName(price?.customerId).then((name) => setCustomerName(name));
    }
  }, [price?.customerId]);

  useEffect(() => {
    setHasChanges(JSON.stringify(curPrice) !== JSON.stringify(price));

    return () => setHasChanges(false);
  }, [curPrice, price]);

  useEffect(() => {
    if (validPeriod === 'after') {
      const newPrice = { ...curPrice };
      delete newPrice.endDate;
      setCurPrice(newPrice);
    }
  }, [validPeriod]);

  useEffect(() => {
    const { selectedCustomer } = nxState;

    const initData = {
      customerId: selectedCustomer?.id,
      currency: '',
      value: '',
      msrp: '',
      upSell: '',
      crossSell: '',
      vatIncluded: false,
      startDate: new Date(),
    };

    if (id === 'add') {
      if (selectedCustomer?.id) {
        api
          .getProducts({ filters: `&customerId=${selectedCustomer?.id}&status=ENABLED` })
          .then(({ data: { items } }) => {
            const products = items.map((it) => ({ id: it.id, value: it.genericName }));
            setAvailProducts(products);
          });
      }

      setPrice({ ...initData });
      setCurPrice({ ...initData });
    } else {
      api
        .getPriceById(id)
        .then(({ data }) => {
          setPrice({ ...initData, ...data });
          setCurPrice({ ...initData, ...data });
          setValidPeriod(data.endDate ? 'between' : 'after');
        });
    }
  }, []);

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

  if (curPrice === null) return <LinearProgress />;

  if (id === 'add' && !curPrice?.customerId) {
    return (
      <Box textAlign='center'>
        <Typography gutterBottom variant="h4">
          {localization.t('general.noCustomer')}
        </Typography>

        <Typography gutterBottom variant="h5">
          {localization.t('general.selectCustomer')}
        </Typography>
      </Box>
    );
  }

  return (
    <div className="price-details-screen">
      <CustomBreadcrumbs
        url={`${parentPaths.pricemodels}/prices`}
        section={localization.t('general.price')}
        id={price?.id ? price.id : localization.t('general.addPrice')}
      />

      <Box my={2}>
        <Typography gutterBottom variant="h3">{customerName}</Typography>
      </Box>

      <Zoom in={hasChanges}>
        <Button
          id="save-price-button"
          color="primary"
          size="large"
          type="submit"
          variant="contained"
          onClick={doSave}
        >
          Save
        </Button>
      </Zoom>

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

export default PricesDetailsScreen;

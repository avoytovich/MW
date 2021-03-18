// ToDo: consider making a common layout for such type of settings screens + refactor
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  Box,
  TextField,
  LinearProgress,
  Zoom,
  Button,
  Tabs,
  Tab,
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel,
  Switch,
} from '@material-ui/core';

import moment from 'moment';

import {
  generateData,
  defaultShow,
} from '../../services/useData/tableMarkups/campaignPrices';

import { SelectCustom } from '../../components/Inputs';

import {
  priceCurrency,
  countryOptions,
} from '../../services/selectOptions/selectOptions';

import api from '../../api';
import { showNotification } from '../../redux/actions/HttpNotifications';
import CustomCard from '../../components/utils/CustomCard';
import TableComponent from '../../components/TableComponent';
import DateRangePicker from '../../components/utils/Modals/DateRangePicker';
import localization from '../../localization';

import './pricesDetailsScreen.scss';

const PricesDetailsScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [price, setPrice] = useState(null);
  const [curPrice, setCurPrice] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

  const handleChange = (e) => {
    e.persist();
    const { name, value } = e.target;
    setCurPrice({ ...curPrice, [name]: value });
  };

  const doSave = () => {
    api.updatePriceById(id, curPrice).then(() => {
      dispatch(
        showNotification(localization.t('general.updatesHaveBeenSaved')),
      );
      setPrice(curPrice);
    });
  };

  useEffect(() => {
    setHasChanges(JSON.stringify(curPrice) !== JSON.stringify(price));

    return () => setHasChanges(false);
  }, [curPrice, price]);

  useEffect(() => {
    api.getPriceById(id).then(({ data }) => {
      setPrice(data);
      setCurPrice(data);
    });
  }, []);

  const updatePrice = (type, value) =>
    setCurPrice((c) => ({ ...c, [type]: value }));

  const handleSelectDate = (ranges) => {
    const { startDate, endDate } = ranges;
    setCurPrice((c) => ({
      ...c,
      startDate: moment(startDate).valueOf(),
      endDate: moment(endDate).valueOf(),
    }));
  };

  const handleCountry = (e) => {
    setCurPrice((c) => ({ ...c, country: e.target.value }));
  };

  const selectionRange = {
    startDate: new Date(curPrice?.startDate),
    endDate: new Date(curPrice?.endDate),
    key: 'selection',
  };

  if (curPrice === null) return <LinearProgress />;

  return (
    <div className="price-details-screen">
      <Tabs value={0} indicatorColor="primary" textColor="primary">
        <Tab label={price.id} />
      </Tabs>

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
        <Box mt={4} display="flex">
          <Typography gutterBottom variant="h5" style={{ marginRight: '10px' }}>
            Product ID
          </Typography>

          <Typography variant="h6">{price.productId}</Typography>
        </Box>

        <Box display="flex" mb={4}>
          <Box width="50%" mr={4}>
            <Box width="250px">
              <SelectCustom
                label="priceCurrency"
                value={curPrice?.currency}
                selectOptions={priceCurrency}
                onChangeSelect={(e) =>
                  setCurPrice((c) => ({ ...c, currency: e.target.value }))
                }
              />
            </Box>

            <TextField
              fullWidth
              name="value"
              label="Value"
              type="text"
              value={curPrice.value}
              onChange={(e) =>
                setCurPrice((c) => ({ ...c, value: e.target.value }))
              }
              variant="outlined"
            />

            <TextField
              fullWidth
              name="msrp"
              label="MSRP"
              type="text"
              value={curPrice.msrp}
              onChange={(e) =>
                setCurPrice((c) => ({ ...c, msrp: e.target.value }))
              }
              variant="outlined"
            />

            <TextField
              fullWidth
              name="upsellPrice"
              type="text"
              label="Upsell price"
              value={curPrice.upsellPrice}
              onChange={(e) =>
                setCurPrice((c) => ({ ...c, upsellPrice: e.target.value }))
              }
              variant="outlined"
            />

            <TextField
              fullWidth
              name="crossSellPrice"
              type="text"
              label="Cross-sell price"
              value={curPrice.crossSellPrice}
              onChange={(e) =>
                setCurPrice((c) => ({ ...c, crossSellPrice: e.target.value }))
              }
              variant="outlined"
            />
          </Box>

          <Box width="50%" ml={4}>
            <SelectCustom
              label="priceCountry"
              value={curPrice?.country || ''}
              selectOptions={[
                { id: 'default', value: 'default' },
                ...countryOptions,
              ]}
              onChangeSelect={handleCountry}
            />

            <Box pt={4}>
              <Typography variant="h5">VAT Included *</Typography>
            </Box>

            <Box py={2}>
              <RadioGroup
                row
                aria-label="vat"
                name="VAT"
                value={curPrice.vatIncluded ? 'YES' : 'NO'}
                onChange={(e) =>
                  setCurPrice((c) => ({
                    ...c,
                    vatIncluded: e.target.value === 'YES',
                  }))
                }
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
          </Box>
        </Box>
      </CustomCard>
    </div>
  );
};

export default PricesDetailsScreen;

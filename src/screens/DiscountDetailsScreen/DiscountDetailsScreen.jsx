// ToDo: consider making a common layout for such type of settings screens
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
  Dialog,
  InputAdornment,
  CircularProgress,
  Typography,
  FormControlLabel,
  Checkbox,
  Switch,
} from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';

import api from '../../api';
import { showNotification } from '../../redux/actions/HttpNotifications';
import CustomCard from '../../components/utils/CustomCard';
import TableItems from '../../components/utils/Modals/TableItems';
import localization from '../../localization';

import './discountDetailsScreen.scss';

const DiscountDetailsScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [discount, setDiscount] = useState(null);
  const [curDiscount, setCurDiscount] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [curStores, setStores] = useState(null);
  const [curProducts, setProducts] = useState(null);
  const [availStores, setAvailStores] = useState(null);
  const [availProducts, setAvailProducts] = useState(null);
  const [productsModal, setProductsModalOpen] = useState(false);
  const [storesModal, setStoresModalOpen] = useState(false);

  const handleChange = (e) => {
    e.persist();
    const { name } = e.target;
    let { value } = e.target;

    if (name === 'discountRate') {
      value /= 100;
    }

    setCurDiscount({ ...curDiscount, [name]: value });
  };

  const saveIdentity = () => {
    api.updateDiscountById(id, curDiscount).then(() => {
      dispatch(
        showNotification(localization.t('general.updatesHaveBeenSaved')),
      );
      setDiscount(curDiscount);
    });
  };

  const removeItem = (item, type) => {
    if (type === 'products') {
      const newArr = [...curDiscount.productIds];

      newArr.splice(newArr.indexOf(item.id), 1);
      setProductsModalOpen(false);
      setCurDiscount((c) => ({ ...c, productIds: newArr }));
      setProducts((p) => p.filter((pr) => pr.id !== item.id));
      setAvailProducts((pr) => [...pr, item]);
    } else if (type === 'stores') {
      const newArr = [...curDiscount.storeIds];

      newArr.splice(newArr.indexOf(item), 1);
      setStoresModalOpen(false);
      setCurDiscount((c) => ({ ...c, storeIds: newArr }));
      setStores((p) => p.filter((pr) => pr.id !== item.id));
      setAvailStores((pr) => [...pr, item]);
    }
  };

  const addItem = (item, type) => {
    if (type === 'products') {
      setProductsModalOpen(false);
      setCurDiscount((c) => ({ ...c, productIds: [...c.productIds, item.id] }));
      setProducts((p) => [...p, item]);
      setAvailProducts((pr) => [...pr.filter((p) => p.id !== item.id)]);
    } else if (type === 'stores') {
      setStoresModalOpen(false);
      setCurDiscount((c) => ({ ...c, storeIds: [...c.storeIds, item.id] }));
      setStores((p) => [...p, item]);
      setAvailStores((pr) => [...pr.filter((p) => p.id !== item.id)]);
    }
  };

  useEffect(() => {
    setHasChanges(JSON.stringify(curDiscount) !== JSON.stringify(discount));

    return () => setHasChanges(false);
  }, [curDiscount, discount]);

  useEffect(() => {
    api
      .getDiscountById(id)
      .then(({ data }) => {
        setDiscount(data);
        setCurDiscount(data);

        api
          .getStores(0, `&customerId=${data.customerId}`)
          .then(({ data: { items: stores } }) => {
            const availStoresObj = [];
            const storesObj = [];

            stores.forEach((store) => {
              if (data?.storeIds?.indexOf(store.id) >= 0) {
                storesObj.push({ id: store.id, name: store.name });
              } else {
                availStoresObj.push({ id: store.id, name: store.name });
              }
            });

            setAvailStores(availStoresObj);
            setStores(storesObj);
          });

        api
          .getProducts(0, `&customerId=${data.customerId}`)
          .then(({ data: { items: products } }) => {
            const availProductsObj = [];
            const productsObj = [];

            products.forEach((product) => {
              if (data?.productIds?.indexOf(product.id) >= 0) {
                productsObj.push({ id: product.id, name: product.genericName });
              } else {
                availProductsObj.push({ id: product.id, name: product.genericName });
              }
            });

            setAvailProducts(availProductsObj);
            setProducts(productsObj);
          });
      });
  }, []);

  // ToDO refactor from here and recodetails
  const updateDiscount = (type, value, selections) => {
    let setValue = value;

    if (!curDiscount[type]) {
      setValue = [value];
    } else if (selections === 'multiple' || selections === 'empty') {
      const curValInd = curDiscount[type].indexOf(value);
      if (curValInd >= 0) {
        if (curDiscount[type].length === 1) {
          if (selections === 'multiple') return;
          setValue = [];
        } else {
          const newArr = [...curDiscount[type]];
          newArr.splice(curValInd, 1);
          setValue = newArr;
        }
      } else {
        setValue = [...curDiscount[type], value];
      }
    }

    setCurDiscount((c) => ({ ...c, [type]: setValue }));
  };

  if (curDiscount === null) return <LinearProgress />;

  return (
    <div className='discount-details-screen'>
      <Tabs
        value={0}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label={discount.name} />
      </Tabs>

      <Zoom in={hasChanges}>
        <Button
          id="save-discount-button"
          color="primary"
          size="large"
          type="submit"
          variant="contained"
          onClick={saveIdentity}
        >
          Save
        </Button>
      </Zoom>

      <CustomCard title='Basic'>
        <Box display='flex' py={5} pb={2}>
          <TextField
            fullWidth
            label='Customer'
            name='customerId'
            type='text'
            disabled
            value={curDiscount.customerId}
            variant='outlined'
          />

          <TextField
            fullWidth
            label='Amount'
            name='discountRate'
            type='text'
            value={curDiscount.discountRate * 100}
            onChange={handleChange}
            InputProps={{
              endAdornment: <span>%</span>,
            }}
            variant='outlined'
          />
        </Box>

        <Box display='flex'>
          <TextField
            fullWidth
            label='Discount Name'
            name='name'
            type='text'
            value={curDiscount.name}
            onChange={handleChange}
            variant='outlined'
          />

          <TextField
            fullWidth
            label='Label'
            name='localizedLabels.neutral'
            type='text'
            value={curDiscount.localizedLabels.neutral}
            onChange={(e) => setCurDiscount((d) => ({
              ...d,
              localizedLabels: { ...d.localizedLabels, neutral: e.target.value },
            }))}
            variant='outlined'
            helperText={!curDiscount.localizedLabels.neutral && 'If left empty the label will not be displayed on the checkout'}
          />
        </Box>

        <Box display='flex' mx={2}>
          <div>
            <Typography gutterBottom variant='h5'>Model</Typography>

            <Box display='flex' alignItems='center'>
              <FormControlLabel
                control={<Checkbox name='CAMPAIGN' color='primary' checked={curDiscount.model === 'CAMPAIGN'} />}
                onChange={() => updateDiscount('model', 'CAMPAIGN')}
                label='Campaign'
              />

              <FormControlLabel
                control={<Checkbox name='COUPON' color='primary' checked={curDiscount.model === 'COUPON'} />}
                onChange={() => updateDiscount('model', 'COUPON')}
                label='Coupon'
              />

              <FormControlLabel
                control={<Checkbox name='SINGLE_USE_CODE' color='primary' checked={curDiscount.model === 'SINGLE_USE_CODE'} />}
                onChange={() => updateDiscount('model', 'SINGLE_USE_CODE')}
                label='Single use code'
              />
            </Box>
          </div>
        </Box>

        <Box py={3} mx={2}>
          <Typography gutterBottom variant='h5'>Status</Typography>

          <Box display='flex' alignItems='center'>
            <FormControlLabel
              control={(
                <Switch
                  color='primary'
                  checked={curDiscount.status === 'ENABLED'}
                  name='status'
                />
              )}
              onChange={() => updateDiscount('status', curDiscount.status === 'ENABLED' ? 'DISABLED' : 'ENABLED')}
              label={curDiscount.status === 'ENABLED' ? 'Enabled' : 'Disabled'}
            />
          </Box>
        </Box>
      </CustomCard>

      <CustomCard title='Eligibility'>
        <Box display='flex' py={5} pb={2}>
          {curStores === null ? (
            <Box width={1} m='10px' pt='8px'><CircularProgress /></Box>
          ) : (
            <TextField
              fullWidth
              label='Stores'
              name='stores'
              type='text'
              placeholder='Select stores'
              value={curStores.map((st) => st.name)}
              contentEditable={false}
              onClick={() => setStoresModalOpen(true)}
              variant='outlined'
              disabled
              InputLabelProps={{ shrink: true }}
              InputProps={{ endAdornment: <InputAdornment position='end'><EditIcon /></InputAdornment> }}
            />
          )}

          {curProducts === null ? (
            <Box width={1} m='10px' pt='8px'><CircularProgress /></Box>
          ) : (
            <TextField
              fullWidth
              label='Products'
              name='catalogs'
              type='text'
              placeholder='Select products'
              value={curProducts.map((pr) => pr.name)}
              contentEditable={false}
              onClick={() => setProductsModalOpen(true)}
              variant='outlined'
              disabled
              InputLabelProps={{ shrink: true }}
              InputProps={{ endAdornment: <InputAdornment position='end'><EditIcon /></InputAdornment> }}
            />
          )}
        </Box>

        <Box display='flex' mx={2} pb={2}>
          <div>
            <Typography gutterBottom variant='h5'>Source(s)</Typography>

            <Box display='flex' alignItems='center'>
              <FormControlLabel
                control={<Checkbox name='MANUAL_RENEWAL' color='primary' checked={curDiscount?.sources?.indexOf('MANUAL_RENEWAL') >= 0} />}
                onChange={() => updateDiscount('sources', 'MANUAL_RENEWAL', 'empty')}
                label='Manual Renewal'
              />

              <FormControlLabel
                control={<Checkbox name='PURCHASE' color='primary' checked={curDiscount?.sources?.indexOf('PURCHASE') >= 0} />}
                onChange={() => updateDiscount('sources', 'PURCHASE', 'empty')}
                label='Purchase'
              />
            </Box>
          </div>
        </Box>

        <Box display='flex' mx={2}>
          <div>
            <Typography gutterBottom variant='h5'>End-user types</Typography>

            <Box display='flex' alignItems='center'>
              <FormControlLabel
                control={<Checkbox name='BUYER' color='primary' checked={curDiscount?.endUserTypes?.indexOf('BUYER') >= 0} />}
                onChange={() => updateDiscount('endUserTypes', 'BUYER', 'empty')}
                label='Buyer'
              />

              <FormControlLabel
                control={<Checkbox name='RESELLER' color='primary' checked={curDiscount?.endUserTypes?.indexOf('RESELLER') >= 0} />}
                onChange={() => updateDiscount('endUserTypes', 'RESELLER', 'empty')}
                label='Approved reseller'
              />
            </Box>
          </div>
        </Box>
      </CustomCard>

      <Dialog
        open={productsModal}
        onClose={() => setProductsModalOpen(false)}
        aria-labelledby='table-items-dialog-title'
        fullWidth
        maxWidth='sm'
      >
        <TableItems
          values={curProducts}
          avail={availProducts}
          type='products'
          noDelete
          removeItem={(item) => removeItem(item, 'products')}
          addItem={(item) => addItem(item, 'products')}
        />
      </Dialog>

      <Dialog
        open={storesModal}
        onClose={() => setStoresModalOpen(false)}
        aria-labelledby='table-items-dialog-title'
        fullWidth
        maxWidth='sm'
      >
        <TableItems
          values={curStores}
          avail={availStores}
          type='stores'
          noDelete
          removeItem={(item) => removeItem(item, 'stores')}
          addItem={(item) => addItem(item, 'stores')}
        />
      </Dialog>
    </div>
  );
};

export default DiscountDetailsScreen;

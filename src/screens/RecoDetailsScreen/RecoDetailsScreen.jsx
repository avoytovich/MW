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

import './recoDetailsScreen.scss';

const RecoDetailsScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [reco, setReco] = useState(null);
  const [curReco, setCurReco] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [curStores, setStores] = useState(null);
  const [curProducts, setProducts] = useState(null);
  const [availStores, setAvailStores] = useState(null);
  const [availProducts, setAvailProducts] = useState(null);
  const [availParentProducts, setAvailParentProducts] = useState(null);
  const [curParentProducts, setParentProducts] = useState(null);
  const [productsModal, setProductsModalOpen] = useState(false);
  const [parentProductsModal, setParentProductsModalOpen] = useState(false);
  const [storesModal, setStoresModalOpen] = useState(false);

  const handleChange = (e) => {
    e.persist();
    const { name, value } = e.target;
    setCurReco({ ...curReco, [name]: value });
  };

  const saveIdentity = () => {
    api.updateRecoById(id, curReco).then(() => {
      dispatch(
        showNotification(localization.t('general.updatesHaveBeenSaved')),
      );
      setReco(curReco);
    });
  };

  const removeItem = (item, type) => {
    if (type === 'products') {
      const newArr = [...curReco.eligibleProductIds];

      newArr.splice(newArr.indexOf(item.id), 1);
      setProductsModalOpen(false);
      setCurReco((c) => ({ ...c, eligibleProductIds: newArr }));
      setProducts((p) => p.filter((pr) => pr.id !== item.id));
      setAvailProducts((pr) => [...pr, item]);
    } else if (type === 'parentProducts') {
      const newArr = [...curReco.eligibleParentProductIds];

      newArr.splice(newArr.indexOf(item), 1);
      setParentProductsModalOpen(false);
      setCurReco((c) => ({ ...c, eligibleParentProductIds: newArr }));
      setParentProducts((p) => p.filter((pr) => pr.id !== item.id));
      setAvailParentProducts((pr) => [...pr, item]);
    } else if (type === 'stores') {
      const newArr = [...curReco.eligibleStoreIds];

      newArr.splice(newArr.indexOf(item), 1);
      setStoresModalOpen(false);
      setCurReco((c) => ({ ...c, eligibleStoreIds: newArr }));
      setStores((p) => p.filter((pr) => pr.id !== item.id));
      setAvailStores((pr) => [...pr, item]);
    }
  };

  const addItem = (item, type) => {
    if (type === 'products') {
      setProductsModalOpen(false);
      setCurReco((c) => ({ ...c, eligibleProductIds: [...c.eligibleProductIds, item.id] }));
      setProducts((p) => [...p, item]);
      setAvailProducts((pr) => [...pr.filter((p) => p.id !== item.id)]);
    } else if (type === 'parentProducts') {
      setParentProductsModalOpen(false);
      setCurReco((c) => ({
        ...c,
        eligibleParentProductIds: [...c.eligibleParentProductIds, item.id],
      }));
      setParentProducts((p) => [...p, item]);
      setAvailParentProducts((pr) => [...pr.filter((p) => p.id !== item.id)]);
    } else if (type === 'stores') {
      setStoresModalOpen(false);
      setCurReco((c) => ({ ...c, eligibleStoreIds: [...c.eligibleStoreIds, item.id] }));
      setStores((p) => [...p, item]);
      setAvailStores((pr) => [...pr.filter((p) => p.id !== item.id)]);
    }
  };

  useEffect(() => {
    setHasChanges(JSON.stringify(curReco) !== JSON.stringify(reco));

    return () => setHasChanges(false);
  }, [curReco, reco]);

  useEffect(() => {
    api
      .getRecoById(id)
      .then(({ data }) => {
        setReco(data);
        setCurReco(data);

        api
          .getStores(0, `&customerId=${data.customerId}`)
          .then(({ data: { items: stores } }) => {
            const availStoresObj = [];
            const storesObj = [];

            stores.forEach((store) => {
              if (data?.eligibleStoreIds?.indexOf(store.id) >= 0) {
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
            const availParentProductsObj = [];
            const parentProductsObj = [];

            products.forEach((product) => {
              if (data?.eligibleProductIds?.indexOf(product.id) >= 0) {
                productsObj.push({ id: product.id, name: product.genericName });
              } else {
                availProductsObj.push({ id: product.id, name: product.genericName });
              }

              if (data?.eligibleParentProductIds?.indexOf(product.id) >= 0) {
                parentProductsObj.push({ id: product.id, name: product.genericName });
              } else {
                availParentProductsObj.push({ id: product.id, name: product.genericName });
              }
            });

            setAvailProducts(availProductsObj);
            setProducts(productsObj);
            setAvailParentProducts(availParentProductsObj);
            setParentProducts(parentProductsObj);
          });
      });
  }, []);

  const updateReco = (type, value, selections) => {
    let setValue = value;

    if (!curReco[type]) {
      setValue = [value];
    } else if (selections === 'multiple' || selections === 'empty') {
      const curValInd = curReco[type].indexOf(value);
      if (curValInd >= 0) {
        if (curReco[type].length === 1) {
          if (selections === 'multiple') return;
          setValue = [];
        } else {
          const newArr = [...curReco[type]];
          newArr.splice(curValInd, 1);
          setValue = newArr;
        }
      } else {
        setValue = [...curReco[type], value];
      }
    }

    setCurReco((c) => ({ ...c, [type]: setValue }));
  };

  if (curReco === null) return <LinearProgress />;

  return (
    <div className='reco-details-screen'>
      <Tabs
        value={0}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label={reco.name} />
      </Tabs>

      <Zoom in={hasChanges}>
        <Button
          id="save-reco-button"
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
            value={curReco.customerId}
            variant='outlined'
          />

          <TextField
            fullWidth
            label='Recommendation Name'
            name='name'
            type='text'
            value={curReco.name}
            onChange={handleChange}
            variant='outlined'
          />
        </Box>

        <Box display='flex' mx={2} pb={2}>
          <div>
            <Typography gutterBottom variant='h5'>Type</Typography>

            <Box display='flex' alignItems='center'>
              <FormControlLabel
                control={<Checkbox name='CROSS_SELL' color='primary' checked={curReco.type === 'CROSS_SELL'} />}
                onChange={() => updateReco('type', 'CROSS_SELL')}
                label='Cross Sell'
              />

              <FormControlLabel
                control={<Checkbox name='UP_SELL' color='primary' checked={curReco.type === 'UP_SELL'} />}
                onChange={() => updateReco('type', 'UP_SELL')}
                label='Up Sell'
              />

              <FormControlLabel
                control={<Checkbox name='UPGRADE' color='primary' checked={curReco.type === 'UPGRADE'} />}
                onChange={() => updateReco('type', 'UPGRADE')}
                label='Upgrade'
              />
            </Box>
          </div>
        </Box>

        <Box display='flex' mx={2} pb={2}>
          <div>
            <Typography gutterBottom variant='h5'>Level(s)</Typography>

            <Box display='flex' alignItems='center'>
              <FormControlLabel
                control={<Checkbox name='PRODUCT' color='primary' checked={curReco?.levels?.indexOf('PRODUCT') >= 0} />}
                onChange={() => updateReco('levels', 'PRODUCT', 'multiple')}
                label='Product'
              />

              <FormControlLabel
                control={<Checkbox name='CART' color='primary' checked={curReco?.levels?.indexOf('CART') >= 0} />}
                onChange={() => updateReco('levels', 'CART', 'multiple')}
                label='Cart'
              />

              <FormControlLabel
                control={<Checkbox name='INTERSTITIAL' color='primary' checked={curReco?.levels?.indexOf('INTERSTITIAL') >= 0} />}
                onChange={() => updateReco('levels', 'INTERSTITIAL', 'multiple')}
                label='Interstitial'
              />

              <FormControlLabel
                control={<Checkbox name='PURCHASE' disabled color='primary' checked={curReco?.levels?.indexOf('PURCHASE') >= 0} />}
                // onClick={updateReco('levels', 'PURCHASE', 'multiple')}
                label='Purchase'
              />
            </Box>
          </div>
        </Box>

        <Box display='flex' mx={2} pb={2}>
          <div>
            <Typography gutterBottom variant='h5'>Source(s)</Typography>

            <Box display='flex' alignItems='center'>
              <FormControlLabel
                control={<Checkbox name='MANUAL_RENEWAL' color='primary' checked={curReco?.sources?.indexOf('MANUAL_RENEWAL') >= 0} />}
                onChange={() => updateReco('sources', 'MANUAL_RENEWAL', 'empty')}
                label='Manual Renewal'
              />

              <FormControlLabel
                control={<Checkbox name='PURCHASE' color='primary' checked={curReco?.sources?.indexOf('PURCHASE') >= 0} />}
                onChange={() => updateReco('sources', 'PURCHASE', 'empty')}
                label='Purchase'
              />
            </Box>
          </div>
        </Box>

        <Box mx={2} pb={2}>
          <Typography gutterBottom variant='h5'>Status</Typography>

          <Box display='flex' alignItems='center'>
            <FormControlLabel
              control={(
                <Switch
                  color='primary'
                  checked={curReco.status === 'ENABLED'}
                  name='status'
                />
              )}
              onChange={() => updateReco('status', curReco.status === 'ENABLED' ? 'DISABLED' : 'ENABLED')}
              label={curReco.status === 'ENABLED' ? 'Enabled' : 'Disabled'}
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

          {curParentProducts === null ? (
            <Box width={1} m='10px' pt='8px'><CircularProgress /></Box>
          ) : (
            <TextField
              fullWidth
              label='Parent Products'
              name='catalogs'
              type='text'
              placeholder='Select parent products'
              value={curParentProducts.map((pr) => pr.name)}
              contentEditable={false}
              onClick={() => setParentProductsModalOpen(true)}
              variant='outlined'
              disabled
              InputLabelProps={{ shrink: true }}
              InputProps={{ endAdornment: <InputAdornment position='end'><EditIcon /></InputAdornment> }}
            />
          )}
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
        open={parentProductsModal}
        onClose={() => setParentProductsModalOpen(false)}
        aria-labelledby='table-items-dialog-title'
        fullWidth
        maxWidth='sm'
      >
        <TableItems
          values={curParentProducts}
          avail={availParentProducts}
          type='products'
          noDelete
          removeItem={(item) => removeItem(item, 'parentProducts')}
          addItem={(item) => addItem(item, 'parentProducts')}
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

export default RecoDetailsScreen;

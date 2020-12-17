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

import './recoDetailsScreen.scss';

const RecoDetailsScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [reco, setReco] = useState(null);
  const [curReco, setCurReco] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [curStores, setStores] = useState(null);
  const [curProducts, setProducts] = useState(null);
  const [curParentProducts, setParentProducts] = useState(null);
  const [productsModal, setProductsModalOpen] = useState(false);
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

  const removeItem = (id, type) => {
    /* if (type === 'products') {
      setProducts((cur) => cur.filter((product) => product.id !== id));
    } else if (type === 'stores') {
      setStores((cur) => cur.filter((store) => store.id !== id));
    } */
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
            const storesObj = [];

            stores.forEach((store) => {
              if (data?.eligibleStoreIds?.indexOf(store.id) >= 0) {
                storesObj.push({ id: store.id, name: store.name });
              }
            });

            setStores(storesObj);
          });

        api
          .getProducts(0, `&customerId=${data.customerId}`)
          .then(({ data: { items: products } }) => {
            const productsObj = [];
            const parentProductsObj = [];

            products.forEach((product) => {
              if (data?.eligibleProductIds?.indexOf(product.id) >= 0) {
                productsObj.push({ id: product.id, name: product.genericName });
              }

              if (data?.eligibleParentProductIds?.indexOf(product.id) >= 0) {
                parentProductsObj.push({ id: product.id, name: product.genericName });
              }
            });

            setProducts(productsObj);
            setParentProducts(parentProductsObj);
          });
      });
  }, []);

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
                label='Cross Sell'
              />

              <FormControlLabel
                control={<Checkbox name='UP_SELL' color='primary' checked={curReco.type === 'UP_SELL'} />}
                label='Up Sell'
              />

              <FormControlLabel
                control={<Checkbox name='UPGRADE' color='primary' checked={curReco.type === 'UPGRADE'} />}
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
                label='Product'
              />

              <FormControlLabel
                control={<Checkbox name='CART' color='primary' checked={curReco?.levels?.indexOf('CART') >= 0} />}
                label='Cart'
              />

              <FormControlLabel
                control={<Checkbox name='INTERSTITIAL' color='primary' checked={curReco?.levels?.indexOf('INTERSTITIAL') >= 0} />}
                label='Interstitial'
              />

              <FormControlLabel
                control={<Checkbox name='PURCHASE' disabled color='primary' checked={curReco?.levels?.indexOf('PURCHASE') >= 0} />}
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
                label='Manual Renewal'
              />

              <FormControlLabel
                control={<Checkbox name='PURCHASE' color='primary' checked={curReco?.sources?.indexOf('PURCHASE') >= 0} />}
                label='Purchase'
              />
            </Box>
          </div>
        </Box>

        <Box mx={2} pb={2}>
          <Typography gutterBottom variant='h5'>Status</Typography>

          <Box display='flex' alignItems='center' ml='-10px'>
            <Switch
              color='primary'
              checked={curReco.status === 'ENABLED'}
              onChange={() => setCurReco({ ...curReco, status: curReco.status === 'ENABLED' ? 'DISABLED' : 'ENABLED' })}
              name='status'
            />

            <Typography>
              {curReco.status === 'ENABLED' ? 'Enabled' : 'Disabled'}
            </Typography>
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
              onClick={() => setProductsModalOpen(true)}
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
        <TableItems values={curProducts} type='products' removeItem={removeItem} />
      </Dialog>

      <Dialog
        open={storesModal}
        onClose={() => setStoresModalOpen(false)}
        aria-labelledby='table-items-dialog-title'
        fullWidth
        maxWidth='sm'
      >
        <TableItems values={curStores} type='stores' removeItem={removeItem} />
      </Dialog>
    </div>
  );
};

export default RecoDetailsScreen;

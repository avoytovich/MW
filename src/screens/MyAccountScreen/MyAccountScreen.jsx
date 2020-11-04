// ToDo: consider making a common layout for such type of settings screens
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

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
} from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';

import api from '../../api';
import { showNotification } from '../../redux/actions/HttpNotifications';
import CustomCard from '../../components/utils/CustomCard';
import TableItems from '../../components/utils/Modals/TableItems';
import localization from '../../localization';

import './myAccountScreen.scss';

const MyAccountScreen = () => {
  const dispatch = useDispatch();
  const [identity, setIdentity] = useState(null);
  const [curIdentity, setCurIdentity] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [curStores, setStores] = useState(null);
  const [curProducts, setProducts] = useState(null);
  const [productsModal, setProductsModalOpen] = useState(false);
  const [storesModal, setStoresModalOpen] = useState(false);
  const account = useSelector(({ account: { user } }) => user);
  
  const handleChange = (e) => {
    e.persist();
    const { name, value } = e.target;
    setCurIdentity({ ...identity, [name]: value });
  };

  const saveIdentity = () => {
    api.updateIdentityById(account.sub, curIdentity).then(() => {
      dispatch(
        showNotification(localization.t('general.updatesHaveBeenSaved')),
      );
      setIdentity(curIdentity);
    });
  };

  const removeItem = (id, type) => {
    if(type === 'products') {
      setProducts((cur) => cur.filter(product => product.id !== id));
    } else if(type === 'stores') {
      setStores((cur) => cur.filter(store => store.id !== id));
    }
  };

  useEffect(() => {
    setHasChanges(JSON.stringify(curIdentity) !== JSON.stringify(identity));

    return () => setHasChanges(false);
  }, [curIdentity, identity]);

  useEffect(() => {
    api
      .getIdentityById(account.sub)
      .then(({ data }) => {
        setIdentity(data);
        setCurIdentity(data);

        api
          .getStores(0, `&customerId=${data.customerId}`)
          .then(({ data: { items: stores } }) => {
            const storesObj = stores.map((store) => ({ id: store.id, name: store.name }));
            setStores(storesObj);
          });

        api
          .getProducts(0, `&customerId=${data.customerId}`)
          .then(({ data: { items: products } }) => {
            const productsObj = products.map((product) => ({ id: product.id, name: product.genericName }));
            setProducts(productsObj);
          });
      });
  }, []);

  if (curIdentity === null) return <LinearProgress />;

  return (
    <div className='my-account-screen'>
      <Tabs
        value={0}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="My Account" />
      </Tabs>

      <Zoom in={hasChanges}>
        <Button
          id="save-account-button"
          color="primary"
          size="large"
          type="submit"
          variant="contained"
          onClick={saveIdentity}
        >
          Save
        </Button>
      </Zoom>

      <CustomCard title='Basic Profile'>
        <Box display='flex' py={5} pb={2}>
          <TextField
            fullWidth
            label='First Name'
            name='firstName'
            type='text'
            value={curIdentity.firstName}
            onChange={handleChange}
            variant='outlined'
          />

          <TextField
            fullWidth
            label='Last Name'
            name='lastName'
            type='text'
            value={curIdentity.lastName}
            onChange={handleChange}
            variant='outlined'
          />
        </Box>

        <Box display='flex' pb={2}>
          <TextField
            fullWidth
            label='Email'
            name='email'
            type='text'
            value={curIdentity.email}
            onChange={handleChange}
            variant='outlined'
          />

          <TextField
            fullWidth
            label='User Name'
            name='userName'
            type='text'
            value={curIdentity.userName}
            onChange={handleChange}
            variant='outlined'
            disabled
          />
        </Box>
      </CustomCard>

      <CustomCard title='Configuration'>
        <Box display='flex' py={5} pb={2}>
          {curStores === null ? (
            <Box width={1} m='10px' pt='8px'><CircularProgress /></Box>
          ) : (
            <TextField
              fullWidth
              label='Stores'
              name='stores'
              type='text'
              placeholder='Stores list'
              value={curStores.map((store) => store.name)}
              contentEditable={false}
              onClick={() => setStoresModalOpen(true)}
              variant='outlined'
              disabled
              InputLabelProps={{ shrink: true }}
              InputProps={{ endAdornment: <InputAdornment position='end'><EditIcon /></InputAdornment> }}
              helperText='Please specify the stores you manage'
            />
          )}

          {curProducts === null ? (
            <Box width={1} m='10px' pt='8px'><CircularProgress /></Box>
          ) : (
            <TextField
              fullWidth
              label='Catalogs & products'
              name='catalogs'
              type='text'
              placeholder='Catalogs and/or products'
              value={curProducts.map((product) => product.name)}
              contentEditable={false}
              onClick={() => setProductsModalOpen(true)}
              variant='outlined'
              disabled
              InputLabelProps={{ shrink: true }}
              InputProps={{ endAdornment: <InputAdornment position='end'><EditIcon /></InputAdornment> }}
              helperText='Please specify the catalogs you manage'
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

export default MyAccountScreen;

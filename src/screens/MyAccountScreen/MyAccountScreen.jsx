// ToDo: consider making a common layout for such type of settings screens
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

import {
  Box,
  TextField,
  LinearProgress,
  Zoom,
  Button,
  Tabs,
  Tab,
  Typography,
  Switch,
} from '@material-ui/core';

import api from '../../api';
import CustomBreadcrumbs from '../../components/utils/CustomBreadcrumbs';
import { setNexwayState } from '../../redux/actions/Account';
import CustomCard from '../../components/utils/CustomCard';
import ToastWithAction from '../../components/utils/ToastWithAction/ToastWithAction';
import { SelectWithChip } from '../../components/Inputs';
import localization from '../../localization';
import defPath from '../../services/helpers/routingHelper';

import './myAccountScreen.scss';

const MyAccountScreen = () => {
  const dispatch = useDispatch();
  const [identity, setIdentity] = useState(null);
  const [curIdentity, setCurIdentity] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [curStores, setStores] = useState(null);
  const [curProducts, setProducts] = useState(null);
  const account = useSelector(({ account: { user } }) => user);
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);
  const [errorDetails, setErrorDetails] = useState(!!nxState?.errorDetails);
  const location = useLocation();
  const sections = location.pathname.split(`/${defPath}/`)[0].split('/').slice(1);

  useEffect(() => {
    if (nxState?.errorDetails !== errorDetails) {
      dispatch(setNexwayState({ ...nxState, errorDetails }));
    }
  }, [errorDetails]);

  const handleChange = (e) => {
    e.persist();
    const { name, value } = e.target;
    setCurIdentity({ ...curIdentity, [name]: value });
  };

  const saveIdentity = () => {
    api.updateIdentityById(account.sub, curIdentity).then(() => {
      toast(localization.t('general.updatesHaveBeenSaved'));
      setIdentity(curIdentity);
    });
  };

  useEffect(() => {
    setHasChanges(JSON.stringify(curIdentity) !== JSON.stringify(identity));

    return () => setHasChanges(false);
  }, [curIdentity, identity]);

  useEffect(() => {
    api
      .getIdentityById(account?.sub)
      .then(({ data }) => {
        setIdentity(data);
        setCurIdentity(data);

        api
          .getStores({ filters: `&customerId=${data?.customerId}` })
          .then(({ data: { items: stores } }) => {
            const storesObj = stores.map((store) => ({
              id: store.id,
              name: store.name,
            }));
            setStores(storesObj);
          })
          .catch(() => setStores(null));

        api
          .getProducts({ filters: `&customerId=${data?.customerId}` })
          .then(({ data: { items: products } }) => {
            const productsObj = products.map((product) => ({
              id: product.id,
              name: product.genericName,
            }));
            setProducts(productsObj);
          })
          .catch(() => setProducts(null));
      })
      .catch(() => {
        setIdentity(null);
        setCurIdentity(null);
      });
  }, []);

  const handleDeleteStore = (id, force) => api.deleteStoreById(id, force)
    .then(() => {
      setStores((v) => v.filter((st) => st.id !== id));
      toast(
        `${localization.t('general.store')} ${id} ${localization.t(
          'general.hasBeenSuccessfullyDeleted',
        )}`,
      );
    })
    .catch((msg) => {
      if (force) {
        toast.error(msg);
      } else {
        toast.error(<ToastWithAction
          text={msg}
          buttonText={localization.t('general.force')}
          actionFn={() => handleDeleteStore(id, true)}
        />);
      }
    });

  const handleDeleteProduct = (id) => {
    api
      .deleteProductById(id)
      .then(() => {
        setProducts((v) => v.filter((st) => st.id !== id));
        toast(
          `${localization.t('general.product')} ${id} ${localization.t(
            'general.hasBeenSuccessfullyDeleted',
          )}`,
        );
      });
  };

  if (curIdentity === null) return <LinearProgress />;

  return (
    <>
      <CustomBreadcrumbs
        sections={sections}
      />
      <div className="my-account-screen">
        <Tabs value={0} indicatorColor="primary" textColor="primary">
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

        <CustomCard title="Basic Profile">
          <Box display="flex" py={5} pb={2}>
            <Box px={1} width=" 100%">
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                type="text"
                value={curIdentity.firstName}
                onChange={handleChange}
                variant="outlined"
              />
            </Box>
            <Box px={1} width=" 100%">
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                type="text"
                value={curIdentity.lastName}
                onChange={handleChange}
                variant="outlined"
              />
            </Box>
          </Box>

          <Box display="flex" pb={2}>
            <Box px={1} width=" 100%">
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="text"
                value={curIdentity.email}
                onChange={handleChange}
                variant="outlined"
              />
            </Box>
            <Box px={1} width=" 100%">
              <TextField
                fullWidth
                label="User Name"
                name="userName"
                type="text"
                value={curIdentity.userName}
                onChange={handleChange}
                variant="outlined"
                disabled
              />
            </Box>
          </Box>
        </CustomCard>

        <CustomCard title="Configuration">
          <Box display="flex" py={5} pb={2}>
            <Box px={1} width=" 100%">
              <SelectWithChip
                label='stores'
                value={curStores?.map((store) => store.name)}
                selectOptions={curStores}
                isDisabled
                helperText="Please specify the stores you manage"
                onClickDelIcon={(chip) => {
                  const [store] = curStores.filter((st) => st.name === chip);
                  handleDeleteStore(store.id);
                }}
              />
            </Box>

            <Box px={1} width=" 100%">
              <SelectWithChip
                label='catalogsAndProducts'
                value={curProducts?.map((product) => product.name)}
                selectOptions={curProducts}
                isDisabled
                helperText="Please specify the catalogs you manage"
                onClickDelIcon={(chip) => {
                  const [product] = curProducts.filter((st) => st.name === chip);
                  handleDeleteProduct(product.id);
                }}
              />
            </Box>
          </Box>
        </CustomCard>

        <CustomCard title='My preferences'>
          <Box pt={3} display='flex' alignItems='center'>
            <Typography gutterBottom variant='h5'>Error details</Typography>

            <Box display='flex' alignItems='center' ml='10px'>
              <Switch
                color='primary'
                checked={errorDetails}
                onChange={() => setErrorDetails((c) => !c)}
                name='errorDetails'
              />
            </Box>
          </Box>

          <Typography component='em'>
            {errorDetails ? 'Show' : 'Hide'}
            {' '}
            Error Details
          </Typography>
        </CustomCard>
      </div>

    </>
  );
};

export default MyAccountScreen;

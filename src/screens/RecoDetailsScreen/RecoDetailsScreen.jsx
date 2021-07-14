// ToDo: consider making a common layout for such type of settings screens + refactor
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import {
  LinearProgress,
  Zoom,
  Button,
  Tabs,
  Tab,
  Box,
  Typography,
} from '@material-ui/core';
import {
  recoRequiredFields,
  formateProductOptions,
  fromArrayToObj,
} from './utils';
import SelectCustomerNotification from '../../components/utils/SelectCustomerNotification';
import { structureSelectOptions } from '../../services/helpers/dataStructuring';
import api from '../../api';
import { showNotification } from '../../redux/actions/HttpNotifications';

import Basic from './SubSections/Basic';
import Eligibility from './SubSections/Eligibility';
import Recommendations from './SubSections/Recommendations';
import CappingAndLimits from './SubSections/CappingAndLimits';

import CustomBreadcrumbs from '../../components/utils/CustomBreadcrumbs';
import localization from '../../localization';

import './recoDetailsScreen.scss';

const RecoDetailsScreen = () => {
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);
  const history = useHistory();

  const dispatch = useDispatch();
  const { id } = useParams();
  const [reco, setReco] = useState(null);
  const [curReco, setCurReco] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [curTab, setCurTab] = useState(0);
  const [selectOptions, setSelectOptions] = useState({
    stores: null,
    products: null,
    productsByParent: null,
    recoByProduct: null,
    recoByParent: null,
  });
  const handleChange = (e) => {
    e.persist();
    const { name, value } = e.target;
    setCurReco({ ...curReco, [name]: value });
  };
  const saveIdentity = () => {
    const objToSend = { ...curReco };
    if (curReco.function === 'idToIdsRecoRule') {
      delete objToSend.productIds;
      objToSend.byParentProductIds = fromArrayToObj(curReco.byParentProductIds);
      objToSend.byProductIds = fromArrayToObj(curReco.byProductIds);
    } else {
      delete objToSend.byParentProductIds;
      delete objToSend.byProductIds;
    }
    if (id === 'add') {
      api.addNewRecommendation(objToSend).then(() => {
        dispatch(
          showNotification(localization.t('general.updatesHaveBeenSaved')),
        );
        history.push('/marketing/recommendations');
      });
    } else {
      api.updateRecoById(id, objToSend).then(() => {
        dispatch(
          showNotification(localization.t('general.updatesHaveBeenSaved')),
        );
        window.location.reload();
      });
    }
  };

  useEffect(() => {
    setHasChanges(JSON.stringify(curReco) !== JSON.stringify(reco));

    return () => setHasChanges(false);
  }, [curReco, reco]);
  useEffect(() => {
    let recoRequest;
    if (id === 'add') {
      recoRequest = Promise.resolve({
        data: { customerId: nxState?.selectedCustomer?.id },
      });
    } else {
      recoRequest = api.getRecoById(id);
    }
    recoRequest.then(({ data }) => {
      const checkedReco = recoRequiredFields(data);
      setReco(JSON.parse(JSON.stringify(checkedReco)));
      setCurReco(JSON.parse(JSON.stringify(checkedReco)));
      Promise.allSettled([
        api.getStores({ filters: `&customerId=${data.customerId}` }),
        api.getProducts({ size: 10, filters: `&customerId=${data.customerId}` }),
        api.getProducts({ size: 10, filters: `&customerId=${data.customerId}&parentId=${null}` }),
        api.getProducts({ size: 10, filters: `&customerId=${data.customerId}&status=ENABLED` }),
        api.getProducts(
          0,
          `&customerId=${data.customerId}&parentId=${null}&status=ENABLED`,
        ),
      ]).then(
        ([
          storeOptions,
          productOptions,
          parentProductOptions,
          recoByProductOptions,
          recoByParentOptions,
        ]) => setSelectOptions({
          ...selectOptions,
          stores:
            structureSelectOptions(
              storeOptions.value?.data.items,
              'displayName',
            ) || [],
          products:
            formateProductOptions(productOptions.value?.data?.items) || [],
          productsByParent:
            formateProductOptions(parentProductOptions.value?.data?.items)
            || [],
          recoByProduct:
            formateProductOptions(recoByProductOptions.value?.data?.items)
            || [],
          recoByParent:
            formateProductOptions(recoByParentOptions.value?.data?.items)
            || [],
        }),
      );
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
  if (id === 'add' && !nxState?.selectedCustomer?.id) return <SelectCustomerNotification />;

  if (curReco === null) return <LinearProgress />;

  return (
    <div className='reco-details-screen'>
      {id !== 'add' && (
        <CustomBreadcrumbs
          url='/marketing/recommendations'
          section={localization.t('general.recommendation')}
          id={reco?.id ? reco.id : localization.t('general.addRecommendation')}
        />
      )}
      <Box py={2}>
        <Typography gutterBottom variant='h3'>
          {reco?.customerId}
        </Typography>
      </Box>
      <Box my={1} bgcolor='#fff'>
        <Tabs
          value={curTab}
          indicatorColor='primary'
          textColor='primary'
          onChange={(e, newTab) => setCurTab(newTab)}
        >
          <Tab label='General' />
          <Tab label='Eligibility' />
          <Tab label='Capping and limits' />
          <Tab label='Recommendations' disabled={!selectOptions.recoByParent} />
        </Tabs>
      </Box>
      <Zoom in={hasChanges}>
        <Button
          disabled={curReco.eligibleStoreIds.length < 1 || curReco.name === ''}
          id='save-reco-button'
          color='primary'
          size='large'
          type='submit'
          variant='contained'
          onClick={saveIdentity}
        >
          Save
        </Button>
      </Zoom>
      <Box pt={1}>
        {curTab === 0 && (
          <Basic
            curReco={curReco}
            updateReco={updateReco}
            handleChange={handleChange}
            setCurReco={setCurReco}
          />
        )}

        {curTab === 1 && (
          <Eligibility
            selectOptions={selectOptions}
            curReco={curReco}
            setCurReco={setCurReco}
          />
        )}

        {curTab === 2 && (
          <CappingAndLimits curReco={curReco} setCurReco={setCurReco} />
        )}

        {curTab === 3 && (
          <Recommendations
            selectOptions={selectOptions}
            curReco={curReco}
            setCurReco={setCurReco}
          />
        )}
      </Box>
    </div>
  );
};

export default RecoDetailsScreen;

// ToDo: consider making a common layout for such type of settings screens
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import {
  LinearProgress,
  Zoom,
  Button,
  Box,
  Typography,
  Tabs,
  Tab,
} from '@material-ui/core';
import { fromObjectToArray, fromArrayToObject, tabsLabels } from './utils';
import {
  structureSelectOptions,
  discountRequiredFields,
} from '../../services/helpers/dataStructuring';
import CustomBreadcrumbs from '../../components/utils/CustomBreadcrumbs';
import General from './SubSections/General';
import Eligibility from './SubSections/Eligibility';
import CappingAndLimits from './SubSections/CappingAndLimits';
import api from '../../api';
import DiscountSection from './DiscountSection';
import { showNotification } from '../../redux/actions/HttpNotifications';
import localization from '../../localization';

import './discountDetailsScreen.scss';

const DiscountDetailsScreen = () => {
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);
  const history = useHistory();
  const [curTab, setCurTab] = useState(0);

  const dispatch = useDispatch();
  const { id } = useParams();
  const [discount, setDiscount] = useState(null);
  const [curDiscount, setCurDiscount] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

  const [selectOptions, setSelectOptions] = useState({
    refProducts: null,
    endUserGroups: null,
    countries: null,
    endUsers: null,
    stores: null,
    parentProducts: null,
    discountProducts: null,
  });

  const [discountCodes, setDiscountCodes] = useState(null);
  const [curDiscountCodes, setCurDiscountCodes] = useState(null);

  const [minCartAmount, setMinCartAmount] = useState(null);
  const [curMinCartAmount, setCurMinCartAmount] = useState(null);

  const [amountCurrency, setAmountCurrency] = useState(null);
  const [curAmountCurrency, setCurAmountCurrency] = useState(null);

  const [discountLabels, setDiscountLabels] = useState(null);
  const [curDiscountLabels, setCurDiscountLabels] = useState(null);

  const [amountType, setAmountType] = useState(null);

  const saveDiscount = () => {
    const res = { ...curDiscount };

    res.thresholds = fromArrayToObject(curMinCartAmount, 'key');
    res.localizedLabels = fromArrayToObject(curDiscountLabels, 'key');
    if (amountType === 'byCurrency') {
      res.amountByCurrency = fromArrayToObject(curAmountCurrency, 'key');
      delete res.discountRate;
    } else {
      res.discountRate = curDiscount.discountRate / 100;
      delete res.amountByCurrency;
    }
    if (curDiscount.model === 'COUPON') {
      res.codes = fromArrayToObject(curDiscountCodes);
    } else {
      delete res.codes;
    }
    if (id === 'add') {
      api.addNewDiscount(res).then((res) => {
        const location = res.headers.location.split('/');
        const id = location[location.length - 1];
        dispatch(
          showNotification(localization.t('general.updatesHaveBeenSaved')),
        );
        history.push('/marketing/discounts');
      });
    } else {
      api.updateDiscountById(id, res).then(() => {
        dispatch(
          showNotification(localization.t('general.updatesHaveBeenSaved')),
        );
        window.location.reload();
      });
    }
  };

  useEffect(() => {
    setHasChanges(
      JSON.stringify(curDiscount) !== JSON.stringify(discount) ||
        JSON.stringify(amountCurrency) !== JSON.stringify(curAmountCurrency) ||
        JSON.stringify(discountLabels) !== JSON.stringify(curDiscountLabels) ||
        JSON.stringify(discountCodes) !== JSON.stringify(curDiscountCodes) ||
        JSON.stringify(minCartAmount) !== JSON.stringify(curMinCartAmount),
    );

    return () => setHasChanges(false);
  }, [
    curDiscount,
    discount,
    curAmountCurrency,
    curDiscountLabels,
    curMinCartAmount,
  ]);

  useEffect(() => {
    let discountRequest;
    if (id === 'add') {
      discountRequest = Promise.resolve({
        data: { customerId: nxState.selectedCustomer.id },
      });
    } else {
      discountRequest = api.getDiscountById(id);
    }
    discountRequest.then(({ data }) => {
      const checkedData = discountRequiredFields(data);
      const currencyArray = fromObjectToArray(
        checkedData.amountByCurrency,
        'key',
        { key: '', value: '' },
      );
      const minimumCartAmount = fromObjectToArray(
        checkedData.thresholds,
        'key',
        { key: '', value: '' },
      );
      const discountCodesArray = fromObjectToArray(checkedData.codes, 'value', {
        key: 'default',
        value: '',
      });
      const localizedLabelsArray = fromObjectToArray(
        checkedData.localizedLabels,
        'key',
        { key: 'neutral', value: '' },
      );

      setMinCartAmount(JSON.parse(JSON.stringify(minimumCartAmount)));
      setCurMinCartAmount(JSON.parse(JSON.stringify(minimumCartAmount)));

      setDiscountCodes(JSON.parse(JSON.stringify(discountCodesArray)));
      setCurDiscountCodes(JSON.parse(JSON.stringify(discountCodesArray)));

      setDiscountLabels(JSON.parse(JSON.stringify(localizedLabelsArray)));
      setCurDiscountLabels(JSON.parse(JSON.stringify(localizedLabelsArray)));

      setAmountCurrency(JSON.parse(JSON.stringify(currencyArray)));
      setCurAmountCurrency(JSON.parse(JSON.stringify(currencyArray)));
      setAmountType(checkedData.discountRate ? 'byPercentage' : 'byCurrency');

      setDiscount(checkedData);
      setCurDiscount(checkedData);
      // const parentIds = data.parentProductIds?.length
      //   ? data.parentProductIds.join('&')
      //   : null;
      const { customerId } = data;
      Promise.allSettled([
        api.getEndUsersByCustomerId(customerId),
        api.getStores(0, `&customerId=${customerId}`),
        api.getDiscountProductsByIds(customerId),
        api.getParentProductsByIds(customerId, null),
        api.getEndUsersGroupsByCustomerId(customerId),
      ]).then(
        ([
          endUsers,
          stores,
          discountProducts,
          parentProducts,
          endUsersGroups,
        ]) => {
          const refDiscountProductsObjs = [];

          discountProducts.value?.data.items.forEach((product) => {
            if (
              product.publisherRefId &&
              !refDiscountProductsObjs.filter(
                (e) => e.id === product.publisherRefId,
              ).length > 0
            ) {
              refDiscountProductsObjs.push({
                id: product.publisherRefId,
                value: product.publisherRefId,
              });
            }
          });
          setSelectOptions({
            ...selectOptions,
            endUsers:
              structureSelectOptions(endUsers.data?.items, 'fullName') || [],
            refProducts: refDiscountProductsObjs || [],
            endUserGroups:
              structureSelectOptions(endUsersGroups.data?.items, 'name') || [],
            stores:
              structureSelectOptions(stores.value?.data.items, 'name') || [],
            parentProducts:
              structureSelectOptions(
                parentProducts.value?.data.items,
                'genericName',
              ) || [],
            discountProducts:
              structureSelectOptions(
                discountProducts.value?.data.items,
                'genericName',
              ) || [],
          });
        },
      );
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
  if (id === 'add' && !nxState.selectedCustomer.id)
    return (
      <Box textAlign='center'>
        <Typography gutterBottom variant='h4'>
          {localization.t('general.noCustomer')}
        </Typography>

        <Typography gutterBottom variant='h5'>
          {localization.t('general.selectCustomer')}
        </Typography>
      </Box>
    );

  if (curDiscount === null) return <LinearProgress />;

  return (
    <>
      {id !== 'add' && (
        <Box mx={2}>
          <CustomBreadcrumbs
            url='/marketing/discounts'
            section={localization.t('general.discount')}
            id={discount.id}
          />
        </Box>
      )}

      <Box
        display='flex'
        flexDirection='row'
        m={2}
        justifyContent='space-between'
      >
        <Box alignSelf='center'>
          <Typography data-test='discountName' gutterBottom variant='h3'>
            {id !== 'add'
              ? discount.name
              : `${localization.t('general.new')} ${localization.t(
                  'general.discount',
                )}`}
          </Typography>
        </Box>

        <Zoom in={hasChanges}>
          <Box mb={1} mr={1}>
            <Button
              disabled={!curDiscount.name}
              id='save-discount-button'
              color='primary'
              size='large'
              type='submit'
              variant='contained'
              onClick={saveDiscount}
            >
              {localization.t('general.save')}
            </Button>
          </Box>
        </Zoom>
      </Box>

      <Box my={2} bgcolor='#fff'>
        <Tabs
          value={curTab}
          indicatorColor='primary'
          textColor='primary'
          onChange={(event, newValue) => {
            setCurTab(newValue);
          }}
        >
          <Tab label={localization.t(`labels.${tabsLabels[0]}`)} />
          <Tab label={localization.t(`labels.${tabsLabels[1]}`)} />
          <Tab label={localization.t(`labels.${tabsLabels[2]}`)} />
        </Tabs>
      </Box>
      {curTab === 0 && (
        <DiscountSection label='general'>
          <General
            amountType={amountType}
            setAmountType={setAmountType}
            curDiscountCodes={curDiscountCodes}
            setCurDiscountCodes={setCurDiscountCodes}
            curDiscountLabels={curDiscountLabels}
            setCurDiscountLabels={setCurDiscountLabels}
            curAmountCurrency={curAmountCurrency}
            setCurAmountCurrency={setCurAmountCurrency}
            curDiscount={curDiscount}
            setCurDiscount={setCurDiscount}
            selectOptions={selectOptions}
          />
        </DiscountSection>
      )}
      {curTab === 1 && (
        <DiscountSection label='cappingAndLimits'>
          <CappingAndLimits
            curDiscount={curDiscount}
            setCurDiscount={setCurDiscount}
          />
        </DiscountSection>
      )}
      {curTab === 2 && (
        <DiscountSection label='eligibility'>
          <Eligibility
            curMinCartAmount={curMinCartAmount}
            setCurMinCartAmount={setCurMinCartAmount}
            selectOptions={selectOptions}
            curDiscount={curDiscount}
            updateDiscount={updateDiscount}
            setCurDiscount={setCurDiscount}
          />
        </DiscountSection>
      )}
    </>
  );
};

export default DiscountDetailsScreen;

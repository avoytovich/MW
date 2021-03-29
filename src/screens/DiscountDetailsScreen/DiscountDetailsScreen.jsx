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
} from '@material-ui/core';
import { fromObjectToArray, fromArrayToObject } from './utils';
import {
  structureSelectOptions,
  discountRequiredFields,
} from '../../services/helpers/dataStructuring';
import General from './SubSections/General';
import Eligibility from './SubSections/Eligibility';
import CappingAndLimits from './SubSections/CappingAndLimits';
import api from '../../api';
import DiscountSection from './DiscountSection';
import { showNotification } from '../../redux/actions/HttpNotifications';
import localization from '../../localization';
import DialogWindows from './DialogWindows';

import './discountDetailsScreen.scss';

const DiscountDetailsScreen = () => {
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);
  const history = useHistory();

  const dispatch = useDispatch();
  const { id } = useParams();
  const [discount, setDiscount] = useState(null);
  const [curDiscount, setCurDiscount] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [curStores, setStores] = useState(null);
  const [curProducts, setProducts] = useState(null);
  const [availStores, setAvailStores] = useState(null);
  const [availProducts, setAvailProducts] = useState(null);
  const [availParentProducts, setAvailParentProducts] = useState(null);
  const [selectOptions, setSelectOptions] = useState({
    refProducts: null,
    endUserGroups: null,
    countries: null,
    endUsers: null,
  });

  const [discountCodes, setDiscountCodes] = useState(null);
  const [curDiscountCodes, setCurDiscountCodes] = useState(null);

  const [minCartAmount, setMinCartAmount] = useState(null);
  const [curMinCartAmount, setCurMinCartAmount] = useState(null);

  const [amountCurrency, setAmountCurrency] = useState(null);
  const [curAmountCurrency, setCurAmountCurrency] = useState(null);

  const [discountLabels, setDiscountLabels] = useState(null);
  const [curDiscountLabels, setCurDiscountLabels] = useState(null);

  const [productsModal, setProductsModalOpen] = useState(false);
  const [parentProductsModal, setParentProductsModalOpen] = useState(false);

  const [storesModal, setStoresModalOpen] = useState(false);
  const [curProductsByParent, setCurProductsByParent] = useState(null);

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

  const removeItem = (item, type) => {
    if (type === 'products') {
      const newArr = [...curDiscount.productIds];

      newArr.splice(newArr.indexOf(item.id), 1);
      setCurDiscount((c) => ({ ...c, productIds: newArr }));
      setProducts((p) => p.filter((pr) => pr.id !== item.id));
      if (item.name !== 'Was removed') {
        setAvailProducts((pr) => [...pr, item]);
      }
    } else if (type === 'stores') {
      const newArr = [...curDiscount.storeIds];
      newArr.splice(newArr.indexOf(item.id), 1);
      setCurDiscount((c) => ({ ...c, storeIds: newArr }));
      setStores((p) => p.filter((pr) => pr.id !== item.id));
      setAvailStores((pr) => [...pr, item]);
    } else if (type === 'parentProducts') {
      const newArr = [...curDiscount.parentProductIds];
      newArr.splice(newArr.indexOf(item.id), 1);
      setCurDiscount((c) => ({ ...c, parentProductIds: newArr }));
      setCurProductsByParent((p) => p.filter((pr) => pr.id !== item.id));
      setAvailParentProducts((pr) => [...pr, item]);
    }
  };

  const addItem = (item, type) => {
    if (type === 'products') {
      setCurDiscount((c) => {
        const newProductIds = c.productIds
          ? [...c.productIds, item.id]
          : [...item.id];
        return { ...c, productIds: newProductIds };
      });
      setProducts((p) => [...p, item]);
      setAvailProducts((pr) => [...pr.filter((p) => p.id !== item.id)]);
    } else if (type === 'stores') {
      setCurDiscount((c) => {
        const newStoreIds = c.storeIds
          ? [...c.storeIds, item.id]
          : [...item.id];
        return { ...c, storeIds: newStoreIds };
      });
      setStores((p) => [...p, item]);
      setAvailStores((pr) => [...pr.filter((p) => p.id !== item.id)]);
    } else if (type === 'parentProducts') {
      setCurDiscount((c) => {
        const newParentProductIds = c.parentProductIds
          ? [...c.parentProductIds, item.id]
          : [...item.id];
        return { ...c, parentProductIds: newParentProductIds };
      });
      setCurProductsByParent((p) => [...p, item]);
      setAvailParentProducts((pr) => [...pr.filter((p) => p.id !== item.id)]);
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
          const availStoresObj = [];
          const storesObj = [];
          const availParProductsObj = [];
          const parProductsObj = [];
          const availDiscountProductsObj = [];
          const productsDiscountObj = [];
          const refDiscountProductsObjs = [];

          stores.data?.items.forEach((store) => {
            if (data?.storeIds?.indexOf(store.id) >= 0) {
              storesObj.push({ id: store.id, name: store.name });
            } else {
              availStoresObj.push({ id: store.id, name: store.name });
            }
          });

          discountProducts.data?.items.forEach((product) => {
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
            if (data?.productIds?.indexOf(product.id) >= 0) {
              productsDiscountObj.push({
                id: product.id,
                name: product.genericName || 'Was removed',
              });
            } else if (product.genericName) {
              availDiscountProductsObj.push({
                id: product.id,
                name: product.genericName,
              });
            }
          });
          parentProducts.data?.items.forEach((product) => {
            if (data?.parentProductIds?.indexOf(product.id) >= 0) {
              parProductsObj.push({
                id: product.id,
                name: product.genericName,
              });
            } else {
              availParProductsObj.push({
                id: product.id,
                name: product.genericName,
              });
            }
          });
          setAvailStores(availStoresObj);
          setStores(storesObj);

          setAvailProducts(availDiscountProductsObj);
          setProducts(productsDiscountObj);
          setAvailParentProducts(availParProductsObj);
          setCurProductsByParent(parProductsObj);
          setSelectOptions({
            ...selectOptions,
            endUsers:
              structureSelectOptions(endUsers.data?.items, 'fullName') || [],
            refProducts: refDiscountProductsObjs || [],
            endUserGroups:
              structureSelectOptions(endUsersGroups.data?.items, 'name') || [],
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
      <Box textAlign="center">
        <Typography gutterBottom variant="h4">
          {localization.t('general.noCustomer')}
        </Typography>

        <Typography gutterBottom variant="h5">
          {localization.t('general.selectCustomer')}
        </Typography>
      </Box>
    );

  if (curDiscount === null) return <LinearProgress />;

  return (
    <>
      <Box display="flex" flexDirection="row" mx={2} pb={2}>
        <Typography component="div" color="primary">
          <Box fontWeight={500}>
            {localization.t('general.discount')}
            {id !== 'add' ? '/' : ''}
          </Box>
        </Typography>
        <Typography component="div" color="secondary">
          <Box fontWeight={500}>{discount.id}</Box>
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        m={2}
        justifyContent="space-between"
      >
        <Box alignSelf="center">
          <Typography data-test="discountName" gutterBottom variant="h3">
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
              id="save-discount-button"
              color="primary"
              size="large"
              type="submit"
              variant="contained"
              onClick={saveDiscount}
            >
              {localization.t('general.save')}
            </Button>
          </Box>
        </Zoom>
      </Box>
      <DiscountSection label="general">
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
      <DiscountSection label="cappingAndLimits">
        <CappingAndLimits
          curDiscount={curDiscount}
          setCurDiscount={setCurDiscount}
        />
      </DiscountSection>
      <DiscountSection label="eligibility">
        <Eligibility
          curMinCartAmount={curMinCartAmount}
          setCurMinCartAmount={setCurMinCartAmount}
          selectOptions={selectOptions}
          curProductsByParent={curProductsByParent}
          curDiscount={curDiscount}
          curStores={curStores}
          curProducts={curProducts}
          setStoresModalOpen={setStoresModalOpen}
          setProductsModalOpen={setProductsModalOpen}
          updateDiscount={updateDiscount}
          setCurDiscount={setCurDiscount}
          setParentProductsModalOpen={setParentProductsModalOpen}
        />
      </DiscountSection>

      <DialogWindows
        productsModal={productsModal}
        setProductsModalOpen={setProductsModalOpen}
        curProducts={curProducts}
        availProducts={availProducts}
        removeItem={removeItem}
        addItem={addItem}
        storesModal={storesModal}
        curStores={curStores}
        setStoresModalOpen={setStoresModalOpen}
        availStores={availStores}
        parentProductsModal={parentProductsModal}
        setParentProductsModalOpen={setParentProductsModalOpen}
        curProductsByParent={curProductsByParent}
        availParentProducts={availParentProducts}
      />
    </>
  );
};

export default DiscountDetailsScreen;

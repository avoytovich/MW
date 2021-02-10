// ToDo: consider making a common layout for such type of settings screens
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  LinearProgress, Zoom, Button, Tabs, Tab,
} from '@material-ui/core';

import api from '../../api';
import { showNotification } from '../../redux/actions/HttpNotifications';
import EligibilitySection from './EligibilitySection';
import localization from '../../localization';
import BasicSection from './BasicSection';
import DialogWindows from './DialogWindows';
import CappingAndLimitsSection from './CappingAndLimitsSection';
import { discountRequiredFields } from '../../services/helpers/dataStructuring';
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
  const [availParentProducts, setAvailParentProducts] = useState(null);
  const [selectOptions, setSelectOptions] = useState({
    refProducts: null,
    endUserGroups: null,
    countries: null,
  });

  const [productsModal, setProductsModalOpen] = useState(false);
  const [parentProductsModal, setParentProductsModalOpen] = useState(false);

  const [storesModal, setStoresModalOpen] = useState(false);
  const [curProductsByParent, setCurProductsByParent] = useState(null);

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
      if (item.name !== 'Was removed') {
        setAvailProducts((pr) => [...pr, item]);
      }
    } else if (type === 'stores') {
      const newArr = [...curDiscount.storeIds];

      newArr.splice(newArr.indexOf(item), 1);
      setStoresModalOpen(false);
      setCurDiscount((c) => ({ ...c, storeIds: newArr }));
      setStores((p) => p.filter((pr) => pr.id !== item.id));
      setAvailStores((pr) => [...pr, item]);
    } else if (type === 'parentProducts') {
      const newArr = [...curDiscount.parentProductIds];
      newArr.splice(newArr.indexOf(item), 1);
      setProductsModalOpen(false);
      setCurDiscount((c) => ({ ...c, parentProductIds: newArr }));
      setCurProductsByParent((p) => p.filter((pr) => pr.id !== item.id));
      setAvailParentProducts((pr) => [...pr, item]);
    }
  };

  const addItem = (item, type) => {
    if (type === 'products') {
      setProductsModalOpen(false);
      setCurDiscount((c) => {
        const newProductIds = c.productIds
          ? [...c.productIds, item.id]
          : [...item.id];
        return { ...c, productIds: newProductIds };
      });
      setProducts((p) => [...p, item]);
      setAvailProducts((pr) => [...pr.filter((p) => p.id !== item.id)]);
    } else if (type === 'stores') {
      setStoresModalOpen(false);
      setCurDiscount((c) => {
        const newStoreIds = c.storeIds
          ? [...c.storeIds, item.id]
          : [...item.id];
        return { ...c, storeIds: newStoreIds };
      });
      setStores((p) => [...p, item]);
      setAvailStores((pr) => [...pr.filter((p) => p.id !== item.id)]);
    } else if (type === 'parentProducts') {
      setProductsModalOpen(false);
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
    setHasChanges(JSON.stringify(curDiscount) !== JSON.stringify(discount));

    return () => setHasChanges(false);
  }, [curDiscount, discount]);

  useEffect(() => {
    api.getDiscountById(id).then(({ data }) => {
      const checkedData = discountRequiredFields(data);
      setDiscount(checkedData);
      setCurDiscount(checkedData);

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
        .getDiscountProductsByIds(data.customerId)
        .then(({ data: { items: products } }) => {
          const availProductsObj = [];
          const productsObj = [];
          const refProductsObjs = [];

          products.forEach((product) => {
            if (
              product.publisherRefId
              && !refProductsObjs.filter((e) => e.id === product.publisherRefId)
                .length > 0
            ) {
              refProductsObjs.push({
                id: product.publisherRefId,
                value: product.publisherRefId,
              });
            }
            if (data?.productIds?.indexOf(product.id) >= 0) {
              productsObj.push({
                id: product.id,
                name: product.genericName || 'Was removed',
              });
            } else if (product.genericName) {
              availProductsObj.push({
                id: product.id,
                name: product.genericName,
              });
            }
          });
          setSelectOptions({
            ...selectOptions,
            refProducts: refProductsObjs || [],
          });
          setAvailProducts(availProductsObj);
          setProducts(productsObj);
        });
      const parentIds = data.parentProductIds?.length
        ? data.parentProductIds.join('&')
        : null;
      api
        .getParentProductsByIds(data.customerId, parentIds)
        .then(({ data: { items: parentProducts } }) => {
          const availParProductsObj = [];
          const parProductsObj = [];
          parentProducts.forEach((product) => {
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
          setAvailParentProducts(availParProductsObj);
          setCurProductsByParent(parProductsObj);
        });
      api
        .getEndUsersGroupsByCustomerId(data.customerId)
        .then(({ data: { items: groups } }) => {
          setSelectOptions({ ...selectOptions, endUserGroups: groups });
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
    <div className="discount-details-screen">
      <Tabs value={0} indicatorColor="primary" textColor="primary">
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
      <BasicSection
        curDiscount={curDiscount}
        handleChange={handleChange}
        updateDiscount={updateDiscount}
        setCurDiscount={setCurDiscount}
      />
      <EligibilitySection
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
      <CappingAndLimitsSection
        curDiscount={curDiscount}
        setCurDiscount={setCurDiscount}
      />
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
    </div>
  );
};

export default DiscountDetailsScreen;

// ToDo: consider making a common layout for such type of settings screens + refactor
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  LinearProgress,
  Zoom,
  Button,
  Tabs,
  Tab,
  Dialog,
} from '@material-ui/core';

import api from '../../api';
import { showNotification } from '../../redux/actions/HttpNotifications';

import Basic from './SubSections/Basic';
import Eligibility from './SubSections/Eligibility';
import Recommendations from './SubSections/Recommendations';
import CappingAndLimits from './SubSections/CappingAndLimits';

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
      setCurReco((c) => ({
        ...c,
        eligibleProductIds: [...c.eligibleProductIds, item.id],
      }));
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
      setCurReco((c) => ({
        ...c,
        eligibleStoreIds: [...c.eligibleStoreIds, item.id],
      }));
      setStores((p) => [...p, item]);
      setAvailStores((pr) => [...pr.filter((p) => p.id !== item.id)]);
    }
  };

  useEffect(() => {
    setHasChanges(JSON.stringify(curReco) !== JSON.stringify(reco));

    return () => setHasChanges(false);
  }, [curReco, reco]);

  useEffect(() => {
    api.getRecoById(id).then(({ data }) => {
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
              availProductsObj.push({
                id: product.id,
                name: product.genericName,
              });
            }

            if (data?.eligibleParentProductIds?.indexOf(product.id) >= 0) {
              parentProductsObj.push({
                id: product.id,
                name: product.genericName,
              });
            } else {
              availParentProductsObj.push({
                id: product.id,
                name: product.genericName,
              });
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
    <div className="reco-details-screen">
      <Tabs value={0} indicatorColor="primary" textColor="primary">
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

      <Basic
        curReco={curReco}
        updateReco={updateReco}
        handleChange={handleChange}
        setCurReco={setCurReco}
      />

      <Eligibility
        curStores={curStores}
        setStoresModalOpen={setStoresModalOpen}
        curProducts={curProducts}
        setProductsModalOpen={setProductsModalOpen}
        curParentProducts={curParentProducts}
        setParentProductsModalOpen={setParentProductsModalOpen}
      />

      {
        Array.isArray(curProducts) && Array.isArray(availProducts) && (
          <Recommendations
            curReco={curReco}
            setCurReco={setCurReco}
            products={[...curProducts, ...availProducts]}
          />
        )
      }

      <CappingAndLimits curReco={curReco} setCurReco={setCurReco} />

      <Dialog
        open={productsModal}
        onClose={() => setProductsModalOpen(false)}
        aria-labelledby="table-items-dialog-title"
        fullWidth
        maxWidth="sm"
      >
        <TableItems
          values={curProducts}
          avail={availProducts}
          type="products"
          noDelete
          removeItem={(item) => removeItem(item, 'products')}
          addItem={(item) => addItem(item, 'products')}
        />
      </Dialog>

      <Dialog
        open={parentProductsModal}
        onClose={() => setParentProductsModalOpen(false)}
        aria-labelledby="table-items-dialog-title"
        fullWidth
        maxWidth="sm"
      >
        <TableItems
          values={curParentProducts}
          avail={availParentProducts}
          type="products"
          noDelete
          removeItem={(item) => removeItem(item, 'parentProducts')}
          addItem={(item) => addItem(item, 'parentProducts')}
        />
      </Dialog>

      <Dialog
        open={storesModal}
        onClose={() => setStoresModalOpen(false)}
        aria-labelledby="table-items-dialog-title"
        fullWidth
        maxWidth="sm"
      >
        <TableItems
          values={curStores}
          avail={availStores}
          type="stores"
          noDelete
          removeItem={(item) => removeItem(item, 'stores')}
          addItem={(item) => addItem(item, 'stores')}
        />
      </Dialog>
    </div>
  );
};

export default RecoDetailsScreen;

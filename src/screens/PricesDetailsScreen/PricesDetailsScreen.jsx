// ToDo: consider making a common layout for such type of settings screens + refactor
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import parentPaths from '../../services/paths';

import DetailPageWrapper from '../../components/utils/DetailPageWrapper';

import { getCustomerName } from '../../services/helpers/customersHelper';
import PricesDetailsView from './PricesDetailsView';
import api from '../../api';

import './pricesDetailsScreen.scss';
import localization from '../../localization';

const PricesDetailsScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  const [customerName, setCustomerName] = useState(null);
  const [price, setPrice] = useState(null);
  const [curPrice, setCurPrice] = useState(null);
  const [availProducts, setAvailProducts] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [validPeriod, setValidPeriod] = useState('between');
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    if (price?.customerId) {
      getCustomerName(price?.customerId).then((name) => setCustomerName(name));
    }
  }, [price?.customerId]);

  useEffect(() => {
    setHasChanges(JSON.stringify(curPrice) !== JSON.stringify(price));

    return () => setHasChanges(false);
  }, [curPrice, price]);

  useEffect(() => {
    if (validPeriod === 'after') {
      const newPrice = { ...curPrice };
      delete newPrice.endDate;
      setCurPrice(newPrice);
    }
  }, [validPeriod]);

  useEffect(() => {
    const { selectedCustomer } = nxState;

    const initData = {
      customerId: selectedCustomer?.id,
      currency: '',
      value: '',
      msrp: '',
      upSell: '',
      crossSell: '',
      vatIncluded: false,
      startDate: new Date(),
      productId: '',
    };

    if (id === 'add') {
      if (selectedCustomer?.id) {
        api
          .getProducts({ filters: `&customerId=${selectedCustomer?.id}&status=ENABLED` })
          .then(({ data: { items } }) => {
            const products = items.map((it) => ({ id: it.id, value: `${it.genericName} (${it.id})` }));
            setAvailProducts(products);
          });
      }

      setPrice({ ...initData });
      setCurPrice({ ...initData });
      setLoading(false);
    } else {
      api
        .getPriceById(id)
        .then(({ data }) => {
          setPrice({ ...initData, ...data });
          setCurPrice({ ...initData, ...data });
          setValidPeriod(data.endDate ? 'between' : 'after');
        }).finally(() => {
          setLoading(false);
        });
    }
  }, [update]);
  
  const beforeSend = () => {
    const res = { ...curPrice };
    if (res.country === 'default') {
      delete res.country;
    }
    return res;
  };

  return (
    <DetailPageWrapper
      nxState={nxState}
      saveIsDisabled={!curPrice?.currency || !curPrice?.value || !curPrice?.productId}
      id={id}
      name={curPrice?.id ? customerName : localization.t('labels.newPrice')}
      isLoading={isLoading}
      curParentPath={parentPaths.pricemodels.pricesTab}
      curData={curPrice}
      addFunc={api.addNewPrice}
      updateFunc={api.updatePriceById}
      beforeSend={beforeSend}
      hasChanges={hasChanges}
      setUpdate={setUpdate}
      noTabsMargin
    >
      <PricesDetailsView
        price={price}
        availProducts={availProducts}
        setCurPrice={setCurPrice}
        curPrice={curPrice}
      />
    </DetailPageWrapper>
  );
};

export default PricesDetailsScreen;

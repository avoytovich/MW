// ToDo: consider making a common layout for such type of settings screens + refactor
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  recoRequiredFields,
  formateProductOptions,
  fromArrayToObj,
} from './utils';
import parentPaths from '../../services/paths';
import { structureSelectOptions } from '../../services/helpers/dataStructuring';
import { getCustomerName } from '../../services/helpers/customersHelper';
import api from '../../api';
import DetailPageWrapper from '../../components/utils/DetailPageWrapper';

import RecoDetailsView from './RecoDetailsView';
import localization from '../../localization';

import './recoDetailsScreen.scss';

const RecoDetailsScreen = () => {
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [localizedErrors, setLocalizedErrors] = useState({});

  const [customerName, setCustomerName] = useState(null);
  const [reco, setReco] = useState(null);
  const [curReco, setCurReco] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [update, setUpdate] = useState(0);
  const [curTab, setCurTab] = useState(0);

  const [selectOptions, setSelectOptions] = useState({
    stores: null,
    products: null,
    productsByParent: null,
    recoByProduct: null,
    recoByParent: null,
  });

  const beforeSend = () => {
    const localizedDesc = {};
    Object.keys(curReco.localizedDesc).forEach((lang) => {
      localizedDesc[lang] = curReco.localizedDesc[lang].recommendationDescription;
    });
    const objToSend = { ...curReco, localizedDesc };

    if (curReco.function === 'idToIdsRecoRule') {
      delete objToSend.productIds;
      objToSend.byParentProductIds = fromArrayToObj(curReco.byParentProductIds);
      objToSend.byProductIds = fromArrayToObj(curReco.byProductIds);
    } else {
      objToSend.productIds = curReco.productIds.map((u) => u.id);
      delete objToSend.byParentProductIds;
      delete objToSend.byProductIds;
    }
    if (objToSend.eligibleProductIds.length) {
      objToSend.eligibleProductIds = [...objToSend.eligibleProductIds].map((item) => item.id);
    }
    if (objToSend.eligibleParentProductIds.length) {
      objToSend.eligibleParentProductIds = [...objToSend.eligibleParentProductIds]
        .map((item) => item.id);
    }
    return objToSend;
  };

  useEffect(() => {
    setHasChanges(JSON.stringify(curReco) !== JSON.stringify(reco));

    return () => setHasChanges(false);
  }, [curReco, reco]);

  useEffect(() => {
    let recoRequest;
    setLoading(true);
    if (id === 'add') {
      recoRequest = Promise.resolve({
        data: { customerId: nxState?.selectedCustomer?.id },
      });
    } else {
      recoRequest = api.getRecoById(id);
    }
    recoRequest.then(({ data }) => {
      const checkedReco = recoRequiredFields(data);
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
        ]) => {
          const products = formateProductOptions(productOptions.value?.data?.items) || [];
          const productsByParent = formateProductOptions(parentProductOptions.value?.data?.items)
            || [];
          const recoByProduct = formateProductOptions(recoByProductOptions.value?.data?.items)
            || [];
          const recoByParent = formateProductOptions(recoByParentOptions.value?.data?.items)
            || [];

          let eligibleProductIds = [...checkedReco.eligibleProductIds];
          let eligibleParentProductIds = [...checkedReco.eligibleParentProductIds];
          const productIds = [];

          const byProductIds = checkedReco.byProductIds.map((item) => {
            const value = recoByProduct.filter((obj) => item.value.includes(obj.id));
            return ({ ...item, value });
          });
          const byParentProductIds = checkedReco.byParentProductIds.map((item) => {
            const value = recoByParent.filter((obj) => item.value.includes(obj.id));
            return ({ ...item, value });
          });
          if (checkedReco.productIds.length) {
            checkedReco.productIds.forEach((u) => {
              const res = products.find((el) => el.id === u);
              if (res) {
                productIds.push(res);
              } else {
                productIds.push({ id: u, value: u });
              }
            });
          }
          if (eligibleProductIds.length) {
            eligibleProductIds = products.filter((obj) => (
              checkedReco.eligibleProductIds.includes(obj.id)
            ));
          }
          if (eligibleParentProductIds.length) {
            eligibleParentProductIds = productsByParent.filter((obj) => (
              checkedReco.eligibleParentProductIds.includes(obj.id)
            ));
          }
          setReco(JSON.parse(JSON.stringify({
            ...checkedReco,
            eligibleProductIds,
            eligibleParentProductIds,
            productIds,
            byProductIds,
            byParentProductIds,
          })));
          setCurReco(JSON.parse(JSON.stringify({
            ...checkedReco,
            eligibleProductIds,
            eligibleParentProductIds,
            productIds,
            byProductIds,
            byParentProductIds,
          })));
          setLoading(false);

          setSelectOptions({
            ...selectOptions,
            stores:
              structureSelectOptions(
                {
                  options: storeOptions.value?.data.items,
                  optionValue: 'displayName',
                },
              ) || [],
            products,
            productsByParent,
            recoByProduct,

            recoByParent,

          });
        },
      );
    }).catch(() => setLoading(false));
  }, [update]);

  useEffect(() => {
    if (reco?.customerId) {
      getCustomerName(reco?.customerId).then((name) => setCustomerName(name));
    }
  }, [reco?.customerId]);

  return (
    <DetailPageWrapper
      nxState={nxState}
      id={id}
      name={curReco?.name || `${localization.t('general.new')} ${localization.t(
        'general.recommendation',
      )}`}
      saveIsDisabled={curReco?.name === '' || curReco?.errors?.endDate || Object.keys(localizedErrors).length}
      hasChanges={hasChanges}
      isLoading={isLoading}
      curParentPath={parentPaths.recommendations}
      curData={curReco}
      addFunc={api.addNewRecommendation}
      updateFunc={api.updateRecoById}
      beforeSend={beforeSend}
      setUpdate={setUpdate}
      tabs={{
        curTab,
        setCurTab,
        tabLabels: ['general', 'eligibility', 'cappingAndLimits', 'recommendations'],
      }}
    >
      <RecoDetailsView
        localizedErrors={localizedErrors}
        setLocalizedErrors={setLocalizedErrors}
        curReco={curReco}
        curTab={curTab}
        setCurReco={setCurReco}
        selectOptions={selectOptions}
      />
    </DetailPageWrapper>
  );
};

export default RecoDetailsScreen;

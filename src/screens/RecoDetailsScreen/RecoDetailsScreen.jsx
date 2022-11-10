// ToDo: consider making a common layout for such type of settings screens + refactor
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  tabLabels,
  recoRequiredFields,
  fromArrayToObj,
  formateProductOptionsForGenericNameOnly,
} from './utils';
import parentPaths from '../../services/paths';
import { structureSelectOptions } from '../../services/helpers/dataStructuring';
import { getCustomerName } from '../../services/helpers/customersHelper';
import api from '../../api';
import DetailPageWrapper from '../../components/utils/DetailPageWrapper';
import useValidation from '../../services/useValidation/useValidation';
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
    prodRecommendation: null,
  });

  const {
    errors,
    handleSetErrors,
  } = useValidation(curTab, tabLabels, curReco, 'recommendation');

  useEffect(() => {
    const keys = Object.keys(localizedErrors);
    if (keys.length && !errors?.localizedContent?.length) {
      handleSetErrors(true, 'general', 'localizedContent');
    } else if (!keys.length) {
      handleSetErrors(false, 'general', 'localizedContent');
    }
  }, [localizedErrors]);
  const beforeSend = () => {
    const localizedDesc = {};
    let objToSend = {};
    Object.keys(curReco.localizedDesc).forEach((lang) => {
      localizedDesc[lang] = curReco.localizedDesc[lang].recommendationDescription;
    });
    if (curReco.localizedDesc
      && Object.keys(curReco.localizedDesc).length === 0
      && Object.getPrototypeOf(curReco.localizedDesc) === Object.prototype) {
      objToSend = { ...curReco };
      delete objToSend.localizedDesc;
    } else {
      objToSend = { ...curReco, localizedDesc };
    }

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
        api.getStores({ size: 10, filters: `&customerId=${data.customerId}` }),
        api.getProducts({ size: 10, filters: `&customerId=${data.customerId}` }),
        api.getProducts({ size: 10, filters: `&customerId=${data.customerId}&parentId=${null}` }),
        api.getProducts({ size: 10, filters: `&customerId=${data.customerId}`, notAddParentId: true }),
      ]).then(
        ([
          storeOptions,
          productOptions,
          parentProductOptions,
          recoOptions,
        ]) => {
          const products = formateProductOptionsForGenericNameOnly(
            productOptions.value?.data?.items,
          ) || [];
          const productsByParent = formateProductOptionsForGenericNameOnly(
            parentProductOptions.value?.data?.items,
          )
            || [];
          const prodRecommendation = formateProductOptionsForGenericNameOnly(
            recoOptions.value?.data?.items,
          )
            || [];
          let eligibleProductIds = [...checkedReco.eligibleProductIds];
          let eligibleParentProductIds = [...checkedReco.eligibleParentProductIds];
          const productIds = [];
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
          })));
          setCurReco(JSON.parse(JSON.stringify({
            ...checkedReco,
            eligibleProductIds,
            eligibleParentProductIds,
            productIds,
          })));
          setLoading(false);

          setSelectOptions({
            ...selectOptions,
            stores:
              structureSelectOptions(
                {
                  options: storeOptions.value?.data.items,
                  optionValue: 'name',
                },
              ) || [],
            products,
            productsByParent,
            prodRecommendation,
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
      name={reco?.name || `${localization.t('general.new')} ${localization.t(
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
        scope: 'recommendation',
        curTab,
        setCurTab,
        tabLabels,
      }}
      errors={errors}
    >
      <RecoDetailsView
        localizedErrors={localizedErrors}
        setLocalizedErrors={setLocalizedErrors}
        curReco={curReco}
        curTab={curTab}
        setCurReco={setCurReco}
        selectOptions={selectOptions}
        errors={errors}
        setErrors={handleSetErrors}
      />
    </DetailPageWrapper>
  );
};

export default RecoDetailsScreen;

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
    const objToSend = { ...curReco };
    if (curReco.function === 'idToIdsRecoRule') {
      delete objToSend.productIds;
      objToSend.byParentProductIds = fromArrayToObj(curReco.byParentProductIds);
      objToSend.byProductIds = fromArrayToObj(curReco.byProductIds);
    } else {
      delete objToSend.byParentProductIds;
      delete objToSend.byProductIds;
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
      setReco(JSON.parse(JSON.stringify(checkedReco)));
      setCurReco(JSON.parse(JSON.stringify(checkedReco)));
      setLoading(false);
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
              {
                options: storeOptions.value?.data.items,
                optionValue: 'displayName',
              },
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
      saveIsDisabled={curReco?.eligibleStoreIds?.length < 1 || curReco?.name === '' || curReco?.errors?.endDate}
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
        curReco={curReco}
        curTab={curTab}
        setCurReco={setCurReco}
        selectOptions={selectOptions}
      />
    </DetailPageWrapper>
  );
};

export default RecoDetailsScreen;

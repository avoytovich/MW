import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ManualFulfillmentDetailView from './ManualFulfillmentDetailView';
import DetailPageWrapper from '../../components/utils/DetailPageWrapper';
import { structureProdAutocompleteSelectOptions, defaultManualFulfillment } from '../../services/helpers/dataStructuring';
import parentPaths from '../../services/paths';

import localization from '../../localization';
import api from '../../api';

const ManualFulfillmentDetailsScreen = () => {
  const { id } = useParams();

  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);

  const [isLoading, setLoading] = useState(true);
  const [curFulfillment, setCurFulfillment] = useState(null);
  const [fulfillment, setFulfillment] = useState(null);
  const [update, setUpdate] = useState(0);
  const [curTab, setCurTab] = useState(0);
  const [selectOptions, setSelectOptions] = useState({ products: null, productByReference: null });
  const [hasChanges, setHasChanges] = useState(false);

  const beforeSend = () => {
    const objToSend = { ...curFulfillment };
    if (objToSend.publisherProductId.length) {
      objToSend.publisherProductId = [...objToSend.publisherProductId].map((item) => item.id);
    }
    if (objToSend.nexwayProductId.length) {
      objToSend.nexwayProductId = [...objToSend.nexwayProductId].map((item) => item.id);
    }
    return objToSend;
  };

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);

    const fulfillmentData = id !== 'add'
      ? api.getManualFulfillmentById(id)
      : Promise.resolve({
        data: {
          publisherId: nxState.selectedCustomer.id,
          ...defaultManualFulfillment,
        },
      });

    fulfillmentData
      .then(({ data }) => {
        if (!isCancelled) {
          api.getProducts({ filters: `&customerId=${data.publisherId}&status=ENABLED` }).then((res) => {
            const products = structureProdAutocompleteSelectOptions({ options: res?.data?.items, optionValue: 'genericName' }) || [];
            const productByReference = structureProdAutocompleteSelectOptions({ options: res?.data.items, optionValue: 'publisherRefId', optionId: 'publisherRefId' }) || [];
            const nexwayProductId = products.filter((obj) => data.nexwayProductId?.includes(obj.id));
            if (nexwayProductId.length < data.nexwayProductId.length) {
              data.nexwayProductId.forEach((u) => {
                if (!nexwayProductId.find((prodId) => prodId.id === u)) {
                  nexwayProductId.push({ id: u, value: u });
                }
              });
            }
            const publisherProductId = productByReference
              .filter((obj) => data.publisherProductId?.includes(obj.id));
            setFulfillment({ ...data, publisherProductId, nexwayProductId });
            setCurFulfillment(JSON.parse(JSON.stringify(
              { ...data, publisherProductId, nexwayProductId },
            )));
            setSelectOptions({
              ...selectOptions,
              products,
              productByReference,
            });
            setLoading(false);
          });
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setLoading(false);
        }
      });

    return () => { isCancelled = true; };
  }, [update]);

  useEffect(() => {
    setHasChanges(JSON.stringify(curFulfillment) !== JSON.stringify(fulfillment));

    return () => setHasChanges(false);
  }, [curFulfillment]);

  return (
    <DetailPageWrapper
      nxState={nxState}
      id={id}
      name={fulfillment?.name || `${localization.t('general.new')} ${localization.t(
        'general.manualFulfillment',
      )}`}
      saveIsDisabled={!curFulfillment?.name || !curFulfillment.nexwayProductId.length}
      hasChanges={hasChanges}
      isLoading={isLoading}
      curParentPath={parentPaths.fulfillment.manualFulfillmentsTab}
      curData={curFulfillment}
      addFunc={api.addManualFulfillment}
      updateFunc={api.updateManualFulfillmentById}
      beforeSend={beforeSend}
      setUpdate={setUpdate}
      tabs={{
        curTab,
        setCurTab,
        tabLabels: ['general', 'batches'],
      }}
    >
      <ManualFulfillmentDetailView
        curFulfillment={curFulfillment}
        setCurFulfillment={setCurFulfillment}
        curTab={curTab}
        selectOptions={selectOptions}
        setUpdate={setUpdate}
      />
    </DetailPageWrapper>
  );
};

export default ManualFulfillmentDetailsScreen;

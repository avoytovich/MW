import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import parentPaths from '../../services/paths';
import DetailPageWrapper from '../../components/utils/DetailPageWrapper';
import api from '../../api';
import generateData from './utils';
import AutoFulfillmentDetailsView from './AutoFulfillmentDetailsView';
import SectionLayout from '../../components/SectionLayout';

const AutoFulfillmentDetails = () => {
  const [detailsData, setDetailsData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);

  useEffect(() => {
    setLoading(true);
    api.getFulfillmentsPartnerById(id)
      .then((data) => {
        let generatedData = generateData(data.data);
        if (data.data.customerId) {
          api.getCustomerById(data.data.customerId)
            .then((res) => {
              const customerObj = {
                value: res.data.name || '',
                path: `${parentPaths.customers}/${res.data.id}`,
                copyValue: res.data.id || '',
              };
              generatedData = {
                ...generatedData, customer: { ...customerObj },
              };
              setDetailsData(generatedData);
              setLoading(false);
            });
        } else {
          setDetailsData(generatedData);
          setLoading(false);
        }
      })
      .catch((err) => setError(err));
  }, [id]);

  return (
    <DetailPageWrapper
      nxState={nxState}
      id={id}
      name={detailsData?.name?.value}
      isLoading={isLoading}
      curParentPath={parentPaths.fulfillment.main}
      curData={detailsData}
      noTabsMargin
    >
      <SectionLayout label='general'>
        <AutoFulfillmentDetailsView
          detailsData={detailsData}
        />
      </SectionLayout>
    </DetailPageWrapper>
  );
};

export default AutoFulfillmentDetails;

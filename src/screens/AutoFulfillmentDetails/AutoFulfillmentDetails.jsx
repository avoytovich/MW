/* eslint-disable consistent-return */
import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import parentPaths from '../../services/paths';
import DetailPageWrapper from '../../components/utils/DetailPageWrapper';
import api from '../../api';
import AutoFulfillmentDetailsView from './AutoFulfillmentDetailsView';

const AutoFulfillmentDetails = () => {
  const [detailsData, setDetailsData] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);

  useEffect(() => {
    setLoading(true);
    api.getFulfillmentsPartnerById(id)
      .then((data) => {
        setDetailsData(data.data);
        api.getCustomerById(data.data.customerId)
          .then((res) => setCustomer(res.data));
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <DetailPageWrapper
      nxState={nxState}
      id={id}
      name={detailsData?.name}
      isLoading={isLoading}
      curParentPath={parentPaths.fulfillment.main}
      curData={detailsData}
    >
      <AutoFulfillmentDetailsView
        detailsData={detailsData}
        customer={customer}
      />
    </DetailPageWrapper>
  );
};

export default AutoFulfillmentDetails;

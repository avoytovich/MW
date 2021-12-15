// ToDo: consider making a common layout for such type of settings screens + refactor
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import moment from 'moment';
import DetailPageWrapper from '../../components/utils/DetailPageWrapper';

import {
  generateData,
} from '../../services/useData/tableMarkups/campaignPrices';
import parentPaths from '../../services/paths';
import CampaignDetailsView from './CampaignDetailsView';
import api from '../../api';
import { getCustomerName } from '../../services/helpers/customersHelper';

const CampaignDetailsScreen = () => {
  const { id } = useParams();
  const [customerName, setCustomerName] = useState(null);
  const [campaign, setCampaign] = useState(null);
  const [update, setUpdate] = useState(0);

  const [curCampaign, setCurCampaign] = useState(null);
  const [pricesData, setPricesData] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);
  const [isLoading, setLoading] = useState(false);
  const handleChange = (e) => {
    e.persist();
    const { name, value } = e.target;
    setCurCampaign({ ...curCampaign, [name]: value });
  };

  useEffect(() => {
    setHasChanges(JSON.stringify(curCampaign) !== JSON.stringify(campaign));

    return () => setHasChanges(false);
  }, [curCampaign, campaign]);

  useEffect(() => {
    setLoading(true);

    api.getCampaignById(id).then(({ data }) => {
      setCampaign(data);
      setCurCampaign(data);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });

    api.getPricesByCampaignId(id).then(({ data }) => {
      const pricesTableData = generateData(data);
      setPricesData(pricesTableData || []);
    });
  }, [update]);

  useEffect(() => {
    if (campaign?.customerId) {
      getCustomerName(campaign?.customerId).then((name) => setCustomerName(name));
    }
  }, [campaign?.customerId]);

  const updateReco = (type, value) => setCurCampaign((c) => ({ ...c, [type]: value }));

  const handleSelectDate = (ranges) => {
    const { startDate, endDate } = ranges;
    setCurCampaign((c) => ({
      ...c,
      startDate: moment(startDate).valueOf(),
      endDate: moment(endDate).valueOf(),
    }));
  };

  return (
    <DetailPageWrapper
      nxState={nxState}
      id={id}
      name={curCampaign?.name}
      hasChanges={hasChanges}
      isLoading={isLoading}
      curParentPath={parentPaths.campaigns.campaigns}
      curData={curCampaign}
      updateFunc={api.updateCampaignById}
      setUpdate={setUpdate}
    >
      <CampaignDetailsView
        curCampaign={curCampaign}
        updateReco={updateReco}
        pricesData={pricesData}
        id={id}
        handleSelectDate={handleSelectDate}
        handleChange={handleChange}
        customerName={customerName}
      />
    </DetailPageWrapper>
  );
};

export default CampaignDetailsScreen;

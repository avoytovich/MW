/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DetailPageWrapper from '../../components/utils/DetailPageWrapper';
import EmailBuilderDetailsView from './EmailBuilderDetailsView';

import api from '../../api';
import parentPaths from '../../services/paths';
import { getCustomerName } from '../../services/helpers/customersHelper';

import './emailBuilderDetailsScreen.scss';

const EmailBuilderDetailsScreen = () => {
  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [customerName, setCustomerName] = useState(null);
  const [templateData, setTemplateData] = useState(null);
  const [curTemplateData, setCurTemplateData] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [samplesData, setSamplesData] = useState(null);
  const [firstSampleData, setFirstSampleData] = useState(null);
  const [upd, setUpdate] = useState(0);
  const [selectedLang, setSelectedLang] = useState(null);

  useEffect(() => {
    setLoading(true);

    api
      .getEmailTemplate(id)
      .then(({ data }) => {
        setTemplateData({ ...data });
        setCurTemplateData({ ...data });
        if (!selectedLang) {
          setSelectedLang(
            Object.values(data.templates).length ? Object.keys(data.templates)[0] : null,
          );
        }
      });
  }, [upd]);

  useEffect(() => {
    if (curTemplateData) {
      setHasChanges(JSON.stringify(curTemplateData) !== JSON.stringify(templateData));
    }
  }, [curTemplateData]);

  useEffect(() => {
    if (templateData?.customerId) {
      getCustomerName(templateData?.customerId).then((name) => {
        setCustomerName(name);
      });

      if (templateData?.name) {
        api
          .getTemplateSamples({
            customerId: templateData?.customerId,
            name: templateData?.name,
          })
          .then(({ data: { items: [tmplSamples] } }) => {
            setSamplesData(tmplSamples);
            setFirstSampleData(
              tmplSamples?.samples.length ? { ...JSON.parse(tmplSamples.samples[0]) } : {},
            );
          })
          .finally(() => setLoading(false));
      }
    }
  }, [templateData]);

  return (
    <DetailPageWrapper
      nxStateNotNeeded
      id={id}
      name={templateData?.name}
      isLoading={isLoading}
      curParentPath={parentPaths.emailbuilder}
      curData={curTemplateData}
      hasChanges={hasChanges}
      addFunc={null}
      updateFunc={api.updateEmailTemplate}
      beforeSend={null}
      setUpdate={setUpdate}
    >
      <EmailBuilderDetailsView
        updateData={setCurTemplateData}
        customerName={customerName}
        templateData={curTemplateData}
        samplesData={samplesData}
        firstSampleData={firstSampleData}
        selectedLang={selectedLang}
        setSelectedLang={setSelectedLang}
      />
    </DetailPageWrapper>
  );
};

export default EmailBuilderDetailsScreen;

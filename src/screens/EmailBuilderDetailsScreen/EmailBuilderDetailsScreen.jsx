/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button } from '@mui/material';

import EmailBuilderDetailsView from './EmailBuilderDetailsView';
import CloneTemplatePopup from './CloneTemplatePopup';
import DetailPageWrapper from '../../components/utils/DetailPageWrapper';

import parentPaths from '../../services/paths';
import { getCustomerName } from '../../services/helpers/customersHelper';

import { setNexwayState } from '../../redux/actions/Account';

import api from '../../api';
import localization from '../../localization';

import './emailBuilderDetailsScreen.scss';

const EmailBuilderDetailsScreen = () => {
  const dispatch = useDispatch();
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
  const [cloneModal, setCloneModal] = useState(false);
  const [customSample, setCustomSampleData] = useState(null);
  const [jsonIsValid, setJsonIsValid] = useState(true);
  const [curTab, setCurTab] = useState(0);

  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);

  useEffect(() => {
    setLoading(true);

    api
      .getEmailTemplate(id)
      .then(({ data }) => {
        setTemplateData({ ...data });
        setCurTemplateData({ ...data });
        if (!selectedLang) {
          setSelectedLang(
            data?.templates && Object.values(data?.templates).length
              ? Object.keys(data?.templates)[0] : null,
          );
        }
      });
  }, [upd, id]);

  useEffect(() => {
    if (curTemplateData) {
      setHasChanges(JSON.stringify(curTemplateData) !== JSON.stringify(templateData));
    }
  }, [curTemplateData]);

  useEffect(() => {
    const savedCustomSample = nxState?.customSample || {};

    const stringifyCustomSample = typeof savedCustomSample === 'object' ? JSON.stringify(savedCustomSample, 0, 4) : savedCustomSample;
    setCustomSampleData(stringifyCustomSample);
  }, [nxState]);

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

  const saveCustomSample = () => {
    dispatch(
      setNexwayState({ ...nxState, customSample: customSample || '{}' }),
    );
  };

  const ExtraActions = () => (
    <>
      {(nxState?.customSample !== customSample) && (
        <Box ml={2}>
          <Button
            disabled={!jsonIsValid}
            id='save-template-button'
            color='primary'
            size='large'
            variant='contained'
            onClick={saveCustomSample}
          >
            {localization.t('labels.saveSample')}
          </Button>
        </Box>
      )}

      <Box ml={2}>
        <Button
          id='clone-template-button'
          color='primary'
          size='large'
          variant='contained'
          onClick={() => setCloneModal(true)}
        >
          {localization.t('labels.cloneTemplate')}
        </Button>
      </Box>
    </>
  );

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
      extraActions={<ExtraActions />}
      saveIsDisabled={
        curTemplateData
        && curTemplateData?.templates
        && (Object.values(curTemplateData?.templates).filter((f) => !f.subject).length > 0)
      }
      tabs={{
        setCurTab,
        curTab,
        tabLabels: ['general', 'editor', 'sampleData'],
      }}
    >
      <EmailBuilderDetailsView
        updateData={setCurTemplateData}
        customerName={customerName}
        templateData={curTemplateData}
        samplesData={samplesData}
        customSample={customSample}
        firstSampleData={firstSampleData}
        selectedLang={selectedLang}
        setSelectedLang={setSelectedLang}
        setHasChanges={setHasChanges}
        saveCustomSample={setCustomSampleData}
        jsonIsValid={jsonIsValid}
        setJsonIsValid={setJsonIsValid}
        curTab={curTab}
      />

      <CloneTemplatePopup
        open={cloneModal}
        data={{
          id,
          storeId: curTemplateData?.storeId,
          name: curTemplateData?.name,
          customerId: curTemplateData?.customerId,
          customer: customerName,
          nexwayDefinition: curTemplateData?.nexwayTemplateDefinition?.id,
        }}
        handleClose={() => setCloneModal(false)}
      />
    </DetailPageWrapper>
  );
};

export default EmailBuilderDetailsScreen;

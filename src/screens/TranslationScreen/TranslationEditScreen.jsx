import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { LinearProgress } from '@material-ui/core';

import JsonEditorLayout from '../../layouts/JsonEditorLayout';

import localization from '../../localization';
import api from '../../api';

const TranslationEditScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  const [hasChanges, setChanges] = useState(false);

  const [translationData, setTranslationData] = useState(null);

  const [currentTranslation, setCurrentTranslation] = useState(null);
  const [currentCustomer, setCurrentCustomer] = useState(null);

  const saveTranslation = () => {
    api.updateTranslationById(id, currentTranslation).then(() => {
      toast(localization.t('general.updatesHaveBeenSaved'));
      setTranslationData(currentTranslation);
      window.location.reload();
    });
  };

  useEffect(() => {
    let isCancelled = false;

    (async () => {
      try {
        const translation = await api.getTranslationById(id);
        const customer = await api.getCustomerById(translation.data.customerId);

        if (!isCancelled) {
          setTranslationData(translation.data);
          setCurrentCustomer(customer.data.name);
          setCurrentTranslation(translation.data);
          setLoading(false);
        }
      } catch (error) {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    setChanges(JSON.stringify(currentTranslation) !== JSON.stringify(translationData));

    return () => setChanges(false);
  }, [currentTranslation, translationData]);

  if (isLoading) return <LinearProgress />;

  return (
    <JsonEditorLayout
      customer={currentCustomer}
      hasChanges={hasChanges}
      doSave={saveTranslation}
      currentData={currentTranslation}
      setCurrentData={setCurrentTranslation}
      staticData={translationData}
      title='Translations JSON'
    />
  );
};

export default TranslationEditScreen;

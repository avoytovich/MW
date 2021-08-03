import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import JsonEditorLayout from '../../layouts/JsonEditorLayout';

import localization from '../../localization';
import api from '../../api';

const TranslationAddScreen = () => {
  const { customerId } = useSelector(({ account: { user } }) => user);
  const initData = { name: '', data: {}, customerId };

  const [hasChanges, setChanges] = useState(false);
  const [currentTranslation, setCurrentTranslation] = useState({ ...initData });

  const saveTranslation = () => {
    api.addNewTranslation(currentTranslation).then(() => {
      toast(localization.t('general.updatesHaveBeenSaved'));
      setCurrentTranslation({ ...initData });
    });
  };

  useEffect(() => {
    setChanges(JSON.stringify(currentTranslation) !== JSON.stringify(initData));

    return () => setChanges(false);
  }, [currentTranslation]);

  return (
    <JsonEditorLayout
      customer={customerId}
      hasChanges={hasChanges}
      doSave={saveTranslation}
      currentData={currentTranslation}
      setCurrentData={setCurrentTranslation}
      staticData={initData}
      title='Translations JSON'
      isNew
    />
  );
};

export default TranslationAddScreen;

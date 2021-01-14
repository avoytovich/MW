import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import TranslationLayout from './TranslationLayout';

import { showNotification } from '../../redux/actions/HttpNotifications';
import localization from '../../localization';
import api from '../../api';

const TranslationEditScreen = () => {
  const dispatch = useDispatch();

  const { customerId } = useSelector(({ account: { user } }) => user);
  const initData = { name: '', data: {}, customerId };

  const [hasChanges, setChanges] = useState(false);
  const [currentTranslation, setCurrentTranslation] = useState({ ...initData });

  const saveTranslation = () => {
    api.addNewTranslation(currentTranslation).then(() => {
      dispatch(
        showNotification(localization.t('general.updatesHaveBeenSaved')),
      );
      setCurrentTranslation({ ...initData });
    });
  };

  useEffect(() => {
    setChanges(JSON.stringify(currentTranslation) !== JSON.stringify(initData));

    return () => setChanges(false);
  }, [currentTranslation]);

  return (
    <TranslationLayout
      customer={customerId}
      hasChanges={hasChanges}
      doSave={saveTranslation}
      currentData={currentTranslation}
      setCurrentData={setCurrentTranslation}
      staticData={initData}
      isNew
    />
  );
};

export default TranslationEditScreen;

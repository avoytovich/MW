import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { LinearProgress } from '@material-ui/core';

import JsonEditorLayout from '../../layouts/JsonEditorLayout';

import { showNotification } from '../../redux/actions/HttpNotifications';
import localization from '../../localization';
import api from '../../api';

const LayoutEditScreen = () => {
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  const [hasChanges, setChanges] = useState(false);

  const [layoutData, setLayoutData] = useState(null);

  const [currentLayout, setCurrentLayout] = useState(null);
  const [currentCustomer, setCurrentCustomer] = useState(null);

  const saveLayout = () => {
    api.updateLayoutById(id, currentLayout).then(() => {
      dispatch(
        showNotification(localization.t('general.updatesHaveBeenSaved')),
      );
      setLayoutData(currentLayout);
      window.location.reload();
    });
  };

  useEffect(() => {
    let isCancelled = false;

    (async () => {
      try {
        const layout = await api.getLayoutById(id);
        const customer = await api.getCustomerById(layout.data.customerId);

        if (!isCancelled) {
          setLayoutData(layout.data);
          setCurrentCustomer(customer.data.name);
          setCurrentLayout(layout.data);
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
    setChanges(JSON.stringify(currentLayout) !== JSON.stringify(layoutData));

    return () => setChanges(false);
  }, [currentLayout, layoutData]);

  if (isLoading) return <LinearProgress />;

  return (
    <JsonEditorLayout
      customer={currentCustomer}
      hasChanges={hasChanges}
      doSave={saveLayout}
      currentData={currentLayout}
      setCurrentData={setCurrentLayout}
      staticData={layoutData}
      title='Layout Data'
    />
  );
};

export default LayoutEditScreen;

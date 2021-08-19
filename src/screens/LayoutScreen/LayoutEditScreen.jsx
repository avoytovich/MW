import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { LinearProgress } from '@material-ui/core';
import { toast } from 'react-toastify';

import JsonEditorLayout from '../../layouts/JsonEditorLayout';

import localization from '../../localization';
import api from '../../api';

const LayoutEditScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  const [hasChanges, setChanges] = useState(false);

  const [layoutData, setLayoutData] = useState(null);

  const [currentLayout, setCurrentLayout] = useState(null);
  const [currentCustomer, setCurrentCustomer] = useState(null);

  const saveLayout = () => {
    api.updateLayoutById(id, currentLayout).then(() => {
      toast(localization.t('general.updatesHaveBeenSaved'));
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

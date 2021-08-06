import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import { toast } from 'react-toastify';
import ThemeLayout from './ThemeLayout';

import localization from '../../localization';
import api from '../../api';

const ThemeEditScreen = () => {
  const [isLoading, setLoading] = useState(true);

  const { id } = useParams();
  const [themeData, setThemeData] = useState(null);
  const [hasChanges, setChanges] = useState(false);

  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [currentTheme, setCurrentTheme] = useState(null);

  const saveTheme = () => {
    api.updateThemeById(id, currentTheme).then(() => {
      toast(localization.t('general.updatesHaveBeenSaved'));
      window.location.reload();
    });
  };

  useEffect(() => {
    let isCancelled = false;

    (async () => {
      try {
        const theme = await api.getThemeById(id);
        const customer = await api.getCustomerById(theme.data.customerId);
        if (!isCancelled) {
          setThemeData(theme.data);
          setCurrentCustomer(customer.data.name);
          setCurrentTheme(theme.data);
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
    setChanges(JSON.stringify(currentTheme) !== JSON.stringify(themeData));

    return () => setChanges(false);
  }, [currentTheme, themeData]);

  if (isLoading) return <LinearProgress />;

  return (
    <ThemeLayout
      customer={currentCustomer}
      hasChanges={hasChanges}
      saveTheme={saveTheme}
      currentTheme={currentTheme}
      setCurrentTheme={setCurrentTheme}
    />
  );
};

export default ThemeEditScreen;

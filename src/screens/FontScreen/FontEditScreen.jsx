import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import FontLayout from './FontLayout';
import localization from '../../localization';
import { showNotification } from '../../redux/actions/HttpNotifications';
import api from '../../api';

const FontEditScreen = () => {
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  const [hasChanges, setChanges] = useState(false);

  const [fontData, setFontData] = useState(null);

  const [currentFont, setCurrentFont] = useState(null);
  const [currentCustomer, setCurrentCustomer] = useState(null);

  const saveFont = () => {
    api.updateFontById(currentFont.id, currentFont).then(() => {
      dispatch(
        showNotification(localization.t('general.updatesHaveBeenSaved')),
      );
      window.location.reload();
    });
  };

  useEffect(() => {
    let isCancelled = false;

    const requests = async () => {
      try {
        const font = await api.getFontById(id);
        const customer = await api.getCustomerById(font.data.customerId);
        if (!isCancelled) {
          setFontData(font.data);
          setCurrentCustomer(customer.data.name);
          setCurrentFont(font.data);
          setLoading(false);
        }
      } catch (error) {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };
    requests();
    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    setChanges(JSON.stringify(currentFont) !== JSON.stringify(fontData));
    return () => {
      setChanges(false);
    };
  }, [currentFont, fontData]);

  if (isLoading) return <LinearProgress />;

  return (
    <FontLayout
      customer={currentCustomer}
      hasChanges={hasChanges}
      saveFont={saveFont}
      currentFont={currentFont}
      setCurrentFont={setCurrentFont}
    />
  );
};

export default FontEditScreen;

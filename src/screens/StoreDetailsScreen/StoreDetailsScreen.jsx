import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FolderOpen } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import {
  LinearProgress,
  Zoom,
  Button,
  Box,
  Typography,
} from '@material-ui/core';
import localization from '../../localization';
import { showNotification } from '../../redux/actions/HttpNotifications';
import StoreDetails from '../../components/StoreDetails';
import api from '../../api';

const StoreDetailsScreen = () => {
  const dispatch = useDispatch();
  const [makeUpdate, setMakeUpdate] = useState(true);

  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  const [storeHasChanges, setStoreChanges] = useState(false);
  const [selectOptions, setSelectOptions] = useState({ theme: null });
  const [storeData, setStoreData] = useState(null);
  const [currentStoreData, setCurrentStoreData] = useState(null);

  const [currentCustomerData, setCurrentCustomerData] = useState(null);

  const saveDetails = () => {
    api.updateStoreById(currentStoreData.id, currentStoreData).then(() => {
      dispatch(
        showNotification(localization.t('general.updatesHaveBeenSaved')),
      );
      setTimeout(() => setMakeUpdate(true), 1000);
    });
  };

  useEffect(() => {
    let isCancelled = false;
    const requests = async () => {
      try {
        const store = await api.getStoreById(id);
        const customer = await api.getCustomerById(store?.data?.customerId);
        const themeOptions = await api.getThemeOptions();
        if (!isCancelled) {
          setStoreData(store.data);
          setCurrentStoreData(store.data);
          setCurrentCustomerData(customer.data);
          setSelectOptions({
            ...selectOptions,
            theme: themeOptions.data.items,
          });
          setLoading(false);
        }
      } catch (error) {
        if (!isCancelled) {
          setLoading(false);
          setMakeUpdate(false);
        }
      }
    };
    requests();
    return () => {
      isCancelled = true;
    };
  }, [makeUpdate]);

  useEffect(() => {
    setStoreChanges(
      JSON.stringify(currentStoreData) !== JSON.stringify(storeData),
    );
    return () => {
      setStoreChanges(false);
    };
  }, [currentStoreData, storeData]);

  if (isLoading) return <LinearProgress />;

  return (
    <>
      <Box display="flex" flexDirection="row">
        <Box>
          <FolderOpen color="secondary" />
        </Box>
        <Box>
          <Typography component="div" color="primary">
            {/* toDo Add localization */}
            <Box fontWeight={500}> Store</Box>
          </Typography>
        </Box>
      </Box>
      <Zoom in={storeHasChanges}>
        <Button
          id="save-detail-button"
          color="primary"
          size="large"
          type="submit"
          variant="contained"
          onClick={saveDetails}
        >
          Save
        </Button>
      </Zoom>
      {currentStoreData && (
        <StoreDetails
          storeData={storeData}
          selectOptions={selectOptions}
          setCurrentStoreData={setCurrentStoreData}
          customerData={currentCustomerData}
          currentStoreData={currentStoreData}
        />
      )}
    </>
  );
};

export default StoreDetailsScreen;

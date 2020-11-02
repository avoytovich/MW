import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FolderOpen } from '@material-ui/icons';
import {
  LinearProgress,
  Zoom,
  Button,
  Box,
  Typography,
} from '@material-ui/core';
import StoreDetails from '../../components/StoreDetails';
import api from '../../api';

const StoreDetailsScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  const [storeHasChanges, setStoreChanges] = useState(false);

  const [storeData, setStoreData] = useState(null);
  const [currentStoreData, setCurrentStoreData] = useState(null);

  const [currentCustomerData, setCurrentCustomerData] = useState(null);

  const saveDetails = () => {
  };

  useEffect(() => {
    let isCancelled = false;
    const requests = async () => {
      try {
        const store = await api.getStoreById(id);
        const customer = await api.getCustomerById(store?.data?.customerId);
        if (!isCancelled) {
          setStoreData(store.data);
          setCurrentStoreData(store.data);
          setCurrentCustomerData(customer.data);
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
    setStoreChanges(
      JSON.stringify(currentStoreData) !== JSON.stringify(storeData),
    );
    return () => {
      setStoreChanges(false);
    };
  }, [currentStoreData]);

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
      <StoreDetails
        setStoreData={setCurrentStoreData}
        customerData={currentCustomerData}
        storeData={currentStoreData}
      />
    </>
  );
};

export default StoreDetailsScreen;

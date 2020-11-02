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
import api from '../../api';
import ProductDetails from '../../components/ProductDetails';

const ProductDetailsScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();

  const [productHasChanges, setProductChanges] = useState(false);

  const [productData, setProductData] = useState(null);
  const [currentProductData, setCurrentProductData] = useState(null);

  const [storeData, setStoreData] = useState(null);
  const [currentStoreData, setCurrentStoreData] = useState(null);

  const saveDetails = () => {
    // eslint-disable-next-line no-unused-vars
    const sendObj = { ...currentProductData, updateDate: Date.now() };
  };
  useEffect(() => {
    let store = null;
    let isCancelled = false;
    const requests = async () => {
      try {
        const product = await api.getProductById(id);
        const storesId = product.data?.sellingStores?.[0];
        const resourcesKeys = [...product.data.resources].map(
          (resource, index) => ({
            ...resource,
            index,
          }),
        );
        if (storesId) {
          store = await api.getStoreById(storesId);
        }
        if (!isCancelled) {
          if (store) {
            setStoreData(store.data);
            setCurrentStoreData(store.data);
          }
          setProductData({ ...product.data, resources: resourcesKeys });
          setCurrentProductData({ ...product.data, resources: resourcesKeys });
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
    setProductChanges(
      JSON.stringify(currentProductData) !== JSON.stringify(productData)
        || JSON.stringify(currentStoreData) !== JSON.stringify(storeData),
    );
    return () => {
      setProductChanges(false);
    };
  }, [currentProductData, currentStoreData]);

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
            <Box fontWeight={500}> Product</Box>
          </Typography>
        </Box>
      </Box>
      <Zoom in={productHasChanges}>
        <Button
          id="save-detail-button"
          color="primary"
          size="large"
          type="submit"
          variant="contained"
          onClick={saveDetails}
        >
          {/* toDo Add localization */}
          Save
        </Button>
      </Zoom>
      {currentProductData && (
        <ProductDetails
          setStoreData={setCurrentStoreData}
          setProductData={setCurrentProductData}
          productData={currentProductData}
          storeData={currentStoreData}
        />
      )}
    </>
  );
};

export default ProductDetailsScreen;

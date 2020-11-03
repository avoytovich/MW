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
  const [selectOptions, setSelectOptions] = useState({
    sellingStores: null,
  });

  const [productData, setProductData] = useState(null);
  const [currentProductData, setCurrentProductData] = useState(null);

  const [currentStoreData, setCurrentStoreData] = useState(null);

  const saveDetails = () => {
    // eslint-disable-next-line no-unused-vars
    const sendObj = { ...currentProductData, updateDate: Date.now() };
  };
  useEffect(() => {
    let stores = null;
    let resourcesKeys = null;
    let isCancelled = false;
    const requests = async () => {
      try {
        const product = await api.getProductById(id);
        const storesIds = product.data?.sellingStores?.join('&id=');
        const sellingStoreOptions = await api.getSellingStoreOptions(
          product.data?.customerId,
        );
        if (product.data.resources) {
          resourcesKeys = [...product.data.resources].map(
            (resource, index) => ({
              ...resource,
              index,
            }),
          );
        }
        if (storesIds) {
          stores = await api.getStoresByIds(storesIds);
        }
        if (!isCancelled) {
          if (stores) {
            setCurrentStoreData(stores.data);
          }
          if (resourcesKeys) {
            setProductData({ ...product.data, resources: resourcesKeys });
            setCurrentProductData({
              ...product.data,
              resources: resourcesKeys,
            });
          } else {
            setProductData(product.data);
            setCurrentProductData(product.data);
          }
          setSelectOptions({
            ...selectOptions,
            sellingStores: sellingStoreOptions.data.items,
          });
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
      JSON.stringify(currentProductData) !== JSON.stringify(productData),
    );
    return () => {
      setProductChanges(false);
    };
  }, [currentProductData]);

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
          selectOptions={selectOptions}
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

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
import api from '../../api';
import ProductDetails from '../../components/ProductDetails';

const ProductDetailsScreen = () => {
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();

  const [productHasChanges, setProductChanges] = useState(false);
  const [selectOptions, setSelectOptions] = useState({
    sellingStores: null,
  });

  const [productData, setProductData] = useState(null);
  const [currentProductData, setCurrentProductData] = useState(null);

  const checkRequiredFields = (product) => {
    let resourcesKeys = null;
    let resObj = { ...product };

    if (resObj.resources) {
      resourcesKeys = [...resObj.resources].map((resource, index) => ({
        ...resource,
        index,
      }));
    }
    if (resourcesKeys) {
      resObj = { ...resObj, resources: resourcesKeys };
    }
    if (!resObj.type) {
      resObj = { ...resObj, type: '' };
    }
    if (!resObj.sellingStores) {
      resObj = { ...resObj, sellingStores: [] };
    }
    if (!resObj.lifeTime) {
      resObj = { ...resObj, lifeTime: '' };
    }
    if (!resObj.trialAllowed) {
      resObj = { ...resObj, trialAllowed: '' };
    }
    return resObj;
  };

  const saveDetails = () => {
    const updateDate = Date.now();
    const sendObj = { ...currentProductData, updateDate };
    api.updateProductById(currentProductData.id, sendObj).then(() => {
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
        const product = await api.getProductById(id);
        const sellingStoreOptions = await api.getSellingStoreOptions(
          product.data?.customerId,
        );

        if (!isCancelled) {
          const checkedProduct = checkRequiredFields(product.data);
          setProductData(checkedProduct);
          setCurrentProductData(checkedProduct);
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
          setProductData={setCurrentProductData}
          currentProductData={currentProductData}
          productData={productData}
        />
      )}
    </>
  );
};

export default ProductDetailsScreen;

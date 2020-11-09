import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
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
  const history = useHistory();

  const dispatch = useDispatch();
  const [makeUpdate, setMakeUpdate] = useState(true);

  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();

  const [productHasChanges, setProductChanges] = useState(false);
  const [selectOptions, setSelectOptions] = useState({
    sellingStores: null,
  });

  const [productData, setProductData] = useState(null);
  const [currentProductData, setCurrentProductData] = useState(null);

  const saveDetails = () => {
    const sendObj = { ...currentProductData, updateDate: Date.now() };
    api.updateProductById(currentProductData.id, sendObj).then(() => {
      dispatch(
        showNotification(localization.t('general.updatesHaveBeenSaved')),
      );
      const currentRout = history.location.pathname;
      history.push({ pathname: '/' });
      history.replace({
        pathname: currentRout,
      });
    });
  };
  useEffect(() => {
    let resourcesKeys = null;
    let isCancelled = false;

    const requests = async () => {
      try {
        const product = await api.getProductById(id);
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
        if (!isCancelled) {
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
          setMakeUpdate(false);
        }
      } catch (error) {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };
    if (makeUpdate) {
      requests();
    }
    return () => {
      isCancelled = true;
    };
  }, [makeUpdate]);
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

/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as R from 'ramda';
import { toast } from 'react-toastify';
import {
  Box,
  Tabs,
  Tab,
} from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';
import localization from '../../localization';
import parentPaths from '../../services/paths';
import CheckoutMenu from './CheckoutMenu';
import DetailPageWrapper from '../../components/utils/DetailPageWrapper';
import CustomerStatusLabel from '../../components/utils/CustomerStatusLabel';
import ProductDetailsView from './ProductDetailsView';
import { handleGetOptions, handleGetProductDetails } from './utils';
import {
  defaultProduct,
  productRequiredFields,
  backToFront,
  frontToBack,
  localizedValues,
} from '../../services/helpers/dataStructuring';
import api from '../../api';

const ProductDetailsScreen = () => {
  const { id } = useParams();
  const history = useHistory();

  const parentId = history?.location?.state?.parentId;
  const [isLoading, setLoading] = useState(true);
  const [customer, setCustomer] = useState(null);
  const [needDefault, setNeedDefault] = useState(null);
  const [curTab, setCurTab] = useState(0);
  const [upd, setUpd] = useState(0);
  const [saveDisabled, setSaveDisabled] = useState(false);
  const [productHasChanges, setProductChanges] = useState(false);
  const [tabsDisabled, setTabsDisabled] = useState(true);
  const [selectOptions, setSelectOptions] = useState({
    sellingStores: null,
    renewingProducts: null,
    subscriptionModels: null,
    catalogs: null,
    priceFunctions: null,
  });
  const [productData, setProductData] = useState(null);
  const [currentProductData, setCurrentProductData] = useState(defaultProduct);
  const [checkOutStores, setCheckOutStores] = useState([]);
  const [productHasLocalizationChanges, setProductLocalizationChanges] = useState(false);
  const [productVariations, setSubProductVariations] = useState({});
  const [productDetails, setProductDetails] = useState(null);
  const [variablesDescriptions, setVariablesDescriptions] = useState([]);
  const [storeLanguages, setStoreLanguages] = useState([]);

  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);

  const handleChangeTab = (tab) => (id && tab === 7 ? history.push(`${parentPaths.productlist}/${currentProductData?.parentId || parentId}`) : setCurTab(tab));

  const filterCheckoutStores = () => {
    let newLanguages = [];
    const res = [];
    const storesList = currentProductData?.sellingStores?.state // eslint-disable-line
      ? currentProductData?.sellingStores?.state === 'inherits'
        ? currentProductData?.sellingStores?.parentValue
        : currentProductData?.sellingStores?.value : currentProductData?.sellingStores;

    storesList?.forEach((item) => {
      const selectedStore = selectOptions?.sellingStores?.filter((store) => store.id === item);

      if (selectedStore[0]) {
        const languages = selectedStore[0].saleLocales ? [...selectedStore[0].saleLocales] : [];
        if (!languages.includes(selectedStore[0].defaultLocale)) {
          languages.push(selectedStore[0].defaultLocale);
        }
        newLanguages = [...new Set([...newLanguages, ...languages])];
        const { value, hostnames } = selectedStore[0];
        hostnames?.forEach((hostname) => res.push({ value, hostname }));
      }
    });

    setStoreLanguages(newLanguages);
    setCheckOutStores(res);
  };

  // ToDo simplify saveDetails/saveProduct if possible
  const saveDetails = () => {
    if (productHasChanges) {
      const sendObj = currentProductData?.parentId || parentId
        ? frontToBack(currentProductData)
        : { ...currentProductData };

      sendObj.lifeTime = sendObj.lifeTime.toUpperCase();

      if (!sendObj.businessSegment) {
        delete sendObj.businessSegment;
      }

      api.updateProductById(currentProductData.id, sendObj).then(() => {
        toast(localization.t('general.updatesHaveBeenSaved'));
        setLoading(true);
        setUpd((c) => c + 1);
      });
    }

    if (productHasLocalizationChanges) {
      const frontToBackObj = frontToBack(productHasLocalizationChanges);
      const i18nFields = Object.entries(frontToBackObj.i18nFields).reduce(
        (accumulator, [key, value]) => ({ ...accumulator, [key]: frontToBack(value || {}) }),
        {},
      );
      const localizedValuesToSave = localizedValues.reduce((acc, cur) => {
        const localizedValue = Object.entries(i18nFields).reduce((ac, [key, value]) => {
          if (i18nFields[key][cur]) {
            return { ...ac, [key]: value[cur] };
          }
          return ac;
        }, {});
        return {
          ...acc,
          [cur]: localizedValue || {},
        };
      }, {});
      if (frontToBackObj.i18nFields) {
        delete frontToBackObj.i18nFields;
      }
      const dataToSave = R.mergeRight(frontToBackObj, localizedValuesToSave);
      if (!frontToBackObj?.customerId) {
        frontToBackObj.customerId = currentProductData?.customerId?.state
          ? currentProductData?.customerId?.value
          : currentProductData?.customerId;
      }
      api
        .updateProductLocalsById(
          currentProductData?.descriptionId?.state
            ? currentProductData.descriptionId.value
            : currentProductData.descriptionId,
          dataToSave,
        )
        .then(() => {
          toast(localization.t('general.updatesHaveBeenSaved'));
          setLoading(true);
          setUpd((c) => c + 1);
        });
    }
  };

  const saveProduct = () => {
    if (!currentProductData.businessSegment) {
      delete currentProductData.businessSegment;
    }
    const dataToSave = frontToBack(currentProductData);
    if (!dataToSave?.customerId) {
      dataToSave.customerId = currentProductData?.customerId?.state
        ? currentProductData?.customerId?.value
        : currentProductData?.customerId;
    }
    if (productData?.parentId || parentId) {
      delete dataToSave.id;
      dataToSave.parentId = productData?.parentId || parentId;
    }

    api.addNewProduct(dataToSave).then((res) => {
      const location = res.headers.location.split('/');
      // eslint-disable-next-line no-underscore-dangle
      const id_ = location[location.length - 1];

      api.getProductById(id_).then(({ data }) => {
        if (productHasLocalizationChanges) {
          const frontToBackObj = frontToBack(productHasLocalizationChanges);
          const i18nFields = Object.entries(frontToBackObj.i18nFields).reduce(
            (accumulator, [key, value]) => ({ ...accumulator, [key]: frontToBack(value || {}) }),
            {},
          );
          const localizedValuesToSave = localizedValues.reduce((acc, cur) => {
            const localizedValue = Object.entries(i18nFields).reduce((ac, [key, value]) => {
              if (i18nFields[key][cur]) {
                return { ...ac, [key]: value[cur] };
              }
              return ac;
            }, {});
            return {
              ...acc,
              [cur]: localizedValue || {},
            };
          }, {});

          if (frontToBackObj.i18nFields) {
            delete frontToBackObj.i18nFields;
          }
          const localizationChangesToSave = R.mergeRight(
            frontToBackObj, localizedValuesToSave,
          );
          if (!frontToBackObj?.customerId) {
            frontToBackObj.customerId = currentProductData?.customerId?.state
              ? currentProductData?.customerId?.value
              : currentProductData?.customerId;
          }
          api
            .updateProductLocalsById(
              data.descriptionId,
              {
                ...localizationChangesToSave,
                description: `description of product ${currentProductData.genericName}`,
                catalogId: data.catalogId,
              },
            )
            .then(() => {
              toast(localization.t('general.updatesHaveBeenSaved'));
              setLoading(true);
              history.push(`${parentPaths.productlist}/${id_}`);
            });
        } else {
          toast(localization.t('general.updatesHaveBeenSaved'));
          setLoading(true);
          history.push(`${parentPaths.productlist}/${id_}`);
        }
      });
    });
  };

  useEffect(() => {
    let isCancelled = false;
    let request;

    setCurTab(0);

    if (parentId) {
      request = api.getProductById(parentId);
    } else if (id === 'add') {
      const customerId = nxState?.selectedCustomer?.id;

      return handleGetOptions(
        setLoading,
        customerId,
        null,
        null,
        isCancelled,
        setSelectOptions,
        selectOptions,
        setSubProductVariations,
        (catalogId) => {
          setCurrentProductData((c) => ({ ...c, customerId, catalogId }));
        },
      );
    } else {
      request = api.getProductById(id);
    }

    request.then(({ data: product }) => {
      if (!isCancelled) {
        if (product?.parentId) {
          api.getProductById(product.parentId).then(({ data }) => {
            const result = backToFront(productRequiredFields(data), product);
            const initData = JSON.parse(JSON.stringify(result));

            handleGetProductDetails(
              result?.descriptionId,
              setVariablesDescriptions,
              setProductDetails,
            );

            setProductData(initData);
            setCurrentProductData(result);
            setLoading(false);
          });
        } else {
          const checkedProduct = productRequiredFields(product);
          setProductData(checkedProduct);
          const newHashes = JSON.stringify(checkedProduct);
          setCurrentProductData(JSON.parse(newHashes));
          setLoading(false);
        }
      }

      const { customerId, id: _id, descriptionId } = product;

      handleGetOptions(
        setLoading,
        customerId,
        _id,
        descriptionId,
        isCancelled,
        setSelectOptions,
        selectOptions,
        setSubProductVariations,
        setProductDetails,
      );
    }).catch(() => setLoading(false));

    return () => { isCancelled = true; };
  }, [id, upd, history?.state]);

  useEffect(() => {
    if (productData?.customerId) {
      api
        .getCustomerById(productData?.customerId)
        .then((res) => setCustomer(res.data));
    }
  }, [productData]);

  useEffect(() => {
    if (
      JSON.stringify(currentProductData?.sellingStores)
      !== JSON.stringify(productData?.sellingStores)
    ) {
      filterCheckoutStores();
    }

    setProductChanges(JSON.stringify(currentProductData) !== JSON.stringify(productData));

    return () => setProductChanges(false);
  }, [currentProductData]);

  useEffect(() => {
    if (selectOptions.sellingStores) {
      filterCheckoutStores();
    }
  }, [selectOptions?.sellingStores]);

  return (
    <DetailPageWrapper
      nxState={nxState}
      id={id}
      name={id === 'add' ? localization.t('labels.newProduct') : `${productData?.genericName?.value || productData?.genericName} - ${id}`}
      saveIsDisabled={saveDisabled || tabsDisabled || Boolean(needDefault)}
      hasChanges={productHasChanges || productHasLocalizationChanges || !productData?.id}
      isLoading={isLoading}
      curParentPath={parentPaths.productlist}
      curData={currentProductData}
      addFunc={api.addNewProduct}
      updateFunc={api.updateProductById}
      setUpdate={setUpd}
      extraHeader={<CustomerStatusLabel customer={customer} />}
      customSave={id === 'add' ? saveProduct : saveDetails}
      extraActions={
        id && (
          <Box data-test='checkoutMenu' ml={2}>
            {selectOptions?.sellingStores && (
              <CheckoutMenu
                checkOutStores={checkOutStores}
                currentProductData={currentProductData}
                sellingStores={selectOptions?.sellingStores}
              />
            )}
          </Box>
        )
      }
      customTabs={(
        <Tabs
          value={curTab}
          data-test='productTabs'
          indicatorColor='primary'
          textColor='primary'
          onChange={(e, tab) => handleChangeTab(tab)}
        >
          {(currentProductData?.parentId || parentId) && (
            <Tab
              style={{ color: 'white', backgroundColor: '#9ec5ec' }}
              label={(
                <Box display='flex' alignItems='center'>
                  <ArrowBack color='white' />
                  {localization.t('labels.backToParent')}
                </Box>
              )}
              value={7}
            />
          )}
          <Tab label={localization.t('labels.general')} value={0} />
          <Tab
            label={localization.t('labels.fulfillmentAndSubscription')}
            value={1}
            disabled={!selectOptions?.sellingStores}
          />
          <Tab
            label={localization.t('labels.localizedContent')}
            value={2}
            disabled={!selectOptions?.sellingStores}
          />
          <Tab label={localization.t('labels.prices')} value={3} />
          <Tab label={localization.t('labels.productVariations')} value={4} />
          <Tab label={localization.t('labels.productFiles')} value={5} />
        </Tabs>
      )}
      headerTitleCopy={productData?.id}
    >
      <ProductDetailsView
        needDefault={needDefault}
        setNeedDefault={setNeedDefault}
        productData={productData}
        setCurProductData={setCurrentProductData}
        curProductData={currentProductData}
        selectOptions={selectOptions}
        setProductData={setCurrentProductData}
        curTab={curTab}
        productVariations={productVariations}
        setProductLocalizationChanges={setProductLocalizationChanges}
        productDetails={productDetails}
        variablesDescriptions={variablesDescriptions}
        storeLanguages={storeLanguages}
        setSaveDisabled={setSaveDisabled}
        setTabsDisabled={setTabsDisabled}
      />
    </DetailPageWrapper>
  );
};

export default ProductDetailsScreen;

/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { LinearProgress } from '@mui/material';

import store from '../../redux/store';

import ProductDetailsTabs from './ProductDetailsTabs';
import ProductDetailsView from './ProductDetailsView';
import CheckoutMenu from './CheckoutMenu';

import DetailPageWrapper from '../../components/utils/DetailPageWrapper';
import CustomerStatusLabel from '../../components/utils/CustomerStatusLabel';

import parentPaths from '../../services/paths';
import {
  defaultProduct,
  productRequiredFields,
  backToFront,
  frontToBack,
  checkValue,
  defaultProductLocales,
} from '../../services/helpers/dataStructuring';
import { handleGetOptions, handleGetProductDetails, saveLocalizationDetails } from './utils';
import { setTempProductDescription, setTempProductLocales } from '../../redux/actions/TempData';

import localization from '../../localization';
import api from '../../api';

const defaultSelectOptions = {
  sellingStores: null,
  renewingProducts: null,
  subscriptionModels: null,
  catalogs: null,
  priceFunctions: null,
};

const ProductDetailsScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [isLoading, setLoading] = useState(true);
  const [upd, setUpd] = useState(0);

  const [customer, setCustomer] = useState(null);
  const [curTab, setCurTab] = useState(0);

  const [disabledWithMandLocal, setDisabledWithMandLocal] = useState(false);
  const [saveDisabled, setSaveDisabled] = useState(false);
  const [tabsDisabled, setTabsDisabled] = useState(true);

  const [productHasChanges, setProductChanges] = useState(false);
  const [productHasLocalizationChanges, setProductLocalizationChanges] = useState(false);

  const [productData, setProductData] = useState(null);
  const [currentProductData, setCurrentProductData] = useState(defaultProduct);
  const [productDetails, setProductDetails] = useState(null);
  const [currentProductDetails, setCurrentProductDetails] = useState(null);
  const [variablesDescriptions, setVariablesDescriptions] = useState([]);
  const [productVariations, setSubProductVariations] = useState({});
  const [checkOutStores, setCheckOutStores] = useState([]);
  const [storeLanguages, setStoreLanguages] = useState([]);
  const [codeMode, setCodeMode] = useState(false);
  const [jsonIsValid, setJsonIsValid] = useState(true);
  const [selectOptions, setSelectOptions] = useState({ ...defaultSelectOptions });
  const [relatedProduct, setRelatedProduct] = useState(null);

  const parentId = history?.location?.state?.parentId;
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);

  const handleChangeTab = (tab) => {
    if (tab === 7) {
      setLoading(true);
      history.push(`${parentPaths.productlist}/${currentProductData?.parentId || parentId}`);
    } else {
      setCurTab(tab);
    }
  };

  const filterCheckoutStores = () => {
    let newLanguages = [];
    const res = [];

    const storesList = currentProductData?.sellingStores?.state // eslint-disable-line
      ? currentProductData?.sellingStores?.state === 'inherits'
        ? currentProductData?.sellingStores?.parentValue
        : currentProductData?.sellingStores?.value : currentProductData?.sellingStores;

    storesList?.forEach((item) => {
      const selectedStore = selectOptions?.sellingStores?.filter((store_) => store_.id === item);

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
    setCheckOutStores([...res]);
  };

  const saveDetails = async () => {
    if (productHasChanges) {
      const sendObj = currentProductData?.parentId || parentId
        ? frontToBack(currentProductData)
        : { ...currentProductData };

      sendObj.lifeTime = sendObj.lifeTime.toUpperCase();

      if (!sendObj.businessSegment) {
        delete sendObj.businessSegment;
      }
      if (sendObj.nextGenerationOf[0] === '') {
        delete sendObj.nextGenerationOf;
      }

      api.updateProductById(currentProductData.id, sendObj).then(() => {
        if (!productHasLocalizationChanges && !currentProductDetails) {
          toast(localization.t('general.updatesHaveBeenSaved'));
          setLoading(true);
          setUpd((c) => c + 1);
        }
      });
    }

    if (productHasLocalizationChanges || currentProductDetails) {
      const { tempData } = store.getState();

      const dataToSave = saveLocalizationDetails(tempData, currentProductData, nxState);

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
          setProductLocalizationChanges(false);
          setUpd((c) => c + 1);
        });
    }
  };

  const saveProduct = () => {
    if (!currentProductData.businessSegment) {
      delete currentProductData.businessSegment;
    }
    if (currentProductData.nextGenerationOf[0] === '') {
      delete currentProductData.nextGenerationOf;
    }
    const dataToSave = frontToBack(currentProductData);

    if (!dataToSave?.customerId) {
      dataToSave.customerId = currentProductData?.customerId?.state
        ? (currentProductData?.customerId?.value || currentProductData?.customerId?.parentValue)
        : (currentProductData?.customerId || nxState?.selectedCustomer?.id);
    }

    if (productData?.parentId || parentId) {
      delete dataToSave?.id;
      delete dataToSave?.descriptionId;
      dataToSave.parentId = productData?.parentId || parentId;
    }

    api.addNewProduct(dataToSave).then((res) => {
      const loc = res.headers.location.split('/');
      // eslint-disable-next-line no-underscore-dangle
      const id_ = loc[loc.length - 1];

      api.getProductById(id_).then(({ data }) => {
        if (productHasLocalizationChanges || (id === 'add' && parentId)) {
          const { tempData } = store.getState();

          const localizationChangesToSave = saveLocalizationDetails(
            tempData, currentProductData, nxState,
          );

          api
            .updateProductLocalsById(
              data.descriptionId,
              {
                ...localizationChangesToSave,
                description: `description of product ${checkValue(currentProductData?.genericName)}`,
                catalogId: data.catalogId,
                customerId: data?.customerId || nxState?.selectedCustomer?.id,
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
    const productId = id === 'add' ? parentId : id;

    if (id !== 'add' || (parentId && !productData)) {
      api.getProductById(productId).then(({ data: product }) => {
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
            const newHashes = JSON.parse(JSON.stringify(checkedProduct));

            if (id === 'add') {
              const result = backToFront(productRequiredFields(checkedProduct), checkedProduct);
              const initData = JSON.parse(JSON.stringify(result));

              setProductData(initData);
              setCurrentProductData(result);
            } else {
              handleGetProductDetails(
                product?.descriptionId,
                setVariablesDescriptions,
                setProductDetails,
              );

              setProductData(checkedProduct);
              setCurrentProductData(newHashes);
            }

            setLoading(false);
          }
        }

        if (id === 'add') {
          const customerId = nxState?.selectedCustomer?.id;

          return handleGetOptions(
            setLoading,
            customerId,
            null,
            isCancelled,
            setSelectOptions,
            selectOptions,
            setSubProductVariations,
            (catalogId) => setProductDetails((c) => ({
              i18nFields: { ...defaultProductLocales },
              ...c,
              customerId,
              catalogId,
            })),
          );
        }

        const { customerId, id: _id } = product;

        handleGetOptions(
          setLoading,
          customerId,
          _id,
          isCancelled,
          setSelectOptions,
          selectOptions,
          setSubProductVariations,
          (catalogId) => setProductDetails((c) => ({ ...c, catalogId })),
        );
      }).catch(() => setLoading(false));
    } else {
      const customerId = nxState?.selectedCustomer?.id;

      if (parentId) {
        const result = backToFront(productRequiredFields(currentProductData), productData);
        const initData = JSON.parse(JSON.stringify(result));

        setProductData(initData);
        setCurrentProductData(result);
      }

      return handleGetOptions(
        setLoading,
        customerId,
        null,
        isCancelled,
        setSelectOptions,
        selectOptions,
        setSubProductVariations,
        (catalogId) => {
          setCurrentProductData((c) => ({ ...c, customerId, catalogId }));
          setDisabledWithMandLocal(
            productDetails && productDetails?.i18nFields
            && productDetails?.i18nFields[productDetails.fallbackLocale]
              ? !productDetails?.i18nFields[productDetails.fallbackLocale]?.localizedMarketingName
              : true,
          );
        },
      );
    }

    return () => {
      isCancelled = true;
      dispatch(setTempProductLocales({}));
      dispatch(setTempProductDescription({}));
    };
  }, [id, upd, history?.state]);

  useEffect(() => {
    setLoading(true);
    setCurTab(0);
  }, [location?.pathname]);

  useEffect(() => {
    if (productData?.customerId && customer?.id !== productData?.customerId) {
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

  useEffect(() => {
    dispatch(setTempProductDescription({ ...productDetails }));
  }, [productDetails]);

  useEffect(() => setProductDetails({ ...currentProductDetails }), [currentProductDetails]);

  useEffect(() => {
    api.getNextGenerationByProductId(id).then(
      ({ data: { genericName, id: relatedProductId } }) => {
        setRelatedProduct({ genericName, id: relatedProductId });
      },
    );
  }, [id]);

  if (!parentId
      && !currentProductData?.parentId
      && currentProductData?.createDate?.parentValue) return <LinearProgress />;

  return (
    <DetailPageWrapper
      nxState={nxState}
      id={id}
      name={
        id === 'add'
          ? localization.t('labels.newProduct')
          : `${productData?.genericName?.value || productData?.genericName} - ${id}`
      }
      saveIsDisabled={saveDisabled || tabsDisabled || disabledWithMandLocal || !jsonIsValid}
      hasChanges={productHasChanges || productHasLocalizationChanges || !productData?.id}
      isLoading={isLoading}
      setUpdate={setUpd}
      curParentPath={parentPaths.productlist}
      curData={currentProductData}
      addFunc={api.addNewProduct}
      updateFunc={api.updateProductById}
      customSave={id === 'add' ? saveProduct : saveDetails}
      extraHeader={<CustomerStatusLabel customer={customer} />}
      headerTitleCopy={productData?.id}
      extraActions={
        id && selectOptions?.sellingStores && (
          <CheckoutMenu
            checkOutStores={checkOutStores}
            currentProductData={currentProductData}
            sellingStores={selectOptions?.sellingStores}
          />
        )
      }
      customTabs={(
        <ProductDetailsTabs
          curTab={curTab}
          handleChangeTab={handleChangeTab}
          currentProductData={currentProductData}
          parentId={parentId || currentProductData?.parentId}
          selectOptions={selectOptions}
        />
      )}
      flexWrapper={codeMode && curTab === 3}
    >
      <ProductDetailsView
        productData={productData}
        setCurProductData={setCurrentProductData}
        curProductData={currentProductData}
        relatedProduct={relatedProduct}
        selectOptions={selectOptions}
        setProductData={setCurrentProductData}
        curTab={curTab}
        productVariations={productVariations}
        setProductLocalizationChanges={setProductLocalizationChanges}
        productDetails={productDetails}
        setProductDetails={setCurrentProductDetails}
        variablesDescriptions={variablesDescriptions}
        storeLanguages={storeLanguages}
        setSaveDisabled={setSaveDisabled}
        setTabsDisabled={setTabsDisabled}
        parentId={parentId || currentProductData?.parentId}
        setDisabledWithMandLocal={setDisabledWithMandLocal}
        setCodeMode={setCodeMode}
        codeMode={codeMode}
        jsonIsValid={jsonIsValid}
        setJsonIsValid={setJsonIsValid}
      />
    </DetailPageWrapper>
  );
};

export default ProductDetailsScreen;

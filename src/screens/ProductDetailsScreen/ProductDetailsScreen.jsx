/* eslint-disable consistent-return */
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { LinearProgress } from '@mui/material';

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
import {
  handleGetOptions,
  handleEditorParsing,
  handleGetProductDetails,
  saveLocalizationDetails,
  beforeSend,
  defLocalizationObj,
  defProductVariationObj,
  tabLabels,
  tabLabelsVariation,
} from './utils';
import { setTempProductDescription } from '../../redux/actions/TempData';

import localization from '../../localization';
import api from '../../api';
import { setHeaderCustomerName } from '../../redux/actions/TableData';

const defaultSelectOptions = {
  sellingStores: null,
  renewingProducts: null,
  subscriptionModels: null,
  fulfillmentTemplates: null,
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
  const [backToParent, setBackToParent] = useState(false);
  const [curTab, setCurTab] = useState(0);

  const [localizedContentHasChanges, setLocalizedContentHasChanges] = useState(false);
  const [curLocalizedData, setCurLocalizedData] = useState(null);
  const [localizedData, setLocalizedData] = useState(null);
  const [storeLanguages, setStoreLanguages] = useState(null);
  const [localizedErrors, setLocalizedErrors] = useState({});

  const [saveDisabled, setSaveDisabled] = useState(false);
  const [tabsDisabled, setTabsDisabled] = useState(true);

  const [productHasChanges, setProductChanges] = useState(false);
  const [productHasLocalizationChanges, setProductLocalizationChanges] = useState(false);

  const [productData, setProductData] = useState(null);
  const [descriptionData, setDescriptionData] = useState({});
  const [parentDescriptionData, setParentDescriptionData] = useState(null);
  const [currentProductData, setCurrentProductData] = useState(defaultProduct);
  const [productDetails, setProductDetails] = useState(null);
  const [currentProductDetails, setCurrentProductDetails] = useState(null);
  const [variablesDescriptions, setVariablesDescriptions] = useState([]);
  const [productVariations, setSubProductVariations] = useState({});
  const [checkOutStores, setCheckOutStores] = useState([]);
  const [codeMode, setCodeMode] = useState(false);
  const [jsonIsValid, setJsonIsValid] = useState(true);
  const [selectOptions, setSelectOptions] = useState({ ...defaultSelectOptions });
  const [relatedProduct, setRelatedProduct] = useState(null);
  const [priceTableError, setPriceTableError] = useState([]);
  const parentId = history?.location?.state?.parentId;
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);

  const [errors, setErrors] = useState({});
  const [digitsErrors, setDigitsErrors] = useState({});

  const [isScroolUp, setIsScroolUp] = useState(false);
  const [isScroolDown, setIsScroolDown] = useState(false);

  const myRefView = useRef(null);

  const myRefGeneral = useRef(null);
  const myRefFulfillment = useRef(null);
  const myRefSubscription = useRef(null);
  const myRefLocalizedContent = useRef(null);
  const myRefPrices = useRef(null);
  const myRefProductFiles = useRef(null);
  const myRefProductVariations = useRef(null);

  const refScrool = [
    myRefGeneral,
    myRefFulfillment,
    myRefSubscription,
    myRefLocalizedContent,
    myRefPrices,
    myRefProductFiles,
    myRefProductVariations,
  ];

  const tabRefGeneral = useRef(null);
  const tabRefFulfillment = useRef(null);
  const tabRefSubscription = useRef(null);
  const tabRefLocalizedContent = useRef(null);
  const tabRefPrices = useRef(null);
  const tabRefProductFiles = useRef(null);
  const tabRefProductVariations = useRef(null);

  const refTab = [
    tabRefGeneral,
    tabRefFulfillment,
    tabRefSubscription,
    tabRefLocalizedContent,
    tabRefPrices,
    tabRefProductFiles,
    tabRefProductVariations,
  ];

  const handleChangeTab = (tab) => {
    if (tab === 7) {
      setLoading(true);
      history.push(`${parentPaths.productlist}/${currentProductData?.parentId || parentId}`);
    } else {
      refTab?.[tab]?.current.scrollIntoView();
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

  const handleDeleteVariation = (variationId) => {
    api
      .deleteProductById(variationId)
      .then(() => {
        setUpd((c) => c + 1);
        toast(`${localization.t('labels.variation')} ${variationId} ${localization.t(
          'general.hasBeenSuccessfullyDeleted',
        )}`);
      });
  };

  const saveDetails = async () => {
    const formatePrices = beforeSend(currentProductData);

    if (localizedContentHasChanges || productHasLocalizationChanges) {
      const dataToSave = saveLocalizationDetails(curLocalizedData, currentProductData, nxState);

      api
        .updateProductLocalsById(
          currentProductData?.descriptionId?.state
            ? currentProductData.descriptionId.value
            : currentProductData.descriptionId,
          {
            ...dataToSave,
            variableDescriptions: productDetails?.variableDescriptions || [],
          },
        )
        .then(() => {
          toast(localization.t('general.updatesHaveBeenSaved'));
          setLoading(true);
          setLocalizedContentHasChanges(false);
          setProductLocalizationChanges(false);
          setUpd((c) => c + 1);
        });
    }

    if (productHasChanges) {
      const sendObj = currentProductData?.parentId || parentId
        ? frontToBack(formatePrices)
        : { ...formatePrices };

      sendObj.lifeTime = sendObj.lifeTime.toUpperCase();

      if (!sendObj.businessSegment) {
        delete sendObj.businessSegment;
      }
      if (sendObj.nextGenerationOf[0] === '') {
        delete sendObj.nextGenerationOf;
      }

      api.updateProductById(currentProductData.id, sendObj).then(() => {
        if (!localizedContentHasChanges && !productHasLocalizationChanges) {
          toast(localization.t('general.updatesHaveBeenSaved'));
          setLoading(true);
          setUpd((c) => c + 1);
        }
      });
    }
  };

  useEffect(() => {
    if (currentProductData?.descriptionId?.state) {
      Promise.all([
        api.getProductDescriptionById(currentProductData?.descriptionId?.value),
        api.getProductDescriptionById(currentProductData?.descriptionId?.parentValue),
      ]).then(([productDescr, parentDescr]) => {
        const { data } = productDescr;
        const { data: dataParent } = parentDescr;

        handleEditorParsing(data, dataParent, setCurLocalizedData, setLocalizedData);

        setDescriptionData(data);
        setParentDescriptionData(dataParent);
      });

      return;
    }

    if (!curLocalizedData || (curLocalizedData && currentProductData?.descriptionId)) {
      const productDescriptionRequest = !currentProductData.descriptionId
        ? Promise.resolve({
          data: {
            customerId: nxState?.selectedCustomer?.id,
          },
        }) : api.getProductDescriptionById(currentProductData.descriptionId);

      productDescriptionRequest.then(({ data }) => {
        handleEditorParsing(data, false, setCurLocalizedData, setLocalizedData);
        setDescriptionData(data);
      });
    }
  }, [currentProductData?.descriptionId]);

  useEffect(() => {
    if (storeLanguages?.length && !currentProductData?.parentId && !parentId) {
      const i18nFields = { ...curLocalizedData.i18nFields };
      storeLanguages.forEach((language) => {
        if (!i18nFields[language]) {
          i18nFields[language] = !currentProductData?.parentId
            ? { ...defLocalizationObj } : { ...defProductVariationObj };
        }
      });

      if (id !== 'add') {
        setLocalizedData({ ...localizedData, i18nFields: { ...i18nFields } });
      }
      setCurLocalizedData({ ...curLocalizedData, i18nFields: { ...i18nFields } });
    }
  }, [storeLanguages]);

  useEffect(() => {
    if (descriptionData?.id) {
      const dataToSave = saveLocalizationDetails(curLocalizedData, currentProductData, nxState);

      if (JSON.stringify(dataToSave) !== JSON.stringify(descriptionData)) {
        setDescriptionData({ ...dataToSave });
      }
    }
  }, [curLocalizedData]);

  const saveProduct = async () => {
    if (!currentProductData.businessSegment) {
      delete currentProductData.businessSegment;
    }
    if (currentProductData.nextGenerationOf[0] === '') {
      delete currentProductData.nextGenerationOf;
    }

    const formateObj = beforeSend(currentProductData);
    const dataToSave = frontToBack(formateObj);

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

    if (id === 'add' && (productData?.parentId || parentId)) {
      const localizationChangesToSave = saveLocalizationDetails(
        curLocalizedData, currentProductData, nxState,
      );

      const {
        localizedLongDesc,
        localizedManualRenewalEmailDesc,
        localizedMarketingName,
        localizedPurchaseEmailDesc,
        localizedShortDesc,
        localizedThankYouDesc,
        fallbackLocale,
      } = localizationChangesToSave;

      dataToSave.descriptionId = await api.addProductLocalsById({
        customerId: dataToSave?.customerId,
        description: '-',
        fallbackLocale: fallbackLocale || productDetails?.fallbackLocale,
        localizedLongDesc,
        localizedManualRenewalEmailDesc,
        localizedMarketingName,
        localizedPurchaseEmailDesc,
        localizedShortDesc,
        localizedThankYouDesc,
        variableDescriptions: productDetails?.variableDescriptions || [],
      }).then((res) => {
        const headersLocation = res.headers.location.split('/');
        const newId = headersLocation[headersLocation.length - 1];

        return newId || '';
      });
    }

    api.addNewProduct(dataToSave).then((res) => {
      const loc = res.headers.location.split('/');
      // eslint-disable-next-line no-underscore-dangle
      const id_ = loc[loc.length - 1];

      api.getProductById(id_).then(({ data }) => {
        if ((localizedContentHasChanges || productHasLocalizationChanges)
          && !parentId && !productData?.parentId) {
          const localizationChangesToSave = saveLocalizationDetails(
            curLocalizedData, currentProductData, nxState,
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
          setLocalizedContentHasChanges(false);
          setProductLocalizationChanges(false);
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
              const result = backToFront(
                productRequiredFields(data),
                productRequiredFields(product),
              );
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

              handleGetProductDetails(
                product?.descriptionId,
                setVariablesDescriptions,
                setProductDetails,
              );
            } else {
              handleGetProductDetails(
                product?.descriptionId,
                setVariablesDescriptions,
                setProductDetails,
              );

              setProductData(checkedProduct);
              setCurrentProductData({ ...newHashes });
            }

            setLoading(false);
          }
        }

        if (id === 'add') {
          const customerId = nxState?.selectedCustomer?.id || product?.customerId;

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
            product.parentId,
          );
        }

        const { customerId, id: _id } = product;
        return handleGetOptions(
          setLoading,
          customerId,
          _id,
          isCancelled,
          setSelectOptions,
          selectOptions,
          setSubProductVariations,
          (catalogId) => setProductDetails((c) => ({ ...c, catalogId })),
          product.parentId,
        );
      }).catch(() => {
        setCurrentProductData(null);
        setLoading(false);
      });
    } else {
      const customerId = nxState?.selectedCustomer?.id || productData?.customerId;

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
        },
        true,
      );
    }

    return () => {
      isCancelled = true;
      setCurrentProductData(defaultProduct);
      setSubProductVariations({});
      dispatch(setTempProductDescription({}));
    };
  }, [id, upd, history?.state]);

  useEffect(() => {
    setLoading(true);
    setCurTab(0);
    return () => {
      setSubProductVariations({});
    };
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
    setLocalizedContentHasChanges(JSON.stringify(curLocalizedData)
      !== JSON.stringify(localizedData));
    return () => setLocalizedContentHasChanges(false);
  }, [curLocalizedData]);

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
    if (id !== 'add') {
      api.getNextGenerationByProductId(id).then(
        ({ data: { nextGenerationOf, genericName, id: relatedProductId } }) => {
          const isRelatedProduct = !!nextGenerationOf?.filter((item) => item === id).length;
          if (isRelatedProduct) {
            setRelatedProduct({ genericName, id: relatedProductId });
          }
          if (!isRelatedProduct && relatedProduct) {
            setRelatedProduct(null);
          }
        },
      );
    }
  }, [id]);

  useEffect(() => {
    if (backToParent) {
      setCurTab(6);
      setBackToParent(false);
    }
  });

  if (!parentId
    && !currentProductData?.parentId
    && currentProductData?.createDate?.parentValue) return <LinearProgress />;

  if (customer) {
    dispatch(setHeaderCustomerName({ ...customer }));
  }

  const lifetimeSaveDisabled = currentProductData?.parentId
    && checkValue(currentProductData?.lifeTime) === 'PERMANENT'
    && checkValue(currentProductData?.subscriptionTemplate);

  return (
    <DetailPageWrapper
      nxState={nxState}
      id={id}
      name={
        id === 'add'
          ? localization.t('labels.newProduct')
          : `${productData?.genericName?.value || productData?.genericName} - ${id}`
      }
      saveIsDisabled={saveDisabled || tabsDisabled || lifetimeSaveDisabled
        || !jsonIsValid || priceTableError.length > 0 || Object.keys(localizedErrors).length
          || curLocalizedData?.fallbackLocale === '' || curLocalizedData?.fallbackLocale?.value === ''}
      hasChanges={productHasChanges || !productData?.id
        || localizedContentHasChanges}
      isLoading={isLoading}
      setUpdate={setUpd}
      curParentPath={parentPaths.productlist}
      curData={currentProductData}
      addFunc={api.addNewProduct}
      updateFunc={api.updateProductById}
      nxStateNotNeeded={parentId || currentProductData?.parentId}
      customSave={id === 'add' ? saveProduct : saveDetails}
      extraHeader={<CustomerStatusLabel customer={customer} />}
      headerTitleCopy={productData?.id}
      extraActions={
        id !== 'add' && !!checkValue(currentProductData?.sellingStores)?.length && selectOptions?.sellingStores && (
          <>
            <CheckoutMenu
              checkOutStores={checkOutStores}
              currentProductData={currentProductData}
              sellingStores={selectOptions?.sellingStores}
            />
            {checkValue(currentProductData?.trialAllowed) && (
              <CheckoutMenu
                checkOutStores={checkOutStores}
                currentProductData={currentProductData}
                sellingStores={selectOptions?.sellingStores}
                withTrail
              />
            )}
          </>
        )
      }
      customTabs={(
        <ProductDetailsTabs
          curTab={curTab}
          handleChangeTab={handleChangeTab}
          currentProductData={currentProductData}
          curLocalizedData={curLocalizedData}
          parentId={parentId || currentProductData?.parentId}
          selectOptions={selectOptions}
          backToParent={backToParent}
          setBackToParent={setBackToParent}
          tabs={{
            scope: 'product',
            setCurTab,
            curTab,
            tabLabels: parentId ? tabLabelsVariation : tabLabels,
            errors,
            setErrors,
            priceTableError,
            localizedErrors,
          }}
        />
      )}
      flexWrapper={codeMode && curTab === 3}
      priceTableError={priceTableError}
      errors={errors}
      setErrors={setErrors}
      refTab={refTab}
      refScrool={refScrool}
      myRefView={myRefView}
      isScroolUp={isScroolUp}
      setIsScroolUp={setIsScroolUp}
      isScroolDown={isScroolDown}
      setIsScroolDown={setIsScroolDown}
      parentId={parentId || currentProductData?.parentId}
    >
      <ProductDetailsView
        localizedErrors={localizedErrors}
        descriptionData={descriptionData}
        parentDescriptionData={parentDescriptionData}
        setLocalizedErrors={setLocalizedErrors}
        curLocalizedData={curLocalizedData}
        setCurLocalizedData={setCurLocalizedData}
        digitsErrors={digitsErrors}
        setDescriptionData={setDescriptionData}
        setDigitsErrors={setDigitsErrors}
        priceTableError={priceTableError}
        setPriceTableError={setPriceTableError}
        handleDeleteVariation={handleDeleteVariation}
        productData={productData}
        setCurProductData={setCurrentProductData}
        curProductData={currentProductData}
        relatedProduct={relatedProduct}
        selectOptions={selectOptions}
        setProductData={setCurrentProductData}
        curTab={curTab}
        setCurTab={setCurTab}
        productVariations={productVariations}
        setProductLocalizationChanges={setProductLocalizationChanges}
        productDetails={productDetails}
        setProductDetails={setCurrentProductDetails}
        variablesDescriptions={variablesDescriptions}
        storeLanguages={storeLanguages}
        setSaveDisabled={setSaveDisabled}
        setTabsDisabled={setTabsDisabled}
        parentId={parentId || currentProductData?.parentId}
        setCodeMode={setCodeMode}
        codeMode={codeMode}
        jsonIsValid={jsonIsValid}
        setJsonIsValid={setJsonIsValid}
        refTab={refTab}
        refScrool={refScrool}
        isScroolUp={isScroolUp}
        isScroolDown={isScroolDown}
        errors={errors}
        setErrors={setErrors}
      />
    </DetailPageWrapper>
  );
};

export default ProductDetailsScreen;

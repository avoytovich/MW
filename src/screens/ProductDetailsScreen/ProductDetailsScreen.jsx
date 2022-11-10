/* eslint-disable consistent-return */
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { LinearProgress } from '@mui/material';

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
  productVariationRequiredFields,
} from '../../services/helpers/dataStructuring';
import {
  handleGetOptions,
  handleEditorParsing,
  handleGetProductDetails,
  saveLocalizationDetails,
  beforeSend,
  defLocalizationObj,
  defProductVariationObj,
  defaultResourcesFiles,
  notShowMaxPaymentsPart,
} from './utils';
import { setTempProductDescription } from '../../redux/actions/TempData';

import localization from '../../localization';
import api from '../../api';
import { setHeaderCustomerName } from '../../redux/actions/TableData';

const scrollTo = (ele) => {
  ele.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
};
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
  const [hasLoaded, setHasLoaded] = useState(false);

  const [codeMode, setCodeMode] = useState(false);

  const [isLoading, setLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(true);

  const [upd, setUpd] = useState(0);

  const [localizedErrors, setLocalizedErrors] = useState({});
  const [priceTableError, setPriceTableError] = useState([]);
  const [jsonIsValid, setJsonIsValid] = useState(true);
  const [errors, setErrors] = useState({});

  const [contents, setContents] = useState(null);
  const [resources, setResources] = useState(null);
  const [localizedContentHasChanges, setLocalizedContentHasChanges] = useState(false);
  const [productHasChanges, setProductChanges] = useState(false);
  const [productHasLocalizationChanges, setProductLocalizationChanges] = useState(false);
  const parentId = history?.location?.state?.parentId;

  const [customer, setCustomer] = useState(null);

  const [localizedData, setLocalizedData] = useState(null);
  const [curLocalizedData, setCurLocalizedData] = useState(null);
  const [productData, setProductData] = useState(parentId ? null : defaultProduct);
  const [currentProductData, setCurrentProductData] = useState(defaultProduct);

  const [descriptionData, setDescriptionData] = useState({});

  const [productDetails, setProductDetails] = useState(null);
  const [currentProductDetails, setCurrentProductDetails] = useState(null);

  const [storeLanguages, setStoreLanguages] = useState(null);
  const [checkOutStores, setCheckOutStores] = useState([]);

  const [parentDescriptionData, setParentDescriptionData] = useState(null);

  const [relatedProduct, setRelatedProduct] = useState(null);

  // handleGetProductDetails
  const [variablesDescriptions, setVariablesDescriptions] = useState([]);
  // handleGetOptions
  const [productVariations, setSubProductVariations] = useState({});
  const [selectOptions, setSelectOptions] = useState({ ...defaultSelectOptions });
  const [isSaving, setIsSaving] = useState(false);

  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);

  const [digitsErrors, setDigitsErrors] = useState({});

  const generalRef = useRef(null);
  const fulfillmentRef = useRef(null);
  const subscriptionRef = useRef(null);
  const localizedContentRef = useRef(null);
  const pricesRef = useRef(null);
  const productFilesRef = useRef(null);
  const productVariationsRef = useRef(null);
  const sectionRefs = [
    { section: 'general', ref: generalRef },
    { section: 'fulfillment', ref: fulfillmentRef },
    { section: 'subscription', ref: subscriptionRef },
    { section: 'localizedContent', ref: localizedContentRef },
    { section: 'prices', ref: pricesRef },
    { section: 'productFiles', ref: productFilesRef },
  ];
  if (currentProductData && !currentProductData?.parentId) {
    sectionRefs.push({ section: 'productVariations', ref: productVariationsRef });
  }
  const [selectedSection, setSelectedSection] = useState(sectionRefs[0].section);
  const [checkedSections, setCheckedSections] = useState([]);
  const [modified, setModified] = useState(id === 'add' && !parentId ? [] : ['genericName', 'type', 'publisherRefId', 'currency']);
  const backToParentHistory = history?.location?.state?.backToParent;
  const [backToParent, setBackToParent] = useState(!!backToParentHistory);
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
  const handleSetErrors = () => {
    const {
      lifeTime,
      subscriptionTemplate,
      fulfillmentTemplate,
      subProducts,
      genericName,
      type,
      publisherRefId,
      prices,
    } = currentProductData;
    let general = errors.general ? [...errors.general] : [];
    let subscription = errors.subscription ? [...errors.subscription] : [];
    let fulfillment = errors.fulfillment ? [...errors.fulfillment] : [];
    let pricesErrors = errors.prices ? [...errors.prices] : [];

    if (checkValue(lifeTime).name === 'PERMANENT' && checkValue(subscriptionTemplate)) {
      general.push('lifeTime');
      subscription.push('subscriptionModel');
    } else if (errors.general?.includes('lifeTime')) {
      general = general.filter((it) => it !== 'lifeTime');
      subscription = subscription.filter((it) => it !== 'subscriptionModel');
    }
    if (checkValue(fulfillmentTemplate) && checkValue(subProducts)?.length) {
      general.push('bundledProducts');
      fulfillment.push('fulfillmentTemplate');
    } else if (errors.general?.includes('bundledProducts')) {
      general = general.filter((it) => it !== 'bundledProducts');
      fulfillment = fulfillment.filter((it) => it !== 'fulfillmentTemplate');
    }
    if (!checkValue(genericName) && !errors.general?.includes('genericName') && modified.includes('genericName')) {
      general.push('genericName');
    } else if (errors.general?.includes('genericName') && checkValue(genericName)) {
      general = general.filter((it) => it !== 'genericName');
    }
    if (!checkValue(type) && !errors.general?.includes('type') && modified.includes('type')) {
      general.push('type');
    } else if (errors.general?.includes('type') && checkValue(type)) {
      general = general.filter((it) => it !== 'type');
    }
    if (!checkValue(publisherRefId) && !errors.general?.includes('publisherRefId') && modified.includes('publisherRefId')) {
      general.push('publisherRefId');
    } else if (errors.general?.includes('publisherRefId') && checkValue(publisherRefId)) {
      general = general.filter((it) => it !== 'publisherRefId');
    }

    if (!checkValue(prices).defaultCurrency && !errors.prices?.includes('currency') && modified.includes('currency')) {
      pricesErrors.push('currency');
    } else if (errors.prices?.includes('currency') && checkValue(prices).defaultCurrency) {
      pricesErrors = pricesErrors.filter((it) => it !== 'currency');
    }

    const newErrors = {
      ...errors, general, subscription, fulfillment, prices: pricesErrors,
    };
    Object.keys(newErrors).forEach((it) => {
      if (!newErrors[it].length) {
        delete newErrors[it];
      }
    });
    setErrors(newErrors);
  };
  const handleValidate = (sections) => {
    const newErrors = { ...errors };
    const newCheckedSections = [...checkedSections];
    const sectionsValidation = {
      general: () => {
        const general = [{ id: 'genericName', field: 'genericName' }, { id: 'type', field: 'type' }, { id: 'publisherRefId', field: 'publisherRefId' }];
        const generalErrors = general.filter((item) => !currentProductData[item.id]);
        const generalKeys = generalErrors.map((it) => it.field);
        if (generalErrors.length) {
          if (!newErrors.general) {
            newErrors.general = generalKeys;
          } else {
            generalKeys.forEach((el) => {
              if (!errors?.general?.includes(el)) {
                newErrors.general.push(el);
              }
            });
          }
        }
      },
      localizedContent: () => {
        if (Object.keys(localizedErrors).length) {
          newErrors.localizedContent = ['hasError'];
        }
      },
      prices: () => {
        if (!Object.keys(currentProductData.priceByCountryByCurrency).length) {
          newErrors.prices = ['currency'];
        }
      },
    };
    sections.forEach((section) => {
      newCheckedSections.push(section);
      if (sectionsValidation?.[section] && !checkedSections.includes(section)) {
        sectionsValidation?.[section]();
      }
    });
    setErrors(newErrors);
    setCheckedSections(newCheckedSections);
  };
  useEffect(() => {
    if (productHasChanges || parentId) {
      handleSetErrors();
    }
  }, [currentProductData, productHasChanges, parentId]);

  useEffect(() => {
    const localizedKeys = Object.keys(localizedErrors);

    if ((localizedKeys.length && !errors?.localizedContent?.includes('hasError') && checkedSections?.includes('localizedContent'))
      || (localizedKeys.length && !errors?.localizedContent?.includes('hasError') && selectedSection === 'localizedContent')) {
      setErrors({ ...errors, localizedContent: ['hasError'] });
    } else if (!localizedKeys.length && !errors.localizedContent?.includes('fallbackLocale')) {
      const newErrors = { ...errors };
      delete newErrors.localizedContent;
      setErrors(newErrors);
    }
  }, [localizedErrors]);

  useEffect(() => {
    if (curLocalizedData && !checkValue(curLocalizedData?.fallbackLocale) && !errors.localizedContent?.includes('fallbackLocale')) {
      setErrors({ ...errors, localizedContent: ['fallbackLocale'] });
    } else if (errors.localizedContent?.includes('fallbackLocale') && checkValue(curLocalizedData?.fallbackLocale)) {
      const newErrors = { ...errors };
      delete newErrors.localizedContent;
      setErrors(newErrors);
    }
  }, [curLocalizedData]);

  useEffect(() => {
    if (priceTableError.length && !errors?.prices?.includes('hasError')) {
      setErrors({ ...errors, prices: ['hasError'] });
    } else if (!priceTableError.length && errors?.prices?.includes('hasError')) {
      const newErrors = { ...errors };
      const newPrices = [...newErrors.prices].filter((it) => it !== 'hasError');
      if (newPrices.length) {
        newErrors.prices = [...newPrices];
      } else {
        delete newErrors.prices;
      }
      setErrors(newErrors);
    }
  }, [priceTableError]);

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
          setHasLoaded(false);
          setLocalizedContentHasChanges(false);
          setProductLocalizationChanges(false);
          setUpd((c) => c + 1);
        });
    }

    if (productHasChanges) {
      const sendObj = currentProductData?.parentId || parentId
        ? frontToBack(formatePrices)
        : { ...formatePrices };

      if (sendObj.lifeTime) {
        const newNumber = notShowMaxPaymentsPart.includes(sendObj.lifeTime.name) ? '' : sendObj.lifeTime.number;
        sendObj.lifeTime = `${newNumber}${sendObj.lifeTime.name}`;
      }
      if (!sendObj.businessSegment) {
        delete sendObj.businessSegment;
      }
      if (sendObj.nextGenerationOf[0] === '') {
        delete sendObj.nextGenerationOf;
      }

      api.updateProductById(currentProductData.id, sendObj).then(() => {
        if (!localizedContentHasChanges && !productHasLocalizationChanges) {
          toast(localization.t('general.updatesHaveBeenSaved'));
          setHasLoaded(false);
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
    setIsSaving(true);

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
    if (dataToSave.lifeTime) {
      const newNumber = notShowMaxPaymentsPart.includes(dataToSave.lifeTime.name) ? '' : dataToSave.lifeTime.number;
      dataToSave.lifeTime = `${newNumber}${dataToSave.lifeTime.name}`;
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
      }).catch(() => {
        setIsSaving(false);
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
              setHasLoaded(false);
              setLoading(true);
              history.push(`${parentPaths.productlist}/${id_}`);
            });
        } else {
          toast(localization.t('general.updatesHaveBeenSaved'));
          setLocalizedContentHasChanges(false);
          setProductLocalizationChanges(false);
          setHasLoaded(false);
          setLoading(true);
          history.push(`${parentPaths.productlist}/${id_}`);
        }
      });
    }).catch(() => {
      setIsSaving(false);
    });
  };

  useEffect(() => {
    let isCancelled = false;
    const productId = id === 'add' ? parentId : id;
    setSelectedSection(sectionRefs[0].section);
    if (id !== 'add' || (parentId && !productData)) {
      api.getProductById(productId).then(({ data: product }) => {
        if (!isCancelled) {
          if (product?.parentId) {
            api.getProductById(product.parentId).then(({ data }) => {
              const result = backToFront(
                productRequiredFields(data),
                productVariationRequiredFields(product),
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
              const result = backToFront(checkedProduct, checkedProduct);
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
          const newData = { ...currentProductData, customerId, catalogId };
          setProductData(JSON.parse(JSON.stringify(newData)));
          setCurrentProductData(newData);
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
    setProductChanges(JSON.stringify(currentProductData) !== JSON.stringify(productData) || (parentId && id === 'add'));

    return () => setProductChanges(false);
  }, [currentProductData]);

  useEffect(() => {
    if (curLocalizedData?.i18nFields?.[curLocalizedData?.fallbackLocale]
      && !localizedData?.i18nFields?.[curLocalizedData?.fallbackLocale]
      && !Object.keys(localizedData?.i18nFields).length) {
      setLocalizedData(JSON.parse(JSON.stringify(curLocalizedData)));
    } else {
      setLocalizedContentHasChanges(JSON.stringify(curLocalizedData)
        !== JSON.stringify(localizedData));
      return () => setLocalizedContentHasChanges(false);
    }
  }, [curLocalizedData, localizedData]);

  useEffect(() => {
    if (selectOptions.sellingStores) {
      filterCheckoutStores();
      setDataLoading(false);
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
    let toSetData = checkValue(currentProductData?.relatedContents) || [];

    if (Array.isArray(toSetData)) {
      if (!toSetData.length) {
        toSetData = [{ ...defaultResourcesFiles }];
      }
      setContents([...toSetData]);
    }

    if (toSetData.value) {
      if (!toSetData?.value?.length) {
        toSetData = [{ ...defaultResourcesFiles }];
      }
      setContents([...toSetData.value]);
    }
  }, [currentProductData.relatedContents]);
  useEffect(() => {
    let toSetData = checkValue(currentProductData?.resources) || [];

    if (!toSetData.length) {
      toSetData = [{ ...defaultResourcesFiles }];
    }

    setResources([...toSetData]);
  }, [currentProductData.resources]);
  useEffect(() => {
    if (!isLoading && contents && resources && !dataLoading) {
      setHasLoaded(true);
    }
  }, [contents, resources, isLoading, dataLoading]);

  useEffect(() => {
    if (hasLoaded && backToParent) {
      scrollTo(productVariationsRef.current);
      window.history.replaceState({}, '');
      setSelectedSection(sectionRefs[6].section);
      setBackToParent(false);
    }
  }, [hasLoaded, backToParent]);

  if (!parentId
    && !currentProductData?.parentId
    && currentProductData?.createDate?.parentValue) return <LinearProgress />;

  if (customer) {
    dispatch(setHeaderCustomerName({ ...customer }));
  }
  useEffect(() => {
    const keysSections = sectionRefs.map((sect) => sect.section);
    const sectionIndex = keysSections.indexOf(selectedSection);
    if (sectionIndex > 0) {
      const newArray = keysSections.slice(0, sectionIndex);
      const validateSections = [];
      newArray.forEach((it) => {
        if (!checkedSections.includes(it)) {
          validateSections.push(it);
        }
      });
      if (validateSections.length) {
        handleValidate(validateSections);
      }
    }
  }, [selectedSection]);

  const handleSaveIsDisabled = () => !currentProductData?.type
    || !Object.keys(currentProductData?.priceByCountryByCurrency).length
    || Object.keys(localizedErrors).length
    || !currentProductData.publisherRefId
    || Object.keys(errors).length;

  return (
    <DetailPageWrapper
      sectionRefs={sectionRefs}
      nxState={nxState}
      id={id}
      name={
        id === 'add'
          ? localization.t('labels.newProduct')
          : `${productData?.genericName?.value || productData?.genericName} - ${id}`
      }
      saveIsDisabled={handleSaveIsDisabled() || isSaving}
      hasChanges={productHasChanges || localizedContentHasChanges}
      isLoading={!hasLoaded}
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
      flexWrapper={codeMode}
      priceTableError={priceTableError}
      errors={errors}
      parentId={parentId || currentProductData?.parentId}
      selectedSection={selectedSection}
      setSelectedSection={setSelectedSection}
      setBackToParent={setBackToParent}
    >
      <ProductDetailsView
        modified={modified}
        setModified={setModified}
        setErrors={setErrors}
        contents={contents}
        resources={resources}
        sectionRefs={sectionRefs}
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
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

        productVariations={productVariations}
        setProductLocalizationChanges={setProductLocalizationChanges}
        productDetails={productDetails}
        setProductDetails={setCurrentProductDetails}
        variablesDescriptions={variablesDescriptions}
        storeLanguages={storeLanguages}
        parentId={parentId || currentProductData?.parentId}
        setCodeMode={setCodeMode}
        codeMode={codeMode}
        jsonIsValid={jsonIsValid}
        setJsonIsValid={setJsonIsValid}
        errors={errors}
      />
    </DetailPageWrapper>
  );
};

export default ProductDetailsScreen;

import {
  structureSelectOptions,
  renewingProductsOptions,
  productsVariations,
  localizedValues,
  backToFront,
} from '../../services/helpers/dataStructuring';
import api from '../../api';

const handleGetOptions = (
  customerId,
  id,
  descriptionId,
  isCancelled,
  setSelectOptions,
  selectOptions,
  setSubProductVariations,
  setCatalog,
) => {
  let subscriptionOptions = null;

  const promiseArray = [
    api.getSellingStoreOptions(customerId),
    api.getRenewingProductsByCustomerId(customerId),
    api.getFulfillmentTemplateByCustomerId(customerId),
    api.getCatalogsByCustomerId(customerId),
    api.getPriceFunctionsCustomerByIds(customerId),
    id ? api.getSubProductsById(id) : null,
    descriptionId ? api.getProductDescriptionById(descriptionId) : null,
  ];

  api.getCustomerById(customerId).then(({ data: curCustomer }) => {
    if (curCustomer?.usingSubscriptionV1) {
      promiseArray.push(api.getSubscriptionModelsByCustomerId(customerId));
    } else {
      subscriptionOptions = Object.keys(curCustomer?.subscriptions).map((item) => ({
        id: item,
        value: item,
      }));
    }
    Promise.all(promiseArray).then(
      ([
        sellingStores,
        renewingProducts,
        fulfillmentTemplates,
        catalogs,
        priceFunctionsOptions,
        subProducts,
        subscriptions,
        // productDetails,
      ]) => {
        if (!subscriptionOptions) {
          subscriptionOptions = structureSelectOptions(subscriptions?.data?.items, 'name');
        }
        setSubProductVariations({
          bundledProducts: subProducts?.data?.items,
          variations: productsVariations(renewingProducts?.data?.items, id),
        });

        // setProductDetails(productDetails?.data);

        if (!isCancelled) {
          setSelectOptions({
            ...selectOptions,
            sellingStores:
              structureSelectOptions(sellingStores.data?.items, 'name', 'hostnames') || [],
            renewingProducts: renewingProductsOptions(renewingProducts.data?.items) || [],
            fulfillmentTemplates:
              structureSelectOptions(fulfillmentTemplates.data?.items, 'name') || [],
            catalogs: structureSelectOptions(catalogs.data?.items, 'name') || [],
            priceFunctions:
              structureSelectOptions(priceFunctionsOptions.data?.items, 'name') || [],
            subscriptionModels: subscriptionOptions || [],
          });

          if (catalogs.data?.items?.length) {
            setCatalog(catalogs.data?.items[0].id);
          }
        }
      },
    );
  });
};

const handleGetProductDetails = (
  descriptionId,
  setVariablesDescriptions,
  setProductDetails,
) => {
  if (!descriptionId) return;
  const result = {};
  if (descriptionId?.state) {
    Promise.all([
      api.getProductDescriptionById(descriptionId?.value),
      api.getProductDescriptionById(descriptionId?.parentValue),
    ]).then(([productDescr, parentDescr]) => {
      const avail = [];

      localizedValues.forEach((it) => {
        if (productDescr?.data[it]) {
          Object.keys(productDescr?.data[it]).forEach((loc) => {
            if (avail.indexOf(loc) < 0) {
              avail.push(loc);
            }
          });
        }
      });

      const { data } = productDescr;
      const { data: dataParent } = parentDescr;
      const i18nFields = avail.reduce((accumulator, current) => {
        const childLocalizedValues = localizedValues.reduce(
          (acc, curr) => ({ ...acc, [curr]: data[curr] ? data[curr][current] : '' }),
          {},
        );
        const parentLocalizedValues = localizedValues.reduce(
          (acc, curr) => ({
            ...acc,
            [curr]: dataParent[curr] ? dataParent[curr][current] : '',
          }),
          {},
        );
        return {
          ...accumulator,
          [current]: backToFront(parentLocalizedValues, childLocalizedValues),
        };
      }, {});

      const productDescrData = { ...productDescr?.data };
      localizedValues.forEach((item) => delete productDescrData[item]);
      // eslint-desible-next-line
      productDescrData.i18nFields = i18nFields;

      if (dataParent?.variableDescriptions) {
        setVariablesDescriptions(dataParent?.variableDescriptions);
      }
      setProductDetails(productDescrData);

      result.avail = avail;
    });
    return;
  }
  api.getProductDescriptionById(descriptionId).then(({ data }) => {
    const avail = [];
    localizedValues.forEach((it) => {
      if (data[it]) {
        Object.keys(data[it]).forEach((loc) => {
          if (avail.indexOf(loc) < 0) {
            avail.push(loc);
          }
        });
      }
    });

    const i18nFields = avail.reduce((accumulator, current) => {
      const childLocalizedValues = localizedValues.reduce(
        (acc, curr) => ({ ...acc, [curr]: data[curr] ? data[curr][current] : '' }),
        {},
      );

      return {
        ...accumulator,
        [current]: childLocalizedValues,
      };
    }, {});

    const productDescrData = { ...data };
    localizedValues.forEach((item) => delete productDescrData[item]);
    // eslint-desible-next-line
    productDescrData.i18nFields = i18nFields;

    if (data?.variableDescriptions) {
      setVariablesDescriptions(data?.variableDescriptions);
    }
    setProductDetails(productDescrData);
  });
};

export { handleGetOptions, handleGetProductDetails };

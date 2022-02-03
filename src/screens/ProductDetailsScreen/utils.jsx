import {
  structureSelectOptions,
  renewingProductsOptions,
  productsVariations,
  localizedValues,
  backToFront,
} from '../../services/helpers/dataStructuring';
import api from '../../api';

const handleGetOptions = (
  setLoading,
  customerId,
  id,
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
      ]) => {
        if (!subscriptionOptions) {
          subscriptionOptions = structureSelectOptions({ options: subscriptions?.data?.items, optionValue: 'name' });
        }

        setSubProductVariations({
          bundledProducts: subProducts?.data?.items,
          variations: productsVariations(renewingProducts?.data?.items, id),
        });

        if (!isCancelled) {
          setSelectOptions({
            ...selectOptions,
            sellingStores:
              structureSelectOptions({ options: sellingStores.data?.items, optionValue: 'name', otherOptions: ['hostnames', 'saleLocales', 'defaultLocale'] }) || [],
            renewingProducts: renewingProductsOptions(renewingProducts.data?.items) || [],
            fulfillmentTemplates:
              structureSelectOptions({ options: fulfillmentTemplates.data?.items, optionValue: 'name' }) || [],
            catalogs: structureSelectOptions({ options: catalogs.data?.items, optionValue: 'name' }) || [],
            priceFunctions:
              structureSelectOptions({ options: priceFunctionsOptions.data?.items, optionValue: 'name' }) || [],
            subscriptionModels: subscriptionOptions || [],
          });

          if (catalogs.data?.items?.length) {
            setCatalog(catalogs.data?.items[0].id);
          }
        }
      },
    );
  }).finally(() => setLoading(false));
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

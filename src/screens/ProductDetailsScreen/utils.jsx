import {
  structureSelectOptions,
  renewingProductsOptions,
  productsVariations,
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
  setProductDetails,
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
      ]) => {
        if (!subscriptionOptions) {
          subscriptionOptions = structureSelectOptions(subscriptions.data?.items, 'name');
        }
        setSubProductVariations({
          bundledProducts: subProducts?.data?.items,
          variations: productsVariations(renewingProducts?.data?.items, id),
        });

        setProductDetails(productDetails?.data);

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
        }
      },
    );
  });
};

export default handleGetOptions;

/* eslint-disable no-else-return */
import moment from 'moment';
import api from '../../../api';
import localization from '../../../localization';

const defLocalizedContent = {
  customerId: '',
  description: '-',
  fallbackLocale: '',
  localizedLongDesc: {},
  localizedManualRenewalEmailDesc: {},
  localizedMarketingName: {},
  localizedPurchaseEmailDesc: {},
  localizedShortDesc: {},
  localizedThankYouDesc: {},
};
const requiredFields = { productlist: ['publisherRefId'] };
const keyName = {
  discountrules: 'discountRuleName',
  recommendations: 'name',
  productlist: 'genericName',
};
const localsToDelete = ['description', 'dbVersion', 'createDate', 'lastUpdateReason', 'id', 'updateDate'];
const sections = {
  discountrules: { general: true, cappingAndLimits: true, eligibility: true },
  recommendations: {
    general: true, eligibility: true, cappingAndLimits: true, recommendations: true,
  },
  productlist: {
    general: true,
    fulfillment: true,
    subscription: true,
    localizedContent: true,
    prices: true,
    productFiles: true,
    productVariations: true,
  },
};
const duplicateParamsByScope = {
  discountrules: {
    sections: {
      general: ['status', 'discountRate', 'amountByCurrency', 'applyOnNetPrice', 'model', 'codes', 'externalContext', 'localizedLabels'],
      cappingAndLimits: ['maxUsages', 'maxUsePerEndUser', 'maxUsePerStore', 'startDate', 'endDate'],
      eligibility: ['endUserTypes', 'sources', 'endUserGroupIds', 'enduserId',
        'endUserEmails', 'countries', 'storeIds', 'parentProductIds',
        'productIds', 'publisherRefIds', 'thresholds'],
    },
    needsToBeDeleted: [
      'createDate',
      'cumulative',
      'dbVersion',
      'lastUpdateReason',
      'testOrder',
      'updateDate',
      'weight',
      'id',
    ],
    requiresFields: {
      discountRate: 0.1,
      endDate: moment.utc(Date.now() + 6.048e8).utc().format(),
      endUserTypes: ['BUYER', 'RESELLER'],
      level: 'PRODUCT',
      model: 'CAMPAIGN',
      status: 'ENABLED',
    },
    api: { get: api.getDiscountById, post: api.addNewDiscount },
  },
  recommendations: {
    sections: {
      general: ['status', 'weight', 'fallbackLocale', 'type', 'levels', 'sources'],
      eligibility: ['eligibleStoreIds', 'eligibleProductIds', 'eligibleParentProductIds'],
      cappingAndLimits: ['startDate', 'endDate'],
      recommendations: ['function', 'productIds', 'byProductIds', 'byParentProductIds'],
    },
    needsToBeDeleted: [
      'createDate',
      'dbVersion',
      'lastUpdateReason',
      'updateDate',
      'id',
    ],
    requiresFields: {
      function: 'idToIdsRecoRule',
      levels: ['PRODUCT'],
      sources: ['PURCHASE'],
      status: 'ENABLED',
      weight: 0,
      type: 'CROSS_SELL',
    },
    api: { get: api.getRecoById, post: api.addNewRecommendation },
  },
  productlist: {
    sections: {
      general: ['businessSegment', 'priority', 'sellingStores', 'blackListedCountries', 'subProducts', 'lifeTime', 'productFamily', 'physical'],
      fulfillment: ['fulfillmentTemplate', 'externalContext'],
      subscription: ['subscriptionTemplate', 'trialAllowed', 'nextGenerationOf', 'trialDuration'],
      localizedContent: [],
      productFiles: ['resources'],
      productVariations: ['availableVariables'],
      prices: [],
    },
    needsToBeDeleted: [
      'createDate',
      'dbVersion',
      'lastUpdateReason',
      'updateDate',
      'id',
    ],
    requiresFields: {
      lifeTime: 'PERMANENT',
      trialAllowed: false,
      status: 'DISABLED',
    },
    api: {
      get: api.getProductById,
      post: async (product, additionalData, attributes, initialData) => {
        let priceByCountryByCurrency = { ...product.prices.priceByCountryByCurrency };
        if (!attributes.prices) {
          const defLang = product.prices.defaultCurrency;
          priceByCountryByCurrency = {
            [defLang]: { default: product.prices.priceByCountryByCurrency[defLang].default },
          };
        }
        let localsToSend = {
          ...defLocalizedContent, customerId: product?.customerId,
        };
        if (attributes.localizedContent) {
          localsToSend = {
            ...additionalData.description,
          };
          localsToDelete.forEach((item) => {
            delete localsToSend[item];
          });
        } else {
          const fallbackLocale = additionalData.description?.fallbackLocale;
          localsToSend.fallbackLocale = fallbackLocale;
          localsToSend.localizedMarketingName = {
            [fallbackLocale]: additionalData.description.localizedMarketingName[fallbackLocale],
          };
        }

        localsToSend.description = '-';

        const descriptionId = await api.addProductLocalsById(localsToSend).then((res) => {
          const headersLocation = res.headers.location.split('/');
          const newId = headersLocation[headersLocation.length - 1];

          return newId || '';
        });
        let funcRes = {};

        const parentId = await api.addNewProduct({
          ...product,
          descriptionId,
          status: 'DISABLED',
          prices: { ...product.prices, priceByCountryByCurrency },
        }).then((res) => {
          funcRes = res;
          const headers = res.headers.location.split('/');
          return headers[headers.length - 1] || '';
        });
        if (attributes.productVariations) {
          const requests = [];
          additionalData.variations.forEach((prodChild) => {
            const sendVariation = { ...prodChild };
            duplicateParamsByScope.productlist.needsToBeDeleted.forEach((key) => {
              delete sendVariation[key];
            });
            let sellingStores = [...sendVariation.sellingStores];
            if (JSON.stringify(initialData.sellingStores)
              === JSON.stringify(sendVariation.sellingStores)
              && !sellingStores.general) {
              sellingStores = [];
            }
            if (sendVariation.genericName) {
              const genericName = `Copy of ${sendVariation.genericName}`;
              sendVariation.genericName = genericName;
            }
            const sendLocals = { ...sendVariation.descriptionData };
            localsToDelete.forEach((item) => {
              delete sendLocals[item];
            });
            sendLocals.description = '-';
            delete sendVariation.descriptionData;
            const request = api.addProductLocalsById(localsToSend).then((res) => {
              const headersLocation = res.headers.location.split('/');
              const childDescriptionId = headersLocation[headersLocation.length - 1];
              api.addNewProduct({
                ...sendVariation,
                parentId,
                descriptionId: childDescriptionId,
                publisherRefId: product.publisherRefId,
                sellingStores,
                status: 'DISABLED',
              });
            });
            requests.push(
              request,
            );
          });
          return Promise.allSettled(requests).then(() => funcRes);
        } else { return funcRes; }
      },
      additional: {
        get: async (data) => Promise.allSettled(
          [api.getProductDescriptionById(data.descriptionId),
            api.getProducts({ parentId: data.id })],
        )
          .then((
            [productDescriptionData, variationsData],
          ) => {
            const description = productDescriptionData.value?.data || null;
            let variations = null;

            if (variationsData.value?.data.items.length) {
              const descArr = variationsData.value?.data.items.map(
                (i) => api.getProductDescriptionById(i.descriptionId),
              );
              Promise.allSettled(descArr).then((descRes) => {
                const variationsWithDescription = variationsData.value?.data.items
                  .map((variation) => {
                    const descriptionData = descRes.find(
                      (d) => d.value.data.id === variation.descriptionId,
                    ).value?.data || {};
                    return ({ ...variation, descriptionData });
                  });
                variations = variationsWithDescription || null;
                return { description, variations };
              });
            }
            return ((productDescriptionData.value?.data
              || variationsData.value?.data.items.length) ? ({
                description: productDescriptionData.value?.data || null,
                variations: variationsData.value?.data.items || null,
              }) : null);
          }),
      },
    },
    validation: ({ attributes }) => {
      let errors = null;
      if (!attributes.general && attributes.subscription) {
        errors = localization.t('errorNotifications.subscriptionCanBeCopiedOnlyWithGeneralSection');
      }
      return errors;
    },
  },
};
const formateFunc = {
  discountrules: (data) => {
    const resData = { ...data };
    if (data.amountByCurrency) {
      delete resData.discountRate;
    }
    return resData;
  },
};

// eslint-disable-next-line no-confusing-arrow
const beforeSendFormate = (scope, data) => formateFunc[scope] ? formateFunc[scope](data) : data;

export {
  duplicateParamsByScope,
  sections,
  beforeSendFormate,
  keyName,
  requiredFields,
};

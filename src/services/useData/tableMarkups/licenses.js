import { getCustomerName, getCustomerNameSync } from '../../helpers/customersHelper';
import localization from '../../../localization';

const defaultShow = {
  id: true,
  customer: true,
  status: true,
  orderId: true,
  orderLineId: true,
  firstName: true,
  lastName: true,
  email: true,
  city: true,
  country: true,
  locale: true,
  productId: true,
  licenseProviderDefinition: true,
  publisherProductId: true,

  productName: true,
};
const markUp = {
  headers: [
    { value: localization.t('labels.licenseId'), id: 'id' },
    {
      value: localization.t('labels.customer'),
      id: 'customer',
    },
    {
      value: localization.t('labels.status'),
      id: 'status',
    },
    {
      value: localization.t('labels.orderId'),
      id: 'orderId',
    },
    {
      value: localization.t('labels.orderLineId'),
      id: 'orderLineId',
    },
    {
      value: localization.t('labels.firstName'),
      id: 'firstName',
    },
    {
      value: localization.t('labels.lastName'),
      id: 'lastName',
    },
    { value: localization.t('labels.email'), id: 'email' },
    {
      value: localization.t('labels.city'),
      id: 'city',
    },
    {
      value: localization.t('labels.country'),
      id: 'country',
    },
    {
      value: localization.t('labels.locale'),
      id: 'locale',
    },
    {
      value: localization.t('labels.productId'),
      id: 'productId',
    },
    {
      value: localization.t('labels.licenseProviderDefinition'),
      id: 'licenseProviderDefinition',
    },
    {
      value: localization.t('labels.publisherProductId'),
      id: 'publisherProductId',
    },
    {
      value: localization.t('labels.productName'),
      id: 'productName',
    },
  ],
};

const generateData = (data) => {
  const usedCustomers = [];

  const values = data.items.map(async (val) => {
    const returnData = {
      id: val.id,
      customer: val.customerId,
      status: val.status,
      orderId: val.checkout?.orderId,
      orderLineId: val.checkout?.orderLineId,
      firstName: val.user?.firstName,
      lastName: val.user?.lastName,
      email: val.user?.email,
      city: val.user?.city,
      country: val.user?.country,
      locale: val.user?.locale,
      productId: val.product?.id,
      licenseProviderDefinition: val.product?.licenseProviderDefinitionId,
      publisherProductId: val.product?.publisherProductId,
      productName: val.product?.name,
    };

    if (val?.customerId && usedCustomers.indexOf(val.customerId) < 0) {
      usedCustomers.push(val.customerId);
    }

    return returnData;
  });

  const meta = {
    totalPages: data.totalPages,
  };

  return Promise
    .all(values)
    .then(async (resp) => {
      const promises = usedCustomers.map((c) => getCustomerName(c));

      await Promise
        .all(promises)
        .finally(() => Object.assign(markUp, {
          values: resp.map((r) => {
            const name = getCustomerNameSync(r.customer);

            return { ...r, customer: name };
          }),
          meta,
        }));

      return markUp;
    });
};

export { generateData, defaultShow, markUp };

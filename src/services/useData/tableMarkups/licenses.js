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
  const values = data.items.map((val) => ({
    id: val.id,
    customer: val.customerId,
    status: val.status,
    orderId: val.checkout.orderId,
    orderLineId: val.checkout.orderLineId,
    firstName: val.user.firstName,
    lastName: val.user.lastName,
    email: val.user.email,
    city: val.user.city,
    country: val.user.country,
    locale: val.user.locale,
    productId: val.product.id,
    licenseProviderDefinition: val.product.licenseProviderDefinitionId,
    publisherProductId: val.product.publisherProductId,
    productName: val.product.name,
  }));

  const meta = {
    totalPages: data.totalPages,
  };

  Object.assign(markUp, { values, meta });
  return markUp;
};

export { generateData, defaultShow, markUp };

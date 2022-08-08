import moment from 'moment';

const tabLabelsView = ['general', 'endUser', 'products', 'emails'];
const tabLabelsAdd = ['general', 'endUser'];

const structureGeneral = (cartData, customer, store) => ([
  {
    label: 'cartId',
    field: cartData?.id || '-',
  },
  {
    label: 'checkoutUrl',
    field: cartData?.checkoutUrl || '-',
  },
  {
    label: 'createDate',
    field: moment.tz(cartData?.createDate, Intl.DateTimeFormat().resolvedOptions().timeZone).format('YYYY-MM-DD HH:mm:ss Z z') || '-',
  },
  {
    label: 'cartsUpdateDate',
    field: moment.tz(cartData?.updateDate, Intl.DateTimeFormat().resolvedOptions().timeZone).format('YYYY-MM-DD HH:mm:ss Z z') || '-',
  },
  {
    label: 'scheduledRemoval',
    field: `${moment.tz(cartData?.scheduledSuppressionDate, Intl.DateTimeFormat().resolvedOptions().timeZone).format('YYYY-MM-DD HH:mm:ss Z z')} => in 3 days` || '-',
  },
  {
    label: 'source',
    field: cartData?.source || '-',
  },
  {
    label: 'customer',
    field: customer?.name || '-',
  },
  {
    label: 'store',
    field: store?.name || '-',
  },
  {
    label: 'amount',
    field: `${cartData?.currency} ${cartData?.totalAmount}` || '-',
  },
  {
    label: 'locale',
    field: cartData?.locale || '-',
  },
  {
    label: 'country',
    field: cartData?.country || '-',
  },
  {
    label: 'salesFlags',
    field: (cartData?.salesFlags?.length && cartData?.salesFlags) || '-',
  },
  {
    label: 'externalContext',
    field: cartData?.externalContext || '-',
  },
  {
    label: 'decodedExtContext',
    field: cartData?.decodedExtContext || '-',
  },
]);

const structureEndUser = (cartData) => ([
  {
    label: 'firstName',
    field: cartData?.endUser?.firstName || '-',
  },
  {
    label: 'lastName',
    field: cartData?.endUser?.lastName || '-',
  },
  {
    label: 'emailAddress',
    field: cartData?.endUser?.email || '-',
  },
  {
    label: 'streetAddress',
    field: cartData?.endUser?.streetAddress || '-',
  },
  {
    label: 'city',
    field: cartData?.endUser?.city || '-',
  },
  {
    label: 'zip',
    field: cartData?.endUser?.zipCode || '-',
  },
  {
    label: 'locale',
    field: cartData?.endUser?.locale || '-',
  },
  {
    label: 'country',
    field: cartData?.endUser?.country || '-',
  },
  {
    label: 'phone',
    field: cartData?.endUser?.phone || '-',
  },
  {
    label: 'companyName',
    field: cartData?.endUser?.companyName || '-',
  },
  {
    label: 'vatNumber',
    field: cartData?.endUser?.vatNumber || '-',
  },
  {
    label: 'taxOffice',
    field: cartData?.endUser?.taxOffice || '-',
  },
  {
    label: 'taxIdNumber',
    field: cartData?.endUser?.taxIdNumber || '-',
  },
]);

const checkBoxSource = [
  {
    label: 'Acquisition',
    value: 'ACQUISITION',
  },
  {
    label: 'Manual Renewal',
    value: 'MANUAL_RENEWAL',
  },
];

const checkBoxBuyerDetails = [
  {
    label: 'No information about buyer yet',
    value: 'No_information_about_buyer_yet',
  },
  {
    label: 'Fill-in details directly',
    value: 'Fill-in_details_directly',
  },
  {
    label: 'Refer to an existing end-user (private cart)',
    value: 'Refer_to_an_existing_end-user_(private cart)',
  },
];

const checkBoxSalutation = [
  {
    label: 'Mr',
    value: 'mr',
  },
  {
    label: 'Mrs',
    value: 'mrs',
  },
];

export {
  tabLabelsView,
  tabLabelsAdd,
  structureGeneral,
  structureEndUser,
  checkBoxSource,
  checkBoxBuyerDetails,
  checkBoxSalutation,
};

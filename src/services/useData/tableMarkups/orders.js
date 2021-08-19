import moment from 'moment';
import localization from '../../../localization';

const defaultShow = {
  customer: true,
  custoemrStatus: true,
  email: true,
  createDate: true,
  updateDate: true,
  status: true,
  source: true,
  orderId: true,
  invoiceId: true,
  phone: true,
  store: true,
  companyName: true,
  netPrice: true,
  grossPrice: true,
  vatAmount: true,
  discountedNetPrice: true,
  discountedGrossPrice: true,
  vatDiscountAmount: true,
  splitPayment: true,
  activationCodeKey: true,
  publisherRefId: true,
  transactionId: true,
  subscriptionStatus: true,
  creditNoteId: true,
  cancelationReasons: true,
  preorder: true,
  id: false,
  currency: true,
  products: true,
  priceFunction: true,
  country: true,
  ip: true,
  paymentType: true,
  invoiceDate: true,
  lastName: true,
  firstName: true,
  paymentStatus: true,
  subscriptionId: true,
  informativeDPStatus: true,
  salesFlags: true,
};

const markUp = {
  headers: [
    { value: localization.t('labels.id'), id: 'id' },
    { value: localization.t('labels.customer'), id: 'customer' },
    { value: localization.t('labels.custoemrStatus'), id: 'custoemrStatus' },
    {
      value: localization.t('labels.createDate'),
      id: 'createDate',
      sortParam: 'createDate',
    },
    {
      value: localization.t('labels.lastUpdate'),
      id: 'updateDate',
      sortParam: 'updateDate',
    },
    {
      value: localization.t('labels.status'),
      id: 'status',
      sortParam: 'status',
    },
    {
      value: localization.t('labels.source'),
      id: 'source',
      sortParam: 'source',
    },
    {
      value: localization.t('labels.orderId'),
      id: 'orderId',
    },
    {
      value: localization.t('labels.invoiceId'),
      id: 'invoiceId',
      sortParam: 'invoice.id',
    },
    {
      value: localization.t('labels.email'),
      id: 'email',
      sortParam: 'endUser.email',
    },
    {
      value: localization.t('labels.phone'),
      id: 'phone',
      sortParam: 'endUser.phone',
    },
    {
      value: localization.t('labels.onlineStore'),
      id: 'store',
      sortParam: 'store.name',
    },
    {
      value: localization.t('labels.companyName'),
      id: 'companyName',
      sortParam: 'endUser.company.companyName',
    },
    {
      value: localization.t('labels.netPrice'),
      id: 'netPrice',
      sortParam: 'fullTotalAmount.netPrice',
    },
    {
      value: localization.t('labels.grossPrice'),
      id: 'grossPrice',
      sortParam: 'fullTotalAmount.grossPrice',
    },
    {
      value: localization.t('labels.vatAmount'),
      id: 'vatAmount',
      sortParam: 'fullTotalAmount.vatAmount',
    },
    {
      value: localization.t('labels.discountedNetPrice'),
      id: 'discountedNetPrice',
      sortParam: 'fullTotalAmount.discountedPrice.discountedNetPrice',
    },
    {
      value: localization.t('labels.discountedGrossPrice'),
      id: 'discountedGrossPrice',
      sortParam: 'fullTotalAmount.discountedPrice.discountedGrossPrice',
    },
    {
      value: localization.t('labels.vatDiscountAmount'),
      id: 'vatDiscountAmount',
      sortParam: 'fullTotalAmount.discountedPrice.vatDiscountAmount',
    },
    {
      value: localization.t('labels.currency'),
      id: 'currency',
      sortParam: 'currency',
    },
    {
      value: localization.t('labels.splitPayment'),
      id: 'splitPayment',
    },
    {
      value: localization.t('labels.activationCodeKey'),
      id: 'activationCodeKey',
      sortParam: 'lineItems.activationCode',
    },
    {
      value: localization.t('labels.publisherRefId'),
      id: 'publisherRefId',
      sortParam: 'lineItems.publisherRefId',
    },
    {
      value: localization.t('labels.products'),
      id: 'products',
      sortParam: 'products',
    },
    { value: localization.t('labels.priceFunction'), id: 'priceFunction' },
    {
      value: localization.t('labels.transactionId'),
      id: 'transactionId',
      sortParam: 'payment.transactionId',
    },
    { value: localization.t('labels.paymentType'), id: 'paymentType' },
    {
      value: localization.t('labels.invoiceDate'),
      id: 'invoiceDate',
      sortParam: 'invoice.date',
    },
    {
      value: localization.t('labels.lastName'),
      id: 'lastName',
      sortParam: 'endUser.lastName',
    },
    {
      value: localization.t('labels.firstName'),
      id: 'firstName',
      sortParam: 'endUser.firstName',
    },
    {
      value: localization.t('labels.country'),
      id: 'country',
      sortParam: 'endUser.country',
    },
    {
      value: localization.t('labels.ip'),
      id: 'ip',
      sortParam: 'endUserIp',
    },
    {
      value: localization.t('labels.paymentStatus'),
      id: 'paymentStatus',
      sortParam: 'paymentStatus',
    },
    {
      value: localization.t('labels.estimatedPaymentStatus'),
      id: 'informativeDPStatus',
      sortParam: 'informativeDPStatus',
    },
    {
      value: localization.t('labels.subscriptionStatus'),
      id: 'subscriptionStatus',
      sortParam: 'subscriptionStatus',
    },
    {
      value: localization.t('labels.creditNoteId'),
      id: 'creditNoteId',
      sortParam: 'creditNotes.id',
    },
    {
      value: localization.t('labels.cancelationReasons'),
      id: 'cancelationReasons',
    },
    {
      value: localization.t('labels.preorder'),
      id: 'preorder',
    },
    {
      value: localization.t('labels.subscriptionId'),
      id: 'subscriptionId',
      sortParam: 'subscriptionId',
    },
    {
      value: localization.t('labels.salesFlags'),
      id: 'salesFlags',
      sortParam: 'salesFlags',
    },
  ],
};

const generateData = (data, customers, stores) => {
  const values = data.items.map((val) => {
    const priceFunction = val.lineItems[0]?.priceFunctionParameters;

    const customer = customers.items.filter(
      (item) => item.id === val.customer?.id,
    )[0]?.name;
    const store = stores.items.filter(
      (item) => item.id === val.endUser?.storeId,
    )[0]?.name;

    return {
      customer,
      custoemrStatus: val.customer.status === 'RUNNING' ? 'Live' : 'Test',
      createDate: val.createDate,
      updateDate: val.updateDate,
      email: val.endUser?.email,
      status: val.status,
      source: val.source,
      orderId: val.id,
      phone: val.endUser.phone,
      companyName: val.endUser?.company?.companyName,
      netPrice: val?.fullTotalAmount?.netPrice,
      grossPrice: val?.fullTotalAmount?.grossPrice,
      vatAmount: val?.fullTotalAmount?.vatAmount,
      discountedNetPrice: val?.fullTotalAmount?.discountedPrice?.discountedNetPrice,
      discountedGrossPrice: val?.fullTotalAmount?.discountedPrice?.discountedGrossPrice,
      vatDiscountAmount: val?.fullTotalAmount?.discountedPrice?.vatDiscountAmount,
      splitPayment: 'N/A',
      activationCodeKey: val?.lineItems[0]?.activationCode || '-',
      publisherRefId: val?.lineItems[0]?.publisherRefId,
      transactionId: val?.payment?.transactionId,
      subscriptionStatus: val?.subscriptionStatus,
      creditNoteId: val?.creditNotes?.id,
      cancelationReasons: val?.creditNotes?.id,
      preorder: val.preorder ? 'Yes' : 'No',
      store,
      id: val.id,
      invoiceId: val?.invoice?.id,
      currency: val.lineItems[0]?.currency,
      products: val.lineItems[0]?.name,
      priceFunction: `${priceFunction !== undefined ? `${Object.keys(priceFunction)}:${Object.values(priceFunction)}` : ''}`,
      country: val.endUser?.country,
      ip: val.endUserIp,
      paymentType: val.payments && val.payments[0]?.methodType,
      invoiceDate: val?.invoice && moment(val?.invoice?.date).format('YYYY-MM-DD kk:mm'),
      lastName: val.endUser.lastName,
      firstName: val.endUser.firstName,
      paymentStatus: val.payments && val.payments[0]?.status,
      informativeDPStatus: val?.informativeDPStatus,
      subscriptionId: val.lineItems[0]?.subscriptionId,
      salesFlags: val?.salesFlags,
    };
  });

  const meta = {
    totalPages: data.totalPages,
  };
  Object.assign(markUp, { values, meta });
  return markUp;
};

export { generateData, defaultShow, markUp };

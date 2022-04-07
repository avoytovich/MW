import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Formik, Form } from 'formik';

import api from '../../api';
import localization from '../../localization';
import AddCartView from './AddCartView';
import parentPaths from '../../services/paths';
import DetailPageWrapper from '../../components/utils/DetailPageWrapper';
import SelectCustomerNotification from '../../components/utils/SelectCustomerNotification';

const AddCart = () => {
  const customerId = useSelector(
    ({ account: { nexwayState } }) => nexwayState?.selectedCustomer?.id,
  );
  const history = useHistory();
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);

  const [isLoading, setLoading] = useState(true);
  const [storeOpt, setStoreOpt] = useState(null);
  const [prefillOpt, setPrefillOpt] = useState(null);
  const [selectedEndUser, setSelectedEndUser] = useState({});
  const [selectedStore, setSelectedStore] = useState(null);
  const [productOpt, setProductOpt] = useState(null);
  const [countriesOpt, setCountriesOpt] = useState(null);
  const [error, setError] = useState(null);

  const initialValues = {
    source: [],
    store: '',
    externalContext: '',
    salesFlags: '',
    buyerDetails: [],
    discountApply: false,
    endUserEmail: '',
    prefillWith: {},
    storeHostname: '',
    product: '',
    locale: '',
    country: '',
    emailAddress: '',
    salutation: [],
    firstName: '',
    lastName: '',
    phone: '',
    companyName: '',
    zip: '',
    city: '',
    streetAddress: '',
    label: '',
    rebate: '',
    currency: '',
    applicableUntil: new Date(),
  };

  const saveCart = (data) => {
    const payload = {
      country: data.country,
      customerId,
      endUser: selectedEndUser,
      externalContext: data.externalContext,
      locale: data.locale,
      salesFlags: [data.salesFlags],
      source: data.source[0],
      storeHostname: data.storeHostname,
      storeId: data.store,
      wantedProducts: [{
        id: data.product,
        priceFunctionParameters: {
          seats: '1',
        },
        quantity: 1,
      }],
    };
    api.addCart(payload)
      .then(() => {
        history.push(parentPaths.carts);
        toast(localization.t('labels.success'));
      })
      .catch((err) => {
        () => toast(localization.t('labels.failure'));
        setError(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    Promise.allSettled([
      api.getSellingStoreOptions(customerId),
      api.getEndUsersByCustomerId(customerId),
      api.getCountryOptions(),
    ])
      .then(([storeOptions, endUserOptions, countries]) => {
        setStoreOpt(storeOptions.value?.data);
        setPrefillOpt(endUserOptions.value?.data);
        setCountriesOpt(countries.value?.data);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [customerId]);

  useEffect(() => {
    setLoading(true);
    api.getProductsByStore(customerId, selectedStore)
      .then((data) => {
        setProductOpt(data.data);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [customerId, selectedStore]);

  if (!customerId) {
    return <SelectCustomerNotification />;
  }

  if (!storeOpt) return null;

  return (
    <Formik
      className="formik"
      initialValues={initialValues}
      onSubmit={(val) => saveCart(val)}
    >
      {({
        errors,
        handleChange,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        touched,
        isValidating,
        values,
      }) => (
        <Form>
          <DetailPageWrapper
            nxState={nxState}
            id='add'
            name={`${localization.t('general.new')} ${localization.t('general.cart')}`}
            hasChanges
            isLoading={isLoading}
            curParentPath={parentPaths.carts}
            curData={values}
            saveIsDisabled={values.buyerDetails.includes('Fill-in_details_directly') ? !values.phone : false}
          >
            <AddCartView
              initialValues={initialValues}
              storeOpt={storeOpt}
              prefillOpt={prefillOpt}
              selectedStore={selectedStore}
              selectedEndUser={selectedEndUser}
              setSelectedEndUser={setSelectedEndUser}
              setSelectedStore={setSelectedStore}
              productOpt={productOpt}
              countriesOpt={countriesOpt}
              handleFormik={{
                errors,
                handleChange,
                handleSubmit,
                isSubmitting,
                setFieldValue,
                touched,
                isValidating,
                values,
              }}
            />
          </DetailPageWrapper>
        </Form>
      )}
    </Formik>
  );
};

export default AddCart;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Breadcrumbs,
  Button,
  FormLabel,
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Grid,
  Tabs,
  Tab,
} from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import {
  CheckboxWithLabel,
  Select,
  TextField,
  Switch,
} from 'formik-material-ui';
import { KeyboardDateTimePicker } from 'formik-material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useSelector } from 'react-redux';
import {
  Formik, Form, Field,
} from 'formik';

import localization from '../../localization';
import { priceCurrency } from '../../services/selectOptions/selectOptions';

import './AddCartView.scss';

const AddCartView = ({
  initialValues,
  storeOpt,
  prefillOpt,
  selectedEndUser,
  setSelectedEndUser,
  selectedStore,
  setSelectedStore,
  productOpt,
  countriesOpt,
  saveData,
}) => {
  const [curTab, setCurTab] = useState(0);

  const customerId = useSelector(
    ({ account: { nexwayState } }) => nexwayState?.selectedCustomer?.id,
  );

  const tabLabels = ['general', 'endUser'];

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

  const allowCountriesOpt = () => {
    if (selectedStore) {
      const getSelectedStoreById = storeOpt.items.filter((item) => item.id === selectedStore);
      return countriesOpt?.items.filter((item) => (
        !getSelectedStoreById[0].blackListedCountries.includes(item.alpha2Code)
      ));
    }
    return null;
  };

  const validation = (
    <Typography variant='h6' className='validation'>
      {localization.t('labels.validationField')}
    </Typography>
  );

  const validate = (value) => {
    let error;
    if (!value[0]) {
      error = validation;
    }
    return error;
  };

  const renderGeneral = (
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    touched,
    isValidating,
    values,
  ) => (
    <Box display='flex' flexDirection='column' alignItems='baseline' bgcolor='#fff'>
      <Box p={2}>
        <Typography gutterBottom variant="h4">
          {localization.t('labels.general')}
        </Typography>
      </Box>
      <Grid container spacing={0} justify="center">
        <Grid item xs={6} sm={6}>
          <Box p={2}>
            <FormControl component="fieldset">
              <FormLabel component="legend" className='label'>{localization.t('labels.source')}</FormLabel>
              <FormGroup>
                {checkBoxSource.map((opt) => (
                  <Field
                    type="checkbox"
                    color='primary'
                    component={CheckboxWithLabel}
                    name="source"
                    validate={validate}
                    key={opt.value}
                    value={opt.value}
                    disabled={values.source.length && !values.source.includes(opt.value)}
                    Label={{ label: opt.label }}
                  />
                ))}
              </FormGroup>
              {touched.source && errors.source && validation}
            </FormControl>
          </Box>
          <Box p={2}>
            <FormControl className="spread">
              <Field
                component={TextField}
                label={localization.t('labels.externalContext')}
                name="externalContext"
                multiline
                rows={6}
                variant="outlined"
              />
            </FormControl>
          </Box>
          <Box p={2}>
            <FormControl className="spread">
              <FormLabel component="legend" className='label'>{localization.t('labels.discountApply')}</FormLabel>
              <Field component={Switch} type="checkbox" name="discountApply" color="primary" />
            </FormControl>
          </Box>
          {values.discountApply && (
            <>
              <Box display='flex' flexDirection='column' alignItems='baseline' bgcolor='#fff'>
                <Box p={2}>
                  <Typography gutterBottom variant="h4">
                    {localization.t('labels.discount')}
                  </Typography>
                </Box>
              </Box>
              <Box p={2}>
                <FormControl className="spread">
                  <Field
                    component={TextField}
                    label={localization.t('labels.label')}
                    name="label"
                    variant="outlined"
                  />
                </FormControl>
              </Box>
              <Box p={2}>
                <FormControl className="spread-85">
                  <Field
                    component={TextField}
                    label={localization.t('labels.rebate')}
                    name="rebate"
                    variant="outlined"
                  />
                </FormControl>
                <FormControl className="spread-15">
                  <InputLabel htmlFor="select-currency" className="select-label">{localization.t('labels.percentage')}</InputLabel>
                  <Field
                    component={Select}
                    type="text"
                    name="currency"
                    variant="outlined"
                    value={values.currency}
                    inputProps={{
                      id: 'select-currency',
                    }}
                    onChange={handleChange}
                  >
                    {priceCurrency.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.value}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </Box>
              <Box p={2}>
                <FormControl className="spread">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Field
                      component={KeyboardDateTimePicker}
                      label={localization.t('labels.applicableUntil')}
                      name="applicableUntil"
                      inputVariant="outlined"
                    />
                  </MuiPickersUtilsProvider>
                </FormControl>
              </Box>
            </>
          )}
        </Grid>
        <Grid item xs={6} sm={6}>
          <Box p={2}>
            <FormControl className="spread">
              <Field
                component={TextField}
                label={localization.t('labels.salesFlags')}
                name="salesFlags"
                variant="outlined"
              />
              <Typography variant='h6'>
                {localization.t('labels.salesFlagsHelper')}
              </Typography>
            </FormControl>
          </Box>
          <Box p={2}>
            <FormControl className="spread">
              <InputLabel htmlFor="select-store" className='select-label'>{localization.t('labels.store')}</InputLabel>
              <Field
                component={Select}
                type="text"
                name="store"
                validate={validate}
                variant="outlined"
                value={values.store}
                inputProps={{
                  id: 'select-store',
                }}
                onChange={(val) => {
                  handleChange(val);
                  setSelectedStore(val.target.value);
                }}
              >
                {storeOpt?.items?.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </Field>
              {touched.store && errors.store && validation}
            </FormControl>
          </Box>
          {values.store && (
            <>
              <Box p={2}>
                <FormControl className="spread">
                  <InputLabel htmlFor="select-store-hostname" className='select-label'>{localization.t('labels.storeHostname')}</InputLabel>
                  <Field
                    component={Select}
                    type="text"
                    name="storeHostname"
                    validate={validate}
                    variant="outlined"
                    value={values.storeHostname}
                    inputProps={{
                      id: 'select-store-hostname',
                    }}
                    onChange={handleChange}
                  >
                    {storeOpt.items.map((option) => (
                      option.hostnames.map((hostname) => (
                        <MenuItem
                          key={hostname}
                          value={hostname}
                        >
                          {hostname}
                        </MenuItem>
                      ))
                    ))}
                  </Field>
                  {touched.storeHostname && errors.storeHostname && validation}
                </FormControl>
              </Box>
              <Box p={2}>
                <FormControl className="spread">
                  <InputLabel htmlFor="select-product" className='select-label'>{localization.t('labels.product')}</InputLabel>
                  <Field
                    component={Select}
                    type="text"
                    name="product"
                    validate={validate}
                    variant="outlined"
                    value={values.product}
                    inputProps={{
                      id: 'select-product',
                    }}
                    onChange={handleChange}
                  >
                    {productOpt.items.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {`${option.genericName} (aka ${option.publisherRefId}, id ${option.id})`}
                      </MenuItem>
                    ))}
                  </Field>
                  {touched.product && errors.product && validation}
                </FormControl>
              </Box>
              <Box p={2}>
                <FormControl className="spread">
                  <InputLabel htmlFor="select-locale" className='select-label'>{localization.t('labels.locale')}</InputLabel>
                  <Field
                    component={Select}
                    type="text"
                    name="locale"
                    validate={validate}
                    variant="outlined"
                    value={values.locale}
                    inputProps={{
                      id: 'select-locale',
                    }}
                    onChange={handleChange}
                  >
                    {storeOpt.items.map((option) => (
                      option.saleLocales?.map((locale) => (
                        <MenuItem key={locale} value={locale}>
                          {locale}
                        </MenuItem>
                      ))
                    ))}
                  </Field>
                  {touched.locale && errors.locale && validation}
                </FormControl>
              </Box>
              <Box p={2}>
                <FormControl className="spread">
                  <InputLabel htmlFor="select-country" className='select-label'>{localization.t('labels.country')}</InputLabel>
                  <Field
                    component={Select}
                    type="text"
                    name="country"
                    validate={validate}
                    variant="outlined"
                    value={values.country}
                    inputProps={{
                      id: 'select-country',
                    }}
                    onChange={handleChange}
                  >
                    {allowCountriesOpt().map((option) => (
                      <MenuItem key={option.id} value={option.alpha2Code}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Field>
                  {touched.country && errors.country && validation}
                </FormControl>
              </Box>
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );

  const renderEndUser = (
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    touched,
    isValidating,
    values,
  ) => (
    <>
      <Box display='flex' flexDirection='column' alignItems='baseline' bgcolor='#fff'>
        <Box p={2}>
          <FormControl component="fieldset">
            <FormLabel component="legend" className='label'>{localization.t('labels.buyerDetails')}</FormLabel>
            <FormGroup>
              {checkBoxBuyerDetails.map((opt) => (
                <Field
                  type="checkbox"
                  color='primary'
                  component={CheckboxWithLabel}
                  name="buyerDetails"
                  key={opt.value}
                  value={opt.value}
                  disabled={values.buyerDetails.length && !values.buyerDetails.includes(opt.value)}
                  Label={{ label: opt.label }}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Box>
      </Box>
      {values.buyerDetails.includes('Fill-in_details_directly') && (
        <>
          <Box p={2}>
            <Typography gutterBottom variant="h4">
              {localization.t('labels.buyer')}
            </Typography>
          </Box>
          <Grid container spacing={0} justify="center">
            <Grid item xs={6} sm={6}>
              <Box p={2}>
                <FormControl className="spread">
                  <InputLabel
                    htmlFor="select-prefill"
                    className="select-label"
                    shrink={false}
                  >
                    {values.prefillWith.id ? '' : localization.t('labels.prefillWith')}
                  </InputLabel>
                  <Field
                    component={Select}
                    type="text"
                    name="prefillWith"
                    variant="outlined"
                    value={values.prefillWith}
                    inputProps={{
                      id: 'select-prefill',
                    }}
                    onChange={(e) => {
                      setSelectedEndUser(e.target.value);
                      setFieldValue('emailAddress', e.target.value.email);
                      setFieldValue('firstName', e.target.value.firstName);
                      setFieldValue('lastName', e.target.value.lastName);
                      setFieldValue('zip', e.target.value.zipCode);
                      setFieldValue('city', e.target.value.city);
                      handleChange(e);
                    }}
                  >
                    {prefillOpt.items.map((option) => (
                      <MenuItem key={option.id} value={option}>
                        {`${option.email} (id ${option.id}: ${option.fullName} (${option.country}))`}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </Box>
              <Box p={2}>
                <FormControl className="spread">
                  <Field
                    component={TextField}
                    label={localization.t('labels.emailAddress')}
                    name="emailAddress"
                    variant="outlined"
                  />
                </FormControl>
              </Box>
              <Box p={2}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" className='label'>{localization.t('labels.salutation')}</FormLabel>
                  <FormGroup>
                    {checkBoxSalutation.map((opt) => (
                      <Field
                        type="checkbox"
                        color='primary'
                        component={CheckboxWithLabel}
                        name="salutation"
                        key={opt.value}
                        value={opt.value}
                        disabled={values.salutation.length
                          && !values.salutation.includes(opt.value)}
                        Label={{ label: opt.label }}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
              </Box>
              <Box p={2}>
                <FormControl className="spread">
                  <Field
                    component={TextField}
                    label={localization.t('labels.firstName')}
                    name="firstName"
                    variant="outlined"
                  />
                </FormControl>
              </Box>
              <Box p={2}>
                <FormControl className="spread">
                  <Field
                    component={TextField}
                    label={localization.t('labels.lastName')}
                    name="lastName"
                    variant="outlined"
                  />
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={6} sm={6}>
              <Box p={2}>
                <FormControl className="spread">
                  <Field
                    component={TextField}
                    validate={values.buyerDetails.includes('Fill-in_details_directly') ? validate : undefined}
                    label={localization.t('labels.phone')}
                    name="phone"
                    variant="outlined"
                  />
                </FormControl>
              </Box>
              <Box p={2}>
                <FormControl className="spread">
                  <Field
                    component={TextField}
                    label={localization.t('labels.companyName')}
                    name="companyName"
                    variant="outlined"
                  />
                </FormControl>
              </Box>
              <Box p={2}>
                <FormControl className="spread">
                  <Field
                    component={TextField}
                    label={localization.t('labels.zip')}
                    name="zip"
                    variant="outlined"
                  />
                </FormControl>
              </Box>
              {selectedStore && (
                <Box p={2}>
                  <FormControl className="spread">
                    <InputLabel htmlFor="select-country" className='select-label'>{localization.t('labels.country')}</InputLabel>
                    <Field
                      component={Select}
                      type="text"
                      name="country"
                      validate={validate}
                      variant="outlined"
                      value={values.country}
                      inputProps={{
                        id: 'select-country',
                      }}
                      onChange={handleChange}
                    >
                      {allowCountriesOpt().map((option) => (
                        <MenuItem key={option.id} value={option.alpha2Code}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Field>
                    {touched.country && errors.country && validation}
                  </FormControl>
                </Box>
              )}
              <Box p={2}>
                <FormControl className="spread">
                  <Field
                    component={TextField}
                    label={localization.t('labels.city')}
                    name="city"
                    variant="outlined"
                  />
                </FormControl>
              </Box>
              {selectedStore && (
                <Box p={2}>
                  <FormControl className="spread">
                    <InputLabel htmlFor="select-locale" className='select-label'>{localization.t('labels.locale')}</InputLabel>
                    <Field
                      component={Select}
                      type="text"
                      name="locale"
                      validate={validate}
                      variant="outlined"
                      value={values.locale}
                      inputProps={{
                        id: 'select-locale',
                      }}
                      onChange={handleChange}
                    >
                      {storeOpt.items.map((option) => (
                        option.saleLocales?.map((locale) => (
                          <MenuItem key={locale} value={locale}>
                            {locale}
                          </MenuItem>
                        ))
                      ))}
                    </Field>
                    {touched.locale && errors.locale && validation}
                  </FormControl>
                </Box>
              )}
              <Box p={2}>
                <FormControl className="spread">
                  <Field
                    component={TextField}
                    label={localization.t('labels.streetAddress')}
                    name="streetAddress"
                    variant="outlined"
                  />
                </FormControl>
              </Box>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );

  const renderContent = (
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    touched,
    isValidating,
    values,
  ) => {
    switch (curTab) {
      case 0:
        return renderGeneral(
          errors,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          touched,
          isValidating,
          values,
        );
      case 1:
        return renderEndUser(
          errors,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          touched,
          isValidating,
          values,
        );
      default:
        return renderGeneral(
          errors,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          touched,
          isValidating,
          values,
        );
    }
  };

  return (
    <>
      <div className="wrapper-add-cart">
        <Formik
          className="formik"
          initialValues={initialValues}
          onSubmit={(val) => saveData(val)}
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
              <Box
                display='flex'
                flexDirection='row'
                m={2}
                justifyContent='space-between'
              >
                <Box alignSelf='center'>
                  <Box py={2}>
                    <Breadcrumbs color='secondary' aria-label='breadcrumb'>
                      <Typography color='primary'>
                        {localization.t('labels.customerId')}
                      </Typography>
                      <Typography color='secondary'>
                        {customerId}
                      </Typography>
                    </Breadcrumbs>
                  </Box>
                </Box>
                <Box>
                  <Button
                    id="save-cart"
                    type="submit"
                    color="primary"
                    size="large"
                    variant="contained"
                    disabled={values.buyerDetails.includes('Fill-in_details_directly') ? !values.phone : false}
                  >
                    {localization.t('general.save')}
                  </Button>
                </Box>
              </Box>
              <Box my={2} bgcolor='#fff'>
                <Tabs
                  value={curTab}
                  indicatorColor='primary'
                  textColor='primary'
                  onChange={(event, newValue) => {
                    setCurTab(newValue);
                  }}
                  aria-label='disabled tabs example'
                >
                  {tabLabels.map((tab) => (
                    <Tab key={tab} label={localization.t(`labels.${tab}`)} />
                  ))}
                </Tabs>
              </Box>
              <Grid container spacing={0} justify="center">
                <Grid item xs={12} sm={12}>
                  {renderContent(
                    errors,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    setFieldValue,
                    touched,
                    isValidating,
                    values,
                  )}
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

AddCartView.propTypes = {
  initialValues: PropTypes.object,
  storeOpt: PropTypes.object,
  prefillOpt: PropTypes.object,
  selectedEndUser: PropTypes.object,
  setSelectedEndUser: PropTypes.func,
  selectedStore: PropTypes.string,
  setSelectedStore: PropTypes.func,
  productOpt: PropTypes.object,
  countriesOpt: PropTypes.object,
  saveData: PropTypes.func,
};

export default AddCartView;

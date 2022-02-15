import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  FormLabel,
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Grid,
  Tabs,
  Tab,
} from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
  CheckboxWithLabel,
  Select,
  TextField,
  Switch,
} from 'formik-mui';
import { DateTimePicker } from 'formik-mui-lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Form, Field } from 'formik';

import localization from '../../localization';
import { priceCurrency } from '../../services/selectOptions/selectOptions';
import {
  tabLabelsAdd, checkBoxSource, checkBoxBuyerDetails, checkBoxSalutation,
} from './utils';

import './addCartView.scss';

const AddCartView = ({
  storeOpt,
  prefillOpt,
  selectedEndUser,
  setSelectedEndUser,
  selectedStore,
  setSelectedStore,
  productOpt,
  countriesOpt,
  handleFormik: {
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    touched,
    isValidating,
    values,
  },
}) => {
  const [curTab, setCurTab] = useState(0);

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

  const renderGeneral = () => (
    <Box display='flex' flexDirection='column' alignItems='baseline' bgcolor='#fff'>
      <Box p={2}>
        <Typography gutterBottom variant="h4">
          {localization.t('labels.general')}
        </Typography>
      </Box>
      <Grid container spacing={0} justifyContent="center">
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
                minRows={6}
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
                  {!values.currency && (
                    <InputLabel htmlFor="select-currency" className="select-label">
                      {localization.t('labels.percentage')}
                    </InputLabel>
                  )}
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
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Field
                      component={DateTimePicker}
                      label={localization.t('labels.applicableUntil')}
                      name="applicableUntil"
                      inputVariant="outlined"
                    />
                  </LocalizationProvider>
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
              <Field
                component={Select}
                type="text"
                name="store"
                validate={validate}
                variant="outlined"
                value={values.store}
                label={localization.t('labels.store')}
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
            </FormControl>
          </Box>
          {values.store && (
            <>
              <Box p={2}>
                <FormControl className="spread">
                  <Field
                    component={Select}
                    type="text"
                    name="storeHostname"
                    validate={validate}
                    variant="outlined"
                    value={values.storeHostname}
                    label={localization.t('labels.storeHostname')}
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
                </FormControl>
              </Box>
              <Box p={2}>
                <FormControl className="spread">
                  <Field
                    component={Select}
                    type="text"
                    name="product"
                    validate={validate}
                    variant="outlined"
                    value={values.product}
                    label={localization.t('labels.product')}
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
                </FormControl>
              </Box>
              <Box p={2}>
                <FormControl className="spread">
                  <Field
                    component={Select}
                    type="text"
                    name="locale"
                    validate={validate}
                    variant="outlined"
                    value={values.locale}
                    label={localization.t('labels.locale')}
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
                </FormControl>
              </Box>
              <Box p={2}>
                <FormControl className="spread">
                  <Field
                    component={Select}
                    type="text"
                    name="country"
                    validate={validate}
                    variant="outlined"
                    value={values.country}
                    label={localization.t('labels.country')}
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
                </FormControl>
              </Box>
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );

  const renderEndUser = () => (
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
          <Grid container spacing={0} justifyContent="center">
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
                    <Field
                      component={Select}
                      type="text"
                      name="country"
                      validate={validate}
                      variant="outlined"
                      value={values.country}
                      label={localization.t('labels.country')}
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
                    <Field
                      component={Select}
                      type="text"
                      name="locale"
                      validate={validate}
                      variant="outlined"
                      value={values.locale}
                      label={localization.t('labels.locale')}
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

  const renderContent = () => {
    switch (curTab) {
      case 0:
        return renderGeneral();
      case 1:
        return renderEndUser();
      default:
        return renderGeneral();
    }
  };

  return (
    <div className="wrapper-add-cart">
      <Form>
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
            {tabLabelsAdd.map((tab) => (
              <Tab key={tab} label={localization.t(`labels.${tab}`)} />
            ))}
          </Tabs>
        </Box>
        <Grid container spacing={0} justifyContent="center">
          <Grid item xs={12} sm={12}>
            {renderContent()}
          </Grid>
        </Grid>
      </Form>
    </div>
  );
};

AddCartView.propTypes = {
  storeOpt: PropTypes.object,
  prefillOpt: PropTypes.object,
  selectedEndUser: PropTypes.object,
  setSelectedEndUser: PropTypes.func,
  selectedStore: PropTypes.string,
  setSelectedStore: PropTypes.func,
  productOpt: PropTypes.object,
  countriesOpt: PropTypes.object,
  handleFormik: PropTypes.object,
};

export default AddCartView;

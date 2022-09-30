/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Box, Typography, Grid, Divider, IconButton,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ClearIcon from '@mui/icons-material/Clear';
import { paymentDefaults, installmentOptions } from '../../../services/selectOptions/selectOptions';
import {
  SelectWithChip, SwitchInput, SelectCustom, DroppableSelectWithChip, AutocompleteWithChips,
} from '../../../components/Inputs';
import { filterOptions, customerTypeOptions, handleTypeOptions } from '../utils';
import { getCountriesOptions } from '../../../components/utils/OptionsFetcher/OptionsFetcher';
import localization from '../../../localization';

import '../storeDetailsScreen.scss';

const Payment = ({
  currentStoreData,
  setCurrentStoreData,
  selectOptions,
  errors,
  setErrors,
  isRankingOpen,
  setIsRankingOpen,
  myRef,
}) => {
  const allCountries = getCountriesOptions();
  const handleDeleteError = (key, optionKey, onDelete) => {
    const newErrors = { ...errors };
    if (onDelete) {
      Object.keys(newErrors).forEach((errorKey) => {
        delete newErrors[errorKey][key];
        if (Object.keys(newErrors[errorKey])?.length === 0) {
          delete newErrors[errorKey];
        }
      });
    } else if (optionKey && newErrors.rankedPaymentTabs?.[key]?.[optionKey]) {
      delete newErrors.rankedPaymentTabs[key][optionKey];
      if (Object.keys(newErrors.rankedPaymentTabs[key])?.length === 0) {
        delete newErrors.rankedPaymentTabs[key];
      }
      if (Object.keys(newErrors.rankedPaymentTabs)?.length === 0) {
        delete newErrors.rankedPaymentTabs;
      }
    } else if (!optionKey && newErrors.countries?.[key]) {
      delete newErrors.countries[key];
      if (Object.keys(newErrors.countries)?.length === 0) {
        delete newErrors.countries;
      }
    }
    setErrors({ ...newErrors });
  };

  const handleUpdateGroup = (targetEvent, key, optionKey) => {
    let newPaymentGroups;
    if (!optionKey) {
      if (targetEvent.value.length === 0) {
        setErrors({
          ...errors,
          countries: {
            ...errors.countries,
            [key]: localization.t('errorNotifications.groupDoesNotReferenceAnyCountry'),
          },
        });
      } else if (errors.countries?.[key]) {
        handleDeleteError(key, optionKey);
      }
      newPaymentGroups = {
        ...currentStoreData.paymentGroups,
        [key]: { ...currentStoreData.paymentGroups[key], [targetEvent.name]: targetEvent.value },
      };
    } else {
      if (Array.isArray(targetEvent.value) && targetEvent.value.length === 0) {
        setErrors({
          ...errors,
          rankedPaymentTabs: {
            ...errors.rankedPaymentTabs,
            [key]: { ...errors.rankedPaymentTabs?.[key], [optionKey]: localization.t('errorNotifications.groupDoesNotReferenceAnyPaymentType') },
          },
        });
      } else if (errors.rankedPaymentTabs?.[key]?.[optionKey]) {
        handleDeleteError(key, optionKey);
      }
      newPaymentGroups = {
        ...currentStoreData.paymentGroups,
        [key]: {
          ...currentStoreData.paymentGroups[key],
          options: {
            ...currentStoreData.paymentGroups[key].options,
            [optionKey]: { ...currentStoreData.paymentGroups[key].options[optionKey], [targetEvent.name]: targetEvent.value },
          },
        },
      };
    }
    setCurrentStoreData({ ...currentStoreData, paymentGroups: newPaymentGroups });
  };
  const handleUpdatePayment = (value) => {
    if (value?.length === 0) {
      setErrors({
        ...errors,
        defaultRanking: localization.t('errorNotifications.fieldIsRequired'),
      });
    } else if (errors.defaultRanking) {
      const newErrors = { ...errors };
      delete newErrors.defaultRanking;
      setErrors(newErrors);
    }
    const newArray = [
      ...currentStoreData.designs.paymentComponent
        .rankedPaymentTabsByCountriesList,
    ];
    newArray[0] = {
      ...currentStoreData.designs.paymentComponent
        .rankedPaymentTabsByCountriesList[0],
      rankedPaymentTabs: value,
    };

    setCurrentStoreData({
      ...currentStoreData,
      designs: {
        ...currentStoreData.designs,
        paymentComponent: {
          ...currentStoreData.designs.paymentComponent,
          rankedPaymentTabsByCountriesList: newArray,
        },
      },
    });
  };
  const handleAddGroup = () => {
    setIsRankingOpen(true);
    const keys = Object.keys(currentStoreData.paymentGroups);
    const key = Number(keys[keys.length - 1]) + 1 || 0;
    const newPaymentGroups = {
      ...currentStoreData.paymentGroups,
      [key]: { countries: [], options: { 0: { rankedPaymentTabs: [], customerType: 'PERSONAL' } } },
    };
    setCurrentStoreData({ ...currentStoreData, paymentGroups: newPaymentGroups });
  };

  const handleRemoveGroup = (key, optionKey) => {
    const newPaymentGroups = { ...currentStoreData.paymentGroups };
    if (Object.keys(currentStoreData.paymentGroups[key].options).length === 1) {
      delete newPaymentGroups[key];
      handleDeleteError(key, optionKey, true);
    } else {
      delete newPaymentGroups[key].options[optionKey];
      handleDeleteError(key, optionKey);
    }
    setCurrentStoreData({ ...currentStoreData, paymentGroups: newPaymentGroups });
  };

  const handleAddCustomerType = (groupKey) => {
    const keys = Object.keys(currentStoreData.paymentGroups[groupKey].options);
    const customerType = currentStoreData.paymentGroups[groupKey].options[keys[0]].customerType === 'PERSONAL' ? 'COMPANY' : 'PERSONAL';
    const key = Number(keys[keys.length - 1]) + 1;
    const newPaymentGroups = {
      ...currentStoreData.paymentGroups,
      [groupKey]: {
        ...currentStoreData.paymentGroups[groupKey],
        options: {
          ...currentStoreData.paymentGroups[groupKey].options,
          [key]: { rankedPaymentTabs: [], customerType },
        },
      },
    };
    setCurrentStoreData({ ...currentStoreData, paymentGroups: newPaymentGroups });
  };
  return (
    <Box display="flex" flexDirection="column" width={1}>
      <Box p={2}>
        <SwitchInput
          label='allowQuotes'
          handleChange={(e) => {
            setCurrentStoreData({
              ...currentStoreData,
              allowQuotes: e.target.checked,
            });
          }}
          isChecked={currentStoreData.allowQuotes}
        />
      </Box>
      <Box p={2}>
        <AutocompleteWithChips
          arrayTypeValue
          label='blacklistedPaymentTypes'
          arrayValue={currentStoreData.blackListedPaymentTypes}
          selectOptions={selectOptions.paymentMethods || []}
          onChange={(newValue) => setCurrentStoreData({
            ...currentStoreData,
            blackListedPaymentTypes: newValue,
          })}
        />
      </Box>
      <Box p={2} ref={myRef}>
        <AutocompleteWithChips
          arrayTypeValue
          label='additionalPaymentTypes'
          arrayValue={[]}
          selectOptions={[]}
          onChange={() => { }}
        />
      </Box>
      <Box p={2}>
        <Box>
          <SwitchInput
            label='allowInstallments'
            handleChange={(e) => {
              setCurrentStoreData({
                ...currentStoreData,
                allowInstallments: e.target.checked,
                installmentOptions: [],
              });
            }}
            isChecked={currentStoreData.allowInstallments}
          />
        </Box>
        <Box>
          <AutocompleteWithChips
            arrayTypeValue
            isDisabled={!currentStoreData.allowInstallments}
            label='installmentOptions'
            arrayValue={currentStoreData.installmentOptions}
            selectOptions={installmentOptions || []}
            onChange={(newValue) => setCurrentStoreData({
              ...currentStoreData,
              installmentOptions: newValue,
            })}
          />
        </Box>
      </Box>
      <Box p={2}>
        <SwitchInput
          label='promoteOneClickPayment'
          handleChange={(e) => {
            setCurrentStoreData({
              ...currentStoreData,
              promoteOneClickPayment: e.target.checked,
            });
          }}
          isChecked={currentStoreData.promoteOneClickPayment}
        />
      </Box>
      <Box px={2} py={4}>
        <Box pb={2}>
          <Typography variant="h4">{localization.t('labels.paymentTabsRanking')}</Typography>
        </Box>
        <Typography color='secondary'>
          {localization.t('tooltips.paymentTabsRanking')}
        </Typography>
      </Box>
      <Grid container alignItems='flex-start'>
        <Grid item md={7} sm={12}>
          <Box p={2}>
            <DroppableSelectWithChip
              isRequired
              hasError={!!errors.defaultRanking}
              helperText={errors.defaultRanking ? errors.defaultRanking : ''}
              label="defaultRanking"
              value={
                currentStoreData.designs.paymentComponent
                  .rankedPaymentTabsByCountriesList[0].rankedPaymentTabs
              }
              selectOptions={paymentDefaults}
              onChangeSelect={(newVal) => handleUpdatePayment(newVal)}
            />
          </Box>
        </Grid>
      </Grid>
      <Box pt={4}>
        {Object.keys(currentStoreData.paymentGroups).map(
          (key) => (
            <Box p={2} key={key}>
              <Box pb={1}>
                <Typography>
                  {`${localization.t('labels.group')} #${Object.keys(currentStoreData.paymentGroups).indexOf(key) + 1}`}
                </Typography>
              </Box>
              <Box py={2}>
                <Grid container alignItems='flex-start' spacing={2}>
                  <Grid item md={4} sm={12}>
                    <Box pb={2}>
                      <SelectWithChip
                        isRequired
                        hasError={!!errors.countries?.[key]}
                        helperText={errors.countries?.[key] ? errors.countries?.[key] : ''}
                        label="countries"
                        name='countries'
                        value={currentStoreData.paymentGroups[key].countries}
                        selectOptions={filterOptions(allCountries, currentStoreData.paymentGroups, key)}
                        onChangeSelect={(e) => { handleUpdateGroup(e.target || e, key); }}
                        onClickDelIcon={(chip) => {
                          const newValue = [...currentStoreData.paymentGroups[key].countries].filter(
                            (val) => val !== chip,
                          );
                          handleUpdateGroup({ value: newValue, name: 'countries' }, key);
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid item md={8} sm={12}>
                    {Object.keys(currentStoreData.paymentGroups[key].options).map((objKey) => (
                      <Grid container spacing={2} key={`options${key}_${objKey}`}>
                        <Grid item md={3} sm={12}>
                          <Box pb={2}>
                            <SelectCustom
                              usedOptions={handleTypeOptions(currentStoreData.paymentGroups[key].options, objKey)}
                              name='customerType'
                              label='customerType'
                              value={currentStoreData.paymentGroups[key].options[objKey].customerType}
                              selectOptions={customerTypeOptions}
                              onChangeSelect={(e) => handleUpdateGroup(e.target, key, objKey)}
                            />
                            {Object.keys(currentStoreData.paymentGroups[key].options).length < 2 && (
                              <Box display="flex" alignItems="center" py={2}>
                                <AddCircleIcon color="secondary" onClick={() => handleAddCustomerType(key)} />
                                <Box pl={1}>{`${localization.t('labels.add')} ${localization.t('labels.customerType')}`}</Box>
                              </Box>
                            )}
                          </Box>
                        </Grid>
                        <Grid item md={8} sm={11}>
                          <Box pb={2} width='100%'>
                            <DroppableSelectWithChip
                              isRequired
                              hasError={!!errors.rankedPaymentTabs?.[key]?.[objKey]}
                              helperText={errors.rankedPaymentTabs?.[key]?.[objKey] ? errors.rankedPaymentTabs?.[key][objKey] : ''}
                              name='rankedPaymentTabs'
                              label="paymentTypes"
                              value={currentStoreData.paymentGroups[key].options[objKey].rankedPaymentTabs}
                              selectOptions={paymentDefaults}
                              onChangeSelect={(newVal) => handleUpdateGroup({ value: newVal, name: 'rankedPaymentTabs' }, key, objKey)}
                              onClickDelIcon={(chip) => {
                                const newValue = [...currentStoreData.paymentGroups[key].options[objKey].rankedPaymentTabs]
                                  .filter(
                                    (val) => val !== chip,
                                  );
                                handleUpdateGroup({ value: newValue, name: 'rankedPaymentTabs' }, key, objKey);
                              }}
                            />
                          </Box>
                        </Grid>
                        <Grid item md={1} sm={1}>
                          <Box pl={1}>
                            <ClearIcon
                              color="secondary"
                              onClick={() => handleRemoveGroup(key, objKey)}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Box>
              <Divider light />
            </Box>
          ),
        )}
      </Box>
      <Box display="flex" alignItems="center" p={2}>
        <IconButton
          color="primary"
          disabled={currentStoreData.designs.paymentComponent
            .rankedPaymentTabsByCountriesList[0].rankedPaymentTabs.length === 0}
          onClick={handleAddGroup}
          size='large'
        >
          <AddCircleIcon />
        </IconButton>
        <Box pl={1}>
          {`${localization.t('labels.add')} ${localization.t('labels.specificRanking')}`}
        </Box>
      </Box>
    </Box>
  );
};

Payment.propTypes = {
  currentStoreData: PropTypes.object,
  setCurrentStoreData: PropTypes.func,
  selectOptions: PropTypes.object,
  errors: PropTypes.object,
  setErrors: PropTypes.func,
  isRankingOpen: PropTypes.bool,
  setIsRankingOpen: PropTypes.func,
  myRef: PropTypes.object,
};

export default Payment;

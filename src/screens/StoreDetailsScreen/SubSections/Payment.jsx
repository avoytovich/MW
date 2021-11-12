import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Grid } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ClearIcon from '@material-ui/icons/Clear';
import { paymentDefaults, installmentOptions } from '../../../services/selectOptions/selectOptions';
import { SelectWithChip, SelectWithChipImages, SwitchInput } from '../../../components/Inputs';
import { filterOptions } from '../utils';
import { getCountriesOptions } from '../../../components/utils/OptionsFetcher/OptionsFetcher';
import localization from '../../../localization';

import '../storeDetailsScreen.scss';

const Payment = ({
  currentStoreData, setCurrentStoreData, selectOptions,
}) => {
  const allCountries = getCountriesOptions();

  const handleUpdateGroup = (targetEvent, key) => {
    const newPaymentGroups = {
      ...currentStoreData.paymentGroups,
      [key]: { ...currentStoreData.paymentGroups[key], [targetEvent.name]: targetEvent.value },
    };
    setCurrentStoreData({ ...currentStoreData, paymentGroups: newPaymentGroups });
  };

  const handleUpdatePayment = (value) => {
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
    const keys = Object.keys(currentStoreData.paymentGroups);
    const key = keys[keys.length - 1] + 1 || 0;
    const newPaymentGroups = {
      ...currentStoreData.paymentGroups,
      [key]: { countries: [], rankedPaymentTabs: [] },
    };
    setCurrentStoreData({ ...currentStoreData, paymentGroups: newPaymentGroups });
  };

  const handleRemoveGroup = (key) => {
    const newPaymentGroups = { ...currentStoreData.paymentGroups };
    delete newPaymentGroups[key];
    setCurrentStoreData({ ...currentStoreData, paymentGroups: newPaymentGroups });
  };

  return (
    <Box display="flex" flexDirection="column" width={1}>
      <Box p={2}>
        <SelectWithChipImages
          label="paymentMethodsByDefault"
          value={
            currentStoreData.designs.paymentComponent
              .rankedPaymentTabsByCountriesList[0].rankedPaymentTabs
          }
          selectOptions={paymentDefaults}
          onChangeSelect={(e) => handleUpdatePayment(e.target.value)}
          onClickDelIcon={(chip) => {
            const newValue = [
              ...currentStoreData.designs.paymentComponent
                .rankedPaymentTabsByCountriesList[0].rankedPaymentTabs,
            ].filter((val) => val !== chip);
            handleUpdatePayment(newValue);
          }}
        />
      </Box>
      <Box p={2}>
        <SelectWithChip
          label="blacklistedPaymentTypes"
          value={currentStoreData.blackListedPaymentTypes}
          selectOptions={selectOptions.paymentMethods}
          onChangeSelect={(e) => setCurrentStoreData({
            ...currentStoreData,
            blackListedPaymentTypes: e.target.value,
          })}
          onClickDelIcon={(chip) => {
            const newValue = [
              ...currentStoreData.blackListedPaymentTypes,
            ].filter((val) => val !== chip);
            setCurrentStoreData({
              ...currentStoreData,
              blackListedPaymentTypes: newValue,
            });
          }}
        />
      </Box>
      <Box p={2}>
        <SelectWithChip
          label="additionalPaymentTypes"
          value={[]}
          selectOptions={[]}
          onChangeSelect={() => { }}
          onClickDelIcon={() => { }}
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
              });
            }}
            isChecked={currentStoreData.allowInstallments}
          />
        </Box>
        <Box>
          <SelectWithChip
            isDisabled={!currentStoreData.allowInstallments}
            label='installmentOptions'
            value={currentStoreData.installmentOptions}
            selectOptions={installmentOptions}
            onChangeSelect={(e) => setCurrentStoreData({
              ...currentStoreData,
              installmentOptions: e.target.value,
            })}
            onClickDelIcon={(chip) => {
              const newValue = [...currentStoreData.installmentOptions].filter(
                (val) => val !== chip,
              );
              setCurrentStoreData({
                ...currentStoreData,
                installmentOptions: newValue,
              });
            }}
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
      <Box p={2}>
        <Box pb={1}>
          <Typography>{localization.t('labels.paymentTabsRanking')}</Typography>
        </Box>
        <Typography variant="body2">
          Declare here the payment tabs order depending on the buyer country.
          The order of the payment tabs is relevant and will be used in your
          checkout page.
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" p={2}>
        <AddCircleIcon color="primary" onClick={handleAddGroup} />
        <Box pl={1}>Add Group</Box>
      </Box>
      {Object.keys(currentStoreData.paymentGroups).map(
        (key) => (
          <Box p={2} key={key}>
            <Box pb={1}>
              <Typography>
                {`${localization.t('labels.group')} #${Object.keys(currentStoreData.paymentGroups).indexOf(key) + 1}`}
              </Typography>
            </Box>
            <Box width={1} pt={2}>
              <Grid container spacing={1} alignItems="center">
                <Grid item md={6} sm={12}>
                  <SelectWithChip
                    label="countries"
                    name='countries'
                    value={currentStoreData.paymentGroups[key].countries}
                    selectOptions={filterOptions(allCountries, currentStoreData.paymentGroups, key)}
                    onChangeSelect={(e) => handleUpdateGroup(e.target, key)}
                    onClickDelIcon={(chip) => {
                      const newValue = [...currentStoreData.paymentGroups[key].countries].filter(
                        (val) => val !== chip,
                      );
                      handleUpdateGroup({ value: newValue, name: 'countries' }, key);
                    }}
                  />
                </Grid>
                <Grid item md={5} sm={11}>
                  <SelectWithChip
                    name='rankedPaymentTabs'
                    label="paymentTypes"
                    value={currentStoreData.paymentGroups[key].rankedPaymentTabs}
                    selectOptions={paymentDefaults}
                    onChangeSelect={(e) => handleUpdateGroup(e.target, key)}
                    onClickDelIcon={(chip) => {
                      const newValue = [...currentStoreData.paymentGroups[key].rankedPaymentTabs]
                        .filter(
                          (val) => val !== chip,
                        );
                      handleUpdateGroup({ value: newValue, name: 'rankedPaymentTabs' }, key);
                    }}
                  />
                </Grid>
                <Grid item md={1} sm={1} className="iconWrapper">
                  <ClearIcon
                    color="secondary"
                    onClick={() => handleRemoveGroup(key)}
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        ),
      )}
    </Box>
  );
};

Payment.propTypes = {
  currentStoreData: PropTypes.object,
  setCurrentStoreData: PropTypes.func,
  selectOptions: PropTypes.object,
};

export default Payment;

import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Grid } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ClearIcon from '@material-ui/icons/Clear';
import { paymentDefaults } from '../../../services/selectOptions/selectOptions';
import { SelectWithChip, SelectWithChipImages } from '../../../components/Inputs';
import { filterOptions } from '../utils';
import { getCountriesOptions } from '../../../components/utils/OptionsFetcher/OptionsFetcher';
import localization from '../../../localization';

import '../storeDetailsScreen.scss';

const Payment = ({ currentStoreData, setCurrentStoreData, selectOptions }) => {
  const countriesOptions = getCountriesOptions();

  const handleUpdatePayment = (value, group) => {
    const newArray = [
      ...currentStoreData.designs.paymentComponent
        .rankedPaymentTabsByCountriesList,
    ];
    if (group) {
      newArray[group.index] = {
        ...currentStoreData.designs.paymentComponent
          .rankedPaymentTabsByCountriesList[group.index],
        [group.key]: value,
      };
    } else {
      newArray[0] = {
        ...currentStoreData.designs.paymentComponent
          .rankedPaymentTabsByCountriesList[0],
        rankedPaymentTabs: value,
      };
    }

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
    const newArray = [
      ...currentStoreData.designs.paymentComponent
        .rankedPaymentTabsByCountriesList,
    ];
    newArray.push({ countries: [], rankedPaymentTabs: [] });
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
  const handleRemoveGroup = (index) => {
    const newArray = [
      ...currentStoreData.designs.paymentComponent
        .rankedPaymentTabsByCountriesList,
    ];
    newArray.splice(index, 1);
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
        <Box pb={1}>
          <Typography>{localization.t('labels.paymentTabsRanking')}</Typography>
        </Box>
        <Typography variant="body2">
          Declare here the payment tabs order depending on the buyer country.
          The order of the payment tabs is relevant and will be used in your
          checkout page.
        </Typography>
      </Box>
      {currentStoreData.designs.paymentComponent
        .rankedPaymentTabsByCountriesList.length === 1 && (
          <Box display="flex" alignItems="center" p={2}>
            <AddCircleIcon color="primary" onClick={handleAddGroup} />
            <Box pl={1}>Add Group</Box>
          </Box>
      )}
      {currentStoreData.designs.paymentComponent.rankedPaymentTabsByCountriesList.map(
        (item, index) => index !== 0 && (
          <Box p={2} key={item.countries.join()}>
            <Box pb={1}>
              <Typography>
                {`${localization.t('labels.group')} #${index}`}
              </Typography>
            </Box>
            <Box width={1} pt={2}>
              <Grid container spacing={1} alignItems="center">
                <Grid item md={6} sm={12}>
                  <SelectWithChip
                    label="countries"
                    value={item.countries}
                    selectOptions={filterOptions(
                      countriesOptions,
                      currentStoreData.designs.paymentComponent
                        .rankedPaymentTabsByCountriesList,
                      index,
                    )}
                    onChangeSelect={(e) => {
                      handleUpdatePayment(e.target.value, {
                        key: 'countries',
                        index,
                      });
                    }}
                    onClickDelIcon={(chip) => {
                      const newValue = [...item.countries].filter(
                        (val) => val !== chip,
                      );
                      handleUpdatePayment(newValue, {
                        key: 'countries',
                        index,
                      });
                    }}
                  />
                </Grid>
                <Grid item md={5} sm={11}>
                  <SelectWithChip
                    label="paymentTypes"
                    value={item.rankedPaymentTabs}
                    selectOptions={paymentDefaults}
                    onChangeSelect={(e) => handleUpdatePayment(e.target.value, {
                      key: 'rankedPaymentTabs',
                      index,
                    })}
                    onClickDelIcon={(chip) => {
                      const newValue = [...item.rankedPaymentTabs].filter(
                        (val) => val !== chip,
                      );
                      handleUpdatePayment(newValue, {
                        key: 'rankedPaymentTabs',
                        index,
                      });
                    }}
                  />
                </Grid>
                <Grid item md={1} sm={1} className="iconWrapper">
                  {index === 1 ? (
                    <>
                      <ClearIcon
                        color="secondary"
                        onClick={() => handleRemoveGroup(index)}
                      />
                      <AddCircleIcon
                        color="primary"
                        onClick={handleAddGroup}
                      />
                    </>
                  ) : (
                    <ClearIcon
                      color="secondary"
                      onClick={() => handleRemoveGroup(index)}
                    />
                  )}
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

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Switch, FormControlLabel, Typography,
} from '@material-ui/core';
import {
  lifeTime,
  type,
  businessSegment,
} from '../../../services/selectOptions/selectOptions';
import countriesOptions from '../../../services/selectOptions/countries';
import localization from '../../../localization';
import {
  SelectWithChip,
  SelectCustom,
  NumberInput,
  InputCustom,
  SelectWithDeleteIcon,
} from '../../../components/Inputs';

const General = ({
  setProductData,
  currentProductData,
  selectOptions,
}) => {
  const [lifeTimeUpdateValue, setLifeTimeUpdateValue] = useState({
    number: 1,
    value: '',
  });
  const [showLifeTimeNumber, setShowLifeTimeNumber] = useState(false);

  useEffect(() => {
    let LifeTimeNumber = false;
    const res = currentProductData.lifeTime.match(/[a-zA-Z]+|[0-9]+/g);

    if (res && res.length > 1 && res[1] !== 'DAY') {
      setLifeTimeUpdateValue({ number: res[0], value: res[1] });
      LifeTimeNumber = res[1] === 'MONTH' || res[1] === 'YEAR';
    } else if (res) {
      setLifeTimeUpdateValue({
        ...lifeTimeUpdateValue,
        value: currentProductData.lifeTime,
      });
      LifeTimeNumber = res[0] === 'MONTH' || res[0] === 'YEAR';
    } else {
      setLifeTimeUpdateValue({ ...lifeTimeUpdateValue, value: '' });
    }
    setShowLifeTimeNumber(LifeTimeNumber);
    return () => {};
  }, []);

  useEffect(() => {
    const newLifeTime = showLifeTimeNumber
      ? `${lifeTimeUpdateValue.number}${lifeTimeUpdateValue.value}`
      : lifeTimeUpdateValue.value;
    setProductData({ ...currentProductData, lifeTime: newLifeTime });
  }, [lifeTimeUpdateValue]);

  return (
    <>
      <Box display="flex" flexDirection="row" alignItems="baseline">
        <Box p={2}>
          <Typography color="secondary">
            {localization.t('labels.status')}
          </Typography>
        </Box>
        <Box p={2}>
          <FormControlLabel
            control={(
              <Switch
                name="status"
                onChange={(e) => {
                  setProductData({
                    ...currentProductData,
                    status: e.target.checked ? 'ENABLED' : 'DISABLED',
                  });
                }}
                color="primary"
                checked={currentProductData.status === 'ENABLED'}
              />
            )}
            label={localization.t(
              `labels.${
                currentProductData.status === 'ENABLED' ? 'enabled' : 'disabled'
              }`,
            )}
          />
        </Box>
      </Box>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Box p={2} width="50%">
          <SelectCustom
            isRequired
            label="catalog"
            value={currentProductData.catalogId}
            selectOptions={selectOptions.catalogs}
            onChangeSelect={(e) => {
              setProductData({
                ...currentProductData,
                catalogId: e.target.value,
              });
            }}
          />
        </Box>
        <Box p={2} width="50%">
          <InputCustom
            label="name"
            isRequired
            value={currentProductData.genericName}
            onChangeInput={(e) => setProductData({
              ...currentProductData,
              genericName: e.target.value,
            })}
          />
        </Box>
      </Box>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Box p={2} width="50%">
          <SelectCustom
            label="type"
            isRequired
            value={currentProductData.type}
            selectOptions={type}
            onChangeSelect={(e) => {
              setProductData({
                ...currentProductData,
                type: e.target.value,
              });
            }}
          />
        </Box>
        <Box p={2} width="50%">
          <InputCustom
            isRequired
            label="publisherRefID"
            value={currentProductData.publisherRefId}
            onChangeInput={(e) => setProductData({
              ...currentProductData,
              publisherRefId: e.target.value,
            })}
          />
        </Box>
      </Box>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Box p={2} width="50%">
          <SelectWithDeleteIcon
            label="businessSegment"
            value={currentProductData.businessSegment}
            selectOptions={businessSegment}
            onChangeSelect={(e) => {
              setProductData({
                ...currentProductData,
                businessSegment: e.target.value,
              });
            }}
            onClickDelIcon={() => {
              setProductData({
                ...currentProductData,
                businessSegment: '',
              });
            }}
          />
        </Box>
        <Box display="flex">
          <Box p={2}>
            <SelectCustom
              label="lifeTime"
              value={lifeTimeUpdateValue.value}
              selectOptions={lifeTime}
              onChangeSelect={(e) => {
                setShowLifeTimeNumber(
                  e.target.value === 'MONTH' || e.target.value === 'YEAR',
                );
                setLifeTimeUpdateValue({
                  ...lifeTimeUpdateValue,
                  value: e.target.value,
                });
              }}
            />
          </Box>
          {showLifeTimeNumber && (
            <Box minWidth="165px" p={2}>
              <NumberInput
                label="maxPaymentsPart"
                value={lifeTimeUpdateValue.number}
                onChangeInput={(e) => {
                  setLifeTimeUpdateValue({
                    ...lifeTimeUpdateValue,
                    number: e.target.value,
                  });
                }}
                minMAx={{ min: 1, max: 11 }}
              />
            </Box>
          )}
        </Box>
      </Box>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Box
          display="flex"
          flexDirection="row"
          alignItems="baseline"
          width="50%"
          pr={2}
        >
          <Box p={2}>
            <Typography color="secondary">
              {localization.t('labels.physicalProduct')}
            </Typography>
          </Box>
          <Box p={2}>
            <FormControlLabel
              control={(
                <Switch
                  name="physicalProduct"
                  onChange={(e) => {
                    setProductData({
                      ...currentProductData,
                      physical: e.target.checked,
                    });
                  }}
                  color="primary"
                  checked={currentProductData.physical}
                />
              )}
            />
          </Box>
        </Box>
        <Box p={2} width="50%">
          <InputCustom
            isMultiline
            label="externalContext"
            value={currentProductData.externalContext}
            onChangeInput={(e) => setProductData({
              ...currentProductData,
              externalContext: e.target.value,
            })}
          />
        </Box>
      </Box>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Box p={2} width="50%">
          <SelectWithChip
            label="sellingStores"
            value={currentProductData.sellingStores}
            selectOptions={selectOptions.sellingStores}
            onChangeSelect={(e) => setProductData({
              ...currentProductData,
              sellingStores: e.target.value,
            })}
            onClickDelIcon={(chip) => {
              const newValue = [...currentProductData.sellingStores].filter(
                (val) => val !== chip,
              );
              setProductData({
                ...currentProductData,
                sellingStores: newValue,
              });
            }}
          />
        </Box>
        <Box p={2} width="50%">
          <InputCustom
            label="family"
            value={currentProductData.productFamily}
            onChangeInput={(e) => setProductData({
              ...currentProductData,
              productFamily: e.target.value,
            })}
          />
        </Box>
      </Box>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Box p={2} width="50%">
          <SelectWithChip
            label="blockedCountries"
            value={currentProductData.blackListedCountries}
            selectOptions={countriesOptions}
            onChangeSelect={(e) => setProductData({
              ...currentProductData,
              blackListedCountries: e.target.value,
            })}
            onClickDelIcon={(chip) => {
              const newValue = [
                ...currentProductData.blackListedCountries,
              ].filter((val) => val !== chip);
              setProductData({
                ...currentProductData,
                blackListedCountries: newValue,
              });
            }}
          />
        </Box>
        <Box p={2} width="50%">
          <SelectWithDeleteIcon
            label="priceFunction"
            value={currentProductData.priceFunction}
            selectOptions={selectOptions.priceFunctions}
            onChangeSelect={(e) => {
              setProductData({
                ...currentProductData,
                priceFunction: e.target.value,
              });
            }}
            onClickDelIcon={() => {
              setProductData({
                ...currentProductData,
                priceFunction: '',
              });
            }}
          />
        </Box>
      </Box>
    </>
  );
};

General.propTypes = {
  setProductData: PropTypes.func,
  currentProductData: PropTypes.object,
  selectOptions: PropTypes.object,
};

export default General;

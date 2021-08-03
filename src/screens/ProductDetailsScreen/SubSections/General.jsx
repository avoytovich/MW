import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Switch, Typography } from '@material-ui/core';
import {
  lifeTime,
  type,
  businessSegment,
} from '../../../services/selectOptions/selectOptions';
import { checkValue } from '../../../services/helpers/dataStructuring';
import { getCountriesOptions } from '../../../components/utils/OptionsFetcher/OptionsFetcher';
import localization from '../../../localization';
import {
  SelectWithChip,
  SelectCustom,
  NumberInput,
  InputCustom,
  SelectWithDeleteIcon,
} from '../../../components/Inputs';
import InheritanceField from '../../../components/ProductDetails/InheritanceField';

const General = ({
  setProductData, currentProductData, selectOptions, parentId,
}) => {
  const [lifeTimeUpdateValue, setLifeTimeUpdateValue] = useState({
    number: 1,
    value: '',
  });
  const [showLifeTimeNumber, setShowLifeTimeNumber] = useState(false);

  const countriesOptions = getCountriesOptions();

  useEffect(() => {
    let LifeTimeNumber = false;
    const lT = checkValue(currentProductData?.lifeTime, currentProductData?.lifeTime?.state);

    const res = lT.match(/[a-zA-Z]+|[0-9]+/g);

    if (res && res.length > 1 && res[1] !== 'DAY') {
      setLifeTimeUpdateValue({ number: res[0], value: res[1] });
      LifeTimeNumber = res[1] === 'MONTH' || res[1] === 'YEAR';
    } else if (res) {
      setLifeTimeUpdateValue({
        ...lifeTimeUpdateValue,
        value: lT,
      });
      LifeTimeNumber = res[0] === 'MONTH' || res[0] === 'YEAR';
    } else {
      setLifeTimeUpdateValue({ ...lifeTimeUpdateValue, value: '' });
    }
    setShowLifeTimeNumber(LifeTimeNumber);
    return () => {};
  }, [currentProductData?.lifeTime?.state]);

  useEffect(() => {
    const newLifeTime = showLifeTimeNumber
      ? `${lifeTimeUpdateValue.number}${lifeTimeUpdateValue.value}`
      : lifeTimeUpdateValue.value;

    currentProductData?.lifeTime?.state // eslint-disable-line
      ? currentProductData?.lifeTime?.state === 'inherits'
        ? setProductData({
          ...currentProductData,
          lifeTime: {
            ...currentProductData.lifeTime,
            parentValue: newLifeTime,
          },
        })
        : setProductData({
          ...currentProductData,
          lifeTime: {
            ...currentProductData.lifeTime,
            value: newLifeTime,
          },
        })
      : setProductData({ ...currentProductData, lifeTime: newLifeTime });
  }, [lifeTimeUpdateValue]);

  const stylesForVariations = parentId
    ? {
      display: 'grid',
      gridTemplateColumns: '1fr 60px',
    }
    : {};

  // const stylesForVariationsLifeTime = parentId
  //   ? {
  //       display: 'grid',
  //       gridTemplateAreas: 'lifeTime count inheritButton',
  //       gridTemplateColumns: '1fr 1fr 50px',
  //       gridTemplateRows: '1fr',
  //     }
  //   : {};

  return (
    <>
      <Box display='flex' flexDirection='row' alignItems='baseline'>
        <Box p={2}>
          <Typography color='secondary'>{localization.t('labels.status')}</Typography>
        </Box>
        <Box p={2}>
          <InheritanceField
            field='status'
            onChange={setProductData}
            value={currentProductData?.status}
            parentId={parentId}
            currentProductData={currentProductData}
          >
            {/* <FormControlLabel
              control={ */}
            <Switch
              name='status'
              onChange={(e) => {
                setProductData({
                  ...currentProductData,
                  status: e.target.checked ? 'ENABLED' : 'DISABLED',
                });
              }}
              color='primary'
              checked={currentProductData?.status === 'ENABLED'}
            />
            {/* }
              label={localization.t(
                `labels.${currentProductData.status === 'ENABLED' ? 'enabled' : 'disabled'}`,
              )}
            /> */}
          </InheritanceField>
        </Box>
      </Box>
      <Box display='flex' flexDirection='row' alignItems='center'>
        <Box p={2} width='50%' display='flex'>
          <InheritanceField
            field='catalogId'
            onChange={setProductData}
            value={currentProductData?.catalogId}
            selectOptions={selectOptions.catalogs || []}
            parentId={parentId}
            currentProductData={currentProductData}
          >
            <SelectCustom
              isRequired
              label='catalog'
              value={currentProductData.catalogId}
              selectOptions={selectOptions.catalogs}
              onChangeSelect={(e) => {
                setProductData({
                  ...currentProductData,
                  catalogId: e.target.value,
                });
              }}
            />
          </InheritanceField>
        </Box>
        <Box p={2} width='50%' display='flex'>
          <InheritanceField
            field='genericName'
            onChange={setProductData}
            value={currentProductData.genericName}
            parentId={parentId}
            currentProductData={currentProductData}
          >
            <InputCustom
              label='name'
              isRequired
              value={currentProductData.genericName}
              onChangeInput={(e) => {
                setProductData({
                  ...currentProductData,
                  genericName: e.target.value,
                });
              }}
            />
          </InheritanceField>
        </Box>
      </Box>
      <Box display='flex' flexDirection='row' alignItems='center'>
        <Box p={2} width='50%' display='flex'>
          <InheritanceField
            field='type'
            onChange={setProductData}
            value={currentProductData.type}
            selectOptions={type || []}
            parentId={parentId}
            currentProductData={currentProductData}
          >
            <SelectCustom
              label='type'
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
          </InheritanceField>
        </Box>
        <Box p={2} width='50%' display='flex'>
          <InheritanceField
            field='publisherRefId'
            onChange={setProductData}
            value={currentProductData.publisherRefId}
            parentId={parentId}
            currentProductData={currentProductData}
          >
            <InputCustom
              isRequired
              label='publisherRefID'
              value={currentProductData.publisherRefId}
              onChangeInput={(e) => setProductData({
                ...currentProductData,
                publisherRefId: e.target.value,
              })}
            />
          </InheritanceField>
        </Box>
      </Box>
      <Box display='flex' flexDirection='row' alignItems='center'>
        <Box p={2} width='50%' display='flex'>
          <InheritanceField
            field='businessSegment'
            onChange={setProductData}
            value={currentProductData.businessSegment}
            selectOptions={businessSegment || []}
            parentId={parentId}
            currentProductData={currentProductData}
          >
            <SelectWithDeleteIcon
              label='businessSegment'
              value={currentProductData.businessSegment}
              selectOptions={businessSegment || []}
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
          </InheritanceField>
        </Box>
        <Box display='flex'>
          <Box p={2} minWidth='170px' display='flex'>
            <InheritanceField
              field='lifeTime'
              onChange={setProductData}
              value={currentProductData.lifeTime}
              selectOptions={lifeTime || []}
              parentId={parentId}
              currentProductData={currentProductData}
            >
              <SelectCustom
                label='lifeTime'
                gridArea='lifeTime'
                value={currentProductData.lifeTime}
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
            </InheritanceField>
          </Box>
          {showLifeTimeNumber && (
            <Box minWidth='165px' p={2} gridArea='count'>
              <NumberInput
                isDisabled={currentProductData?.lifeTime?.state === 'inherits'}
                label='maxPaymentsPart'
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
      <Box display='flex' flexDirection='row' alignItems='center'>
        <Box display='flex' flexDirection='row' alignItems='baseline' width='50%' pr={2}>
          <Box p={2}>
            <Typography color='secondary'>
              {localization.t('labels.physicalProduct')}
            </Typography>
          </Box>
          <Box p={2}>
            <InheritanceField
              field='physical'
              onChange={setProductData}
              value={currentProductData.physical}
              parentId={parentId}
              currentProductData={currentProductData}
            >
              {/* <FormControlLabel
                control={ */}
              <Switch
                name='physicalProduct'
                onChange={(e) => {
                  setProductData({
                    ...currentProductData,
                    physical: e.target.checked,
                  });
                }}
                color='primary'
                checked={currentProductData.physical}
              />
              {/* }
              /> */}
            </InheritanceField>
          </Box>
        </Box>
        <Box p={2} width='50%'>
          <InheritanceField
            field='externalContext'
            onChange={setProductData}
            value={currentProductData.externalContext}
            parentId={parentId}
            currentProductData={currentProductData}
          >
            <InputCustom
              isMultiline
              label='externalContext'
              value={currentProductData.externalContext}
              onChangeInput={(e) => setProductData({
                ...currentProductData,
                externalContext: e.target.value,
              })}
            />
          </InheritanceField>
        </Box>
      </Box>
      <Box display='flex' flexDirection='row' alignItems='center'>
        <Box p={2} width='50%' {...stylesForVariations}>
          <InheritanceField
            field='sellingStores'
            onChange={setProductData}
            value={currentProductData.sellingStores}
            selectOptions={selectOptions.sellingStores || []}
            parentId={parentId}
            currentProductData={currentProductData}
          >
            <SelectWithChip
              label='sellingStores'
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
          </InheritanceField>
        </Box>
        <Box p={2} width='50%'>
          <InheritanceField
            field='productFamily'
            onChange={setProductData}
            value={currentProductData.productFamily}
            parentId={parentId}
            currentProductData={currentProductData}
          >
            <InputCustom
              label='family'
              value={currentProductData.productFamily}
              onChangeInput={(e) => setProductData({
                ...currentProductData,
                productFamily: e.target.value,
              })}
            />
          </InheritanceField>
        </Box>
      </Box>
      <Box display='flex' flexDirection='row' alignItems='center'>
        <Box p={2} width='50%' {...stylesForVariations}>
          <InheritanceField
            field='blackListedCountries'
            onChange={setProductData}
            value={currentProductData.blackListedCountries || []}
            selectOptions={countriesOptions || []}
            parentId={parentId}
            currentProductData={currentProductData}
          >
            <SelectWithChip
              label='blockedCountries'
              value={currentProductData.blackListedCountries || []}
              selectOptions={countriesOptions}
              onChangeSelect={(e) => setProductData({
                ...currentProductData,
                blackListedCountries: e.target.value,
              })}
              onClickDelIcon={(chip) => {
                const newValue = [...currentProductData.blackListedCountries].filter(
                  (val) => val !== chip,
                );
                setProductData({
                  ...currentProductData,
                  blackListedCountries: newValue,
                });
              }}
            />
          </InheritanceField>
        </Box>
      </Box>
    </>
  );
};

General.propTypes = {
  setProductData: PropTypes.func,
  currentProductData: PropTypes.object,
  selectOptions: PropTypes.object,
  parentId: PropTypes.string,
};

export default General;

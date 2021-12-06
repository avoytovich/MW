import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ClearIcon from '@material-ui/icons/Clear';

import {
  Box,
  Switch,
  Typography,
  Button,
  ButtonGroup,
  TextField,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@material-ui/core';
import {
  lifeTime,
  type,
  businessSegment,
} from '../../../services/selectOptions/selectOptions';
import { checkValue } from '../../../services/helpers/dataStructuring';
import { getCountriesOptions } from '../../../components/utils/OptionsFetcher/OptionsFetcher';
import localization from '../../../localization';
import Popup from '../../../components/Popup';

import {
  SelectWithChip,
  SelectCustom,
  NumberInput,
  InputCustom,
  SelectWithDeleteIcon,
} from '../../../components/Inputs';
import InheritanceField from '../InheritanceField';

const General = ({
  setProductData, currentProductData, selectOptions, parentId,
}) => {
  const [lifeTimeUpdateValue, setLifeTimeUpdateValue] = useState({
    number: 1,
    value: '',
  });

  const [showLifeTimeNumber, setShowLifeTimeNumber] = useState(false);
  const [countrySelection, setCountrySelection] = useState('blocked');

  const defaultBlacklisted = parentId
    ? currentProductData?.blackListedCountries?.value : currentProductData?.blackListedCountries;
  const [selectedCountries, setSelectedCountries] = useState(defaultBlacklisted || []);

  const [selectedBundledProduct, setSelectedBundledProduct] = useState(null);

  const counts = {};
  const subProductsList = currentProductData?.subProducts || [];

  subProductsList.forEach((x) => {
    counts[x] = (counts[x] || 0) + 1;
  });

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
    return () => { };
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

  useEffect(() => {
    const newCountries = countrySelection === 'blocked'
      ? [...selectedCountries]
      : [...countriesOptions.map((l) => l.id).filter((c) => selectedCountries?.indexOf(c) < 0)];

    const [hasChanges] = newCountries
      .filter((itm) => defaultBlacklisted.indexOf(itm) < 0);
    const [hasReverseChanges] = defaultBlacklisted.filter(
      (itm) => newCountries?.indexOf(itm) < 0,
    );

    if (hasChanges || hasReverseChanges) {
      if (parentId) {
        setProductData({
          ...currentProductData,
          blackListedCountries: {
            ...currentProductData.blackListedCountries,
            value: [...newCountries],
          },
        });
      } else {
        setProductData({
          ...currentProductData,
          blackListedCountries: [...newCountries],
        });
      }
    }
  }, [selectedCountries]);

  useEffect(() => {
    if (!countriesOptions?.length && defaultBlacklisted?.length) return;

    if (countrySelection === 'blocked') {
      const newCountries = defaultBlacklisted.length ? countriesOptions
        .map((l) => l.id)
        .filter((c) => defaultBlacklisted?.indexOf(c) >= 0) : [];

      setSelectedCountries([...newCountries]);
    } else {
      const newCountries = defaultBlacklisted?.length ? countriesOptions
        .map((l) => l.id)
        .filter((c) => defaultBlacklisted?.indexOf(c) < 0)
        : countriesOptions.map((l) => l.id);

      setSelectedCountries([...newCountries]);
    }
  }, [countrySelection]);

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
      <Box display='flex' flexDirection='row' alignItems='center'>
        {/* <Box p={2} width='50%' display='flex'>
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
        </Box> */}

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

        <Box display='flex' flexDirection='row' alignItems='baseline' width='50%'>
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
              tooltip={localization.t('tooltips.publisherRefId')}
              label='publisherRefId'
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
              tooltip={localization.t('tooltips.externalContext')}
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
              redirectTo='store'
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
              tooltip={localization.t('tooltips.family')}
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
        <Box p={2} width='50%'>
          <InheritanceField
            field='blackListedCountries'
            onChange={setProductData}
            value={defaultBlacklisted || []}
            selectOptions={countriesOptions || []}
            parentId={parentId}
            currentProductData={currentProductData}
          >
            <Box p={2} height={74} alignItems='center' display='flex'>
              <Typography variant='h4'>{localization.t('labels.allowedBlockedCountries')}</Typography>

              <Button variant='outlined' color='primary' style={{ marginLeft: '15px' }} onClick={() => setSelectedCountries(countriesOptions.map((l) => l.id))}>
                {localization.t('labels.selectAll')}
              </Button>
              <Button variant='outlined' color='primary' style={{ marginLeft: '15px' }} onClick={() => setSelectedCountries([])}>
                {localization.t('labels.removeAll')}
              </Button>
            </Box>

            <Box p={2}>
              <RadioGroup
                row
                value={countrySelection}
                onChange={(e) => setCountrySelection(e.target.value)}
              >
                <FormControlLabel
                  value='blocked'
                  control={<Radio color="primary" />}
                  label={localization.t('labels.blocked')}
                />
                <FormControlLabel
                  value='allowed'
                  control={<Radio color="primary" />}
                  label={localization.t('labels.allowed')}
                />
              </RadioGroup>
            </Box>

            <Box p={2}>
              <SelectWithChip
                label={countrySelection === 'blocked' ? 'blockedCountries' : 'allowedCountries'}
                value={selectedCountries}
                selectOptions={countriesOptions}
                onChangeSelect={(e) => setSelectedCountries(e.target.value)}
                onClickDelIcon={(chip) => {
                  const newValue = [...selectedCountries].filter((val) => val !== chip);
                  setSelectedCountries(newValue);
                }}
              />
            </Box>
          </InheritanceField>
        </Box>
      </Box>
      <Box p={2}>
        <Box py={4}>
          <Typography gutterBottom variant='h4'>
            {localization.t('labels.bundledProducts')}
          </Typography>
        </Box>
        {Object.entries(counts).map(([key, value]) => {
          const selectValue = selectOptions?.renewingProducts?.find(({ id }) => id === key) || '';
          return (
            <Box
              key={key}
              display='flex'
              justifyContent='space-between'
              marginBottom='30px'
              marginRight='30px'
            >
              <Popup
                text={selectValue.value}
                childrenComponent={(props) => (
                  <TextField
                    name={key}
                    aria-owns={props.open ? `mouse-over-popover ${key}` : undefined}
                    aria-haspopup='true'
                    disabled
                    value={selectValue.value || ''}
                    fullWidth
                    label='Name or Id'
                    type='text'
                    variant='outlined'
                    onMouseEnter={props.handlePopoverOpen}
                    onMouseLeave={props.handlePopoverClose}
                  />
                )}
              />
              <Box marginLeft='17px' height='inherit'>
                <ButtonGroup
                  size='large'
                  aria-label='large outlined button group'
                  style={{ height: '100%' }}
                >
                  <Button
                    data-test='decrementSubProduct'
                    onClick={() => {
                      const index = currentProductData?.subProducts?.findIndex(
                        (item) => item === selectValue.id,
                      );
                      const newSubProducts = [...currentProductData.subProducts];
                      newSubProducts.splice(index, 1);
                      setProductData({
                        ...currentProductData,
                        subProducts: newSubProducts,
                      });
                    }}
                  >
                    -
                  </Button>
                  <Button data-test='subProductCount' disabled>
                    {value}
                  </Button>
                  <Button
                    data-test='incrementSubProduct'
                    onClick={() => {
                      setProductData({
                        ...currentProductData,
                        subProducts: [...currentProductData.subProducts, selectValue.id],
                      });
                    }}
                  >
                    +
                  </Button>
                </ButtonGroup>
              </Box>
              <Box marginLeft='20px'>
                <IconButton
                  color='secondary'
                  aria-label='clear'
                  onClick={() => {
                    setProductData({
                      ...currentProductData,
                      subProducts: currentProductData.subProducts.filter(
                        (item) => item !== selectValue.id,
                      ),
                    });
                  }}
                >
                  <ClearIcon />
                </IconButton>
              </Box>
            </Box>
          );
        })}
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          marginBottom='30px'
          marginRight='30px'
        >
          <SelectCustom
            label='nameOrId'
            value={selectedBundledProduct || ''}
            selectOptions={selectOptions?.renewingProducts || []}
            onChangeSelect={(e) => {
              setSelectedBundledProduct(e.target.value);
            }}
          />
          <Box marginLeft='20px'>
            <IconButton
              color={selectedBundledProduct ? 'primary' : 'secondary'}
              aria-label='add to shopping cart'
              disabled={!selectedBundledProduct}
              onClick={() => {
                setProductData({
                  ...currentProductData,
                  subProducts: currentProductData?.subProducts
                    ? [...currentProductData.subProducts, selectedBundledProduct]
                    : [selectedBundledProduct],
                });
                setSelectedBundledProduct(null);
              }}
            >
              <AddCircleOutlineIcon size='medium' color='primary' />
            </IconButton>
          </Box>
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
  open: PropTypes.bool,
  handlePopoverClose: PropTypes.func,
  handlePopoverOpen: PropTypes.func,
};

export default General;

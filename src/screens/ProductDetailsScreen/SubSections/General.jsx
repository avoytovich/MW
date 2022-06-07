import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ClearIcon from '@mui/icons-material/Clear';

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
  InputAdornment,
} from '@mui/material';

import CancelIcon from '@mui/icons-material/Cancel';

import moment from 'moment';

import InheritanceField from '../InheritanceField';

import {
  SelectWithChip,
  SelectCustom,
  NumberInput,
  InputCustom,
  SelectWithDeleteIcon,
  AutocompleteCustom,
} from '../../../components/Inputs';

import { getCountriesOptions } from '../../../components/utils/OptionsFetcher/OptionsFetcher';
import Popup from '../../../components/Popup';

import {
  lifeTime,
  type,
  businessSegment,
} from '../../../services/selectOptions/selectOptions';
import { checkValue } from '../../../services/helpers/dataStructuring';

import { sortByAlphabetical } from '../../../services/helpers/utils';

import localization from '../../../localization';

const General = ({
  setProductData,
  currentProductData,
  selectOptions,
  parentId,
  setSaveDisabled,
  variablesDescriptions,
}) => {
  const [lifeTimeUpdateValue, setLifeTimeUpdateValue] = useState({ number: 1, value: '' });
  const [showLifeTimeNumber, setShowLifeTimeNumber] = useState(false);
  const [countrySelection, setCountrySelection] = useState('blocked');
  const [selectedBundledProduct, setSelectedBundledProduct] = useState(null);
  const [updSelectedCountries, setUpdSelectedCountries] = useState(0);
  const [errorLifetime, setErrorLifetime] = useState(false);
  const [errorTextLifetime, setErrorTextLifetime] = useState('');

  const defaultBlacklisted = checkValue(currentProductData?.blackListedCountries) || [];
  const [selectedCountries, setSelectedCountries] = useState([...defaultBlacklisted]);

  const counts = {};
  const subProductsList = checkValue(currentProductData?.subProducts) || [];

  subProductsList.forEach((x) => { counts[x] = (counts[x] || 0) + 1; });

  const countriesOptions = getCountriesOptions();

  const { lifeTime: lifetime, subscriptionTemplate, fulfillmentTemplate } = currentProductData;

  useEffect(() => {
    setSaveDisabled(!!(fulfillmentTemplate && selectedBundledProduct));
  }, [fulfillmentTemplate, selectedBundledProduct]);

  useEffect(() => {
    if (selectedCountries?.length !== defaultBlacklisted?.length) {
      setSelectedCountries([...defaultBlacklisted]);
    }
  }, [currentProductData?.blackListedCountries]);

  useEffect(() => {
    if (lifetime === 'PERMANENT' && subscriptionTemplate) {
      setErrorLifetime(true);
      setErrorTextLifetime(localization.t('labels.errorProductPerAndSub'));
    } else {
      setErrorLifetime(false);
    }
  }, [lifetime, subscriptionTemplate]);

  useEffect(() => {
    let LifeTimeNumber = false;
    const lT = checkValue(currentProductData?.lifeTime);

    const res = lT.match(/[a-zA-Z]+|[0-9]+/g);

    if (res && res.length > 1 && res[1]) {
      setLifeTimeUpdateValue({ number: res[0], value: res[1] });

      LifeTimeNumber = res[1] === 'MONTH' || res[1] === 'YEAR' || res[1] === 'DAY';
    } else if (res) {
      setLifeTimeUpdateValue({ ...lifeTimeUpdateValue, value: lT });

      LifeTimeNumber = res[0] === 'MONTH' || res[0] === 'YEAR' || res[0] === 'DAY';
    } else {
      setLifeTimeUpdateValue({ ...lifeTimeUpdateValue, value: '' });
    }

    setShowLifeTimeNumber(LifeTimeNumber);
  }, [currentProductData?.lifeTime?.state]);

  useEffect(() => {
    const newLifeTime = showLifeTimeNumber ? `${lifeTimeUpdateValue.number}${lifeTimeUpdateValue.value}` : lifeTimeUpdateValue.value;

    // eslint-disable-next-line no-nested-ternary
    currentProductData?.lifeTime?.state
      ? currentProductData?.lifeTime?.state === 'inherits'
        ? setProductData({
          ...currentProductData,
          lifeTime: {
            ...currentProductData.lifeTime,
            parentValue: newLifeTime,
          },
        }) : setProductData({
          ...currentProductData,
          lifeTime: {
            ...currentProductData.lifeTime,
            value: newLifeTime,
          },
        }) : setProductData({ ...currentProductData, lifeTime: newLifeTime });
  }, [lifeTimeUpdateValue]);

  useEffect(() => {
    if (lifeTimeUpdateValue.value === 'DAY' && lifeTimeUpdateValue.number === '7') {
      setShowLifeTimeNumber(false);
      setLifeTimeUpdateValue({ ...lifeTimeUpdateValue, number: 1, value: '7DAY' });
    } else if (lifeTimeUpdateValue.value === 'DAY' && lifeTimeUpdateValue.number >= 8) {
      setLifeTimeUpdateValue({ ...lifeTimeUpdateValue, number: 1 });
    } else if (lifeTimeUpdateValue.value === 'MONTH' && lifeTimeUpdateValue.number > 24) {
      setLifeTimeUpdateValue({ ...lifeTimeUpdateValue, number: 24 });
    }
  }, [lifeTimeUpdateValue.value, lifeTimeUpdateValue.number]);

  useEffect(() => {
    const checkedSelected = checkValue(selectedCountries) || [];
    const checkedDefault = checkValue(defaultBlacklisted) || [];

    const newCountries = countrySelection === 'blocked' ? [...checkedSelected]
      : [...countriesOptions.map((l) => l.id).filter((c) => checkedSelected?.indexOf(c) < 0)];

    const [hasChanges] = newCountries
      ? newCountries?.filter((itm) => checkedDefault?.indexOf(itm) < 0) : [];

    const [hasReverseChanges] = checkedDefault?.length
      ? checkedDefault?.filter((itm) => newCountries?.indexOf(itm) < 0) : [];

    if (hasChanges || hasReverseChanges) {
      if (parentId) {
        setProductData({
          ...currentProductData,
          blackListedCountries: {
            ...currentProductData?.blackListedCountries,
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
    const checkedDefault = checkValue(defaultBlacklisted) || [];

    if (!countriesOptions?.length && checkedDefault?.length) return;

    if (countrySelection === 'blocked') {
      const newCountries = checkedDefault?.length ? countriesOptions
        .map((l) => l.id)
        .filter((c) => checkedDefault?.indexOf(c) >= 0) : [];

      setSelectedCountries([...newCountries]);
    } else {
      const newCountries = checkedDefault?.length ? countriesOptions
        .map((l) => l.id)
        .filter((c) => checkedDefault?.indexOf(c) < 0)
        : countriesOptions.map((l) => l.id);

      setSelectedCountries([...newCountries]);
    }
  }, [countrySelection, updSelectedCountries]);

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
            value={currentProductData?.genericName}
            parentId={parentId}
            currentProductData={currentProductData}
          >
            <InputCustom
              label='name'
              isRequired
              value={checkValue(currentProductData.genericName)}
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
            </InheritanceField>
          </Box>
        </Box>
      </Box>

      <Box display='flex' flexDirection='row' alignItems='center'>
        <Box p={2} width='50%' display='flex'>
          <InheritanceField
            field='type'
            onChange={setProductData}
            value={currentProductData?.type}
            selectOptions={type || []}
            parentId={parentId}
            currentProductData={currentProductData}
          >
            <SelectCustom
              label='type'
              isRequired
              value={currentProductData?.type}
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
              value={checkValue(currentProductData?.publisherRefId)}
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
            value={currentProductData?.businessSegment}
            selectOptions={businessSegment || []}
            parentId={parentId}
            currentProductData={currentProductData}
          >
            <SelectWithDeleteIcon
              label='businessSegment'
              value={checkValue(currentProductData?.businessSegment)}
              selectOptions={businessSegment || []}
              onChangeSelect={(e) => {
                setProductData({ ...currentProductData, businessSegment: e.target.value });
              }}
              onClickDelIcon={() => setProductData({ ...currentProductData, businessSegment: '' })}
            />
          </InheritanceField>
        </Box>

        <Box display='flex'>
          <Box p={2} minWidth='170px' display='flex'>
            <InheritanceField
              field='lifeTime'
              onChange={setProductData}
              value={currentProductData?.lifeTime}
              selectOptions={lifeTime || []}
              parentId={parentId}
              currentProductData={currentProductData}
            >
              <Box display='flex'>
                <SelectCustom
                  label='lifeTime'
                  gridArea='lifeTime'
                  isDisabled={currentProductData?.lifeTime?.state === 'inherits'}
                  value={checkValue(lifeTimeUpdateValue?.value)}
                  selectOptions={lifeTime}
                  onChangeSelect={(e) => {
                    setShowLifeTimeNumber(e.target.value === 'MONTH' || e.target.value === 'YEAR' || e.target.value === 'DAY');
                    setLifeTimeUpdateValue({ ...lifeTimeUpdateValue, value: e.target.value });
                  }}
                  hasError={errorLifetime}
                  helperText={errorTextLifetime}
                />

                {showLifeTimeNumber && (
                  <Box minWidth='165px' p={2} gridArea='count'>
                    <NumberInput
                      isDisabled={currentProductData?.lifeTime?.state === 'inherits'}
                      label='maxPaymentsPart'
                      value={lifeTimeUpdateValue.number}
                      onChangeInput={(e) => {
                        setLifeTimeUpdateValue({
                          ...lifeTimeUpdateValue,
                          // eslint-disable-next-line no-nested-ternary
                          number: e.target.value > 99
                            ? 99 : e.target.value < 1 ? 1 : e.target.value,
                        });
                      }}
                      minMAx={{ min: 1, max: 99 }}
                    />
                  </Box>
                )}
              </Box>
            </InheritanceField>
          </Box>
        </Box>
      </Box>

      <Box display='flex' flexDirection='row' alignItems='center'>
        <Box width='25%'>
          <Box p={2} gridArea='count'>
            <NumberInput
              label='priority'
              value={checkValue(currentProductData?.priority)}
              onChangeInput={(e) => {
                setProductData({
                  ...currentProductData,
                  priority: e.target.value,
                });
              }}
            />
          </Box>
        </Box>

        <Box display='flex' flexDirection='row' alignItems='baseline' width='25%' pr={2}>
          <Box p={2} minWidth='146px'>
            <Typography color='secondary'>{localization.t('labels.physicalProduct')}</Typography>
          </Box>

          <Box py={2} flexGrow={1}>
            <InheritanceField
              field='physical'
              onChange={setProductData}
              value={currentProductData?.physical}
              parentId={parentId}
              currentProductData={currentProductData}
            >
              <Switch
                name='physicalProduct'
                onChange={(e) => {
                  setProductData({ ...currentProductData, physical: e.target.checked });
                }}
                color='primary'
                checked={checkValue(currentProductData?.physical)}
              />
            </InheritanceField>
          </Box>
        </Box>

        <Box p={2} width='50%'>
          <form noValidate>
            <TextField
              disabled={!checkValue(currentProductData.fulfillmentTemplate)}
              name="datetime"
              value={
                currentProductData?.releaseDate
                  ? moment(checkValue(currentProductData.releaseDate)).format('YYYY-MM-DD') : ''
              }
              label={localization.t('labels.preorderReleaseDate')}
              type="date"
              variant="outlined"
              InputProps={{
                endAdornment: currentProductData.releaseDate && (
                  <InputAdornment position='end'>
                    <CancelIcon
                      className="cancelDateIcon"
                      fontSize="small"
                      color="secondary"
                      onClick={() => {
                        setProductData({ ...currentProductData, releaseDate: '' });
                      }}
                      onMouseDown={(e) => {
                        e.stopPropagation();
                      }}
                    />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => {
                setProductData({ ...currentProductData, releaseDate: e.target.value });
              }}
            />
          </form>
        </Box>
      </Box>

      <Box display='flex' flexDirection='row' alignItems='center'>
        <Box p={2} width='50%'>
          <InheritanceField
            field='sellingStores'
            onChange={setProductData}
            value={currentProductData?.sellingStores}
            selectOptions={selectOptions.sellingStores || []}
            parentId={parentId}
            currentProductData={currentProductData}
          >
            <SelectWithChip
              label='sellingStores'
              value={checkValue(currentProductData?.sellingStores)}
              selectOptions={selectOptions.sellingStores}
              onChangeSelect={(e) => setProductData({
                ...currentProductData,
                sellingStores: e.target.value,
              })}
              onClickDelIcon={(chip) => {
                const newValue = [...checkValue(currentProductData?.sellingStores)].filter(
                  (val) => val !== chip,
                );
                setProductData({ ...currentProductData, sellingStores: newValue });
              }}
              redirectTo='store'
            />
          </InheritanceField>
        </Box>

        <Box p={2} width='50%'>
          <InheritanceField
            field='productFamily'
            onChange={setProductData}
            value={currentProductData?.productFamily}
            parentId={parentId}
            currentProductData={currentProductData}
          >
            <InputCustom
              label='family'
              tooltip={localization.t('tooltips.family')}
              value={checkValue(currentProductData?.productFamily)}
              onChangeInput={(e) => setProductData({
                ...currentProductData,
                productFamily: e.target.value,
              })}
            />
          </InheritanceField>
        </Box>
      </Box>

      <Box display='flex' flexDirection='row' alignItems='center'>
        <Box width='100%'>
          <InheritanceField
            field='blackListedCountries'
            onChange={setProductData}
            value={selectedCountries}
            selectOptions={countriesOptions || []}
            parentId={parentId}
            currentProductData={currentProductData}
            containerStyles={{ alignItems: 'flex-start' }}
            buttonStyles={{ top: '20px', right: '12px' }}
            buttonAction={() => setUpdSelectedCountries((c) => c + 1)}
          >
            <Box width='100%'>
              <Box p={2} height={74} alignItems='center' display='flex'>
                <Typography variant='h4'>{localization.t('labels.allowedBlockedCountries')}</Typography>

                <Button
                  variant='outlined'
                  color='primary'
                  style={{ marginLeft: '15px' }}
                  onClick={() => setSelectedCountries(countriesOptions.map((l) => l.id))}
                  disabled={currentProductData?.blackListedCountries?.state === 'inherits'}
                >
                  {localization.t('labels.selectAll')}
                </Button>

                <Button
                  variant='outlined'
                  color='primary'
                  style={{ marginLeft: '15px' }}
                  onClick={() => setSelectedCountries([])}
                  disabled={currentProductData?.blackListedCountries?.state === 'inherits'}
                >
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
                    disabled={currentProductData?.blackListedCountries?.state === 'inherits'}
                  />
                  <FormControlLabel
                    value='allowed'
                    control={<Radio color="primary" />}
                    label={localization.t('labels.allowed')}
                    disabled={currentProductData?.blackListedCountries?.state === 'inherits'}
                  />
                </RadioGroup>
              </Box>

              <Box p={2}>
                <SelectWithChip
                  label={countrySelection === 'blocked' ? 'blockedCountries' : 'allowedCountries'}
                  value={checkValue(selectedCountries)}
                  selectOptions={countriesOptions}
                  onChangeSelect={(e) => setSelectedCountries(e.target.value)}
                  isDisabled={currentProductData?.blackListedCountries?.state === 'inherits'}
                  onClickDelIcon={(chip) => {
                    const newValue = [...checkValue(selectedCountries)]
                      .filter((val) => val !== chip);
                    setSelectedCountries(newValue);
                  }}
                />
              </Box>
            </Box>
          </InheritanceField>
        </Box>
      </Box>

      <Box p={2}>
        <Box py={2}>
          <Typography gutterBottom variant='h4'>{localization.t('labels.bundledProducts')}</Typography>
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
                    value={selectValue.value?.split('(')[0]?.trim() || ''}
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
                      const index = checkValue(currentProductData?.subProducts)?.findIndex(
                        (item) => item === selectValue.id,
                      );
                      const newSubProducts = [...checkValue(currentProductData.subProducts)];
                      newSubProducts.splice(index, 1);
                      setProductData({ ...currentProductData, subProducts: newSubProducts });
                    }}
                  >
                    -
                  </Button>
                  <Button data-test='subProductCount' disabled>{value}</Button>
                  <Button
                    data-test='incrementSubProduct'
                    onClick={() => {
                      setProductData({
                        ...currentProductData,
                        subProducts: [
                          ...checkValue(currentProductData?.subProducts),
                          selectValue.id,
                        ],
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
                      subProducts: checkValue(currentProductData.subProducts).filter(
                        (item) => item !== selectValue.id,
                      ),
                    });
                  }}
                  size='large'
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
        >
          <InheritanceField
            field='subProducts'
            onChange={setProductData}
            value={currentProductData?.subProducts || []}
            selectOptions={selectOptions?.renewingProducts || []}
            parentId={parentId}
            currentProductData={currentProductData}
            containerStyles={{ alignItems: 'flex-start' }}
            buttonStyles={{ top: '6px' }}
          >
            <>
              <AutocompleteCustom
                optionLabelKey='value'
                label='productNameOrId'
                onSelect={setSelectedBundledProduct}
                selectOptions={selectOptions?.renewingProducts?.sort(sortByAlphabetical) || []}
                curValue={checkValue(selectedBundledProduct) || ''}
                isDisabled={currentProductData?.subProducts?.state === 'inherits'}
                error={!!(fulfillmentTemplate && selectedBundledProduct)}
                helperText={localization.t('labels.errorProductFulAndBun')}
              />
              <Box marginLeft='5px'>
                <IconButton
                  color={selectedBundledProduct && currentProductData?.subProducts?.state !== 'inherits' ? 'primary' : 'secondary'}
                  aria-label='add to shopping cart'
                  disabled={!selectedBundledProduct || currentProductData?.subProducts?.state === 'inherits'}
                  onClick={() => {
                    if (parentId) {
                      setProductData({
                        ...currentProductData,
                        subProducts: {
                          ...currentProductData?.subProducts,
                          value: currentProductData?.subProducts ? [
                            ...checkValue(currentProductData.subProducts),
                            checkValue(selectedBundledProduct),
                          ] : [checkValue(selectedBundledProduct)],
                        },
                      });
                    } else {
                      setProductData({
                        ...currentProductData,
                        subProducts: currentProductData?.subProducts ? [
                          ...currentProductData.subProducts, selectedBundledProduct,
                        ] : [selectedBundledProduct],
                      });
                    }

                    setSelectedBundledProduct(null);
                  }}
                  size='large'
                >
                  <AddCircleOutlineIcon size='medium' color='inherit' />
                </IconButton>
              </Box>
            </>
          </InheritanceField>
        </Box>
        {parentId ? (
          <Box display='flex' width='100%' flexDirection='column'>
            <Box py={4}>
              <Typography gutterBottom variant='h4'>{localization.t('labels.variationParameters')}</Typography>
            </Box>
            <Box display='flex' flexDirection='column'>
              {variablesDescriptions?.map(
                ({ label, description, variableValueDescriptions }, i) => {
                  const disabled = currentProductData[description]?.state === 'inherits';
                  return (
                    <Box display='flex' alignItems='center' key={label || description}>
                      <Typography>{label || description}</Typography>
                      <Box
                        display='flex'
                        justifyContent='space-between'
                        alignItems='center'
                        marginLeft='20px'
                        width='100%'
                      >
                        <InheritanceField
                          field={description}
                          valuePath={i}
                          onChange={setProductData}
                          value={currentProductData[description]}
                          parentId={parentId}
                          currentProductData={currentProductData}
                        >
                          <RadioGroup
                            aria-label={description}
                            name={description}
                            data-test='variationParameter'
                          >
                            <Box display='flex'>
                              {variableValueDescriptions?.map(
                                ({ descValue, description: _description }) => (
                                  <FormControlLabel
                                    key={_description}
                                    className='radio'
                                    value={_description}
                                    disabled={disabled}
                                    control={<Radio color='primary' />}
                                    label={descValue || '?'}
                                  />
                                ),
                              )}
                            </Box>
                          </RadioGroup>
                        </InheritanceField>
                      </Box>
                    </Box>
                  );
                },
              )}
            </Box>
          </Box>
        ) : '' }
      </Box>
    </>
  );
};

General.propTypes = {
  setProductData: PropTypes.func,
  setSaveDisabled: PropTypes.bool,
  currentProductData: PropTypes.object,
  selectOptions: PropTypes.object,
  parentId: PropTypes.string,
  open: PropTypes.bool,
  handlePopoverClose: PropTypes.func,
  handlePopoverOpen: PropTypes.func,
  variablesDescriptions: PropTypes.array,
};

export default General;

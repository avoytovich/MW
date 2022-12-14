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
  FormHelperText,
} from '@mui/material';

import CancelIcon from '@mui/icons-material/Cancel';

import moment from 'moment';

import InheritanceField from '../InheritanceField';

import {
  SelectCustom,
  NumberInput,
  InputCustom,
  AutocompleteWithChips,
  AutocompleteCustom,
} from '../../../components/Inputs';

import { getCountriesOptions } from '../../../components/utils/OptionsFetcher/OptionsFetcher';
import Popup from '../../../components/Popup';
import { notShowMaxPaymentsPart } from '../utils';
import {
  lifeTime,
  type,
  businessSegment,
} from '../../../services/selectOptions/selectOptions';
import { checkValue, renewingProductsOptions } from '../../../services/helpers/dataStructuring';

import localization from '../../../localization';
import '../productDetailsScreen.scss';

const General = ({
  setProductData,
  currentProductData,
  selectOptions,
  parentId,
  variablesDescriptions,
  errors,
  modified,
  setModified,
}) => {
  const [countrySelection, setCountrySelection] = useState('blocked');
  const [selectedBundledProduct, setSelectedBundledProduct] = useState(null);
  const [updSelectedCountries, setUpdSelectedCountries] = useState(0);

  const defaultBlacklisted = checkValue(currentProductData?.blackListedCountries) || [];
  const [selectedCountries, setSelectedCountries] = useState([...defaultBlacklisted]);

  const counts = {};
  const subProductsList = checkValue(currentProductData?.subProducts) || [];

  subProductsList.forEach((x) => { counts[x] = (counts[x] || 0) + 1; });

  const countriesOptions = getCountriesOptions();

  const filteredSelectOptions = selectOptions?.renewingProducts
    ?.filter(
      (candidate) => !(candidate.subProducts && candidate.subProducts.length
        && candidate.fulfillmentTemplate)
        && !candidate.subscriptionTemplate
        && (!candidate.subProducts || candidate.subProducts.length === 0)
        && (!currentProductData.id
          || (currentProductData.id !== candidate.parentId
            && currentProductData.id !== candidate.id)),
    ) || [];
  const handleSelectOptionsGroup = renewingProductsOptions(filteredSelectOptions);
  useEffect(() => {
    if (countrySelection === 'blocked' && selectedCountries?.length !== defaultBlacklisted?.length) {
      setSelectedCountries([...defaultBlacklisted]);
    }
  }, [currentProductData?.blackListedCountries]);

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
        ?.map((l) => l.id)
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
        <Box p={2} width='50%' display='flex'>
          <InheritanceField
            field='genericName'
            onChange={setProductData}
            value={currentProductData?.genericName}
            parentId={parentId}
            currentProductData={currentProductData}
            buttonStyles={errors?.general?.includes('genericName') ? { bottom: '16px' } : {}}
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
                if (!modified.includes('genericName')) {
                  setModified([...modified, 'genericName']);
                }
              }}
              hasError={errors?.general?.includes('genericName')}
              helperText={errors?.general?.includes('genericName') && localization.t('errorNotifications.required')}

            />
          </InheritanceField>
        </Box>

        <Box display='flex' flexDirection='row' alignItems='baseline' width='50%'>
          <Box p={2}>
            <Typography color='secondary'>
              {`${localization.t(
                'labels.status',
              )} *`}
            </Typography>
          </Box>

          <Box p={2}>
            <FormControlLabel
              data-test='status'
              control={(
                <Switch
                  name='status'
                  onChange={(e) => {
                    if (currentProductData?.status.state) {
                      setProductData({
                        ...currentProductData,
                        status: { parentValue: currentProductData?.status.parentValue, state: 'overrides', value: e.target.checked ? 'ENABLED' : 'DISABLED' },
                      });
                    } else {
                      setProductData({
                        ...currentProductData,
                        status: e.target.checked ? 'ENABLED' : 'DISABLED',
                      });
                    }
                  }}
                  color={checkValue(currentProductData?.status) === 'ENABLED' ? 'success' : 'primary'}
                  checked={checkValue(currentProductData?.status) === 'ENABLED'}
                />
              )}
              label={localization.t(
                `labels.${checkValue(currentProductData?.status) === 'ENABLED' ? 'enabled' : 'disabled'
                }`,
              )}
            />
          </Box>
        </Box>
      </Box>

      <Box display='flex' flexDirection='row' alignItems='center'>
        <Box p={2} width='50%' display='flex'>
          <InheritanceField
            field='type'
            onChange={setProductData}
            value={currentProductData?.type}
            parentId={parentId}
            currentProductData={currentProductData}
            buttonStyles={errors?.general?.includes('type') ? { bottom: '16px' } : {}}
          >
            <AutocompleteCustom
              isRequired
              name='type'
              optionLabelKey='value'
              label="type"
              onSelect={(newValue) => {
                setProductData({
                  ...currentProductData,
                  type: newValue,
                });
                if (!modified.includes('type')) {
                  setModified([...modified, 'type']);
                }
              }}
              selectOptions={type || []}
              curValue={checkValue(currentProductData?.type)}
              error={errors?.general?.includes('type')}
              helperText={errors?.general?.includes('type') && localization.t('errorNotifications.required')}
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
            buttonStyles={errors?.general?.includes('publisherRefId') ? { bottom: '16px' } : {}}
          >
            <InputCustom
              isRequired
              tooltip={localization.t('tooltips.publisherRefId')}
              label='publisherRefId'
              value={checkValue(currentProductData?.publisherRefId)}
              onChangeInput={(e) => {
                setProductData({
                  ...currentProductData,
                  publisherRefId: e.target.value,
                });
                if (!modified.includes('publisherRefId')) {
                  setModified([...modified, 'publisherRefId']);
                }
              }}
              hasError={errors?.general?.includes('publisherRefId')}
              helperText={errors?.general?.includes('publisherRefId') && localization.t('errorNotifications.required')}
            />
          </InheritanceField>
        </Box>
      </Box>

      <Box display='flex' flexDirection='row' alignItems='center'>
        <Box p={2} width='50%'>
          <InheritanceField
            field='businessSegment'
            onChange={setProductData}
            value={currentProductData?.businessSegment}
            selectOptions={businessSegment || []}
            parentId={parentId}
            currentProductData={currentProductData}
          >
            <AutocompleteCustom
              optionLabelKey='value'
              label="businessSegment"
              onSelect={(newValue) => setProductData({
                ...currentProductData,
                businessSegment: newValue,
              })}
              selectOptions={businessSegment || []}
              curValue={checkValue(currentProductData?.businessSegment)}
            />
          </InheritanceField>
        </Box>

        <Box display='flex'>
          <Box p={2} minWidth='170px' display='flex'>
            <Box display='flex'>
              {!notShowMaxPaymentsPart.includes(checkValue(currentProductData?.lifeTime)?.name)
                && (
                  <Box minWidth='165px' pr={2} gridArea='count'>
                    <InheritanceField
                      field='maxPaymentsPart'
                      onChange={setProductData}
                      value={currentProductData?.lifeTime}
                      parentId={parentId}
                      currentProductData={currentProductData}
                    >
                      <NumberInput
                        label='maxPaymentsPart'
                        value={currentProductData?.lifeTime?.number}
                        onChangeInput={(e) => {
                          if (e.target.value === '7' && currentProductData?.lifeTime.name === 'DAY') {
                            setProductData({
                              ...currentProductData,
                              lifeTime: { ...currentProductData.lifeTime, name: '7DAY', number: 1 },
                            });
                          } else {
                            setProductData({
                              ...currentProductData,
                              lifeTime: {
                                ...currentProductData.lifeTime,
                                number: e.target.value,
                              },
                            });
                          }
                        }}
                        minMAx={{ min: 1, max: 99 }}
                      />
                    </InheritanceField>
                  </Box>
                )}
              <InheritanceField
                field='lifeTime'
                onChange={setProductData}
                value={currentProductData?.lifeTime}
                parentId={parentId}
                currentProductData={currentProductData}
                buttonStyles={errors?.general?.includes('lifeTime') ? { bottom: '16px' } : {}}
              >
                <SelectCustom
                  hasError={errors?.general?.includes('lifeTime')}
                  helperText={errors?.general?.includes('lifeTime') && localization.t('labels.errorProductPerAndSub')}
                  label='lifeTime'
                  value={currentProductData?.lifeTime?.name}
                  selectOptions={lifeTime}
                  onChangeSelect={(e) => {
                    const newValue = { ...currentProductData.lifeTime, name: e.target.value };
                    if (notShowMaxPaymentsPart.includes(e.target.value)) {
                      newValue.number = 1;
                    }
                    setProductData({
                      ...currentProductData,
                      lifeTime: newValue,
                    });
                  }}
                />
              </InheritanceField>
            </Box>
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
            <AutocompleteWithChips
              arrayTypeValue
              label='sellingStores'
              arrayValue={checkValue(currentProductData?.sellingStores)}
              selectOptions={selectOptions.sellingStores || []}
              onChange={(newValue) => setProductData({
                ...currentProductData,
                sellingStores: newValue,
              })}
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
                <AutocompleteWithChips
                  arrayTypeValue
                  isDisabled={currentProductData?.blackListedCountries?.state === 'inherits'}
                  label={countrySelection === 'blocked' ? 'blockedCountries' : 'allowedCountries'}
                  arrayValue={checkValue(selectedCountries)}
                  selectOptions={countriesOptions || []}
                  onChange={(newValue) => setSelectedCountries(newValue)}
                />
              </Box>
            </Box>
          </InheritanceField>
        </Box>
      </Box>
      <Box p={2} className={errors?.general?.includes('bundledProducts') ? 'bundledError' : ''}>
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
                selectOptions={handleSelectOptionsGroup}
                curValue={checkValue(selectedBundledProduct) || ''}
                isDisabled={currentProductData?.subProducts?.state === 'inherits'}
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
      </Box>
      {errors?.general?.includes('bundledProducts') && (
        <Box pb={1}>
          <FormHelperText error>{localization.t('errorNotifications.fulfillmentBundleProduct')}</FormHelperText>
        </Box>
      )}
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
                    <Box width='250px'>
                      <Typography>{description || label}</Typography>
                    </Box>

                    <Box
                      display='flex'
                      justifyContent='space-between'
                      alignItems='center'
                      marginLeft='20px'
                      width='100%'
                      my={1}
                    >
                      <InheritanceField
                        field={description}
                        valuePath={i}
                        onChange={setProductData}
                        value={currentProductData[description]}
                        parentId={parentId}
                        currentProductData={currentProductData}
                      >
                        {
                          variableValueDescriptions?.length <= 5 ? (
                            <RadioGroup
                              aria-label={description}
                              name={description}
                              data-test='variationParameter'
                            >
                              <Box display='flex'>
                                {variableValueDescriptions?.map(
                                  ({ descValue, description: _description }) => {
                                    const labelDescription = _description.startsWith('val') ? '' : _description;
                                    return (
                                      <FormControlLabel
                                        key={_description}
                                        className='radio'
                                        value={_description}
                                        disabled={disabled}
                                        control={<Radio color='primary' />}
                                        label={`${labelDescription} ${descValue || '?'}`}
                                      />
                                    );
                                  },
                                )}
                              </Box>
                            </RadioGroup>
                          ) : (
                            <SelectCustom
                              gridArea='variationParameter'
                              isDisabled={disabled}
                              value={checkValue(currentProductData[description])}
                              selectOptions={variableValueDescriptions
                                ?.map(({ descValue, description: _description }) => ({
                                  value: `${_description.startsWith('val') ? '' : _description} ${descValue}`, id: _description,
                                })) || []}
                            />
                          )
                        }
                      </InheritanceField>
                    </Box>
                  </Box>
                );
              },
            )}
          </Box>
        </Box>
      ) : ''}
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
  variablesDescriptions: PropTypes.array,
  errors: PropTypes.object,
  modified: PropTypes.array,
  setModified: PropTypes.func,
};

export default General;

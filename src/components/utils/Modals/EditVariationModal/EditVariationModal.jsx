import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  Dialog,
  Box,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  ButtonBase,
  Divider,
  Card,
  CardHeader,
  CardContent,
  Collapse,
  Grid,
} from '@mui/material';

import AddBoxIcon from '@mui/icons-material/AddBox';

import { InputCustom, SelectCustom, NumberInput } from '../../../Inputs';

import ValueItem from './ValueItem';
import LangItem from './LangItem';

import { getLanguagesOptions } from '../../OptionsFetcher/OptionsFetcher';

import './editVariationModal.scss';

import localization from '../../../../localization';

const EditVariationModal = ({
  open,
  onClose,
  setProductData,
  currentProductData,
  setProductDetails,
  productDetails,
  curVariation,
  setProductLocalizationChanges,
}) => {
  const [curDescription, setCurDescriptions] = useState({});
  const [initDescription, setInitDescriptions] = useState({});
  const [curDefValue, setCurDefValue] = useState(null);
  const [settingsExpanded, setSettingsExpanded] = useState(false);
  const [valuesExpanded, setValuesExpanded] = useState(false);
  const [addNewValue, setAddNewValue] = useState(false);
  const [newValueLabel, setNewValueLabel] = useState('');
  const [newValueFrom, setNewValueFrom] = useState('');
  const [newValueTo, setNewValueTo] = useState('');
  const [minFromValue, setMinFromValue] = useState('');
  const [minToValue, setMinToValue] = useState('');

  const availableLocales = getLanguagesOptions();

  useEffect(() => {
    if (curVariation) {
      const [current] = productDetails?.variableDescriptions?.filter(
        (variation) => variation?.description === curVariation?.field,
      ) || [];

      setCurDescriptions({ ...current });
      setInitDescriptions({ ...current });
      setCurDefValue(curVariation?.defaultValue);
    }

    return () => setCurDescriptions({});
  }, [curVariation]);

  useEffect(() => {
    if (addNewValue && curVariation?.type === 'RANGE') {
      if (curDescription?.variableValueDescriptions?.length) {
        const lastValue = curDescription?.variableValueDescriptions.at(-1);
        const from = lastValue?.description?.split('-')[1];

        const minFrom = +from + 1;
        const minTo = +from + 2;

        setNewValueFrom(minFrom);
        setMinFromValue(minFrom);

        setNewValueTo(minTo);
        setMinToValue(minTo);
      } else {
        setNewValueFrom(1);
        setMinFromValue(1);

        setNewValueTo(2);
        setMinToValue(2);
      }
    }
  }, [addNewValue, curDescription]);

  const saveUpdates = () => {
    const filteredDescr = productDetails
      .variableDescriptions?.filter((d) => d.description !== curVariation?.field) || [];

    setProductDetails({
      ...productDetails,
      variableDescriptions: [
        ...filteredDescr,
        curDescription,
      ],
    });

    const newProductAvailVariables = [
      ...currentProductData?.availableVariables?.filter((v) => v?.field !== curVariation?.field),
      {
        defaultValue: curDefValue,
        field: curDescription?.description,
        type: curVariation?.type,
        value: curDescription?.variableValueDescriptions?.map((v) => v?.description),
      },
    ];

    setProductData({
      ...currentProductData,
      availableVariables: newProductAvailVariables,
    });

    setProductLocalizationChanges(true);
    onClose();
  };

  const rangeFromError = newValueFrom < minFromValue || !newValueFrom || newValueFrom > newValueTo;
  const rangeToError = newValueTo < minToValue || !newValueTo || newValueTo < newValueFrom;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          width: '700px',
          maxWidth: '700px',
          overflowX: 'visible',
        },
      }}
      fullWidth
      closeAfterTransition
    >
      <DialogTitle>
        {localization.t('labels.parameter')}
        {' '}
        {curVariation?.field}

        <Box color='#b9b1b1'>{curVariation?.type}</Box>
      </DialogTitle>

      <Divider />

      <DialogContent>
        <Box mb='40px'>
          <Box fontStyle='italic' component='p' mb={2}>{localization.t('forms.messages.parametersNameTip')}</Box>

          <InputCustom
            value={curDescription?.description}
            label='parameterName'
            onChangeInput={(e) => setCurDescriptions((c) => ({
              ...c, description: e.target.value,
            }))}
            hasError={!/^$|^\w+$/.test(curDescription?.description)}
            helperText={/^$|^\w+$/.test(curDescription?.description) ? false : localization.t('labels.formatError')}
            isRequired
          />
        </Box>

        <Box mb='40px'>
          <Box fontStyle='italic' component='p' mb={2}>{localization.t('forms.messages.parametersStringTip')}</Box>

          <Card>
            <ButtonBase
              onClick={() => setSettingsExpanded((c) => !c)}
              style={{ width: '100%', textAlign: 'left', justifyContent: 'flex-start' }}
            >
              <CardHeader title={localization.t('labels.parameterDisplaySettings')} />
            </ButtonBase>

            <Collapse in={settingsExpanded} timeout='auto'>
              <CardContent style={{ paddingTop: 0 }}>
                <Grid
                  container
                  width={1}
                  ml={0}
                  columnSpacing={2}
                  borderBottom={1}
                  borderColor='#b9b1b1'
                  bgcolor='#ececed'
                  borderRadius='4px'
                  py={2}
                >
                  <Grid item xs={2} borderRight={1} borderColor='#b9b1b1'>{localization.t('labels.language')}</Grid>
                  <Grid item xs={10}>{localization.t('labels.displayString')}</Grid>
                </Grid>

                <Grid container width={1} ml={0} spacing={2} py={2}>
                  <LangItem
                    isDefault
                    lang={productDetails?.fallbackLocale}
                    curDescription={curDescription}
                    setCurDescriptions={setCurDescriptions}
                  />

                  {curDescription?.labels && Object.keys(curDescription?.labels)
                    .filter((l) => l !== (productDetails?.fallbackLocale || 'en-US'))
                    .map((l) => (
                      <LangItem
                        lang={l}
                        curDescription={curDescription}
                        setCurDescriptions={setCurDescriptions}
                      />
                    ))}
                </Grid>

                <Divider style={{ marginBottom: '20px' }} />

                <SelectCustom
                  label='addLanguage'
                  selectOptions={availableLocales
                    .filter((l) => curDescription?.labels
                      && Object.keys(curDescription?.labels).indexOf(l.id) < 0)}
                  onChangeSelect={(e) => {
                    setCurDescriptions((c) => ({
                      ...c,
                      labels: {
                        ...c?.labels,
                        [e.target.value]: '',
                      },
                    }));
                  }}
                />
              </CardContent>
            </Collapse>
          </Card>
        </Box>

        <Box mb='40px'>
          <Box fontStyle='italic' component='p' mb={2}>{localization.t('forms.messages.parametersValuesTip')}</Box>

          <Card>
            <ButtonBase
              onClick={() => setValuesExpanded((c) => !c)}
              style={{ width: '100%', textAlign: 'left', justifyContent: 'flex-start' }}
            >
              <CardHeader title={localization.t('labels.values')} />
            </ButtonBase>

            <Collapse in={valuesExpanded} timeout='auto'>
              <CardContent style={{ paddingTop: 0 }}>
                <Grid
                  container
                  width={1}
                  ml={0}
                  columnSpacing={2}
                  borderBottom={1}
                  borderColor='#b9b1b1'
                  bgcolor='#ececed'
                  borderRadius='4px'
                  py={2}
                >
                  <Grid item xs={2} borderRight={1} borderColor='#b9b1b1'>{localization.t('labels.ordering')}</Grid>
                  <Grid item xs={7}>{localization.t('labels.value')}</Grid>
                </Grid>

                <Grid container width={1} ml={0} mt={0} spacing={2}>
                  {curDescription?.variableValueDescriptions?.map((v, i) => (
                    <ValueItem
                      value={v}
                      index={i}
                      type={curVariation?.type}
                      isLast={(i + 1) === curDescription?.variableValueDescriptions?.length}
                      curDefValue={curDefValue}
                      key={v}
                      setCurDefValue={setCurDefValue}
                      setCurDescriptions={setCurDescriptions}
                      productDetails={productDetails}
                    />
                  ))}
                </Grid>

                <Grid container width={1} ml={0} mt='10px' spacing={2}>
                  <Grid xs={10} item>
                    {
                      addNewValue && (
                        <Box display='flex'>
                          <InputCustom
                            value={newValueLabel}
                            label='valueLabel'
                            onChangeInput={(e) => setNewValueLabel(e.target.value)}
                          />

                          {curVariation?.type === 'RANGE' && (
                            <>
                              <NumberInput
                                label='from'
                                value={newValueFrom}
                                styles={{ margin: '0px 5px' }}
                                onChangeInput={(e) => setNewValueFrom(e?.target?.value)}
                                hasError={rangeFromError}
                              />

                              <NumberInput
                                label='to'
                                value={newValueTo}
                                onChangeInput={(e) => setNewValueTo(e?.target?.value)}
                                hasError={rangeToError}
                              />
                            </>
                          )}
                        </Box>
                      )
                    }
                  </Grid>
                  <Grid xs={2} item height='68px' display='flex' justifyContent='center'>
                    <Box justifyContent='center' display='flex' alignItems='center'>
                      <Button
                        color={addNewValue ? 'primary' : 'secondary'}
                        aria-label='clear'
                        style={{
                          height: '37px',
                          minWidth: '37px',
                          width: '37px',
                        }}
                        disabled={addNewValue && (!newValueLabel || (curVariation?.type === 'RANGE' && (rangeFromError || rangeToError)))}
                        onClick={() => {
                          if (!addNewValue) {
                            setAddNewValue(true);
                          } else {
                            if (curVariation?.type === 'RANGE') {
                              setCurDescriptions((c) => ({
                                ...c,
                                variableValueDescriptions: [
                                  ...c?.variableValueDescriptions || [],
                                  {
                                    descValue: newValueLabel,
                                    description: `${newValueFrom}-${newValueTo}`,
                                    localizedValue: { 'en-US': newValueLabel },
                                  },
                                ],
                              }));
                            } else {
                              setCurDescriptions((c) => ({
                                ...c,
                                variableValueDescriptions: [
                                  ...c?.variableValueDescriptions || [],
                                  {
                                    descValue: newValueLabel,
                                    description: `val${(c?.variableValueDescriptions?.length || 0) + 1}`,
                                    localizedValue: { 'en-US': newValueLabel },
                                  },
                                ],
                              }));
                            }

                            setAddNewValue(null);
                            setNewValueLabel(null);
                          }
                        }}
                      >
                        <AddBoxIcon color='primary' style={{ fontSize: '37px' }} />
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Collapse>
          </Card>
        </Box>
      </DialogContent>

      <Divider />

      <DialogActions>
        <Button
          variant="outlined"
          color='secondary'
          onClick={() => { setAddNewValue(null); setNewValueLabel(null); onClose(); }}
        >
          {localization.t('labels.cancel')}
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={saveUpdates}
          disabled={JSON.stringify(initDescription) === JSON.stringify(curDescription) || !/^$|^\w+$/.test(curDescription?.description)}
        >
          {localization.t('labels.save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditVariationModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  setProductData: PropTypes.func,
  currentProductData: PropTypes.object,
  setProductDetails: PropTypes.func,
  setProductLocalizationChanges: PropTypes.func,
  productDetails: PropTypes.object,
  curVariation: PropTypes.object,
};

export default EditVariationModal;

/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Close as CloseIcon } from '@mui/icons-material';
import {
  Tabs, Tab, Box, Button,
} from '@mui/material';
import { removeEmptyPropsInObject } from '../../../services/helpers/dataStructuring';
import { InputCustom, NumberInput } from '../../../components/Inputs';
import {
  defParameterObj,
  defaultLabelObj,
  validateMinMaxDefault,
  validateParamField,
} from '../utils';
import localization from '../../../localization';
import Labels from './Labels';
import '../priceFunctionDetail.scss';

const Parameters = ({
  setCurParameters,
  curParameters,
  errorMessages,
  setErrorMessages,
}) => {
  const [curTab, setCurTab] = useState(0);
  const handleAddParameter = () => {
    const keys = Object.keys(curParameters);
    const newKey = Number(keys[keys.length - 1]) + 1;
    const newParam = { ...defParameterObj, labels: { 0: { ...defaultLabelObj } } };
    setCurParameters({ ...curParameters, [newKey]: newParam });
    setCurTab(keys.length);
  };

  const handleUpdateLabel = (parameterKey, valKey, val) => {
    const newLabelsObj = {
      ...curParameters[parameterKey].labels,
      [valKey]:
        { ...curParameters[parameterKey].labels[valKey], ...val },
    };
    if (val.id) {
      newLabelsObj[Number(valKey) + 1] = defaultLabelObj;
    }
    setCurParameters({
      ...curParameters,
      [parameterKey]:
      {
        ...curParameters[parameterKey],
        labels: newLabelsObj,
      },
    });
  };
  const handleSetErrorMessages = (key, messages) => {
    const newErrorMessages = { ...errorMessages };
    if (newErrorMessages[key]) {
      newErrorMessages[key] = { ...newErrorMessages[key], ...messages };
    } else {
      newErrorMessages[key] = { ...messages };
    }
    setErrorMessages(removeEmptyPropsInObject(newErrorMessages));
  };
  const handleRemoveParam = (e, key) => {
    e.stopPropagation();

    const newParams = { ...curParameters };
    delete newParams[key];

    setCurParameters(newParams);

    if (curTab > 0) {
      setCurTab(curTab - 1);
    }
  };
  const handleRemoveLabel = (parameterKey, labelKey) => {
    const newLabels = { ...curParameters[parameterKey].labels };
    delete newLabels[labelKey];
    setCurParameters({
      ...curParameters,
      [parameterKey]: {
        ...curParameters[parameterKey], labels: newLabels,
      },
    });
  };
  return (
    <>
      <Box>
        <Button
          color='primary'
          variant='contained'
          onClick={handleAddParameter}
        >
          {localization.t('labels.addNewParameter')}
        </Button>
      </Box>
      <Box bgcolor='#f9f9f9' mt={3}>
        <Tabs
          value={curTab}
          onChange={(e, newTab) => {
            setCurTab(newTab);
          }}
          indicatorColor='primary'
          textColor='primary'
        >
          {Object.keys(curParameters).map((key) => (
            <Tab
              key={key}
              label={curParameters[key].field || 'NewParameter'}
              component={React.forwardRef((props, ref) => (
                <div role="button" {...props} ref={ref}>
                  <Box pr={1}>{props.children}</Box>
                  <CloseIcon className='actionIcon' color='secondary' onClick={(e) => handleRemoveParam(e, key)} />
                </div>
              ))}
            />
          ))}
        </Tabs>
      </Box>
      <Box mt={4} mb={2}>
        {Object.keys(curParameters).map((key, index) => (
          curTab === index && (
            <React.Fragment key={key}>
              <Box p={2}>
                <InputCustom
                  isRequired
                  hasError={!!errorMessages?.[key]?.field}
                  helperText={errorMessages?.[key]?.field ? errorMessages?.[key]?.field : ''}
                  label='field'
                  value={curParameters[key].field}
                  onChangeInput={(e) => {
                    const validateParam = validateParamField(e.target.value, curParameters, key);
                    handleSetErrorMessages(key, validateParam);
                    setCurParameters({
                      ...curParameters,
                      [key]: {
                        ...curParameters[key], field: e.target.value,
                      },
                    });
                  }}
                />
              </Box>
              <Box display='flex'>
                <Box p={2} width='50%'>
                  <NumberInput
                    isDisabled={curParameters[key].field === ''}
                    label='min'
                    hasError={!!errorMessages?.[key]?.min}
                    helperText={errorMessages?.[key]?.min}
                    value={curParameters[key].min}
                    onChangeInput={(e) => {
                      const validateMinMaxDef = validateMinMaxDefault(
                        e.target.value,
                        curParameters[key].max,
                        curParameters[key].defaultValue,
                      );
                      handleSetErrorMessages(key, validateMinMaxDef);
                      setCurParameters({
                        ...curParameters,
                        [key]: {
                          ...curParameters[key], min: Number(e.target.value),
                        },
                      });
                    }}
                  />
                </Box>
                <Box p={2} width='50%'>
                  <NumberInput
                    isDisabled={curParameters[key].field === ''}
                    hasError={!!errorMessages?.[key]?.max}
                    helperText={errorMessages?.[key]?.max}
                    label='max'
                    value={curParameters[key].max}
                    onChangeInput={(e) => {
                      const validateMinMaxDef = validateMinMaxDefault(
                        curParameters[key].min,
                        e.target.value,
                        curParameters[key].defaultValue,
                      );
                      handleSetErrorMessages(key, validateMinMaxDef);
                      setCurParameters({
                        ...curParameters,
                        [key]: {
                          ...curParameters[key], max: Number(e.target.value),
                        },
                      });
                    }}
                  />
                </Box>
              </Box>
              <Box p={2}>
                <NumberInput
                  isDisabled={curParameters[key].field === ''}
                  label='defaultValue'
                  hasError={!!errorMessages?.[key]?.defaultValue}
                  helperText={errorMessages?.[key]?.defaultValue}
                  value={curParameters[key].defaultValue}
                  onChangeInput={(e) => {
                    const validateMinMaxDef = validateMinMaxDefault(
                      curParameters[key].min,
                      curParameters[key].max,
                      e.target.value,
                    );
                    handleSetErrorMessages(key, validateMinMaxDef);
                    setCurParameters({
                      ...curParameters,
                      [key]: {
                        ...curParameters[key], defaultValue: e.target.value,
                      },
                    });
                  }}
                />
              </Box>
              <Box p={2}>
                <Labels
                  isDisabled={curParameters[key].field === ''}
                  handleRemoveLabel={(labelKey) => handleRemoveLabel(key, labelKey)}
                  labels={curParameters[key].labels}
                  handleUpdateLabel={(valKey, val) => handleUpdateLabel(key, valKey, val)}
                />
              </Box>
            </React.Fragment>
          )
        ))}

      </Box>
    </>
  );
};
Parameters.propTypes = {
  curParameters: PropTypes.object,
  setCurParameters: PropTypes.func,
  errorMessages: PropTypes.object,
  setErrorMessages: PropTypes.func,
};

export default Parameters;

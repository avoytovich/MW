import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog } from '@mui/material';

import {
  AddParameterFirstStep,
  AddParameterSecondStepList,
  AddParameterSecondStepRange,
} from '../Variations';

import './addVariationModal.scss';

const AddVariationModal = ({
  open,
  onClose,
  setProductData,
  currentProductData,
  setProductDetails,
  productDetails,
  setProductLocalizationChanges,
}) => {
  const [step, setStep] = useState('firstStep');
  const [modalState, setModalState] = useState({});

  const handleClose = () => {
    setStep('firstStep');
    setModalState({});
    onClose();
  };

  const handleCreateParameter = () => {
    const newAvailableVariables = currentProductData?.availableVariables
      ? JSON.parse(JSON.stringify(currentProductData.availableVariables))
      : [];
    const frontToBack = JSON.parse(JSON.stringify(modalState));

    let dataForProductDescriptionRequest = {};
    let dataForProductRquest = {};
    let variableValueDescription = {};

    if (modalState.type === 'LIST') {
      variableValueDescription = frontToBack?.listValue
        .split('\n')
        .filter((item) => item)
        .reduce(
          (acc, cur, i) => {
            const value1 = {
              descValue: cur,
              description: `val${i + 1}`,
              localizedValue: {
                [productDetails?.fallbackLocale || 'en-US']: cur,
              },
            };
            const value2 = `val${i + 1}`;
            return {
              ...acc,
              valueForDetails: [...acc.valueForDetails, value1],
              valueForProduct: [...acc.valueForProduct, value2],
            };
          },
          { valueForDetails: [], valueForProduct: [] },
        );
    } else {
      variableValueDescription = frontToBack?.rangesList.reduce(
        (acc, { from, to, label }) => {
          const value1 = {
            description: `${from}-${to}`,
            localizedValue: {
              [productDetails?.fallbackLocale || 'en-US']: label,
            },
          };
          const value2 = `${from}-${to}`;
          return {
            ...acc,
            valueForDetails: [...acc.valueForDetails, value1],
            valueForProduct: [...acc.valueForProduct, value2],
          };
        },
        { valueForDetails: [], valueForProduct: [] },
      );
    }

    dataForProductDescriptionRequest = {
      description: frontToBack.field,
      variableValueDescriptions: variableValueDescription.valueForDetails,
    };

    if (frontToBack.label) {
      dataForProductDescriptionRequest = {
        ...dataForProductDescriptionRequest,
        label: frontToBack.label,
        labels: { [productDetails?.fallbackLocale || 'en-US']: frontToBack.label },
      };
    }

    dataForProductRquest = {
      defaultValue:
        modalState.type === 'LIST' ? 'val1' : variableValueDescription?.valueForProduct[0],
      field: frontToBack.field,
      labels: null,
      localizedValue: null,
      type: frontToBack.type,
      value: variableValueDescription.valueForProduct,
    };

    newAvailableVariables.push(dataForProductRquest);

    setProductData({
      ...currentProductData,
      availableVariables: newAvailableVariables,
    });

    setProductDetails({
      ...productDetails,
      variableDescriptions: productDetails?.variableDescriptions
        ? [...productDetails.variableDescriptions, dataForProductDescriptionRequest]
        : [dataForProductDescriptionRequest],
    });

    setProductLocalizationChanges(true);
    handleClose();
  };

  const modalBody = {
    firstStep: (
      <AddParameterFirstStep
        setStep={setStep}
        setModalState={setModalState}
        onClose={handleClose}
        modalState={modalState}
      />
    ),
    LIST: (
      <AddParameterSecondStepList
        setStep={setStep}
        setModalState={setModalState}
        onClose={handleClose}
        onSubmit={handleCreateParameter}
        modalState={modalState}
      />
    ),
    RANGE: (
      <AddParameterSecondStepRange
        setStep={setStep}
        setModalState={setModalState}
        onClose={handleClose}
        onSubmit={handleCreateParameter}
        modalState={modalState}
      />
    ),
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
      {modalBody[step]}
    </Dialog>
  );
};

AddVariationModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  setProductData: PropTypes.func,
  currentProductData: PropTypes.object,
  setProductDetails: PropTypes.func,
  setProductLocalizationChanges: PropTypes.func,
  productDetails: PropTypes.object,
};

export default AddVariationModal;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Box } from '@material-ui/core';

import {
  AddParameterFirstStep,
  AddParameterSecondStepList,
  AddParameterSecondStepRange,
} from '../../../ProductDetails/Variations';

import './addVariationModal.scss';

const AddVariationModal = ({
  open,
  onClose,
  setProductData,
  currentProductData,
  setProductDetails,
  productHasLocalizationChanges,
}) => {
  const [step, setStep] = useState('firstStep');
  const [modalState, setModalState] = useState({});

  const handleClose = () => {
    setStep('firstStep');
    onClose();
  };
  const handleCreateParameter = () => {
    let newAvailableVariables = JSON.parse(
      JSON.stringify(currentProductData.availableVariables),
    );
    let frontToBack = JSON.parse(JSON.stringify(modalState));
    let dataForProductDescriptionRequest = {};
    let dataForProductRquest = {};

    if (modalState.type === 'LIST') {
      const variableValueDescription = frontToBack?.listValue
        .split('\n')
        .filter((item) => item)
        .reduce(
          (acc, cur, i) => {
            const value1 = {
              descValue: cur,
              description: `val${i + 1}`,
              localizedValue: {
                'en-US': cur,
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

      dataForProductDescriptionRequest = {
        description: frontToBack.field,
        variableValueDescriptions: variableValueDescription.valueForDetails,
      };

      if (frontToBack.label) {
        dataForProductDescriptionRequest = {
          ...dataForProductDescriptionRequest,
          label: frontToBack.label,
          labels: { 'en-US': frontToBack.label },
        };
      }
      dataForProductRquest = {
        defaultValue: 'val1',
        field: frontToBack.field,
        labels: null,
        localizedValue: null,
        type: frontToBack.type,
        value: variableValueDescription.valueForProduct,
      };
    }

    newAvailableVariables.push(dataForProductRquest);
    setProductData({
      ...currentProductData,
      availableVariables: newAvailableVariables,
    });
    setProductDetails({
      ...productHasLocalizationChanges,
      variableDescriptions: [
        ...productHasLocalizationChanges.variableDescriptions,
        dataForProductDescriptionRequest,
      ],
    });
    onClose();
  };

  const modalBody = {
    firstStep: (
      <AddParameterFirstStep
        setStep={setStep}
        setModalState={setModalState}
        onClose={handleClose}
        modalState={modalState}
        currentProductData={currentProductData}
      />
    ),
    LIST: (
      <AddParameterSecondStepList
        setProductData={setProductData}
        setStep={setStep}
        setModalState={setModalState}
        onClose={handleClose}
        onSubmit={handleCreateParameter}
        modalState={modalState}
        currentProductData={currentProductData}
      />
    ),
    RANGE: (
      <AddParameterSecondStepRange
        setProductData={setProductData}
        setStep={setStep}
        setModalState={setModalState}
        onClose={handleClose}
        onSubmit={handleCreateParameter}
        modalState={modalState}
        currentProductData={currentProductData}
      />
    ),
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="container">{modalBody[step]}</Box>
    </Modal>
  );
};

AddVariationModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  setProductData: PropTypes.func,
  currentProductData: PropTypes.object,
  setProductDetails: PropTypes.func,
  productHasLocalizationChanges: PropTypes.bool,
};

export default AddVariationModal;

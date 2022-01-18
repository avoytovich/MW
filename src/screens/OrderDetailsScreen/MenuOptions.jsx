import React from 'react';
import PropTypes from 'prop-types';

import {
  MenuItem,
  Typography,
} from '@mui/material';

import localization from '../../localization';
import api from '../../api';

import ConfirmationPopup from '../../components/Popup/ConfirmationPopup/index';
import CancelOrderPopup from '../../components/Popup/CancelOrderPopup/index';

const MenuOptions = ({ currentOrderData }) => {
  const sendEmailAgain = () => {
    let template = '';
    let popupLabel = '';
    if (currentOrderData.paymentStatus !== 'COMPLETED'
      && !['NONE', ' INITIALIZED'].includes(
        currentOrderData.prebillingStatus,
      )) {
      popupLabel = 'SendPrebillingMailAgain';
      template = 'PREBILLING';
    } else if (currentOrderData.paymentStatus === 'COMPLETED'
      && !currentOrderData.emailCancellationStatus && !['NONE', ' INITIALIZED'].includes(
      currentOrderData.emailConfirmationStatus,
    )) {
      popupLabel = 'sendConfirmationEmail';
      template = 'ORDERCONFIRMATION';
    } else {
      popupLabel = 'sendCancellationMail';
      template = 'CANCELLATION';
    }

    return (
      <MenuItem>
        <ConfirmationPopup
          popupLabel={popupLabel}
          template={template}
          currentOrderData={currentOrderData}
        />
      </MenuItem>
    );
  };

  const repairOrder = (
    <MenuItem
      onClick={() => api.repairOrder(currentOrderData.id, currentOrderData.dbVersion)}
    >
      <Typography style={{ textAlign: 'center', width: ' 100% ' }}>
        {localization.t('forms.text.repairOrder')}
      </Typography>
    </MenuItem>
  );

  const cancelOrder = (
    <MenuItem>
      <CancelOrderPopup currentOrderData={currentOrderData} />
    </MenuItem>
  );

  switch (currentOrderData?.status) {
    case 'PENDING':
    case 'COMPLETED':
      return (
        <>
          {sendEmailAgain()}
          {cancelOrder}
        </>
      );
    case 'CANCELED':
    case 'FORCE_CANCELED':
      return sendEmailAgain();
    case 'CREATED':
      return (
        <>
          {sendEmailAgain()}
          {repairOrder}
        </>
      );
    case 'CANCEL_PENDING':
      return cancelOrder;
    case 'PARTIAL_COMPLETED':
      return (
        <>
          {sendEmailAgain()}
          {cancelOrder}
          {repairOrder}
        </>
      );
    case 'CANCELED_WITH_ERROR':
      return (
        <>
          {sendEmailAgain()}
          {cancelOrder}
        </>
      );
    case 'PARTIAL_CANCELED':
      return sendEmailAgain();
    case 'FORCE_COMPLETED':
      return (
        <>
          {repairOrder}
          {cancelOrder}
        </>
      );

    default:
      return repairOrder;
  }
};

MenuOptions.propTypes = {
  currentOrderData: PropTypes.object,
};

export default MenuOptions;

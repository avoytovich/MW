/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import {
  Delete as DeleteIcon,
  FileCopy as FileCopyIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  ContentCopy as ContentCopyIcon,
} from '@mui/icons-material';

import { GridActionsCellItem, LicenseInfo } from '@mui/x-data-grid-pro';

import moment from 'moment';

import { getMergedLineItems } from '../../screens/OrdersScreen/utils';

import PriceNumberFormat from '../../components/PriceNumberFormat';
import DeletePopup from '../../components/Popup/DeletePopup';
import FailedEventOrderPopup from '../../components/Popup/FailedEventOrderPopup';

import FullNameAvatar from '../../components/utils/FullNameAvatar';

import { copyText, copyUrl } from './utils';

LicenseInfo.setLicenseKey(
  '44199bb23f41b8c2a799598199586046T1JERVI6MzM3MzMsRVhQSVJZPTE2NzAwODE2MDYwMDAsS0VZVkVSU0lPTj0x',
);

const ofDateType = ['createDate', 'updateDate'];

const ofBoolIconType = ['status', 'singleUse', 'running', 'account', 'accountStatus'];

const shouldCopy = (key, isOrders) => (
  (isOrders && key === 'orderId')
  || key === 'id'
  || key === 'executionId'
  || key === 'processingDataLicenseId'
  || key === 'remittableId'
  || key === 'discountRuleId'
);

const getStatusColor = (status) => {
  switch (status) {
    case 'COMPLETED':
    case 'FORCE_COMPLETED':
      return '#00A300';
    case 'CANCELED':
    case 'CANCELED_WITH_ERROR':
    case 'FORCE_CANCELED':
    case 'ABORTED':
      return '#FF0000';
    default:
      return '#FFA500';
  }
};

export const adjustColumnsData = (
  headers,
  showColumn,
  noEditDeleteActions,
  handleDeleteItem,
  withDeletePopup,
  orderData,
  isOrders,
  errorHighlight,
) => {
  const tableHeaders = headers.map((header) => {
    const customConfigs = {};

    if (!isOrders && ofBoolIconType.indexOf(header?.id) >= 0) {
      // eslint-disable-next-line
      customConfigs.renderCell = (cell) => {
        if (cell?.value === false || cell.value === 'DISABLED') {
          return <CloseIcon className='statusDisable' />;
        }

        if (cell?.value === true || cell.value === 'ENABLED') {
          return <CheckIcon className='statusEnabled' />;
        }
      };

      customConfigs.cellClassName = 'flex-cell';
      customConfigs.width = 105;
    } else if (header?.id === 'value') {
      customConfigs.renderCell = ({ row }) => (
        <PriceNumberFormat number={row?.value} currency={row?.currency} />
      );
    } else if (header?.id === 'name') {
      customConfigs.renderCell = ({ row }) => <b>{row?.name}</b>;
    } else if (header?.id === 'fullName') {
      customConfigs.renderCell = ({ row }) => (
        <FullNameAvatar name={row?.fullName} />
      );

      customConfigs.width = 105;
    }

    if (shouldCopy(header?.id, isOrders)) {
      customConfigs.renderCell = ({ row }) => (
        <>
          {row[header?.id]}
          <ContentCopyIcon
            onClick={(e) => { e.stopPropagation(); copyText(row[header?.id]); }}
            color='secondary'
            style={{
              position: 'relative',
              top: '7px',
              left: '7px',
              cursor: 'pointer',
            }}
            className='copyIcon'
          />
        </>
      );
    }

    return {
      field: header?.id,
      headerName: header?.value,
      editable: false,
      hide: !showColumn[header.id],
      sortable: header?.sortParam,
      width: 200,
      valueFormatter: (row) => {
        if (ofDateType.indexOf(row?.field) >= 0) {
          return row.value ? moment(row.value).format('D MMM YYYY') : '-';
        }

        return row.value;
      },
      // eslint-disable-next-line
      renderCell: ({ row }) => {
        if (Array.isArray(row[header?.id])) {
          return row[header?.id].join(', ');
        }

        if (header?.id === 'details' && row?.details === 'failed_event') {
          return <FailedEventOrderPopup orderData={orderData} eventInfo={row} />;
        }

        if (isOrders) {
          if (header?.id === 'status') {
            return <div style={{ color: getStatusColor(row.status), fontWeight: 'bold' }}>{row?.status?.replace('_', ' ')}</div>;
          }

          if (header?.id === 'products') {
            customConfigs.cellClassName = 'flex-cell';

            return getMergedLineItems(row);
          }
        }

        if (row[errorHighlight]) {
          return <div style={{ color: '#fd8e8d', fontWeight: 'bold' }}>{row[header?.id]}</div>;
        }
      },
      ...customConfigs,
    };
  });

  const tableActions = {
    field: 'actions',
    type: 'actions',
    getActions: ({ id }) => [
      withDeletePopup
        ? (
          <GridActionsCellItem
            icon={<DeletePopup id={id} deleteFunc={handleDeleteItem} />}
            label='Delete'
          />
        ) : (
          <GridActionsCellItem
            icon={<DeleteIcon />}
            onClick={() => handleDeleteItem(id)}
            label='Delete'
          />
        ),
      <GridActionsCellItem icon={<FileCopyIcon />} onClick={() => copyUrl(id)} label='Copy URL' />,
    ],
  };

  if (noEditDeleteActions) {
    return [...tableHeaders];
  }

  return [...tableHeaders, tableActions];
};

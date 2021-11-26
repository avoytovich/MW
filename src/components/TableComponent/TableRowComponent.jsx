import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

import {
  Typography,
  Grid,
  Box,
  Checkbox,
  Button,
} from '@material-ui/core';

import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  FileCopy as FileCopyIcon,
  Check as CheckIcon,
  Close as CloseIcon,
} from '@material-ui/icons';

import { toast } from 'react-toastify';
import DeletePopup from '../Popup/DeletePopup';

import FullNameAvatar from '../utils/FullNameAvatar';
import localization from '../../localization';
import PriceNumberFormat from '../PriceNumberFormat';
import './TableComponent.scss';

const TableRowComponent = ({
  rowItem,
  showColumn,
  markupSequence,
  handleCheck,
  checked,
  handleDeleteItem,
  noActions,
  noEditDeleteActions,
  customPath,
  errorHighlight,
  withDeletePopup,
  isOrders
}) => {
  const [rowHover, setRowHover] = useState(false);
  const history = useHistory();

  const copyUrl = () => {
    navigator.clipboard.writeText(`${window.location.href}/${rowItem.id}`)
      .then(() => toast(localization.t('general.itemURLHasBeenCopied')));
  };

  const makeCopy = (value) => {
    navigator.clipboard.writeText(value)
      .then(() => toast(localization.t('general.itemHasBeenCopied')));
  };

  const shouldCopy = (key) => (
    isOrders && key === 'orderId' ||
    key === 'id'
    || key === 'executionId'
    || key === 'processingDataLicenseId'
  );

  const getStatus = () => {
    switch (rowItem.status) {
      case "COMPLETED":
      case "FORCE_COMPLETED":
        return (
          <div 
            style={{ 
              backgroundColor: '#00A300', 
              height: '30px', 
              width: rowItem.status.length * 10 + 2, 
              position: 'absolute', 
              opacity: 0.5, 
              borderRadius: 5 
            }}>
          </div>
        );
      case 'CANCELED':
      case 'CANCELED_WITH_ERROR':
      case 'FORCE_CANCELED':
      case 'ABORTED':  
        return (
          <div 
            style={{ 
              backgroundColor: '#FF0000', 
              height: '30px', 
              width: rowItem.status.length * 10 + 2, 
              position: 'absolute', 
              opacity: 0.5, 
              borderRadius: 5 
            }}>
          </div>
        );
      default:  
      return (
        <div 
            style={{ 
              backgroundColor: '#FFA500', 
              height: '30px', 
              width: rowItem.status.length * 10 + 2, 
              position: 'absolute', 
              opacity: 0.5, 
              borderRadius: 5 
            }}>
        </div>
      );

    }
  }

  const parsePath = (path) => {
    let newPath = path;

    if (path.indexOf(':') >= 0) {
      const replacingParts = path.match(/:[^/]*/gi);

      replacingParts.forEach((part) => {
        const rowItemValue = rowItem[part.replace(':', '')];
        newPath = path.replace(part, rowItemValue);
      });
    }

    return newPath;
  };

  const drawTableCell = (item) => {
    if (showColumn[item.id]) {
      let valueToShow;

      if (item.id === 'createDate' || item.id === 'updateDate') {
        valueToShow = moment(rowItem[item.id]).format('D MMM YYYY');
      } else if (item.id === 'value') {
        valueToShow = <PriceNumberFormat number={rowItem[item.id]} currency={rowItem.currency} />;
      } else if (item.id === 'name') {
        valueToShow = (
          <Typography>
            {rowItem[item.id]}
          </Typography>
        );
      } else if (Array.isArray(rowItem[item.id])) {
        valueToShow = <Typography style={{ whiteSpace: 'pre-line', textAlign: 'left' }}>{rowItem[item.id].join('\r\n')}</Typography>;
      } else {
        valueToShow = rowItem[item.id];
      }
      return (
        <Grid
          data-test='tableCellItem'
          className="tableCellItemGrid"
          item
          xs
          md={4}
          zeroMinWidth
          key={`${item.id}_${rowItem.id}`}
          style={{ overflow: 'hidden' }}
        >
          <Box
            display='flex'
            height={1}
            alignItems='center'
            justifyContent={item.id === 'fullName' ? 'flex-start' : 'left'}
            flexDirection='row'
            position='relative'
          >
            {item.id === 'fullName' && <FullNameAvatar name={valueToShow} />}
            {isOrders && item.value === 'Status' && getStatus()}
            <Typography
              color={
                item.id === 'genericName' || item.id === 'customerId' || item.id === 'customer'
                  ? 'primary'
                  : 'secondary'
              }
              noWrap
              className={`tableCellItem ${rowItem[errorHighlight] ? 'error-row-color' : ''}`}
            >
              { // eslint-disable-next-line no-nested-ternary
                valueToShow === 'ENABLED' || valueToShow === true ? <CheckIcon className="statusEnabled" />
                  : valueToShow === 'DISABLED' || valueToShow === false ? <CloseIcon className="statusDisable" /> : valueToShow
              }
            </Typography>
            {item.value && shouldCopy(item.id) && (
              <FileCopyIcon
                onClick={(e) => { e.stopPropagation(); makeCopy(valueToShow); }}
                color="secondary"
                style={{ marginLeft: '5px' }}
                className="copyIcon"
              />
            )}
          </Box>
        </Grid>
      );
    }
    return null;
  };
  return (
    <Box className={`tableRowGrid ${rowItem[errorHighlight] ? 'error-row' : '', checked ? 'selected-row' : ''}` } data-id={rowItem.id}>
      <Grid
        data-test='tableRow'
        style={{ paddingLeft: '20px' }}
        onClick={() => customPath !== 'disabled' && history.push(customPath ? parsePath(customPath) : `${history.location.pathname}/${rowItem.id}`)}
        onMouseOver={() => setRowHover(true)}
        onMouseLeave={() => setRowHover(false)}
        container
        wrap="nowrap"
        justify="center"
      >
        {!noActions && (
          <Grid>
            <Box my={1}>
              <Checkbox
                checked={checked}
                name={rowItem.id}
                color="primary"
                onClick={(e) => e.stopPropagation()}
                onChange={() => handleCheck(rowItem)}
              />
            </Box>
          </Grid>
        )}

        {markupSequence.map((item) => drawTableCell(item))}
        <Grid item xs md={4} style={{ minWidth: '200px' }}>
          {rowHover && !customPath && (
          <Grid>
            <Box mt={2} display='flex' justifyContent='center' textAlign='center'>
              {!noActions && !noEditDeleteActions && !withDeletePopup &&(
              <DeleteIcon
                onClick={(e) => { e.stopPropagation(); handleDeleteItem(rowItem.id); }}
                className="deleteIcon icons"
              />
              )}
              {withDeletePopup
                && (
                <Box onClick={(e) => { e.stopPropagation(); }}>
                  <DeletePopup id={rowItem.id} deleteFunc={handleDeleteItem} />
                </Box>
                )}
              {!noEditDeleteActions && (
              <EditIcon className="editIcon icons" />
              )}
              <FileCopyIcon className="copyIcon icons" style={{ marginLeft: '5px' }} onClick={(e) => { e.stopPropagation(); copyUrl(); }} />
            </Box>
          </Grid>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

TableRowComponent.propTypes = {
  rowItem: PropTypes.object,
  showColumn: PropTypes.object,
  handleCheck: PropTypes.func,
  checked: PropTypes.bool,
  handleDeleteItem: PropTypes.func,
  markupSequence: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      cell: PropTypes.string,
    }),
  ),
  noActions: PropTypes.bool,
  noEditDeleteActions: PropTypes.bool,
  customPath: PropTypes.string,
  errorHighlight: PropTypes.string,
  withDeletePopup: PropTypes.bool,
};

export default TableRowComponent;

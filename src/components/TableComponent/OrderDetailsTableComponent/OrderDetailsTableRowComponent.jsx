import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Typography,
  Grid,
  Box,
  Checkbox,
} from '@mui/material';

import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  FileCopy as FileCopyIcon,
  Check as CheckIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

import { toast } from 'react-toastify';
import parentPaths from '../../../services/paths';

import FullNameAvatar from '../../utils/FullNameAvatar';
import localization from '../../../localization';
import './OrderDetailsTableComponent.scss';

const TableRowComponent = ({
  rowItem,
  showColumn,
  markupSequence,
  handleCheck,
  checked,
  handleDeleteItem,
  noActions,
  customPath,
  errorHighlight,
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
      } else if (item.id === 'name') {
        valueToShow = (
          <Typography
            className="name-value"
            onClick={() => history.push(`${parentPaths.productlist}/${rowItem.id}`)}
          >
            {rowItem[item.id]}
          </Typography>
        );
      } else if (item.clickable && !item.external) {
        valueToShow = (
          <Typography
            onClick={() => history.push(item.path)}
            className='clickable-value'
          >
            {rowItem[item.id]}
          </Typography>
        );
      } else if (item.clickable && item.external) {
        valueToShow = (
          <Typography
            onClick={() => window.open(item.path, '_blank')}
            className='clickable-value'
          >
            {rowItem[item.id]}
          </Typography>
        );
      } else if (item.id === 'publisherRefId') {
        valueToShow = (
          <>
            {rowItem[item.id]}
            <FileCopyIcon
              className='publisher-copy'
              style={{ marginLeft: '5px' }}
              onClick={() => makeCopy(rowItem[item.id])}
              color="secondary"
            />
          </>
        );
      } else if (item.id === 'id') {
        valueToShow = (
          <>
            {rowItem[item.id]}
            <FileCopyIcon
              className='id-copy'
              style={{ marginLeft: '5px' }}
              onClick={() => makeCopy(rowItem[item.id])}
              color="secondary"
            />
          </>
        );
      } else if (item.id === 'emailId') {
        valueToShow = (
          <>
            {rowItem[item.id]}
            {rowItem[item.id] && (
              <FileCopyIcon
                className='id-copy'
                style={{ marginLeft: '5px' }}
                onClick={() => makeCopy(rowItem[item.id])}
                color="secondary"
              />
            )}
          </>
        );
      } else {
        valueToShow = rowItem[item.id];
      }
      return (
        <Grid
          className="tableCellItemGrid"
          item
          xs
          zeroMinWidth
          key={`${item.id}_${rowItem.id}`}
          style={{ overflow: 'hidden' }}
        >
          <Box
            display='flex'
            height={1}
            alignItems='center'
            justifyContent={item.id === 'fullName' ? 'flex-start' : 'center'}
            flexDirection='row'
            borderColor="secondary.main"
          >
            {item.id === 'fullName' && <FullNameAvatar name={valueToShow} />}
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
          </Box>
        </Grid>
      );
    }
    return null;
  };

  return (
    <Box className="orderDetailsTableRowGrid" data-id={rowItem.id} boxShadow={rowHover ? 2 : 0}>
      <Grid
        onClick={() => customPath !== 'disabled' && history.push(customPath ? parsePath(customPath) : `${history.location.pathname}/${rowItem.id}`)}
        onMouseOver={() => setRowHover(true)}
        onMouseLeave={() => setRowHover(false)}
        container
        wrap="nowrap"
        justifyContent="center"
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

        {rowHover && !customPath && (
          <Grid>
            <Box my={2}>
              {!noActions && (
                <DeleteIcon
                  onClick={(e) => { e.stopPropagation(); handleDeleteItem(rowItem.id); }}
                  className="deleteIcon icons"
                />
              )}
              <EditIcon className="editIcon icons" />
              <FileCopyIcon className="copyIcon icons" style={{ marginLeft: '5px' }} onClick={(e) => { e.stopPropagation(); copyUrl(); }} />
            </Box>
          </Grid>
        )}
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
  customPath: PropTypes.string,
  errorHighlight: PropTypes.string,
};

export default TableRowComponent;

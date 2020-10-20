import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Typography,
  Grid,
  Box,
  Checkbox,
} from '@material-ui/core';

import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  FileCopy as FileCopyIcon,
  Check as CheckIcon,
  Close as CloseIcon,
} from '@material-ui/icons';

import FullNameAvatar from '../utils/FullNameAvatar';
import { showNotification } from '../../redux/actions/HttpNotifications';
import formatDate from '../../services/dateFormatting';
import localization from '../../localization';
import './TableComponent.scss';

const TableRowComponent = ({
  rowItem,
  showColumn,
  markupSequence,
  handleCheck,
  checked,
  handleDeleteItem,
}) => {
  const [rowHover, setRowHover] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const copyUrl = () => {
    navigator.clipboard.writeText(`${window.location.href}/${rowItem.id}`).then(() => {
      dispatch(showNotification(localization.t('general.itemURLHasBeenCopied')));
    });
  };

  const drawTableCell = (item) => {
    if (showColumn[item.id]) {
      let valueToShow;

      if (item.id === 'createDate' || item.id === 'updateDate') {
        valueToShow = formatDate(rowItem[item.id]);
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
          >
            {item.id === 'fullName' && <FullNameAvatar name={valueToShow} />}
            <Typography
              color={
                item.id === 'genericName' || item.id === 'customerId'
                  ? 'primary'
                  : 'secondary'
              }
              noWrap
              className="tableCellItem"
            >
              { // eslint-disable-next-line no-nested-ternary
                valueToShow === 'ENABLED' ? <CheckIcon className="statusEnabled" />
                  : valueToShow === 'DISABLED' ? <CloseIcon className="statusDisable" /> : valueToShow
              }
            </Typography>
          </Box>
        </Grid>
      );
    }
    return null;
  };

  return (
    <Box className="tableRowGrid" boxShadow={rowHover ? 2 : 0}>
      <Grid
        spacing={1}
        onClick={() => history.push(`${history.location.pathname}/${rowItem.id}`)}
        onMouseOver={() => setRowHover(true)}
        onMouseLeave={() => setRowHover(false)}
        container
        wrap="nowrap"
        justify="center"
      >
        <Grid>
          <Box my={1}>
            <Checkbox
              checked={checked}
              name={rowItem.id}
              onClick={(e) => e.stopPropagation()}
              onChange={() => handleCheck(rowItem)}
            />
          </Box>
        </Grid>

        {markupSequence.map((item) => drawTableCell(item))}

        {rowHover && (
          <Grid>
            <Box my={2}>
              <DeleteIcon
                onClick={(e) => { e.stopPropagation(); handleDeleteItem(rowItem.id); }}
                className="deleteIcon icons"
              />
              <EditIcon className="editIcon icons" />
              <FileCopyIcon className="copyIcon icons" onClick={(e) => { e.stopPropagation(); copyUrl(); }} />
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
};

export default TableRowComponent;

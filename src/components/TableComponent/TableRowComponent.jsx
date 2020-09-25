import React, { useState } from 'react';
import {
  Typography,
  Grid,
  Box,
  Checkbox,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import monthNames from '../../services/constants';
import './TableComponent.scss';

const TableRowComponent = ({
  rowItem,
  showColumn,
  markupSequence,
  handleCheck,
  checked,
}) => {
  const [rowHover, setRowHover] = useState(false);

  const formatDate = (formatingData) => {
    const fullDate = new Date(formatingData);
    const day = fullDate.getDay();
    const month = monthNames[fullDate.getMonth()].substring(0, 3);
    const year = fullDate.getUTCFullYear();

    return `${day} ${month} ${year}`;
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
        >
          <Box my={2}>
            <Typography
              color={
                item.id === 'genericName' || item.id === 'customerId'
                  ? 'primary'
                  : 'secondary'
              }
              noWrap
              className="tableCellItem"
            >
              {valueToShow}
            </Typography>
          </Box>
        </Grid>
      );
    }
    return null;
  };

  return (
    <Grid
      className="tableRowGrid"
      spacing={1}
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
            onChange={() => handleCheck(rowItem.id)}
          />
        </Box>
      </Grid>
      {markupSequence.map((item) => drawTableCell(item))}
      {rowHover && (
        <Grid>
          <Box my={2}>
            <DeleteIcon className="deleteIcon" />
            <EditIcon className="editIcon" />
            <FileCopyIcon className="copyIcon" />
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

TableRowComponent.propTypes = {
  rowItem: PropTypes.object,
  showColumn: PropTypes.object,
  handleCheck: PropTypes.func,
  checked: PropTypes.bool,
  markupSequence: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      cell: PropTypes.string,
    }),
  ),
};

export default TableRowComponent;

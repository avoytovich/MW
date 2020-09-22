import React, { useState } from 'react';
import { Typography, Grid, Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import EditIcon from '@material-ui/icons/Edit';
import './TableComponent.scss';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const TableRowComponent = (props) => {
  const { rowItem, showColumn, markupSequence } = props;
  const [rowHover, setRowHover] = useState(false);

  const formatDate = (formatingData) => {
    const fullDate = new Date(formatingData);
    const day = fullDate.getDay();
    const month = monthNames[fullDate.getMonth()].substring(0, 3);
    return `${day} ${month}`;
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
      {markupSequence.map((item) => {
        if (showColumn[item.cell]) {
          let valueToShow;
          if (item.cell === 'createDate' || item.cell === 'updateDate') {
            valueToShow = formatDate(rowItem[item.cell]);
          } else {
            valueToShow = rowItem[item.cell];
          }
          return (
            <Grid
              className="tableCellItemGrid"
              item
              xs
              zeroMinWidth
              key={`${item.cell}_${rowItem.id}`}
            >
              <Box my={2}>
                <Typography noWrap className="tableCellItem">
                  {valueToShow}
                </Typography>
              </Box>
            </Grid>
          );
        }
      })}
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
  markupSequence: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      cell: PropTypes.string,
    }),
  ),
};

export default TableRowComponent;

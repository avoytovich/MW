import React from 'react';
import { TableCell, TableRow, Box } from '@material-ui/core';

import PropTypes from 'prop-types';

const TableRowComponent = (props) => {
  const { rowItem, showColumn } = props;
  return (
    <TableRow hover>
      {Object.keys(rowItem).map((key) => {
        if (showColumn[key]) {
          return (
            <TableCell
              onMouseOver={() => console.log('hover')}
              key={`${key}_${rowItem.id}`}
            >
              {rowItem[key]}
            </TableCell>
          );
        }
      })}
    </TableRow>
  );
};

TableRow.propTypes = {
  rowItem: PropTypes.object,
};

export default TableRowComponent;

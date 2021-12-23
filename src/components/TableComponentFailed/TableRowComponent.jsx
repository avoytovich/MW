import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Typography,
  Grid,
  Box,
} from '@mui/material';

import FailedEventOrderPopup from '../Popup/FailedEventOrderPopup';

import './TableComponentFailed.scss';

const TableRowComponent = ({
  rowItem,
  showColumn,
  markupSequence,
  errorHighlight,
  orderData,
}) => {
  const [rowHover, setRowHover] = useState(false);

  const drawTableCell = (item) => {
    if (showColumn[item.id]) {
      let valueToShow;
      if (item.id === 'details' && rowItem[item.id] === 'failed_event') {
        valueToShow = <FailedEventOrderPopup orderData={orderData} eventInfo={rowItem} />;
      } else {
        valueToShow = rowItem[item.id];
      }

      return (
        <Grid
          data-test='tableCellItem'
          className="tableCellItemGrid"
          item
          key={`${item.id}_${rowItem.id}`}
          style={{ overflow: 'hidden' }}
        >
          <Box
            display='flex'
            height={1}
            alignItems='center'
            justifyContent='left'
            flexDirection='row'
            position='relative'
          >
            <Typography
              noWrap
              className={`tableCellItem ${rowItem[errorHighlight] ? 'error-row-color' : ''}`}
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
    <Box className={`tableRowGrid ${rowItem[errorHighlight] ? 'error-row' : ''}`} data-id={rowItem.id}>
      <Grid
        data-test='tableRow'
        style={{ paddingLeft: '20px' }}
        onMouseOver={() => setRowHover(true)}
        onMouseLeave={() => setRowHover(false)}
        container
        wrap="nowrap"
        justifyContent="center"
      >
        {markupSequence.map((item) => drawTableCell(item))}
      </Grid>
    </Box>
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
  errorHighlight: PropTypes.string,
  orderData: PropTypes.object,
};

export default TableRowComponent;

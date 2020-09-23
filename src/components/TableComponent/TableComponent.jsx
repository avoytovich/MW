import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid, Box } from '@material-ui/core';
import TableRowComponent from './TableRowComponent';
import tableMarkup from '../../services/tableMarkup';
import localization from '../../localization';

import './TableComponent.scss';

const TableComponent = ({ tableData, type }) => {
  const markup = tableMarkup[type];
  const [showColumn, setShowColumn] = useState(markup.defaultShow);

  return tableData?.items?.length ? (
    <>
      <Grid
        spacing={2}
        container
        wrap="nowrap"
        justify="center"
        className="tableHeaderGrid"
      >
        {markup.headers.map(
          (product) => showColumn[product.cell] && (
            <Grid item xs zeroMinWidth key={product.name}>
              <Box my={1}>
                <Typography
                  variant="h6"
                  className="tableHeader"
                  noWrap
                  style={{ textAlign: 'center' }}
                >
                  {product.name}
                </Typography>
              </Box>
            </Grid>
          ),
        )}
      </Grid>
      <Box className="tableBodyGrid">
        {tableData.items.map((rowItem) => (
          <TableRowComponent
            markupSequence={markup.headers}
            showColumn={showColumn}
            key={rowItem.id}
            rowItem={rowItem}
          />
        ))}
      </Box>
    </>
  ) : (
    <Typography>{localization.t('general.noResults')}</Typography>
  );
};

TableComponent.propTypes = {
  type: PropTypes.string,
  tableData: PropTypes.object,
};

export default TableComponent;

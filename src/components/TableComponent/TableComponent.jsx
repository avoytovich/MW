import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Grid,
  Box,
  Checkbox,
} from '@material-ui/core';
import TableRowComponent from './TableRowComponent';
import tableMarkup from '../../services/tableMarkup';
import localization from '../../localization';
import PaginationComponent from './PaginationComponent';
import './TableComponent.scss';

const TableComponent = ({
  tableData,
  type,
  setCurrentPage,
  currentPage,
}) => {
  const markup = tableMarkup[type];
  // eslint-disable-next-line no-unused-vars
  const [showColumn, setShowColumn] = useState(markup.defaultShow);
  const [checked, setChecked] = useState([]);

  const handleCheck = (itemId) => {
    let newChecked = [];
    if (checked.indexOf(itemId) === -1) {
      newChecked = [...checked, itemId];
    } else {
      newChecked = [...checked].filter((item) => item !== itemId);
    }
    setChecked(newChecked);
  };

  const handleCheckAll = () => {
    let newChecked = [];
    if (!checked.length) {
      newChecked = tableData?.items.map((item) => item.id);
    }
    setChecked(newChecked);
  };

  return tableData?.items?.length ? (
    <>
      <Grid
        spacing={1}
        container
        wrap="nowrap"
        justify="center"
        className="tableHeaderGrid"
      >
        <Grid>
          <Checkbox
            checked={tableData?.items.length === checked.length}
            name="checkAll"
            onChange={handleCheckAll}
          />
        </Grid>
        {markup.headers.map(
          (product) => showColumn[product.cell]
          && (
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
            checked={checked.indexOf(rowItem.id) !== -1}
            handleCheck={handleCheck}
            markupSequence={markup.headers}
            showColumn={showColumn}
            key={rowItem.id}
            rowItem={rowItem}
          />
        ))}
      </Box>
      <PaginationComponent
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={tableData.totalPages}
      />
    </>
  ) : (
    <Typography>{localization.t('general.noResults')}</Typography>
  );
};

TableComponent.propTypes = {
  type: PropTypes.string,
  tableData: PropTypes.object,
  setCurrentPage: PropTypes.func,
  currentPage: PropTypes.number,
};

export default TableComponent;

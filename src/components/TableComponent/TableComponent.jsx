import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
} from '@material-ui/core';
import PaginationComponent from './PaginationComponent';
import TableRowComponent from './TableRowComponent';
import tableMarkup from '../../services/tableMarkup';

const TableComponent = (props) => {
  const location = useLocation();
  const markap = tableMarkup[location.pathname.substring(1)];
  const [showColumn, setShowColumn] = useState(markap.defaultShow);
  const { tableData } = props;

  return tableData?.items?.length ? (
    <Grid container spacing={3}>
      <Table>
        <TableHead>
          <TableRow>
            {markap.headers.map((product) => {
              if (showColumn[product.cell]) {
                return <TableCell key={product.name}>{product.name}</TableCell>;
              }
              return null;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData?.items.map((rowItem) => (
            <TableRowComponent
              showColumn={showColumn}
              key={rowItem.id}
              rowItem={rowItem}
            />
          ))}
        </TableBody>
      </Table>
      <PaginationComponent />
    </Grid>
  ) : (
    <></>
  );
};

TableComponent.propTypes = {
  tableData: PropTypes.object,
};

export default TableComponent;

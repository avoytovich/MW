// ToDo: move inline styles
import React from 'react';
import PropTypes from 'prop-types';

import { CSVLink } from 'react-csv';

import Fab from '@material-ui/core/Fab';
import Collapse from '@material-ui/core/Collapse';
import { red } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/Delete';
import ImportExportIcon from '@material-ui/icons/ImportExport';

const TableItemsActions = ({ items, headers, onDelete }) => {
  const csvHeaders = [...headers].map((header) => ({ label: header.value, key: header.id }));

  const deleteItems = () => {
    const itemsIds = [...items].map((i) => i.id);
    onDelete(itemsIds.join(','));
  };

  return (
    <Collapse in={items.length > 0} timeout={150}>
      <CSVLink
        data={items}
        headers={csvHeaders}
        style={{ textDecoration: 'none' }}
        filename='table-export.csv'
        target='_blank'
      >
        <Fab
          variant='extended'
          size='small'
          color='secondary'
          aria-label='export'
          style={{ margin: 20, padding: 15, color: '#fff' }}
        >
          <ImportExportIcon style={{ left: -4, position: 'relative' }} />
          Export
        </Fab>
      </CSVLink>

      <Fab
        variant='extended'
        size='small'
        color='primary'
        aria-label='delete'
        style={{
          margin: 20, padding: 15, marginLeft: -10, backgroundColor: red[300],
        }}
        onClick={deleteItems}
      >
        <DeleteIcon style={{ left: -4, position: 'relative' }} />
        Delete
      </Fab>
    </Collapse>
  );
};

TableItemsActions.propTypes = {
  items: PropTypes.array,
  headers: PropTypes.array,
  onDelete: PropTypes.func,
};

export default TableItemsActions;

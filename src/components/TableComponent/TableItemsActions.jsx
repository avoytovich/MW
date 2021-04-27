import React from 'react';
import PropTypes from 'prop-types';

import { CSVLink } from 'react-csv';

import Fab from '@material-ui/core/Fab';
import Collapse from '@material-ui/core/Collapse';
import DeleteIcon from '@material-ui/icons/Delete';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import './TableComponent.scss';

const TableItemsActions = ({
  items, headers, onDelete, setItems,
}) => {
  const csvHeaders = [...headers].map((header) => ({
    label: header.value,
    key: header.id,
  }));

  const deleteItems = () => {
    const itemsIds = [...items].map((i) => i.id);
    onDelete(itemsIds.join(','));
    setItems([]);
  };

  return (
    <Collapse in={items.length > 0} timeout={150} className='table-items-actions'>
      <CSVLink
        className="CSVLinkBlock"
        data={items}
        headers={csvHeaders}
        filename="table-export.csv"
        target="_blank"
      >
        <Fab
          variant="extended"
          size="small"
          color="secondary"
          aria-label="export"
          className="importExportFab"
        >
          <ImportExportIcon className="importExportIcon" />
          Export
        </Fab>
      </CSVLink>

      <Fab
        variant="extended"
        size="small"
        color="primary"
        aria-label="delete"
        className="deleteFab"
        onClick={deleteItems}
      >
        <DeleteIcon className="deleteIcon" />
        Delete
      </Fab>
    </Collapse>
  );
};

TableItemsActions.propTypes = {
  items: PropTypes.array,
  headers: PropTypes.array,
  onDelete: PropTypes.func,
  setItems: PropTypes.func,
};

export default TableItemsActions;

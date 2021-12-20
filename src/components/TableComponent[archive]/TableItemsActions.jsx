import React from 'react';
import PropTypes from 'prop-types';

import { CSVLink } from 'react-csv';

import Fab from '@mui/material/Fab';
import Collapse from '@mui/material/Collapse';
import DeleteIcon from '@mui/icons-material/Delete';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import './TableComponent.scss';

const TableItemsActions = ({
  items, headers, onDelete, setItems, noEditDeleteActions,
}) => {
  const csvHeaders = [...headers].map((header) => ({
    label: header.value,
    key: header.id,
  }));

  const deleteItems = () => {
    const itemsIds = [...items].map((i) => i.id);

    itemsIds.forEach((it) => onDelete(it));
    // onDelete(itemsIds.join(','));
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
      {!noEditDeleteActions
      && (
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
      )}
    </Collapse>
  );
};

TableItemsActions.propTypes = {
  items: PropTypes.array,
  headers: PropTypes.array,
  onDelete: PropTypes.func,
  setItems: PropTypes.func,
  noEditDeleteActions: PropTypes.bool,
};

export default TableItemsActions;

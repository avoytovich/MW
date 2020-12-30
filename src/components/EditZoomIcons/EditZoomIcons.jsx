import React from 'react';
import PropTypes from 'prop-types';

import { Box, Zoom } from '@material-ui/core';
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';

import './EditZoomIcons.scss';

const EditZoomIcons = ({
  showCondition,
  editable,
  setEditable,
  handleDelete,
}) => (
  <>
    <Zoom in={showCondition}>
      <Box className="actionBlock">
        <EditIcon data-test='editIcon' color="primary" onClick={() => setEditable(true)} />
      </Box>
    </Zoom>
    <Zoom in={editable}>
      <Box className="actionBlock">
        <DeleteIcon
          data-test="deleteIcon"
          color="primary"
          onClick={handleDelete}
        />
      </Box>
    </Zoom>
  </>
);
EditZoomIcons.propTypes = {
  showCondition: PropTypes.bool,
  editable: PropTypes.bool,
  handleDelete: PropTypes.func,
  setEditable: PropTypes.func,
};

export default EditZoomIcons;

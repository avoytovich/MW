import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Zoom } from '@material-ui/core';
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';
import DetailRow from '../DetailRow';
import './Payment.scss';

const Prices = ({ prices, setHasChanges }) => {
  const [editable, setEditable] = useState(false);
  const [hoverBlock, setHoverBlock] = useState(false);

  const handleDeleteAll = () => {};

  return (
    <Box
      onMouseOver={() => setHoverBlock(true)}
      onMouseLeave={() => setHoverBlock(false)}
      className="paymentItem actionBlockWrapper"
      alignSelf="center"
    >
      <Zoom in={hoverBlock}>
        <Box className="actionBlock">
          <EditIcon
            color="primary"
            className="editIcon icons"
            onClick={() => setEditable(true)}
          />
          <DeleteIcon
            color="primary"
            onClick={handleDeleteAll}
            className="deleteIcon icons"
          />
        </Box>
      </Zoom>
      <Box my={2} display="flex" flexDirection="column" flexWrap="wrap">
        <Box p={3}>
          {prices.map((item) => (
            <DetailRow
              inputType="number"
              setHasChanges={setHasChanges}
              key={item.id}
              item={item}
              editable={editable}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

Prices.propTypes = {
  prices: PropTypes.array,
  setHasChanges: PropTypes.func,
};

export default Prices;

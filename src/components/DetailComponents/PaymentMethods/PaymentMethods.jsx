import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Box,
  Divider,
  Zoom,
  Chip,
  Select,
  MenuItem,
} from '@material-ui/core';
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';
import { getPaymentImages, paymentImages } from './images';
import './PaymentMethods.scss';

// todoL move setFunc to parent
const PaymentMethods = ({ paymentMethods, setHasChanges }) => {
  const [editable, setEditable] = useState(false);
  const [hoverBlock, setHoverBlock] = useState(false);
  const [curData, setCurData] = useState(null);
  const handleDeleteBlock = () => {
    setCurData({ ...curData, value: [] });
  };
  const handleDeleteChip = (value) => {
    const res = [...curData.value].filter((item) => item !== value);
    setCurData({ ...curData, value: res });
  };
  const handleChange = (event) => {
    setCurData({ ...curData, value: event.target.value });
  };

  useEffect(() => {
    setHasChanges(JSON.stringify(curData) !== JSON.stringify(paymentMethods));
    return () => setHasChanges(false);
  }, [curData]);

  useEffect(() => {
    setCurData({ ...paymentMethods });
    return () => setCurData(null);
  }, [paymentMethods]);
  return (
    curData && (
      <Box
        pt={5}
        className=" actionBlockWrapper"
        onMouseOver={() => setHoverBlock(true)}
        onMouseLeave={() => setHoverBlock(false)}
      >
        <Typography variant="overline" color="secondary">{paymentMethods.label}</Typography>
        <Divider width="100%" />
        <Box
          display="flex"
          alignItems="center"
          flexDirection="row"
          flexWrap="wrap"
        >
          {!editable ? (
            paymentMethods.value.map((item) => {
              const src = getPaymentImages(item);
              return (
                <Box key={item} className="paymentImageWrapper">
                  <img
                    className="paymentImage"
                    label="Clickable"
                    src={src}
                    alt={item}
                  />
                </Box>
              );
            })
          ) : (
            <Select
              multiple
              value={curData.value}
              onChange={handleChange}
              renderValue={(selected) => (
                <Box
                  display="flex"
                  alignItems="center"
                  flexDirection="row"
                  flexWrap="wrap"
                >
                  {selected.map((chip) => (
                    <Chip
                      variant="outlined"
                      color="primary"
                      onDelete={() => handleDeleteChip(chip)}
                      onMouseDown={(event) => {
                        event.stopPropagation();
                      }}
                      key={chip}
                      label={chip}
                    />
                  ))}
                </Box>
              )}
            >
              {paymentImages.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.id}
                </MenuItem>
              ))}
            </Select>
          )}
        </Box>
        <Zoom in={hoverBlock && !editable}>
          <Box className="actionBlock">
            <EditIcon
              color="primary"
              className="editIcon icons"
              onClick={() => setEditable(true)}
            />
          </Box>
        </Zoom>
        <Zoom in={editable}>
          <Box className="actionBlock">
            <DeleteIcon
              color="primary"
              onClick={handleDeleteBlock}
              className="deleteIcon icons"
            />
          </Box>
        </Zoom>
      </Box>
    )
  );
};

PaymentMethods.propTypes = {
  paymentMethods: PropTypes.object,
  setHasChanges: PropTypes.func,
};

export default PaymentMethods;

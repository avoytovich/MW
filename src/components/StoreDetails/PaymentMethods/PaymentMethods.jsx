import React, { useState } from 'react';
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
import localization from '../../../localization';

import { getPaymentImages, paymentImages } from './images';
import './PaymentMethods.scss';

const PaymentMethods = ({ storeData, setStoreData }) => {
  const [editable, setEditable] = useState(false);
  const [hoverBlock, setHoverBlock] = useState(false);

  const onChange = (val) => {
    const newArray = [
      ...storeData.designs.paymentComponent.rankedPaymentTabsByCountriesList,
    ];
    newArray[0] = {
      ...storeData.designs.paymentComponent.rankedPaymentTabsByCountriesList[0],
      rankedPaymentTabs: val,
    };
    setStoreData({
      ...storeData,
      designs: {
        ...storeData.designs,
        paymentComponent: {
          ...storeData.designs.paymentComponent,
          rankedPaymentTabsByCountriesList: newArray,
        },
      },
    });
  };

  const handleDeleteChip = (value) => {
    const newValue = [
      ...storeData.designs.paymentComponent.rankedPaymentTabsByCountriesList[0]
        .rankedPaymentTabs,
    ].filter((item) => item !== value);
    onChange(newValue);
  };

  return (
    <Box
      pt={5}
      className=" actionBlockWrapper"
      onMouseOver={() => setHoverBlock(true)}
      onMouseLeave={() => setHoverBlock(false)}
    >
      <Typography variant="overline" color="secondary">
        {localization.t('labels.paymentMethods')}
      </Typography>
      <Divider width="100%" />
      <Box
        display="flex"
        alignItems="center"
        flexDirection="row"
        flexWrap="wrap"
      >
        {!editable ? (
          storeData.designs.paymentComponent.rankedPaymentTabsByCountriesList[0].rankedPaymentTabs
            .map(
              (item) => {
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
              },
            )
        ) : (
          <Select
            multiple
            value={
              storeData.designs.paymentComponent
                .rankedPaymentTabsByCountriesList[0].rankedPaymentTabs
            }
            onChange={(e) => onChange(e.target.value)}
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
            onClick={() => onChange([])}
            className="deleteIcon icons"
          />
        </Box>
      </Zoom>
    </Box>
  );
};

PaymentMethods.propTypes = {
  storeData: PropTypes.object,
  setStoreData: PropTypes.func,
};

export default PaymentMethods;

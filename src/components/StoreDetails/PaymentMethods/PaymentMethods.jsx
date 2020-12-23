import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Typography,
  Box,
  Divider,
  Chip,
  Select,
  MenuItem,
} from '@material-ui/core';
import EditZoomIcons from '../../EditZoomIcons';
import localization from '../../../localization';
import { getPaymentImages } from './images';
import './PaymentMethods.scss';

const PaymentMethods = ({
  currentStoreData,
  setCurrentStoreData,
  storeData,
  selectOptions,
}) => {
  const [editable, setEditable] = useState(false);
  const [hoverBlock, setHoverBlock] = useState(false);

  useEffect(() => {
    setEditable(false);
  }, [storeData]);

  const onChange = (val) => {
    const newArray = [
      ...currentStoreData.designs.paymentComponent
        .rankedPaymentTabsByCountriesList,
    ];
    newArray[0] = {
      ...currentStoreData.designs.paymentComponent
        .rankedPaymentTabsByCountriesList[0],
      rankedPaymentTabs: val,
    };
    const newData = {
      ...currentStoreData,
      designs: {
        ...currentStoreData.designs,
        paymentComponent: {
          ...currentStoreData.designs.paymentComponent,
          rankedPaymentTabsByCountriesList: newArray,
        },
      },
    };
    setCurrentStoreData(newData);
  };

  const handleDeleteChip = (value) => {
    const newValue = [
      ...currentStoreData.designs.paymentComponent
        .rankedPaymentTabsByCountriesList[0].rankedPaymentTabs,
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
          // eslint-disable-next-line max-len
          currentStoreData.designs?.paymentComponent.rankedPaymentTabsByCountriesList[0].rankedPaymentTabs.map(
            (item) => {
              const src = getPaymentImages(item);
              return (
                <Box key={item} className="paymentImageWrapper" p={1}>
                  {src ? (
                    <img
                      className="paymentImage"
                      label="Clickable"
                      src={src}
                      alt={item}
                    />
                  ) : (
                    <span>{item}</span>
                  )}
                </Box>
              );
            },
          )
        ) : (
          <Select
            multiple
            value={
              currentStoreData.designs.paymentComponent
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
            {selectOptions.paymentMethods.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.id}
              </MenuItem>
            ))}
          </Select>
        )}
      </Box>
      <EditZoomIcons
        showCondition={hoverBlock && !editable}
        editable={editable}
        setEditable={setEditable}
        handleDelete={() => onChange([])}
      />
    </Box>
  );
};

PaymentMethods.propTypes = {
  currentStoreData: PropTypes.object,
  setCurrentStoreData: PropTypes.func,
  storeData: PropTypes.object,
  selectOptions: PropTypes.object,
};

export default PaymentMethods;

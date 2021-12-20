import React from 'react';
import PropTypes from 'prop-types';
import {
  Box, Typography, FormControlLabel, Checkbox,
} from '@mui/material';

import localization from '../../../localization';

const CheckboxInput = ({
  currentStoreData,
  checkBoxData,
  label,
  setCurrentStoreData,
}) => {
  const handleUpdateCheckbox = (isChecked, name) => {
    const newValue = [...currentStoreData.eligibleEndUserTypes];
    if (isChecked) {
      newValue.push(name);
    } else {
      newValue.splice(currentStoreData?.eligibleEndUserTypes?.indexOf(name), 1);
    }
    setCurrentStoreData({
      ...currentStoreData,
      eligibleEndUserTypes: newValue,
    });
  };

  return (
    <>
      <Box pt={2} pl={2}>
        <Typography>{localization.t(`labels.${label}`)}</Typography>
      </Box>

      <Box p={2}>
        {checkBoxData.map((item) => (
          <FormControlLabel
            key={item.name}
            control={(
              <Checkbox
                name={item.name}
                color="primary"
                checked={
                  currentStoreData?.eligibleEndUserTypes?.indexOf(item.name)
                  >= 0
                }
              />
            )}
            onChange={(e) => {
              handleUpdateCheckbox(e.target.checked, item.name);
            }}
            label={localization.t(`labels.${item.label}`)}
          />
        ))}
      </Box>
    </>
  );
};

CheckboxInput.propTypes = {
  currentStoreData: PropTypes.object,
  setCurrentStoreData: PropTypes.func,
  label: PropTypes.string,
  checkBoxData: PropTypes.array,
};

export default CheckboxInput;

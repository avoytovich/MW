import React from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';

import {
  Box, Chip, Select, FormControl, InputLabel,
} from '@mui/material';
import localization from '../../localization';

const ModalChipInput = ({ label, value, handleOnClick }) => (
  <FormControl fullWidth>
    <InputLabel htmlFor={label}>{localization.t(`labels.${label}`)}</InputLabel>
    <Select
      fullWidth
      disabled
      onClick={handleOnClick}
      inputProps={{
        name: label,
        id: label,
      }}
      IconComponent={() => (
        <Box pr={1}>
          <EditIcon />
        </Box>
      )}
      label={localization.t(`labels.${label}`)}
      multiple
      contentEditable={false}
      value={value}
      variant="outlined"
      renderValue={(selected) => (
        <Box
          display="flex"
          alignItems="center"
          flexDirection="row"
          flexWrap="wrap"
        >
          {selected?.map((chip) => (
            <Box mb="2px" mr="2px" key={chip.id}>
              <Chip variant="outlined" label={chip?.name || chip} />
            </Box>
          ))}
        </Box>
      )}
    />
  </FormControl>
);

ModalChipInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.array,
  handleOnClick: PropTypes.func,
};

export default ModalChipInput;

import React from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';

import CustomCard from '../../../components/utils/CustomCard';

const Recommendations = ({ curReco, products, setCurReco }) => {
  const deleteProduct = (id) => {
    setCurReco((c) => ({
      ...c,
      productIds: c.productIds.filter((p) => p !== id),
    }));
  };

  const changeValues = (id) => {
    setCurReco((c) => ({
      ...c,
      productIds: [...c.productIds, id],
    }));
  };

  return (
    <CustomCard>
      <Box px={2} pt={2}>
        <Typography variant='h5'>Recommendations selection mode</Typography>

        <Box mt={4}>
          <RadioGroup
            row
            aria-label="Type"
            name="Type"
            value={curReco.function}
            onChange={(e) => setCurReco((c) => ({ ...c, function: e.target.value }))}
          >
            <FormControlLabel
              value="predefinedIdsRecoRule"
              control={<Radio color="primary" />}
              label='Fixed list of products'
            />
            <FormControlLabel
              value='idToIdsRecoRule'
              control={<Radio color="primary" />}
              label='Product list association'
            />
          </RadioGroup>
        </Box>
      </Box>
      
      <Box py={5} pb={2} mx={2} className='outlined-products'>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-products">
            Products
          </InputLabel>

          <Select
            name='productIds'
            inputProps={{
              name: 'productIds',
              id: 'outlined-products',
            }}
            label='Products'
            multiple
            value={products.filter((pr) => curReco?.productIds?.indexOf(pr.id) >= 0)}
            variant="outlined"
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
                    onDelete={() => deleteProduct(chip.id)}
                    onMouseDown={(event) => {
                      event.stopPropagation();
                    }}
                    key={chip.id}
                    label={chip.name}
                  />
                ))}
              </Box>
            )}
          >
            {products
              .filter((pr) => !curReco?.productIds || curReco?.productIds?.indexOf(pr.id) < 0)
              .map((item) => (
                <MenuItem key={item.id} value={item.id} onClick={() => changeValues(item.id)}>
                  {item.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
    </CustomCard>
  );
};

Recommendations.propTypes = {
  curReco: PropTypes.object,
  setCurReco: PropTypes.func,
  products: PropTypes.array,
};

export default Recommendations;

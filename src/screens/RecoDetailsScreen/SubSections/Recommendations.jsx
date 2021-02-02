import React from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Button,
} from '@material-ui/core';

import AddBoxIcon from '@material-ui/icons/AddBox';

import CustomCard from '../../../components/utils/CustomCard';

const Recommendations = ({ curReco, products, setCurReco }) => {
  const changeTab = (e, newTab) => {
    setCurReco((c) => ({
      ...c,
      function: newTab === 0 ? 'predefinedIdsRecoRule' : 'idToIdsRecoRule',
    }));
  };

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
    <CustomCard title='Recommendations'>
      <Tabs
        value={curReco.function === 'predefinedIdsRecoRule' ? 0 : 1}
        indicatorColor="primary"
        textColor="primary"
        onChange={changeTab}
      >
        <Tab label='Fixed list of products' />
        <Tab label='Product list association' />
      </Tabs>

      {
        curReco.function === 'predefinedIdsRecoRule' && (
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
        )
      }

      {
        curReco.function === 'idToIdsRecoRule' && (
          <Box display='flex' py={5} pb={2} mx={2} className='outlined-list-products' alignItems='center'>
            <Button variant='outlined'>
              <AddBoxIcon color='primary' style={{ marginRight: 8 }} />

              Add Recommendation
            </Button>
          </Box>
        )
      }
    </CustomCard>
  );
};

Recommendations.propTypes = {
  curReco: PropTypes.object,
  setCurReco: PropTypes.func,
  products: PropTypes.array,
};

export default Recommendations;

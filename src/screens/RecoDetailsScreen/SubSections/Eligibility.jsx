import React from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  TextField,
  InputAdornment,
  CircularProgress,
} from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';

import CustomCard from '../../../components/utils/CustomCard';

const Eligibility = ({
  curStores,
  setStoresModalOpen,
  curProducts,
  setProductsModalOpen,
  curParentProducts,
  setParentProductsModalOpen,
}) => (
  <CustomCard title="Eligibility">
    <Box display="flex" py={5} pb={2}>
      {curStores === null ? (
        <Box width={1} m="10px" pt="8px">
          <CircularProgress />
        </Box>
      ) : (
        <Box px={1} width=" 100%">
          <TextField
            fullWidth
            label="Stores"
            name="stores"
            type="text"
            placeholder="Select stores"
            value={curStores.map((st) => st.name)}
            contentEditable={false}
            onClick={() => setStoresModalOpen(true)}
            variant="outlined"
            disabled
            InputLabelProps={{ shrink: true }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <EditIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      )}

      {curProducts === null ? (
        <Box width={1} m="10px" pt="8px">
          <CircularProgress />
        </Box>
      ) : (
        <Box px={1} width=" 100%">
          <TextField
            fullWidth
            label="Products"
            name="catalogs"
            type="text"
            placeholder="Select products"
            value={curProducts.map((pr) => pr.name)}
            contentEditable={false}
            onClick={() => setProductsModalOpen(true)}
            variant="outlined"
            disabled
            InputLabelProps={{ shrink: true }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <EditIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      )}

      {curParentProducts === null ? (
        <Box width={1} m="10px" pt="8px">
          <CircularProgress />
        </Box>
      ) : (
        <Box px={1} width=" 100%">
          <TextField
            fullWidth
            label="Parent Products"
            name="catalogs"
            type="text"
            placeholder="Select parent products"
            value={curParentProducts.map((pr) => pr.name)}
            contentEditable={false}
            onClick={() => setParentProductsModalOpen(true)}
            variant="outlined"
            disabled
            InputLabelProps={{ shrink: true }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <EditIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      )}
    </Box>
  </CustomCard>
);

Eligibility.propTypes = {
  curStores: PropTypes.array,
  setStoresModalOpen: PropTypes.func,
  curProducts: PropTypes.array,
  setProductsModalOpen: PropTypes.func,
  curParentProducts: PropTypes.array,
  setParentProductsModalOpen: PropTypes.func,
};

export default Eligibility;

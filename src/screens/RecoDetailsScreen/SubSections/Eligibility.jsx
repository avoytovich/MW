import React from 'react';
import PropTypes from 'prop-types';

import { Box } from '@mui/material';
import { SelectWithChip, AutocompleteWithChips } from '../../../components/Inputs';

import CustomCard from '../../../components/utils/CustomCard';

const Eligibility = ({ curReco, setCurReco, selectOptions }) => (
  <CustomCard mt={0}>
    <Box display='flex' py={2} mx={1} flexDirection='column'>
      <Box width='100%'>
        <SelectWithChip
          label='stores'
          value={curReco.eligibleStoreIds}
          selectOptions={selectOptions.stores}
          onChangeSelect={(e) => setCurReco({
            ...curReco,
            eligibleStoreIds: e.target.value,
          })}
          onClickDelIcon={(chip) => {
            const newValue = [...curReco.eligibleStoreIds].filter(
              (val) => val !== chip,
            );
            setCurReco({
              ...curReco,
              eligibleStoreIds: newValue,
            });
          }}
        />
      </Box>
      <Box width='100%' my={2} mt={4}>
        <AutocompleteWithChips
          label='byProduct'
          arrayValue={curReco.eligibleProductIds}
          selectOptions={selectOptions.products}
          onChange={(newValue) => setCurReco({
            ...curReco,
            eligibleProductIds: newValue,
          })}
        />
      </Box>

      <Box width='100%' my={2} mt={4}>
        <AutocompleteWithChips
          label='byParentProducts'
          arrayValue={curReco.eligibleParentProductIds}
          selectOptions={selectOptions.productsByParent}
          onChange={(newValue) => setCurReco({
            ...curReco,
            eligibleParentProductIds: newValue,
          })}
        />
      </Box>
    </Box>
  </CustomCard>
);

Eligibility.propTypes = {
  curReco: PropTypes.object,
  setCurReco: PropTypes.func,
  selectOptions: PropTypes.object,
};

export default Eligibility;

import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { Box } from '@mui/material';
import { AutocompleteWithChips } from '../../../components/Inputs';

import { sortByAlphabetical } from '../../../services/helpers/utils';

import CustomCard from '../../../components/utils/CustomCard';

const Eligibility = ({ curReco, setCurReco, selectOptions }) => {
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);

  return (
    <CustomCard mt={0}>
      <Box display='flex' py={2} mx={1} flexDirection='column'>
        <Box width='100%'>
          <AutocompleteWithChips
            arrayTypeValue
            label='stores'
            arrayValue={curReco.eligibleStoreIds}
            selectOptions={selectOptions.stores || []}
            onChange={(newValue) => setCurReco({
              ...curReco,
              eligibleStoreIds: newValue,
            })}
          />
        </Box>
        <Box width='100%' my={2} mt={4}>
          <AutocompleteWithChips
            label='productNameOrId'
            arrayValue={curReco.eligibleProductIds}
            selectOptions={ nxState.selectedCustomer.name === 'Nexway'
              ? selectOptions.products : selectOptions.prodRecommendation || []}
            onChange={(newValue) => setCurReco({
              ...curReco,
              eligibleProductIds: newValue,
            })}
          />
        </Box>

        <Box width='100%' my={2} mt={4}>
          <AutocompleteWithChips
            label='parentNameOrId'
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
};

Eligibility.propTypes = {
  curReco: PropTypes.object,
  setCurReco: PropTypes.func,
  selectOptions: PropTypes.object,
};

export default Eligibility;

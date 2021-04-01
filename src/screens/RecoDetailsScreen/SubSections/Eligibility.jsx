import React from 'react';
import PropTypes from 'prop-types';

import { Box } from '@material-ui/core';
import { SelectWithChip } from '../../../components/Inputs';

import CustomCard from '../../../components/utils/CustomCard';

const Eligibility = ({ curReco, setCurReco, selectOptions }) => {
  return (
    <CustomCard>
      <Box display='flex' py={2} mx={1} flexDirection='column'>
        <Box width='100%'>
          <SelectWithChip
            label='stores'
            value={curReco.eligibleStoreIds}
            selectOptions={selectOptions.stores}
            onChangeSelect={(e) =>
              setCurReco({
                ...curReco,
                eligibleStoreIds: e.target.value,
              })
            }
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
          <SelectWithChip
            label='byProduct'
            value={curReco.eligibleProductIds}
            selectOptions={selectOptions.products}
            onChangeSelect={(e) =>
              setCurReco({
                ...curReco,
                eligibleProductIds: e.target.value,
              })
            }
            onClickDelIcon={(chip) => {
              const newValue = [...curReco.eligibleProductIds].filter(
                (val) => val !== chip,
              );
              setCurReco({
                ...curReco,
                eligibleProductIds: newValue,
              });
            }}
          />
        </Box>

        <Box width='100%' my={2} mt={4}>
          <SelectWithChip
            label='byParentProducts'
            value={curReco.eligibleParentProductIds}
            selectOptions={selectOptions.productsByParent}
            onChangeSelect={(e) =>
              setCurReco({
                ...curReco,
                eligibleParentProductIds: e.target.value,
              })
            }
            onClickDelIcon={(chip) => {
              const newValue = [...curReco.eligibleParentProductIds].filter(
                (val) => val !== chip,
              );
              setCurReco({
                ...curReco,
                eligibleParentProductIds: newValue,
              });
            }}
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

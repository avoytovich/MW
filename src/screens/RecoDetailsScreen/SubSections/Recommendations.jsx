import React from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import { SelectWithChip } from '../../../components/Inputs';
import SelectModeInputs from './SelectModeInputs';
import CustomCard from '../../../components/utils/CustomCard';

const Recommendations = ({
  curReco,
  selectOptions,
  setCurReco,
  recoSelectionMode,
  setRecSelectionMode,
}) => {
  return (
    <CustomCard>
      <Box p={2}>
        <Typography variant='h5'>Recommendations selection mode</Typography>

        <Box mt={4}>
          <RadioGroup
            row
            name='RecoSelectionMode'
            value={recoSelectionMode}
            onChange={(e) => setRecSelectionMode(e.target.value)}
          >
            <FormControlLabel
              value='fixedList'
              control={<Radio color='primary' />}
              label='Fixed list of products'
            />
            <FormControlLabel
              value='listAssociation'
              control={<Radio color='primary' />}
              label='Product list association'
            />
          </RadioGroup>
        </Box>
      </Box>

      {recoSelectionMode === 'fixedList' ? (
        <Box py={2} mx={2} className='outlined-products'>
          <SelectWithChip
            label='product'
            value={curReco.productIds}
            selectOptions={selectOptions.products}
            onChangeSelect={(e) =>
              setCurReco({
                ...curReco,
                productIds: e.target.value,
              })
            }
            onClickDelIcon={(chip) => {
              const newValue = [...curReco.productIds].filter(
                (val) => val !== chip,
              );
              setCurReco({
                ...curReco,
                productIds: newValue,
              });
            }}
          />
        </Box>
      ) : (
        <Box>
          <Box>
            <Box p={2}>
              <Typography gutterBottom variant='h5'>
                By product *
              </Typography>
            </Box>
            <SelectModeInputs
              curReco={curReco}
              curKey='byProductIds'
              labels={['sourceProduct', 'targetProducts']}
              curValue={curReco.byProductIds}
              setCurReco={setCurReco}
              selectOptions={selectOptions.recoByProduct}
            />
          </Box>
          <Box>
            <Box p={2}>
              <Typography gutterBottom variant='h5'>
                By parent product *
              </Typography>
            </Box>
            <SelectModeInputs
              curReco={curReco}
              curKey='byParentProductIds'
              labels={['sourceProduct', 'targetProducts']}
              curValue={curReco.byParentProductIds}
              setCurReco={setCurReco}
              selectOptions={selectOptions.recoByParent}
            />
          </Box>
        </Box>
      )}
    </CustomCard>
  );
};

Recommendations.propTypes = {
  curReco: PropTypes.object,
  setCurReco: PropTypes.func,
  selectOptions: PropTypes.object,
  recoSelectionMode: PropTypes.string,
  setRecSelectionMode: PropTypes.func,
};

export default Recommendations;

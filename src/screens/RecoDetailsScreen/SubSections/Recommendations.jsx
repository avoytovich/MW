import React from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import { AutocompleteWithChips } from '../../../components/Inputs';
import SelectModeInputs from './SelectModeInputs';
import CustomCard from '../../../components/utils/CustomCard';
import localization from '../../../localization';
import { sortByAlphabetical } from '../../../services/helpers/utils';

const Recommendations = ({ curReco, selectOptions, setCurReco }) => (
  <CustomCard mt={0}>
    <Box p={2}>
      <Typography variant='h5'>
        {localization.t('labels.recommendationsSelectionMode')}
      </Typography>
      <Box mt={4}>
        <RadioGroup
          row
          name='RecoSelectionMode'
          value={curReco.function}
          onChange={(e) => setCurReco({
            ...curReco,
            function: e.target.value,
          })}
        >
          <FormControlLabel
            value='predefinedIdsRecoRule'
            control={<Radio color='primary' />}
            label={localization.t('labels.fixedListOfProducts')}
          />
          <FormControlLabel
            value='idToIdsRecoRule'
            control={<Radio color='primary' />}
            label={localization.t('labels.productListAssociation')}
          />
        </RadioGroup>
      </Box>
    </Box>
    {curReco.function === 'predefinedIdsRecoRule' ? (
      <Box py={2} mx={2} className='outlined-products'>
        <AutocompleteWithChips
          label='product'
          arrayValue={curReco.productIds}
          selectOptions={selectOptions.products}
          onChange={(newValue) => setCurReco({
            ...curReco,
            productIds: newValue,
          })}
        />
      </Box>
    ) : (
      <Box>
        <Box>
          <Box p={2}>
            <Typography gutterBottom variant='h5'>
              {`${localization.t('labels.byProduct')} *`}
            </Typography>
          </Box>
          <SelectModeInputs
            curReco={curReco}
            curKey='byProductIds'
            labels={['sourceNameOrId', 'targetNameOrId']}
            curValue={curReco.byProductIds}
            setCurReco={setCurReco}
            selectOptions={selectOptions.recoByProduct?.sort(sortByAlphabetical)}
          />
        </Box>
        <Box>
          <Box p={2}>
            <Typography gutterBottom variant='h5'>
              {`${localization.t('labels.byParentProduct')} *`}
            </Typography>
          </Box>
          <SelectModeInputs
            curReco={curReco}
            curKey='byParentProductIds'
            labels={['sourceNameOrId', 'targetNameOrId']}
            curValue={curReco.byParentProductIds}
            setCurReco={setCurReco}
            selectOptions={selectOptions.recoByParent?.sort(sortByAlphabetical)}
          />
        </Box>
      </Box>
    )}
  </CustomCard>
);

Recommendations.propTypes = {
  curReco: PropTypes.object,
  setCurReco: PropTypes.func,
  selectOptions: PropTypes.object,
};

export default Recommendations;

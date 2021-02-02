import React from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Switch,
} from '@material-ui/core';

import { SelectCustom } from '../../../components/Inputs';
import { availableLocales } from '../../../services/selectOptions/selectOptions';
import CustomCard from '../../../components/utils/CustomCard';

const Basic = ({
  curReco,
  updateReco,
  handleChange,
  setCurReco,
}) => (
  curReco && (
    <CustomCard title="Basic">
      <Box display="flex" py={5} pb={2}>
        <Box px={1} width=" 100%">
          <TextField
            fullWidth
            label="Customer"
            name="customerId"
            type="text"
            disabled
            value={curReco.customerId}
            variant="outlined"
          />
        </Box>

        <Box px={1} width=" 100%">
          <TextField
            fullWidth
            label="Recommendation Name"
            name="name"
            type="text"
            value={curReco.name}
            onChange={handleChange}
            variant="outlined"
          />
        </Box>
      </Box>

      <Box display="flex" mx={2} pb={2}>
        <div>
          <Typography gutterBottom variant="h5">
            Type
          </Typography>

          <Box display="flex" alignItems="center">
            <FormControlLabel
              control={(
                <Checkbox
                  name="CROSS_SELL"
                  color="primary"
                  checked={curReco.type === 'CROSS_SELL'}
                />
              )}
              onChange={() => updateReco('type', 'CROSS_SELL')}
              label="Cross Sell"
            />

            <FormControlLabel
              control={(
                <Checkbox
                  name="UP_SELL"
                  color="primary"
                  checked={curReco.type === 'UP_SELL'}
                />
              )}
              onChange={() => updateReco('type', 'UP_SELL')}
              label="Up Sell"
            />

            <FormControlLabel
              control={(
                <Checkbox
                  name="UPGRADE"
                  color="primary"
                  checked={curReco.type === 'UPGRADE'}
                />
              )}
              onChange={() => updateReco('type', 'UPGRADE')}
              label="Upgrade"
            />
          </Box>
        </div>
      </Box>

      <Box display="flex" mx={2} pb={2}>
        <div>
          <Typography gutterBottom variant="h5">
            Level(s)
          </Typography>

          <Box display="flex" alignItems="center">
            <FormControlLabel
              control={(
                <Checkbox
                  name="PRODUCT"
                  color="primary"
                  checked={curReco?.levels?.indexOf('PRODUCT') >= 0}
                />
              )}
              onChange={() => updateReco('levels', 'PRODUCT', 'multiple')}
              label="Product"
            />

            <FormControlLabel
              control={(
                <Checkbox
                  name="CART"
                  color="primary"
                  checked={curReco?.levels?.indexOf('CART') >= 0}
                />
              )}
              onChange={() => updateReco('levels', 'CART', 'multiple')}
              label="Cart"
            />

            <FormControlLabel
              control={(
                <Checkbox
                  name="INTERSTITIAL"
                  color="primary"
                  checked={curReco?.levels?.indexOf('INTERSTITIAL') >= 0}
                />
              )}
              onChange={() => updateReco('levels', 'INTERSTITIAL', 'multiple')}
              label="Interstitial"
            />

            <FormControlLabel
              control={(
                <Checkbox
                  name="PURCHASE"
                  disabled
                  color="primary"
                  checked={curReco?.levels?.indexOf('PURCHASE') >= 0}
                />
              )}
              // onClick={updateReco('levels', 'PURCHASE', 'multiple')}
              label="Purchase"
            />
          </Box>
        </div>
      </Box>

      <Box display="flex" mx={2}>
        <div>
          <Typography gutterBottom variant="h5">
            Source(s)
          </Typography>

          <Box display="flex" alignItems="center">
            <FormControlLabel
              control={(
                <Checkbox
                  name="MANUAL_RENEWAL"
                  color="primary"
                  checked={curReco?.sources?.indexOf('MANUAL_RENEWAL') >= 0}
                />
              )}
              onChange={() => updateReco('sources', 'MANUAL_RENEWAL', 'empty')}
              label="Manual Renewal"
            />

            <FormControlLabel
              control={(
                <Checkbox
                  name="PURCHASE"
                  color="primary"
                  checked={curReco?.sources?.indexOf('PURCHASE') >= 0}
                />
              )}
              onChange={() => updateReco('sources', 'PURCHASE', 'empty')}
              label="Purchase"
            />
          </Box>
        </div>
      </Box>

      <Box display="flex">
        <Box px={1} py={3} width="100%">
          <TextField
            fullWidth
            label="Weight"
            name="weight"
            type="number"
            value={curReco.weight}
            onChange={handleChange}
            InputProps={{ inputProps: { min: 0 } }}
            variant="outlined"
          />
        </Box>

        <Box px={1} width="100%">
          <SelectCustom
            label="fallbackLocale"
            onChangeSelect={(e) => setCurReco({ ...curReco, fallbackLocale: e.target.value })}
            selectOptions={availableLocales}
            value={curReco.fallbackLocale || ''}
          />
        </Box>
      </Box>

      <Box mx={2} pb={2}>
        <Typography gutterBottom variant="h5">
          Status
        </Typography>

        <Box display="flex" alignItems="center">
          <FormControlLabel
            control={(
              <Switch
                color="primary"
                checked={curReco.status === 'ENABLED'}
                name="status"
              />
            )}
            onChange={() => updateReco(
              'status',
              curReco.status === 'ENABLED' ? 'DISABLED' : 'ENABLED',
            )}
            label={curReco.status === 'ENABLED' ? 'Enabled' : 'Disabled'}
          />
        </Box>
      </Box>
    </CustomCard>
  )
);

Basic.propTypes = {
  curReco: PropTypes.object,
  updateReco: PropTypes.func,
  handleChange: PropTypes.func,
  setCurReco: PropTypes.func,
};

export default Basic;

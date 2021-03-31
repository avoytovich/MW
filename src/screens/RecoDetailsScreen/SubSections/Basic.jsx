import React from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Switch,
  RadioGroup,
  Radio,
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
    <CustomCard>
      <Box mx={2} py={1} display='flex' alignItems='center'>
        <Typography variant="h5">
          Status *
        </Typography>

        <Box display="flex" alignItems="center" ml={4}>
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

      <Box display="flex" py={5} pb={2}>
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

      <Box display="flex">
        <Box px={1} py={3} width="100%" maxWidth='200px'>
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

        <Box px={1} width="100%" py={3}>
          <SelectCustom
            label="fallbackLocale"
            onChangeSelect={(e) => setCurReco({ ...curReco, fallbackLocale: e.target.value })}
            selectOptions={availableLocales}
            value={curReco.fallbackLocale || ''}
          />
        </Box>
      </Box>

      <Box display="flex" m={2} pb={2}>
        <div>
          <Typography gutterBottom variant="h5">
            Type
          </Typography>

          <Box>
            <RadioGroup
              row
              aria-label="Type"
              name="Type"
              value={curReco.type}
              onChange={(e) => updateReco('type', e.target.value)}
            >
              <FormControlLabel
                value="CROSS_SELL"
                control={<Radio color="primary" />}
                label='Cross Sell'
              />
              <FormControlLabel
                value='UP_SELL'
                control={<Radio color="primary" />}
                label='Up Sell'
              />
              <FormControlLabel
                value='UPGRADE'
                control={<Radio color="primary" />}
                label='Upgrade'
              />
            </RadioGroup>
          </Box>
        </div>
      </Box>

      <Box display="flex" m={2} pb={2}>
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

      <Box display="flex" m={2}>
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

          <Typography style={{ fontStyle: 'italic' }}>
            Select no source means the same as "all sources are selected"
          </Typography>
        </div>
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

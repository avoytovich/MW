import React from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Typography,
  Divider,
  Chip,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core';

import localization from '../../../localization';

const MainSection = ({
  currentCustomer,
  setCurrentCustomer,
  selectOptions,
}) => (
  <Box display="flex" flexDirection="column">
    <Box mt={3} pb={7} bgcolor="#fff" className="test" boxShadow={2} p={3}>
      <Typography gutterBottom variant="h4">
        {currentCustomer.name}
      </Typography>
      <Typography color="secondary" gutterBottom variant="body2">
        {currentCustomer.id}
      </Typography>
      <Box
        // mt={4}
        display="flex"
        flexDirection="row"
        justifyContent="space-around"
        my={7}
        alignItems="baseline"
      >
        <Typography color="secondary" gutterBottom variant="body2">
          {localization.t('labels.status')}
        </Typography>
        <Box>
          <Button
            disabled={currentCustomer.status === 'TRIAL'}
            color="primary"
            size="large"
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              setCurrentCustomer({
                ...currentCustomer,
                status: 'TRIAL',
              });
            }}
          >
            {localization.t('general.test')}
          </Button>
          <Button
            disabled={currentCustomer.status === 'RUNNING'}
            color="primary"
            size="large"
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              setCurrentCustomer({
                ...currentCustomer,
                status: 'RUNNING',
              });
            }}
          >
            {localization.t('general.live')}
          </Button>
        </Box>
      </Box>
      <Divider light />
    </Box>
    <Box my={3} bgcolor="#fff" boxShadow={2} p={3}>
      <Box py={5} pb={2}>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-fulfillmentTemplates">
            {localization.t('labels.fulfillmentTemplates')}
          </InputLabel>
          <Select
            inputProps={{
              name: 'fulfillmentTemplates',
              id: 'outlined-fulfillmentTemplates',
            }}
            multiple
            label={localization.t('labels.fulfillmentTemplates')}
            value={
              Object.keys(currentCustomer.fulfillments).length
                ? Object.keys(currentCustomer.fulfillments)
                : []
            }
            onChange={(e) => {
              let newObj = {};
              e.target.value.forEach((item) => {
                newObj = { ...newObj, [item]: item };
              });
              setCurrentCustomer({
                ...currentCustomer,
                fulfillments: newObj,
              });
            }}
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
                    onDelete={() => {
                      const newValue = [
                        ...Object.keys(currentCustomer.fulfillments),
                      ].filter((val) => val !== chip);
                      let newObj = {};
                      newValue.forEach((item) => {
                        newObj = { ...newObj, [item]: item };
                      });
                      setCurrentCustomer({
                        ...currentCustomer,
                        fulfillments: newObj,
                      });
                    }}
                    onMouseDown={(event) => {
                      event.stopPropagation();
                    }}
                    key={chip}
                    label={chip}
                  />
                ))}
              </Box>
            )}
          >
            {selectOptions.fulfillments?.map((item) => (
              <MenuItem key={item.id} value={item.name}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box py={5} pb={2}>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-subscriptionsModels">
            {localization.t('labels.subscriptionsModels')}
          </InputLabel>
          <Select
            inputProps={{
              name: 'subscriptionsModels',
              id: 'outlined-subscriptionsModels',
            }}
            label={localization.t('labels.subscriptionsModels')}
            multiple
            value={Object.keys(currentCustomer.subscriptions)}
            variant="outlined"
            onChange={(e) => {
              let newObj = {};
              e.target.value.forEach((item) => {
                newObj = { ...newObj, [item]: item };
              });
              setCurrentCustomer({
                ...currentCustomer,
                subscriptions: newObj,
              });
            }}
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
                    onDelete={() => {
                      const newValue = [
                        ...Object.keys(currentCustomer.subscriptions),
                      ].filter((val) => val !== chip);
                      let newObj = {};
                      newValue.forEach((item) => {
                        newObj = { ...newObj, [item]: item };
                      });
                      setCurrentCustomer({
                        ...currentCustomer,
                        subscriptions: newObj,
                      });
                    }}
                    onMouseDown={(event) => {
                      event.stopPropagation();
                    }}
                    key={chip}
                    label={chip}
                  />
                ))}
              </Box>
            )}
          >
            {selectOptions.subscriptions?.map((item) => (
              <MenuItem key={item.code} value={item.code}>
                {item.code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  </Box>
);

MainSection.propTypes = {
  selectOptions: PropTypes.object,
  currentCustomer: PropTypes.object,
  setCurrentCustomer: PropTypes.func,
};

export default MainSection;
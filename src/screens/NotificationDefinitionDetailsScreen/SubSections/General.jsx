import React from 'react';
import PropTypes from 'prop-types';

import { Box, Grid } from '@material-ui/core';

import { InputCustom } from '../../../components/Inputs';

const General = ({ setCurNotification, curNotification }) => (
  <Grid container>
    <Grid item md={12} sm={12}>
      <Box p={2}>
        <InputCustom
          label='name'
          value={curNotification.name}
          onChangeInput={(e) => setCurNotification({ ...curNotification, name: e.target.value })}
          isRequired
        />
      </Box>
    </Grid>
  </Grid>
);

General.propTypes = {
  curNotification: PropTypes.object,
  setCurNotification: PropTypes.func,
};

export default General;

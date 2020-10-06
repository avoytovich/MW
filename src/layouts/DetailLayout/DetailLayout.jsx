import React from 'react';
import { FolderOpen } from '@material-ui/icons';
import { Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import ThankDesc from '../../components/DetailComponents/ThankDesc';
import MainInformation from '../../components/DetailComponents/MainInformation';
import Payment from '../../components/DetailComponents/Payment';

const DetailLayout = ({ data }) => (
  <>
    <Grid container direction="row" spacing={2}>
      <Grid item>
        <FolderOpen />
      </Grid>
      <Grid item>
        <Typography>{data.header}</Typography>
      </Grid>
    </Grid>
    <Grid container direction="row" spacing={4}>
      <Grid item sm={12}>
        <Grid container spacing={2} justify="space-around" alignItems="center">
          <Grid sm={8} item>
            <MainInformation left={data.left} />
          </Grid>
          <Grid sm={4} item>
            <Payment right={data.right} />
          </Grid>
        </Grid>
      </Grid>
      <Grid sm={12} item>
        <ThankDesc bottom={data.bottom} />
      </Grid>
    </Grid>
  </>
);
DetailLayout.propTypes = {
  data: PropTypes.object,
};

export default DetailLayout;

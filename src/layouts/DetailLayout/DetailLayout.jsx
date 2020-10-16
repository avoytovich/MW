import React from 'react';
import { FolderOpen } from '@material-ui/icons';
import { Grid, Typography, Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import ThankDesc from '../../components/DetailComponents/ThankDesc';
import MainInformation from '../../components/DetailComponents/MainInformation';
import Payment from '../../components/DetailComponents/Payment';
import './DetailLayout.scss';

const DetailLayout = ({ data }) => (
  <>
    <Grid container direction="row" spacing={2}>
      <Grid item>
        <FolderOpen color="secondary" />
      </Grid>
      <Grid item>
        <Typography component="div" color="primary">
          <Box fontWeight={500}>{data.header}</Box>
        </Typography>
      </Grid>
    </Grid>
    <Grid className="detailContainer" container direction="row" spacing={4}>
      <Grid item sm={12}>
        <Grid container spacing={2} justify="space-between">
          <Grid sm={9} item>
            <MainInformation left={data.left} />
          </Grid>
          {data.right && (
            <Grid sm={2} item>
              <Payment right={data.right} />
            </Grid>
          )}
        </Grid>
      </Grid>
      {data.bottom && (
        <Grid sm={12} item>
          <ThankDesc bottom={data.bottom} />
        </Grid>
      )}
    </Grid>
  </>
);
DetailLayout.propTypes = {
  data: PropTypes.object,
};

export default DetailLayout;

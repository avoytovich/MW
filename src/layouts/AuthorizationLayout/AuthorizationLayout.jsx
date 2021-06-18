import React from 'react';
import PropTypes from 'prop-types';

import {
  Grid, Typography, CardMedia,
} from '@material-ui/core';
import Logo from '../../assets/NexwayWhiteLogo.png';
import localization from '../../localization';

import './AuthorizationLayout.scss';

const AuthorizationLayout = ({ children }) => (
  <Grid className='authWrapperContainer' container direction="column">
    <Grid className='authWrapperLogoContainer'>
      <Grid className='authWrapperLogo'>
        <a href="/">
          <CardMedia
            image={Logo}
            className='nexWayLogo'
          />
        </a>
      </Grid>
      <Typography variant="h4" xs={1}>{localization.t('general.logoCenter')}</Typography>
    </Grid>
    <Grid container direction="row">
      <Grid md={4} xs={4} item>
        <Grid
          container
          className='authWrapper'
          direction='row'
          justify='center'
          alignItems='center'
        />
        <Grid
          container
          className='authWrapper2'
          direction='row'
          justify='center'
          alignItems='center'
        />
      </Grid>

      <Grid md={8} xs={8} item>
        <Grid
          container
          justify='center'
          alignItems='center'
          direction='row'
          className='authWrapperChild'
        >
          <Grid item>{children}</Grid>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

AuthorizationLayout.propTypes = {
  children: PropTypes.any,
};

export default AuthorizationLayout;

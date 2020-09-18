import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Box } from '@material-ui/core';
import './AuthorizationLayout.scss';
import localization from '../../localization';

const AuthorizationLayout = ({ children }) => (
  <Grid className="authWrapperContainer" container>
    <Grid md={5} xs={5} item>
      <Grid
        container
        className="authWrapper"
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <Box mx={15}>
            <Typography
              className="authWrapperText"
              color="textSecondary"
              variant="h2"
              component="h1"
            >
              {localization.t('general.welcomeMessage')}
              <Box mt={5}>
                <Typography
                  className="authWrapperText"
                  variant="caption"
                  display="block"
                  gutterBottom
                >
                  {localization.t('general.BogdanKulynka')}
                </Typography>
                <Typography
                  className="authWrapperText"
                  variant="caption"
                  display="block"
                  gutterBottom
                >
                  {localization.t('general.JavascriptMasterEchovoxUA')}
                </Typography>
              </Box>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Grid>
    <Grid md={7} xs={7} item>
      <Grid
        container
        justify="center"
        alignItems="center"
        direction="row"
        className="authWrapperChild"
      >
        <Grid item>{children}</Grid>
      </Grid>
    </Grid>
  </Grid>
);

AuthorizationLayout.propTypes = {
  children: PropTypes.any,
};

export default AuthorizationLayout;

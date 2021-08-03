import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';

import Logo from '../../../assets/NexwayWhiteLogo.png';

import './logoHome.scss';

const LogoHome = ({
  wrapperHeight, width, height, children,
}) => (
  <Grid
    className='wrapperLogoContainer'
    style={{ minHeight: wrapperHeight || '50px' }}
  >
    <Grid
      className='wrapperLogo'
      style={{ width: width || '90px', height: height || '25px' }}
    >
      <Link to='/'>
        <CardMedia
          image={Logo}
          className='nexWayLogo'
        />
      </Link>
    </Grid>

    {children}
  </Grid>
);

LogoHome.propTypes = {
  wrapperHeight: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  children: PropTypes.any,
};

export default LogoHome;

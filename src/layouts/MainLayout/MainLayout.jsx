import React from 'react';
import PropTypes from 'prop-types';

const MainLayout = ({ children }) => (
  <>
    {children}
  </>
);

MainLayout.propTypes = {
  children: PropTypes.any,
};

export default MainLayout;

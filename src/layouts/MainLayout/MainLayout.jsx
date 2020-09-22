import React from 'react';
import PropTypes from 'prop-types';
import SideBar from '../../components/SideBar';

const MainLayout = ({ children }) => (
  <>
    <SideBar />
    {children}
  </>
);

MainLayout.propTypes = {
  children: PropTypes.any,
};

export default MainLayout;

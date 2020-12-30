import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Button, Menu, MenuItem } from '@material-ui/core';
import localization from '../../../localization';

import './CheckoutMenu.scss';

const CheckoutMenu = ({ currentProductData, sellingStores }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => setAnchorEl(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const formHostsMenu = () => {
    const res = [];

    currentProductData?.sellingStores.forEach((item) => {
      const selectedStore = sellingStores.filter((store) => store.id === item);
      const { name, hostnames } = selectedStore[0];
      hostnames.forEach((hostname) => res.push({ name, hostname }));
    });

    return res.map((obj) => (
      <MenuItem key={obj.hostname} onClick={handleClose}>
        <a
          data-test="checkoutLink"
          className="storeHostLink"
          target="_blank"
          rel="noreferrer"
          href={` http://${obj.hostname}/checkout/add?products=${currentProductData.id}`}
        >
          {`Store '${obj.name}' (${obj.hostname})`}
        </a>
      </MenuItem>
    ));
  };

  return (
    <>
      <Button
        aria-haspopup="true"
        variant="contained"
        color="primary"
        aria-controls="checkoutMenu"
        onClick={handleClick}
        size="large"
      >
        {localization.t('general.checkout')}
      </Button>
      <Menu
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id="checkoutMenu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {formHostsMenu()}
      </Menu>
    </>
  );
};

CheckoutMenu.propTypes = {
  currentProductData: PropTypes.object,
  sellingStores: PropTypes.array,
};

export default CheckoutMenu;

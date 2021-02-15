import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Button, Menu, MenuItem } from '@material-ui/core';
import localization from '../../../localization';

import './CheckoutMenu.scss';

const CheckoutMenu = ({ checkOutStores, currentProductData }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => setAnchorEl(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);

  return (
    <>
      <Button
        disabled={checkOutStores.length <= 0}
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
        {checkOutStores.length
          && checkOutStores.map((obj) => (
            <MenuItem key={obj.hostname} onClick={handleClose}>
              <a
                data-test="checkoutLink"
                className="storeHostLink"
                target="_blank"
                rel="noreferrer"
                href={` http://${obj.hostname}/checkout/add?products=${currentProductData.id}`}
              >
                {`Store '${obj.value}' (${obj.hostname})`}
              </a>
            </MenuItem>
          ))}
      </Menu>
    </>
  );
};

CheckoutMenu.propTypes = {
  checkOutStores: PropTypes.array,
  currentProductData: PropTypes.object,
};

export default CheckoutMenu;

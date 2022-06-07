import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Box, Button, Menu, MenuItem,
} from '@mui/material';

import localization from '../../../localization';

import './CheckoutMenu.scss';

const CheckoutMenu = ({ checkOutStores, currentProductData, withTrail }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => setAnchorEl(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);

  return (
    <Box data-test='checkoutMenu' ml={2}>
      <Button
        disabled={checkOutStores.length <= 0}
        aria-haspopup="true"
        variant="contained"
        color="primary"
        aria-controls={withTrail ? 'checkoutWithTrial' : 'checkoutMenu'}
        onClick={handleClick}
        size="large"
      >
        {localization.t(`general.${withTrail ? 'checkoutWithTrial' : 'checkout'}`)}
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
          && checkOutStores.map((obj) => {
            let href = ` http://${obj.hostname}/checkout/add?products=${currentProductData.id}`;
            if (withTrail) {
              href += '&layout=trial&theme=trial';
            }
            return (
              <MenuItem key={obj.hostname} onClick={handleClose}>
                <a
                  data-test="checkoutLink"
                  className="storeHostLink"
                  target="_blank"
                  rel="noreferrer"
                  href={href}
                >
                  {`Store '${obj.value}' (${obj.hostname})`}
                </a>
              </MenuItem>
            );
          })}
      </Menu>
    </Box>
  );
};

CheckoutMenu.propTypes = {
  checkOutStores: PropTypes.array,
  currentProductData: PropTypes.object,
  withTrail: PropTypes.bool,
};

export default CheckoutMenu;

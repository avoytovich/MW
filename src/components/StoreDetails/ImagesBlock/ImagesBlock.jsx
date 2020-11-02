import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import CardComponent from './CardComponent';
import './ImagesBlock.scss';

const ImagesBlock = ({ storeData, setStoreData }) => {
  const handleUpdate = (key, src) => {
    setStoreData({ ...storeData, [key]: src });
  };
  const handleDeleteCard = (key) => {
    const newData = { ...storeData };
    delete newData[key];
    setStoreData({ ...newData });
  };

  return (
    <>
      <Box
        width="100%"
        display="flex"
        alignContent="center"
        flexDirection="row"
        justifyContent="space-around"
        pt="1%"
      >
        {(storeData.logoStore || storeData.logoStore === '') && (
          <CardComponent
            handleDeleteCard={handleDeleteCard}
            updateKey="logoStore"
            cardText="Logo"
            imageSrc={storeData.logoStore}
            handleUpdate={handleUpdate}
          />
        )}
        {(storeData.bannerInvoice || storeData.bannerInvoice === '') && (
          <CardComponent
            handleDeleteCard={handleDeleteCard}
            updateKey="bannerInvoice"
            cardText="Invoice banner"
            imageSrc={storeData.bannerInvoice}
            handleUpdate={handleUpdate}
          />
        )}
        {(storeData.bannerOrderConfEmail
          || storeData.bannerOrderConfEmail === '') && (
          <CardComponent
            handleDeleteCard={handleDeleteCard}
            updateKey="bannerOrderConfEmail"
            cardText="Confirmation email banner"
            imageSrc={storeData.bannerOrderConfEmail}
            handleUpdate={handleUpdate}
          />
        )}
        {(storeData.logoFavicon || storeData.logoFavicon === '') && (
          <CardComponent
            handleDeleteCard={handleDeleteCard}
            updateKey="logoFavicon"
            cardText="Favicon"
            imageSrc={storeData.logoFavicon}
            handleUpdate={handleUpdate}
          />
        )}
      </Box>
    </>
  );
};
ImagesBlock.propTypes = {
  storeData: PropTypes.object,
  setStoreData: PropTypes.func,
};

export default ImagesBlock;

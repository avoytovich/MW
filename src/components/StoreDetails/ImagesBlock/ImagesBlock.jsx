import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Box } from '@material-ui/core';

import CardComponent from './CardComponent';
import { storeDetailsCardText } from '../../../services/selectOptions/selectOptions';

import './ImagesBlock.scss';

const ImagesBlock = ({ currentStoreData, setCurrentStoreData, storeData }) => {
  const [updated, setUpdated] = useState(null);

  const handleDeleteCard = (key) => {
    const newData = { ...currentStoreData };
    delete newData[key];
    setCurrentStoreData({ ...newData });
  };

  const handleUpdateText = (updateKey, value) => {
    const index = storeDetailsCardText.findIndex((i) => i.value === value);
    if (!currentStoreData[storeDetailsCardText[index].id]) {
      const itemSrc = currentStoreData[updateKey];
      const newData = {
        ...currentStoreData,
        [storeDetailsCardText[index].id]: itemSrc,
      };
      delete newData[updateKey];
      setUpdated({ [storeDetailsCardText[index].id]: true });
      setCurrentStoreData({ ...newData });
    }
  };

  return (
    <Box
      width="100%"
      display="flex"
      alignContent="center"
      flexDirection="row"
      justifyContent="space-around"
      pt="1%"
    >
      {(currentStoreData.logoStore || currentStoreData.logoStore === '') && (
        <CardComponent
          updated={updated}
          handleUpdateText={handleUpdateText}
          storeData={storeData}
          handleDeleteCard={handleDeleteCard}
          updateKey="logoStore"
          cardText="Logo"
          imageSrc={currentStoreData.logoStore}
        />
      )}

      {(currentStoreData.bannerInvoice || currentStoreData.bannerInvoice === '') && (
        <CardComponent
          updated={updated}
          handleUpdateText={handleUpdateText}
          storeData={storeData}
          handleDeleteCard={handleDeleteCard}
          updateKey="bannerInvoice"
          cardText="Invoice banner"
          imageSrc={currentStoreData.bannerInvoice}
        />
      )}

      {(currentStoreData.bannerOrderConfEmail || currentStoreData.bannerOrderConfEmail === '') && (
        <CardComponent
          updated={updated}
          handleUpdateText={handleUpdateText}
          storeData={storeData}
          handleDeleteCard={handleDeleteCard}
          updateKey="bannerOrderConfEmail"
          cardText="Confirmation email banner"
          imageSrc={currentStoreData.bannerOrderConfEmail}
        />
      )}

      {(currentStoreData.logoFavicon || currentStoreData.logoFavicon === '') && (
        <CardComponent
          updated={updated}
          handleUpdateText={handleUpdateText}
          storeData={storeData}
          handleDeleteCard={handleDeleteCard}
          updateKey="logoFavicon"
          cardText="Favicon"
          imageSrc={currentStoreData.logoFavicon}
        />
      )}
    </Box>
  );
};

ImagesBlock.propTypes = {
  currentStoreData: PropTypes.object,
  setCurrentStoreData: PropTypes.func,
  storeData: PropTypes.object,
};

export default ImagesBlock;

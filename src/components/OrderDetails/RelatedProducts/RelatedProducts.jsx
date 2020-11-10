import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import CardComponent from './CardComponent';
import './RelatedProducts.scss';

const RelatedProducts = ({ currentOrderData, productsData }) => {
  const formBottom = () => {
    const res = currentOrderData?.lineItems.map((item, index) => {
      let product = '';
      productsData.items.forEach((val) => {
        if (val?.id === item.productId) {
          product = val.genericName;
        }
      });
      const key = index;
      const title = product;
      const text = item?.shortDesc;
      return { title, text, key };
    });
    return res;
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
      {formBottom().map((item) => (
        <CardComponent key={item.key} title={item.title} text={item.text} />
      ))}
    </Box>
  );
};

RelatedProducts.propTypes = {
  currentOrderData: PropTypes.object,
  productsData: PropTypes.object,
};

export default RelatedProducts;

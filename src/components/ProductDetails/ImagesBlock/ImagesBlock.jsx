import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import CardComponent from './CardComponent';
import PaginationComponent from '../../PaginationComponent';
import './ImagesBlock.scss';

// todoL updating inputs
const ImagesBlock = ({ productData, setProductData }) => {
  const handleDeleteCard = (key) => {
    const newResources = [...productData.resources];
    newResources.splice(key, 1);
    setProductData({ ...productData, resources: newResources });
  };
  const totalPages = Math.ceil(productData.resources?.length / 4);
  const [currentPage, setCurrentPage] = useState(1);
  const [firstPage, setFirstPage] = useState(null);

  useEffect(() => {
    if (productData.resources) {
      setFirstPage(currentPage === 1 ? 0 : (currentPage - 1) * 4);
    }
    return () => {
      setFirstPage(null);
    };
  }, [currentPage]);

  const handleChange = (newValue, updateKey) => {
    const newData = [...productData.resources].map((data) => {
      let val = { ...data };
      if (data.index === updateKey) {
        if (newValue.label) {
          val = { ...val, label: newValue.label };
        }
        if (newValue.url) {
          val = { ...val, url: newValue.url };
        }
      }
      return val;
    });
    setProductData({ ...productData, resources: [...newData] });
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
        {[...productData.resources]
          .slice(firstPage, firstPage + 4)
          .map((item) => (
            <CardComponent
              handleDeleteCard={handleDeleteCard}
              key={item.index}
              updateKey={item.index}
              cardText={item.label}
              imageSrc={item.url}
              handleChange={handleChange}
            />
          ))}
      </Box>
      <PaginationComponent
        location="center"
        updatePage={setCurrentPage}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </>
  );
};
ImagesBlock.propTypes = {
  productData: PropTypes.object,
  setProductData: PropTypes.func,
};

export default ImagesBlock;

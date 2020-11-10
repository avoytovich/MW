import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import CardComponent from './CardComponent';
import PaginationComponent from '../../PaginationComponent';
import './ImagesBlock.scss';

const ImagesBlock = ({ currentProductData, setProductData, productData }) => {
  const handleDeleteCard = (key) => {
    const newResources = [...currentProductData.resources];
    newResources.splice(key, 1);
    setProductData({ ...currentProductData, resources: newResources });
  };
  const totalPages = Math.ceil(currentProductData.resources?.length / 4);
  const [currentPage, setCurrentPage] = useState(1);
  const [firstPage, setFirstPage] = useState(null);

  useEffect(() => {
    if (currentProductData.resources) {
      setFirstPage(currentPage === 1 ? 0 : (currentPage - 1) * 4);
    }
    return () => {
      setFirstPage(null);
    };
  }, [currentPage]);

  const handleChange = (newValue, updateKey) => {
    const newData = [...currentProductData.resources].map((data) => {
      let val = { ...data };
      if (data.index === updateKey) {
        val = { ...val, label: newValue };
      }
      return val;
    });
    setProductData({ ...currentProductData, resources: [...newData] });
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
        {[...currentProductData.resources]
          .slice(firstPage, firstPage + 4)
          .map((item) => (
            <CardComponent
              productData={productData}
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
  currentProductData: PropTypes.object,
  setProductData: PropTypes.func,
};

export default ImagesBlock;

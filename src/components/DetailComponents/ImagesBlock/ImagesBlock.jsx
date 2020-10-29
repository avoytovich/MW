import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import PaginationComponent from '../../PaginationComponent';
import CardComponent from './CardComponent';
import './ImagesBlock.scss';

// todoL on pagination on editing
const ImagesBlock = ({ imagesData, handleEditDetails, hasChanges }) => {
  const totalPages = Math.ceil(imagesData?.length / 4);
  const [currentPage, setCurrentPage] = useState(1);
  const [showContent, setShowContent] = useState(null);

  useEffect(() => {
    setShowContent([...imagesData?.slice(0, 4)]);
    return () => setShowContent(null);
  }, [imagesData]);

  const handleChange = (newValue) => {
    let index;
    imagesData.forEach((data, i) => {
      if (data.id === newValue.id) {
        index = i;
      }
      const newData = [...imagesData];
      newData[index] = newValue;
      handleEditDetails({ name: 'imagesBlock', value: newData });
    });
  };
  const updatePage = (pageNumber) => {
    const first = pageNumber === 1 ? 0 : (pageNumber - 1) * 4;
    const last = first + 4;
    setCurrentPage(pageNumber);
    setShowContent([...imagesData?.slice(first, last)]);
  };

  return (
    <>
      <Box
        width="100%"
        display="flex"
        alignContent="center"
        flexDirection="row"
        justifyContent="space-around"
      >
        {showContent
        && showContent.map((item) => (
          <CardComponent
            handleChange={handleChange}
            key={item.id}
            item={item}
            handleEditDetails={handleEditDetails}
            hasChanges={hasChanges}
          />
        ))}
      </Box>
      <PaginationComponent
        location="center"
        updatePage={updatePage}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </>
  );
};
ImagesBlock.propTypes = {
  imagesData: PropTypes.array,
  handleEditDetails: PropTypes.func,
  hasChanges: PropTypes.bool,
};

export default ImagesBlock;

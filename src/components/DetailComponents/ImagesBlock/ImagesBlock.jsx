import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import PaginationComponent from '../../PaginationComponent';
import CardComponent from './CardComponent';
import './ImagesBlock.scss';
// todo on pagination on editing
const ImagesBlock = ({ bottom, setHasChanges }) => {
  const totalPages = Math.ceil(bottom?.length / 4);
  const [currentPage, setCurrentPage] = useState(1);
  const [showContent, setShowContent] = useState([...bottom?.slice(0, 4)]);

  const updatePage = (pageNumber) => {
    const first = pageNumber === 1 ? 0 : (pageNumber - 1) * 4;
    const last = first + 4;
    setCurrentPage(pageNumber);
    setShowContent([...bottom?.slice(first, last)]);
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
        {showContent.map((item, index) => (
          <CardComponent // eslint-disable-next-line react/no-array-index-key
            key={`${item?.image}${item.text}${index}`}
            item={item}
            index={index}
            setHasChanges={setHasChanges}
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
  bottom: PropTypes.array,
  setHasChanges: PropTypes.func,
};

export default ImagesBlock;

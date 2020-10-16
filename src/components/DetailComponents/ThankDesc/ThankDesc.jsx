import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Card,
  CardMedia,
  Box,
  CardActionArea,
  CardContent,
} from '@material-ui/core';
import PaginationComponent from '../../PaginationComponent';
import './ThankDesc.scss';

const ThankDesc = ({ bottom }) => {
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
      >
        {showContent.map((item, index) => (
          <Box
            className="itemWrapper"
            width="23%"
            // eslint-disable-next-line react/no-array-index-key
            key={`${item?.image}${item.text}${index}`}
          >
            <Card className="cardItem">
              <CardActionArea>
                {item?.image && (
                  <CardMedia
                    className="cardImage"
                    image={item.image}
                    title="Contemplative Reptile"
                  />
                )}
                <CardContent>
                  <Box pt={3} pb={7}>
                    <Typography
                      className="cardText"
                      dangerouslySetInnerHTML={{ __html: item?.text }}
                      variant="body2"
                      color="secondary"
                    />
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
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
ThankDesc.propTypes = {
  bottom: PropTypes.array,
};

export default ThankDesc;

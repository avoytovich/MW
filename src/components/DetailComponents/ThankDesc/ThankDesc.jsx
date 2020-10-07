import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Card,
  CardMedia,
  Grid,
  CardActionArea,
  CardContent,
} from '@material-ui/core';
import PaginationComponent from '../../PaginationComponent';

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
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        {showContent.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Grid item sm={2} key={`${item?.image}${item.text}${index}`}>
            <Card>
              <CardActionArea>
                {item?.image && (
                  <CardMedia
                    style={{ height: 140 }}
                    image={item.image}
                    title="Contemplative Reptile"
                  />
                )}
                <CardContent>
                  <Typography
                    dangerouslySetInnerHTML={{ __html: item?.text }}
                    variant="body2"
                    color="secondary"
                  />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
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

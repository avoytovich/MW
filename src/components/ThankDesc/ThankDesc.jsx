import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Card,
  CardMedia,
  Grid,
  CardActionArea,
  CardContent,
  Container,
} from '@material-ui/core';
import PaginationComponent from '../PaginationComponent';

const ThankDesc = ({ thankData }) => {
  const totalPages = Math.ceil(thankData?.length / 4);
  const [currentPage, setCurrentPage] = useState(1);
  const [showContent, setShowContent] = useState([...thankData.slice(0, 4)]);

  const updatePage = (pageNumber) => {
    const first = pageNumber === 1 ? 0 : (pageNumber - 1) * 4;
    const last = first + 4;
    setCurrentPage(pageNumber);
    setShowContent([...thankData.slice(first, last)]);
  };
  return (
    <Container>
      <Grid
        container
        direction="row"
        justify="space-around"
        spacing={2}
        alignItems="center"
      >
        {showContent.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Grid item sm={3} key={`${item.image}${item.text}${index}`}>
            <Card>
              <CardActionArea>
                <CardMedia
                  style={{ height: 140 }}
                  image={item.image}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography variant="body2" color="secondary" component="p">
                    {item.text}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <PaginationComponent
        updatePage={updatePage}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </Container>
  );
};
ThankDesc.propTypes = {
  thankData: PropTypes.array,
};

export default ThankDesc;

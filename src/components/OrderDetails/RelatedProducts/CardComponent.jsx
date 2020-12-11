import React from 'react';
import PropTypes from 'prop-types';

import {
  Card,
  Box,
  CardActionArea,
  CardContent,
  Typography,
} from '@material-ui/core';

const CardComponent = ({ text, title }) => (
  <Box className="itemWrapper" width="23%">
    <Box mt={8} mx={3}>
      <Card className="cardItem">
        <CardActionArea>
          <CardContent>
            <Box>
              <Typography>{title}</Typography>
            </Box>
            <Box pt={3} pb={7}>
              <Typography
                className="cardText"
                dangerouslySetInnerHTML={{ __html: text }}
                variant="body2"
                color="secondary"
              />
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  </Box>
);

CardComponent.propTypes = {
  text: PropTypes.string,
  title: PropTypes.string,
};

export default CardComponent;

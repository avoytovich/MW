import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Delete as DeleteIcon } from '@material-ui/icons';

import {
  Card,
  CardMedia,
  Box,
  CardActionArea,
  CardContent,
  TextField,
  Zoom,
} from '@material-ui/core';
import './ImagesBlock.scss';

const CardComponent = ({
  cardText,
  imageSrc,
  updateKey,
  handleChange,
  handleDeleteCard,
}) => {
  const [hoverBlock, setHoverBlock] = useState(false);

  return (
    <Box
      my={3}
      bgcolor="#fff"
      boxShadow={2}
      height={1}
      p={3}
      data-test="cardSection"
      onMouseOver={() => setHoverBlock(true)}
      onMouseLeave={() => setHoverBlock(false)}
      className="itemWrapper"
      width="23%"
    >
      <Box mb={1}>
        <Zoom in={hoverBlock} className="actionBlock">
          <DeleteIcon
            data-test="deleteIcon"
            color="primary"
            onClick={() => {
              handleDeleteCard(updateKey);
            }}
          />
        </Zoom>
      </Box>
      <Card className="cardItem">
        <CardActionArea>
          <CardMedia
            className="cardImage"
            image={imageSrc}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Box>
              <TextField
                name="cardText"
                onChange={(e) => handleChange(e.target.value, updateKey)}
                fullWidth
                multiple
                type="text"
                value={cardText}
                InputProps={{
                  inputProps: {
                    form: { autocomplete: 'off' },
                  },
                  disableUnderline: true,
                }}
              />
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};
CardComponent.propTypes = {
  cardText: PropTypes.string,
  imageSrc: PropTypes.any,
  updateKey: PropTypes.number,
  handleDeleteCard: PropTypes.func,
  handleChange: PropTypes.func,
};

export default CardComponent;

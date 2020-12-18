import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Card,
  CardMedia,
  Box,
  CardActionArea,
  CardContent,
  TextField,
} from '@material-ui/core';
import EditZoomIcons from '../../EditZoomIcons';
import './ImagesBlock.scss';

const CardComponent = ({
  productData,
  cardText,
  imageSrc,
  updateKey,
  handleChange,
  handleDeleteCard,
}) => {
  const [editable, setEditable] = useState(false);
  const [hoverBlock, setHoverBlock] = useState(false);

  useEffect(() => {
    setEditable(false);
  }, [productData]);

  return (
    <Box
      onMouseOver={() => setHoverBlock(true)}
      onMouseLeave={() => setHoverBlock(false)}
      className="itemWrapper"
      width="23%"
    >
      <EditZoomIcons
        showCondition={hoverBlock && !editable}
        editable={editable}
        updateKey={updateKey}
        setEditable={setEditable}
        handleDelete={() => {
          handleDeleteCard(updateKey);
        }}
      />
      <Box mt={8} mx={3}>
        <Card className="cardItem">
          <CardActionArea>
            <CardMedia
              className="cardImage"
              image={imageSrc}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Box pt={3} pb={7}>
                <TextField
                  onChange={(e) => handleChange(e.target.value, updateKey)}
                  disabled={!editable}
                  fullWidth
                  multiple
                  margin="normal"
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
    </Box>
  );
};
CardComponent.propTypes = {
  productData: PropTypes.object,
  cardText: PropTypes.string,
  imageSrc: PropTypes.any,
  updateKey: PropTypes.number,
  handleDeleteCard: PropTypes.func,
  handleChange: PropTypes.func,
};

export default CardComponent;

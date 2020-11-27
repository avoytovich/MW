import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardMedia,
  Box,
  CardActionArea,
  CardContent,
  Zoom,
  Select,
  MenuItem,
} from '@material-ui/core';
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';
import { storeDetailsCardText } from '../../../services/selectOptions/selectOptions';
import './ImagesBlock.scss';

const CardComponent = ({
  cardText,
  imageSrc,
  updateKey,
  handleDeleteCard,
  storeData,
  handleUpdateText,
  updated,
}) => {
  const [editable, setEditable] = useState(false);
  const [hoverBlock, setHoverBlock] = useState(false);
  useEffect(() => {
    setEditable(false);
  }, [storeData]);

  useEffect(() => {
    if (updated?.[updateKey]) {
      setEditable(true);
    }
  }, [updated]);
  return (
    <Box
      onMouseOver={() => setHoverBlock(true)}
      onMouseLeave={() => setHoverBlock(false)}
      className="itemWrapper"
      width="23%"
    >
    <CardActionArea>
      <Zoom in={hoverBlock && !editable}>
        <Box className="actionBlock" mt="15px" mr="15px">
          <EditIcon color="primary" onClick={() => setEditable(true)} />
        </Box>
      </Zoom>
      <Zoom in={editable}>
        <Box className="actionBlock" mt="15px" mr="15px">
          <DeleteIcon
            color="primary"
            onClick={() => {
              handleDeleteCard(updateKey);
            }}
          />
        </Box>
      </Zoom>
        <Box mt={8} mx={3}>
          <Card className="cardItem">
            <CardMedia
              className="cardImage"
              image={imageSrc}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Box>
                <Select
                  disabled={!editable}
                  value={cardText}
                  disableUnderline
                  onChange={(e) => handleUpdateText(updateKey, e.target.value)}
                >
                  <MenuItem value=" ">
                    <em />
                  </MenuItem>
                  {storeDetailsCardText.map((option) => (
                    <MenuItem key={option.id} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </CardActionArea>
    </Box>
  );
};
CardComponent.propTypes = {
  cardText: PropTypes.string,
  imageSrc: PropTypes.string,
  updateKey: PropTypes.string,
  handleDeleteCard: PropTypes.func,
  storeData: PropTypes.object,
  handleUpdateText: PropTypes.func,
  updated: PropTypes.object,
};

export default CardComponent;

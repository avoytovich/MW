import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardMedia,
  Box,
  CardActionArea,
  CardContent,
  Zoom,
  Button,
  Select,
  MenuItem,
} from '@material-ui/core';
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';
import { storeDetailsCardText } from '../../../services/selectOptions/selectOptions';

import localization from '../../../localization';
import './ImagesBlock.scss';

const CardComponent = ({
  cardText,
  imageSrc,
  updateKey,
  handleUpdate,
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
      <Zoom in={hoverBlock && !editable}>
        <Box className="actionBlock">
          <EditIcon color="primary" onClick={() => setEditable(true)} />
        </Box>
      </Zoom>
      <Zoom in={editable}>
        <Box className="actionBlock">
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
          <CardActionArea>
            <CardMedia
              className="cardImage"
              image={imageSrc}
              title="Contemplative Reptile"
            />
            <Zoom in={hoverBlock && editable}>
              <Button
                id="upload-image-button"
                color="primary"
                size="large"
                type="submit"
                variant="contained"
                component="label"
              >
                {localization.t('general.uploadImage')}
                <input
                  type="file"
                  onChange={(e) => handleUpdate(updateKey, e.target.value)}
                  style={{ display: 'none' }}
                />
              </Button>
            </Zoom>
            <CardContent>
              <Box pt={3} pb={7}>
                <Select
                  disabled={!editable}
                  value={cardText}
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
          </CardActionArea>
        </Card>
      </Box>
    </Box>
  );
};
CardComponent.propTypes = {
  cardText: PropTypes.string,
  imageSrc: PropTypes.string,
  updateKey: PropTypes.string,
  handleUpdate: PropTypes.func,
  handleDeleteCard: PropTypes.func,
  storeData: PropTypes.object,
  handleUpdateText: PropTypes.func,
  updated: PropTypes.object,
};

export default CardComponent;

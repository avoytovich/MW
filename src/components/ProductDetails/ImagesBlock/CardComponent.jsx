import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardMedia,
  Box,
  CardActionArea,
  CardContent,
  Zoom,
  Button,
  TextField,
} from '@material-ui/core';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
} from '@material-ui/icons';
import localization from '../../../localization';
import './ImagesBlock.scss';

const CardComponent = ({
  cardText,
  imageSrc,
  updateKey,
  handleChange,
  handleDeleteCard,
}) => {
  const [editable, setEditable] = useState(false);
  const [upload, setUpload] = useState(false);
  const [hoverBlock, setHoverBlock] = useState(false);

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
            >
              <Zoom in={imageSrc && editable}>
                <Box className="actionBlock">
                  <CloseIcon
                    color="primary"
                    onClick={() => {
                      setUpload(true);
                      handleChange({ url: ' ' }, updateKey);
                    }}
                  />
                </Box>
              </Zoom>
            </CardMedia>
            <Zoom in={upload && editable}>
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
                  onChange={(e) => handleChange({ url: e.target.value }, updateKey)}
                  style={{ display: 'none' }}
                />
              </Button>
            </Zoom>
            <CardContent>
              <Box pt={3} pb={7}>
                <TextField
                  onChange={(e) => handleChange({ label: e.target.value }, updateKey)}
                  disabled={!editable}
                  fullWidth
                  multiple
                  margin="normal"
                  type="text"
                  value={cardText}
                  inputProps={{ form: { autocomplete: 'off' } }}
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
  cardText: PropTypes.string,
  imageSrc: PropTypes.string,
  updateKey: PropTypes.number,
  handleDeleteCard: PropTypes.func,
  handleChange: PropTypes.func,
};

export default CardComponent;

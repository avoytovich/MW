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
  TextField,
  TextareaAutosize,
} from '@material-ui/core';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
} from '@material-ui/icons';
import localization from '../../../localization';
import './ImagesBlock.scss';

const CardComponent = ({ item, handleChange, hasChanges }) => {
  const [editable, setEditable] = useState(false);
  const [upload, setUpload] = useState(false);
  const [hoverBlock, setHoverBlock] = useState(false);
  const handleRemoveImage = () => {
    setUpload(true);
    handleChange({ ...item, image: null });
  };
  const uploadNewImage = () => {};
  const handleDeleteBlock = () => {
    const newData = { ...item };
    Object.keys(newData).forEach((key) => {
      if (key === 'image') {
        newData[key] = null;
      } else if (key !== 'id') {
        newData[key] = '';
      }
    });
    handleChange({ ...newData });
  };
  const onChange = (e) => {
    e.persist();
    const { name, value } = e.target;
    handleChange({ ...item, [name]: value });
  };
  useEffect(() => {
    if (!hasChanges && editable) {
      setEditable(false);
    }
  }, [hasChanges]);

  return (
    item && (
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
            <DeleteIcon color="primary" onClick={handleDeleteBlock} />
          </Box>
        </Zoom>
        <Box mt={8} mx={3}>
          <Card className="cardItem">
            <CardActionArea>
              {item.image && (
                <CardMedia
                  className="cardImage"
                  image={item.image}
                  title="Contemplative Reptile"
                >
                  <Zoom in={item.image && editable}>
                    <Box className="actionBlock">
                      <CloseIcon color="primary" onClick={handleRemoveImage} />
                    </Box>
                  </Zoom>
                </CardMedia>
              )}
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
                    onChange={uploadNewImage}
                    style={{ display: 'none' }}
                  />
                </Button>
              </Zoom>
              <CardContent>
                <Box pt={3} pb={7}>
                  {(item.textTitle || item.textTitle === '') && (
                    <TextField
                      disabled={!editable}
                      fullWidth
                      multiple
                      margin="normal"
                      name="textTitle"
                      onChange={onChange}
                      type="text"
                      value={item.textTitle}
                      inputProps={{ form: { autocomplete: 'off' } }}
                    />
                  )}
                  {item.text && (
                    <TextareaAutosize
                      name="text"
                      disabled={!editable}
                      margin="normal"
                      onChange={onChange}
                      type="text"
                      value={item.text}
                    />
                  )}
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      </Box>
    )
  );
};
CardComponent.propTypes = {
  item: PropTypes.object,
  handleChange: PropTypes.func,
  hasChanges: PropTypes.bool,
};

export default CardComponent;

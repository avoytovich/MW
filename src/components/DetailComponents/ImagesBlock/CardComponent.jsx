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
  TextareaAutosize,
} from '@material-ui/core';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
} from '@material-ui/icons';
import localization from '../../../localization';
import './ImagesBlock.scss';

const CardComponent = ({ item, handleChange }) => {
  const [editable, setEditable] = useState(false);
  const [upload, setUpload] = useState(false);
  const [curData, setCurData] = useState(null);
  const [hoverBlock, setHoverBlock] = useState(false);
  const handleRemoveImage = () => {
    setUpload(true);
    handleChange({ ...item, image: '' });

    setCurData({ ...curData, image: null });
  };

  const handleDeleteAll = () => {};
  const onChange = (e) => {
    e.persist();
    const { name, value } = e.target;
    handleChange({ ...item, [name]: value });
  };

  return (
    item && (
      <Box
        onMouseOver={() => setHoverBlock(true)}
        onMouseLeave={() => setHoverBlock(false)}
        className="itemWrapper"
        width="23%"
      >
        <Zoom in={hoverBlock}>
          <Box className="actionBlock">
            <EditIcon color="primary" onClick={() => setEditable(true)} />
            <DeleteIcon color="primary" onClick={handleDeleteAll} />
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
              <Zoom in={upload}>
                <Button
                  id="upload-image-button"
                  color="primary"
                  size="large"
                  type="submit"
                  variant="contained"
                  component="label"
                >
                  {localization.t('general.uploadImage')}
                  <input type="file" style={{ display: 'none' }} />
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
};

export default CardComponent;

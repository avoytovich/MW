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

const CardComponent = ({ item, setHasChanges }) => {
  const [editable, setEditable] = useState(false);
  const [upload, setUpload] = useState(false);
  const [curData, setCurData] = useState(null);
  const [hoverBlock, setHoverBlock] = useState(false);
  const handleRemoveImage = () => {
    setUpload(true);
    setCurData({ ...curData, image: null });
  };
  const handleDeleteAll = () => {
  };
  const handleChange = (e) => {
    e.persist();
    setCurData({ ...curData, textTitle: e.target.value });
  };
  useEffect(() => {
    setHasChanges(JSON.stringify(curData) !== JSON.stringify(item));
    return () => setHasChanges(false);
  }, [curData]);

  useEffect(() => {
    setCurData({ ...item });
    return () => setCurData(null);
  }, [item]);
  return (
    curData && (
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
                  image={curData.image}
                  title="Contemplative Reptile"
                >
                  <Zoom in={curData.image && editable}>
                    <Box className="actionBlock">
                      <CloseIcon
                        color="primary"
                        onClick={() => handleRemoveImage(true)}
                      />
                    </Box>
                  </Zoom>
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
                </CardMedia>
              )}
              <CardContent>
                <Box pt={3} pb={7}>
                  {item.textTitle && (
                    <TextField
                      disabled={!editable}
                      fullWidth
                      margin="normal"
                      onChange={handleChange}
                      type="text"
                      value={curData.textTitle}
                      inputProps={{ form: { autocomplete: 'off' } }}
                    />
                  )}
                  {item.text && (
                    <TextareaAutosize
                      disabled={!editable}
                      margin="normal"
                      onChange={handleChange}
                      type="text"
                      value={curData.text}
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
  setHasChanges: PropTypes.func,
};

export default CardComponent;

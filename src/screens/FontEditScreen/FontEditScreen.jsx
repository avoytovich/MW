import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  LinearProgress,
  Box,
  Typography,
  Zoom,
  Button,
  TextField,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';

import localization from '../../localization';
import { showNotification } from '../../redux/actions/HttpNotifications';
import api from '../../api';
import './FontEditScreen.scss';

const FontEditScreen = () => {
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  const [hasChanges, setChanges] = useState(false);

  const [fontData, setFontData] = useState(null);

  const [currentFont, setCurrentFont] = useState(null);

  const saveFont = () => {
    api.updateFontById(currentFont.id, currentFont).then(() => {
      dispatch(
        showNotification(localization.t('general.updatesHaveBeenSaved')),
      );
      window.location.reload();
    });
  };

  useEffect(() => {
    let isCancelled = false;

    const requests = async () => {
      try {
        const font = await api.getFontById(id);

        if (!isCancelled) {
          setFontData(font.data);
          setCurrentFont(font.data);
          setLoading(false);
        }
      } catch (error) {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };
    requests();
    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    setChanges(JSON.stringify(currentFont) !== JSON.stringify(fontData));
    return () => {
      setChanges(false);
    };
  }, [currentFont, fontData]);

  if (isLoading) return <LinearProgress />;

  return (
    <Box className="font-screen">
      <Zoom in={hasChanges}>
        <Button
          id="save-font-button"
          color="primary"
          size="large"
          type="submit"
          variant="contained"
          onClick={saveFont}
        >
          {localization.t('forms.buttons.save')}
        </Button>
      </Zoom>
      <Box width="100%" flexWrap="nowrap" display="flex" flexDirection="row">
        <Box pr={4} pt="7px" pl="4px">
          <Typography color="secondary">
            {localization.t('labels.id')}
          </Typography>
        </Box>
        <Box pr={4} pt="7px" pl="4px">
          <Typography>{currentFont.id}</Typography>
        </Box>
      </Box>
      <Box width="100%" flexWrap="nowrap" display="flex" flexDirection="row">
        <Box pr={4} pt="7px" pl="4px">
          <Typography color="secondary">
            {localization.t('labels.customer')}
          </Typography>
        </Box>
        <Box pr={4} pt="7px" pl="4px">
          <Typography>{currentFont.id}</Typography>
        </Box>
      </Box>
      <Typography>{}</Typography>
      <Box py={5} pb={2} width="50%">
        <TextField
          fullWidth
          label={localization.t('labels.name')}
          name="firstName"
          type="text"
          value={currentFont.name}
          onChange={(e) => setCurrentFont({ ...currentFont, name: e.target.value })}
          variant="outlined"
        />
      </Box>
      <Box py={5} pb={2} width="50%">
        <TextField
          fullWidth
          label={localization.t('labels.fontFamily')}
          name="lastName"
          type="text"
          value={currentFont.data.fontFamily}
          onChange={(e) => setCurrentFont({
            ...currentFont,
            data: { ...currentFont.data, fontFamily: e.target.value },
          })}
          variant="outlined"
        />
      </Box>
      <Box py={5} pb={2} width="50%">
        <TextField
          fullWidth
          label={localization.t('labels.importCssRule')}
          name="lastName"
          type="text"
          value={currentFont.data.font}
          onChange={(e) => setCurrentFont({
            ...currentFont,
            data: { ...currentFont.data, font: e.target.value },
          })}
          variant="outlined"
        />
      </Box>
    </Box>
  );
};

export default FontEditScreen;

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Zoom,
  Select,
  MenuItem,
  TextField,
  Chip,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';
import localization from '../../../localization';
import { languages, status, theme } from '../../../services/selectOptions';
import './MainInfo.scss';

const MainInfo = ({ storeData, customerData, setStoreData }) => {
  const [editable, setEditable] = useState(false);
  const [hoverBlock, setHoverBlock] = useState(false);
  const handleDeleteBlock = () => {
    const newRoutes = [...storeData.routes];
    newRoutes[0] = { ...newRoutes[0], hostname: '' };
    const newData = {
      ...storeData,
      status: '',
      defaultLocale: '',
      saleLocales: [],
      routes: newRoutes,
      designs: {
        ...storeData.designs,
        checkout: {
          ...storeData.designs.checkout,
          themeRef: {
            ...storeData.designs.checkout.themeRef,
            name: '',
          },
        },
        resellerCheckout: {
          ...storeData.designs.resellerCheckout,
          themeRef: {
            ...storeData.designs.resellerCheckout.themeRef,
            name: '',
          },
        },
      },
    };
    setStoreData(newData);
  };

  return (
    <Box
      pb={5}
      pl={7}
      display="flex"
      flexDirection="column"
      className="mainContainer"
      onMouseOver={() => setHoverBlock(true)}
      onMouseLeave={() => setHoverBlock(false)}
    >
      <Box
        pb={10}
        justifyContent="space-between"
        display="flex"
        flexDirection="row"
        alignItems="flex-end"
      >
        <Box
          className="mainRow"
          pb={20}
          pt={7}
          display="flex"
          flexDirection="column"
        >
          <Box>
            <Typography variant="h1">{storeData.name}</Typography>
          </Box>
          <Box>
            <Typography variant="h1">{customerData.name}</Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          className="mainRow"
          flexDirection="column"
          flexWrap="nowrap"
        >
          <Box
            width="100%"
            flexWrap="nowrap"
            className="odd"
            display="flex"
            flexDirection="row"
          >
            <Box width="40%" pr={4} pt="7px" pl="4px">
              <Typography color="secondary" variant="body2">
                {localization.t('labels.status')}
              </Typography>
            </Box>
            <Box width="60%">
              <Select
                disabled={!editable}
                value={storeData.status}
                onChange={(e) => setStoreData({ ...storeData, status: e.target.value })}
              >
                {status.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.value}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
          <Box
            width="100%"
            flexWrap="nowrap"
            className="odd"
            display="flex"
            flexDirection="row"
          >
            <Box width="40%" pr={4} pt="7px" pl="4px">
              <Typography color="secondary" variant="body2">
                {localization.t('labels.hostnames')}
              </Typography>
            </Box>
            <Box width="60%">
              <TextField
                disabled={!editable}
                fullWidth
                multiple
                onChange={(e) => {
                  const newArray = [...storeData.routes];
                  newArray[0] = { ...newArray[0], hostname: e.target.value };
                  setStoreData({ ...storeData, routes: newArray });
                }}
                type="text"
                value={storeData.routes[0]?.hostname}
                inputProps={{ form: { autocomplete: 'off' } }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        pb={5}
        justifyContent="space-between"
      >
        <Box
          width="100%"
          flexWrap="nowrap"
          className="even"
          display="flex"
          flexDirection="row"
        >
          <Box width="40%" pr={4} pt="7px" pl="4px">
            <Typography color="secondary" variant="body2">
              {localization.t('labels.defaultLanguage')}
            </Typography>
          </Box>
          <Box width="60%">
            <Select
              disabled={!editable}
              value={storeData?.defaultLocale}
              onChange={(e) => setStoreData({ ...storeData, defaultLocale: e.target.value })}
            >
              {languages.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.value}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
        <Box
          width="100%"
          flexWrap="nowrap"
          className="even"
          display="flex"
          flexDirection="row"
        >
          <Box width="40%" pr={4} pt="7px" pl="4px">
            <Typography color="secondary" variant="body2">
              {localization.t('labels.salesLanguages')}
            </Typography>
          </Box>
          <Box>
            {!editable ? (
              <Typography color="secondary">
                {storeData?.saleLocales?.join(', ')}
              </Typography>
            ) : (
              <Select
                multiple
                value={storeData?.saleLocales}
                onChange={(e) => setStoreData({ ...storeData, saleLocales: e.target.value })}
                renderValue={(selected) => (
                  <Box
                    display="flex"
                    alignItems="center"
                    flexDirection="row"
                    flexWrap="wrap"
                  >
                    {selected.map((chip) => (
                      <Chip
                        variant="outlined"
                        color="primary"
                        onDelete={() => {
                          const newValue = [...storeData?.saleLocales].filter(
                            (val) => val !== chip,
                          );
                          setStoreData({ ...storeData, saleLocales: newValue });
                        }}
                        onMouseDown={(event) => {
                          event.stopPropagation();
                        }}
                        key={chip}
                        label={chip}
                      />
                    ))}
                  </Box>
                )}
              >
                {languages.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.value}
                  </MenuItem>
                ))}
              </Select>
            )}
          </Box>
        </Box>
        <Box
          width="100%"
          flexWrap="nowrap"
          className="odd"
          display="flex"
          flexDirection="row"
        >
          <Box width="40%" pr={4} pt="7px" pl="4px">
            <Typography color="secondary" variant="body2">
              {localization.t('labels.enduserPortalTheme')}
            </Typography>
          </Box>
          <Box width="60%">
            <Select
              disabled={!editable}
              value={storeData?.designs?.checkout?.themeRef?.name}
              onChange={(e) => setStoreData({
                ...storeData,
                designs: {
                  ...storeData.designs,
                  checkout: {
                    ...storeData.designs.checkout,
                    themeRef: {
                      ...storeData.designs.checkout.themeRef,
                      name: e.target.value,
                    },
                  },
                },
              })}
            >
              {theme.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.value}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>

        <Box
          width="100%"
          flexWrap="nowrap"
          className="odd"
          display="flex"
          flexDirection="row"
        >
          <Box width="40%" pr={4} pt="7px" pl="4px">
            <Typography color="secondary" variant="body2">
              {localization.t('labels.checkoutTheme')}
            </Typography>
          </Box>
          <Box width="60%">
            <Select
              disabled={!editable}
              value={storeData?.designs?.resellerCheckout?.themeRef?.name}
              onChange={(e) => setStoreData({
                ...storeData,
                designs: {
                  ...storeData.designs,
                  resellerCheckout: {
                    ...storeData.designs.resellerCheckout,
                    themeRef: {
                      ...storeData.designs.resellerCheckout.themeRef,
                      name: e.target.value,
                    },
                  },
                },
              })}
            >
              {theme.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.value}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
      </Box>
      <Zoom in={hoverBlock && !editable}>
        <Box className="actionBlock">
          <EditIcon
            color="primary"
            className="editIcon icons"
            onClick={() => setEditable(true)}
          />
        </Box>
      </Zoom>
      <Zoom in={editable}>
        <Box className="actionBlock">
          <DeleteIcon
            color="primary"
            onClick={handleDeleteBlock}
            className="deleteIcon icons"
          />
        </Box>
      </Zoom>
    </Box>
  );
};
MainInfo.propTypes = {
  storeData: PropTypes.object,
  customerData: PropTypes.object,
  setStoreData: PropTypes.func,
};

export default MainInfo;

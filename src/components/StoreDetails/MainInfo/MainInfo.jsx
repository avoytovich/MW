import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Typography,
  Select,
  MenuItem,
  TextField,
  Chip,
} from '@material-ui/core';

import EditZoomIcons from '../../EditZoomIcons';
import selectLanguages from '../../../services/selectOptions/selectLanguages';
import { status } from '../../../services/selectOptions/selectOptions';

import localization from '../../../localization';

import './MainInfo.scss';

const MainInfo = ({
  currentStoreData,
  customerData,
  setCurrentStoreData,
  selectOptions,
  storeData,
  inputErrors,
  setInputErrors,
}) => {
  const [editable, setEditable] = useState(false);
  const [hoverBlock, setHoverBlock] = useState(false);
  useEffect(() => {
    setEditable(false);
  }, [storeData]);

  const handleDeleteBlock = () => {
    const newData = {
      ...currentStoreData,
      status: '',
      defaultLocale: '',
      saleLocales: [],
      designs: {
        ...currentStoreData.designs,
        checkout: {
          ...currentStoreData.designs.checkout,
          themeRef: {
            ...currentStoreData.designs.checkout.themeRef,
            name: '',
          },
        },
        endUserPortal: {
          ...currentStoreData.designs.endUserPortal,
          themeRef: {
            ...currentStoreData.designs.endUserPortal.themeRef,
            name: '',
          },
        },
      },
    };
    setInputErrors({ defaultLocale: true, status: true });

    setCurrentStoreData(newData);
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
            <Typography variant="h1">{currentStoreData.name}</Typography>
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
                error={inputErrors?.status}
                disabled={!editable}
                value={currentStoreData.status}
                disableUnderline
                onChange={(e) => {
                  if (e.target.value.trim()) {
                    setCurrentStoreData({
                      ...currentStoreData,
                      status: e.target.value,
                    });
                    if (inputErrors?.status) {
                      const newObj = { ...inputErrors };
                      delete newObj.status;
                      setInputErrors(newObj);
                    }
                  }
                }}
              >
                {status.map((option) => (
                  <MenuItem key={option.id} value={option.value}>
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
                required
                disabled
                fullWidth
                InputProps={{
                  disableUnderline: true,
                  form: { autocomplete: 'off' },
                }}
                onChange={(e) => {
                  const newArray = [...currentStoreData.routes];
                  newArray[0] = { ...newArray[0], hostname: e.target.value };
                  setCurrentStoreData({
                    ...currentStoreData,
                    routes: newArray,
                  });
                }}
                type="text"
                value={currentStoreData.routes[0].hostname}
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
              className="storeDefaultLanuage"
              error={inputErrors.defaultLocale}
              disabled={!editable}
              value={currentStoreData?.defaultLocale}
              disableUnderline
              onChange={(e) => {
                setCurrentStoreData({
                  ...currentStoreData,
                  defaultLocale: e.target.value,
                });
                if (inputErrors.defaultLocale) {
                  const newObj = { ...inputErrors };
                  delete newObj.defaultLocale;
                  setInputErrors(newObj);
                }
              }}
            >
              {selectLanguages.map((option) => (
                <MenuItem key={option.locale} value={option.locale}>
                  {`${option.locale}: ${option.localName}`}
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
                {currentStoreData?.saleLocales?.join(', ') || '---'}
              </Typography>
            ) : (
              <Select
                multiple
                value={currentStoreData.saleLocales}
                disableUnderline
                onChange={(e) => {
                  setCurrentStoreData({
                    ...currentStoreData,
                    saleLocales: e.target.value,
                  });
                }}
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
                          const newValue = [
                            ...currentStoreData?.saleLocales,
                          ].filter((val) => val !== chip);
                          setCurrentStoreData({
                            ...currentStoreData,
                            saleLocales: newValue,
                          });
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
                {selectLanguages.map((option) => (
                  <MenuItem value={option.locale} key={option.locale}>
                    {`${option.locale}: ${option.localName}`}
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
              className="storeEnduserPortalTheme"
              disabled={!editable}
              disableUnderline
              value={`${currentStoreData.designs.endUserPortal.themeRef.customerId}: ${currentStoreData.designs.endUserPortal.themeRef.name}`}
              onChange={(e) => {
                const newValue = e.target.value.split(':');
                setCurrentStoreData({
                  ...currentStoreData,
                  designs: {
                    ...currentStoreData.designs,
                    endUserPortal: {
                      ...currentStoreData.designs.endUserPortal,
                      themeRef: {
                        customerId: newValue[0],
                        name: newValue[1].trim(),
                      },
                    },
                  },
                });
              }}
            >
              <MenuItem value=": ">
                <em>None</em>
              </MenuItem>
              {selectOptions.theme.map((option) => (
                <MenuItem
                  key={option.id}
                  value={`${option.customerId}: ${option.name}`}
                >
                  {`${option.customerId}: ${option.name}`}
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
              className="storeCheckoutTheme"
              value={`${currentStoreData.designs.checkout.themeRef.customerId}: ${currentStoreData.designs.checkout.themeRef.name}`}
              disabled={!editable}
              disableUnderline
              onChange={(e) => {
                const newValue = e.target.value.split(':');
                setCurrentStoreData({
                  ...currentStoreData,
                  designs: {
                    ...currentStoreData.designs,
                    checkout: {
                      ...currentStoreData.designs.checkout,
                      themeRef: {
                        customerId: newValue[0],
                        name: newValue[1].trim(),
                      },
                    },
                  },
                });
              }}
            >
              <MenuItem value=": ">
                <em>None</em>
              </MenuItem>
              {selectOptions.theme.map((option) => (
                <MenuItem
                  key={option.id}
                  value={`${option.customerId}: ${option.name}`}
                >
                  {`${option.customerId}: ${option.name}`}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
      </Box>
      <EditZoomIcons
        showCondition={hoverBlock && !editable}
        editable={editable}
        setEditable={setEditable}
        handleDelete={handleDeleteBlock}
      />
    </Box>
  );
};
MainInfo.propTypes = {
  selectOptions: PropTypes.object,
  currentStoreData: PropTypes.object,
  customerData: PropTypes.object,
  setCurrentStoreData: PropTypes.func,
  storeData: PropTypes.object,
  inputErrors: PropTypes.object,
  setInputErrors: PropTypes.func,
};

export default MainInfo;

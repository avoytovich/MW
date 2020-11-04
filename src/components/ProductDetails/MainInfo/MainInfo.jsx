import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Zoom,
  Select,
  MenuItem,
  Chip,
  TextField,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';
import localization from '../../../localization';
import formatDate from '../../../services/dateFormatting';

import {
  lifeTime,
  trialAllowed,
  type,
} from '../../../services/selectOptions/selectOptions';
import './MainInfo.scss';

const MainInfo = ({
  setProductData,
  productData,
  storeData,
  selectOptions,
}) => {
  const [lifeTimeUpdateValue, setLifeTimeUpdateValue] = useState({
    number: 1,
    value: '',
  });
  const [showLifeTimeNumber, setShowLifeTimeNumber] = useState(false);
  const [editable, setEditable] = useState(false);
  const [hoverBlock, setHoverBlock] = useState(false);
  const handleDeleteBlock = () => {
    const newProductData = {
      ...productData,
      type: ' ',
      lifeTime: ' ',
      trialAllowed: ' ',
    };
    setProductData(newProductData);
  };

  useEffect(() => {
    let LifeTimeNumber = false;
    const res = productData.lifeTime.match(/[a-zA-Z]+|[0-9]+/g);
    if (res.length > 1) {
      setLifeTimeUpdateValue({ number: res[0], value: res[1] });
      LifeTimeNumber = res[1] === 'MONTH' || res[1] === 'YEARS';
    } else {
      setLifeTimeUpdateValue({ ...lifeTimeUpdateValue, value: res[0] });
      LifeTimeNumber = res[0] === 'MONTH' || res[0] === 'YEARS';
    }
    setShowLifeTimeNumber(LifeTimeNumber);
    return () => {};
  }, []);

  useEffect(() => {
    if (editable) {
      const newLifeTime = showLifeTimeNumber
        ? `${lifeTimeUpdateValue.number}${lifeTimeUpdateValue.value}`
        : lifeTimeUpdateValue.value;
      setProductData({ ...productData, lifeTime: newLifeTime });
    }
  }, [lifeTimeUpdateValue]);

  const formStoreNames = () => {
    const storesArray = [];
    productData.sellingStores?.forEach((item) => {
      const storeName = storeData.items.filter((name) => name.id === item)[0]
        .displayName;
      storesArray.push(storeName);
    });
    return storesArray.join(', ');
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
            {productData.genericName && (
              <Typography variant="h1">{productData.genericName}</Typography>
            )}
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
                {localization.t('labels.type')}
              </Typography>
            </Box>
            <Box width="60%">
              <Select
                defaultValue=" "
                disabled={!editable}
                value={productData?.type}
                onChange={(e) => setProductData({ ...productData, type: e.target.value })}
              >
                <MenuItem value=" ">
                  <em />
                </MenuItem>
                {type.map((option) => (
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
                {localization.t('labels.sellingStores')}
              </Typography>
            </Box>
            <Box width="60%">
              {!editable ? (
                <Typography>{formStoreNames()}</Typography>
              ) : (
                <Select
                  value={productData.sellingStores}
                  onChange={(e) => setProductData({
                    ...productData,
                    sellingStores: e.target.value,
                  })}
                  renderValue={(selected) => (
                    <Box
                      display="flex"
                      alignItems="center"
                      flexDirection="row"
                      flexWrap="wrap"
                    >
                      <MenuItem value=" ">
                        <em />
                      </MenuItem>
                      {selected.map((chip) => {
                        const storeName = storeData.items.filter(
                          (item) => item.id === chip,
                        )[0];
                        return (
                          <Chip
                            variant="outlined"
                            color="primary"
                            onDelete={() => {
                              const newValue = [
                                ...productData.sellingStores,
                              ].filter((val) => val !== chip);
                              setProductData({
                                ...productData,
                                sellingStores: newValue,
                              });
                            }}
                            onMouseDown={(event) => {
                              event.stopPropagation();
                            }}
                            key={chip}
                            label={storeName.displayName}
                          />
                        );
                      })}
                    </Box>
                  )}
                >
                  {selectOptions.sellingStores.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.displayName}
                    </MenuItem>
                  ))}
                </Select>
              )}
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
              {localization.t('labels.currency')}
            </Typography>
          </Box>
          <Box width="60%">{/* currency input */}</Box>
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
              {localization.t('labels.lastUpdate')}
            </Typography>
          </Box>
          <Box width="60%">
            <Typography>{formatDate(productData.updateDate)}</Typography>
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
              {localization.t('labels.lifeTime')}
            </Typography>
          </Box>
          <Box width="60%">
            {!editable ? (
              <Typography>{productData?.lifeTime}</Typography>
            ) : (
              <>
                {showLifeTimeNumber && (
                  <TextField
                    fullWidth
                    onChange={(e) => setLifeTimeUpdateValue({
                      ...lifeTimeUpdateValue,
                      number: e.target.value,
                    })}
                    type="number"
                    value={lifeTimeUpdateValue.number}
                    InputProps={{
                      inputProps: { min: 1, max: 11 },
                      form: { autocomplete: 'off' },
                    }}
                  />
                )}
                <Select
                  value={lifeTimeUpdateValue.value}
                  onChange={(e) => {
                    setShowLifeTimeNumber(
                      e.target.value === 'MONTH' || e.target.value === 'YEARS',
                    );
                    setLifeTimeUpdateValue({
                      ...lifeTimeUpdateValue,
                      value: e.target.value,
                    });
                  }}
                >
                  <MenuItem value="">
                    <em />
                  </MenuItem>
                  {lifeTime.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.value}
                    </MenuItem>
                  ))}
                </Select>
              </>
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
              {localization.t('labels.trialAllowed')}
            </Typography>
          </Box>
          <Box width="60%">
            <Select
              disabled={!editable}
              value={productData?.trialAllowed}
              onChange={(e) => setProductData({
                ...productData,
                trialAllowed: e.target.value,
              })}
            >
              <MenuItem value="">
                <em />
              </MenuItem>
              {trialAllowed.map((option) => (
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
  setProductData: PropTypes.func,
  productData: PropTypes.object,
  storeData: PropTypes.object,
  selectOptions: PropTypes.object,
};

export default MainInfo;

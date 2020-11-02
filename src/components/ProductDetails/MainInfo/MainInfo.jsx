import React, { useState } from 'react';
import {
  Box, Typography, Zoom, Select, MenuItem,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';
import localization from '../../../localization';
import formatDate from '../../../services/dateFormatting';

import {
  lifeTime,
  trialAllowed,
  storeNames,
  type,
} from '../../../services/selectOptions';
import './MainInfo.scss';

const MainInfo = ({
  setProductData, productData, storeData, setStoreData,
}) => {
  const [editable, setEditable] = useState(false);
  const [hoverBlock, setHoverBlock] = useState(false);
  const handleDeleteBlock = () => {
    const newStoreData = {
      ...storeData,
      name: ' ',
    };
    setStoreData(newStoreData);
    const newProductData = {
      ...productData,
      type: ' ',
      lifeTime: ' ',
      trialAllowed: ' ',
    };
    setProductData(newProductData);
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
              <Select
                disabled={!editable}
                value={storeData?.name}
                // onChange={}
              >
                {storeNames.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.value}
                  </MenuItem>
                ))}
              </Select>
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
            <Select
              disabled={!editable}
              value={productData?.lifeTime}
              onChange={(e) => setProductData({
                ...productData,
                lifeTime: e.target.value,
              })}
            >
              {lifeTime.map((option) => (
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
  setStoreData: PropTypes.func,
};

export default MainInfo;

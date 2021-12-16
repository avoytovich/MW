/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Box, Typography, Divider } from '@material-ui/core';

import AssetsResource from '../../../components/AssetsResoursesWithSelectLabel';

import localization from '../../../localization';

import './productFile.scss';

const resourceLabels = [
  { id: '_free', value: localization.t('labels.freeLabel') },
  { id: 'product_header_logo', value: localization.t('labels.headerLogo') },
  { id: 'product_boxshot', value: localization.t('labels.boxshot') },
  { id: 'product_icon', value: localization.t('labels.icon') },
];

const defaultFiles = { key: 0, label: null, url: null };

const ProductFiles = ({ currentProductData, setProductData }) => {
  const [contents, setContents] = useState([{ ...defaultFiles }]);
  const [resources, setResources] = useState([{ ...defaultFiles }]);

  const updateResources = (newData) => {
    setProductData((c) => ({ ...c, resources: [...newData] }));
  };

  const updateContents = (newData) => {
    setProductData((c) => ({ ...c, relatedContents: [...newData] }));
  };

  useEffect(() => {
    let toSetData = currentProductData?.relatedContents || [];

    if (!toSetData.length) {
      toSetData = [{ ...defaultFiles }];
    }

    setContents([...toSetData]);
  }, [currentProductData.relatedContents]);

  useEffect(() => {
    let toSetData = currentProductData?.resources || [];

    if (!toSetData.length) {
      toSetData = [{ ...defaultFiles }];
    }

    setResources([...toSetData]);
  }, [currentProductData.resources]);

  return (
    <Box p={2} pt={0}>
      <Typography variant='h5' style={{ marginBottom: '15px', fontWeight: '400' }}>
        {localization.t('labels.dropFileOrSelect')}
      </Typography>

      <AssetsResource
        label={localization.t('labels.resources')}
        labelOptions={resourceLabels}
        resources={[...resources]}
        setResources={updateResources}
        currentStoreData={currentProductData}
        setCurrentStoreData={setProductData}
      />

      <AssetsResource
        isFile
        label={localization.t('labels.relatedContents')}
        labelOptions={[]}
        resources={[...contents]}
        setResources={updateContents}
        currentStoreData={currentProductData}
        setCurrentStoreData={setProductData}
        withSelect={false}
      />

      <Box mt={4}>
        <Divider light />
      </Box>

    </Box>
  );
};

ProductFiles.propTypes = {
  currentProductData: PropTypes.object,
  setProductData: PropTypes.func,
};

export default ProductFiles;

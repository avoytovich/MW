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

const defaultFiles = [
  {
    key: 0,
    label: null,
    url: null,
  },
];

const defaultContentsFiles = [
  {
    key: 0,
    label: null,
    url: null,
  },
];

const ProductFiles = ({ currentProductData, setProductData }) => {
  const [contents, setContents] = useState([]);
  const [resources, setResources] = useState([]);

  const updateResources = (newData) => setProductData((c) => ({ ...c, resources: [...newData] }));

  const updateContents = (newData) => setProductData((c) => ({
    ...c, relatedContents: [...newData.map((f) => ({ ...f, file: f.url }))],
  }));

  useEffect(() => {
    currentProductData?.relatedContents?.value
      && setContents([...currentProductData.relatedContents.value]);
  }, [currentProductData.relatedContents]);

  useEffect(() => {
    currentProductData?.resources && setResources([...currentProductData.resources]);
  }, [currentProductData.resources]);

  return (
    <Box p={2} pt={0}>
      <Typography variant='h5' style={{ marginBottom: '15px', fontWeight: '400' }}>
        {localization.t('labels.dropFileOrSelect')}
      </Typography>

      <AssetsResource
        label={localization.t('labels.relatedContents')}
        labelOptions={[]}
        resources={contents.length ? contents : defaultContentsFiles}
        setResources={updateContents}
        currentStoreData={currentProductData}
        setCurrentStoreData={setProductData}
        withSelect={false}
      />

      <Box mt={4}>
        <Divider light />
      </Box>

      <AssetsResource
        label={localization.t('labels.resources')}
        labelOptions={resourceLabels}
        resources={resources.length ? resources : defaultFiles}
        setResources={updateResources}
        currentStoreData={currentProductData}
        setCurrentStoreData={setProductData}
      />
    </Box>
  );
};

ProductFiles.propTypes = {
  currentProductData: PropTypes.object,
  setProductData: PropTypes.func,
};

export default ProductFiles;

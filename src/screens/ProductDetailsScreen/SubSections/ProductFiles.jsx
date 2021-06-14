/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Box, Typography, Divider } from '@material-ui/core';

import ProductFileBlock from './ProductFileBlock';

import localization from '../../../localization';

import './productFile.scss';

const ProductFiles = ({ currentProductData, setProductData }) => {
  const [contents, setContents] = useState([]);
  const [resources, setResources] = useState([]);

  const isEqual = (val1, val2) => JSON.stringify(val1) === JSON.stringify(val2);

  const updateResources = (newData) => {
    if (!isEqual(resources, newData)) {
      setProductData((c) => ({ ...c, resources: [...newData] }));
    }
  };

  const updateContents = (newData) => {
    if (!isEqual(contents, newData)) {
      setProductData((c) => ({ ...c, relatedContents: [...newData] }));
    }
  };

  useEffect(() => {
    currentProductData?.relatedContents
      && setContents([...currentProductData.relatedContents]);
  }, [currentProductData.relatedContents]);

  useEffect(() => {
    // currentProductData?.resources && setResources([...currentProductData.resources]);
  }, [currentProductData.resources]);

  return (
    <Box p={2} pt={0}>
      <Typography variant='h6' style={{ fontWeight: '400' }}>
        {localization.t('labels.dropFileOrSelect')}
      </Typography>

      <Box my={4}>
        <Typography variant='h5'>{localization.t('labels.relatedContents')}</Typography>
      </Box>

      {contents.map((content, index) => (
        <Box key={content.file + content.label}>
          <ProductFileBlock
            data={[...contents]}
            item={{ ...content }}
            updateData={updateContents}
            index={index}
            type='file'
          />
          <Divider light />
        </Box>
      ))}

      <ProductFileBlock data={[...contents]} updateData={updateContents} type='file' empty />

      <Box my={4}>
        <Typography variant='h5'>{localization.t('labels.resources')}</Typography>
      </Box>

      {resources.map((resource, index) => (
        <Box key={resource.url + resource.label}>
          <ProductFileBlock
            data={[...resources]}
            item={{ ...resource }}
            updateData={updateResources}
            index={index}
            type='url'
            withSelect
          />
          <Divider light />
        </Box>
      ))}

      <ProductFileBlock
        data={[...resources]}
        updateData={updateResources}
        type='url'
        withSelect
        empty
      />
    </Box>
  );
};

ProductFiles.propTypes = {
  currentProductData: PropTypes.object,
  setProductData: PropTypes.func,
};

export default ProductFiles;

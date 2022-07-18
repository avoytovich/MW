/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Box, Typography } from '@mui/material';

import AssetsResource from '../../../components/AssetsResoursesWithSelectLabel';

import { checkValue } from '../../../services/helpers/dataStructuring';
import localization from '../../../localization';

import './productFile.scss';
import InheritanceField from '../InheritanceField';

const resourceLabels = [
  { id: '_free', value: localization.t('labels.freeLabel') },
  { id: 'product_header_logo', value: localization.t('labels.headerLogo') },
  { id: 'product_boxshot', value: localization.t('labels.boxshot') },
  { id: 'product_icon', value: localization.t('labels.icon') },
];

const defaultFiles = { key: 0, label: null, url: null };

const ProductFiles = ({ currentProductData, setProductData, parentId }) => {
  const [contents, setContents] = useState([{ ...defaultFiles }]);
  const [resources, setResources] = useState([{ ...defaultFiles }]);

  const updateResources = (newData) => {
    setProductData((c) => ({ ...c, resources: [...newData] }));
  };

  const updateContents = (newData) => {
    if (parentId) {
      setProductData((c) => ({
        ...c,
        relatedContents: {
          ...currentProductData?.relatedContents,
          value: [...newData],
        },
      }));
    } else {
      setProductData((c) => ({ ...c, relatedContents: [...newData] }));
    }
  };

  useEffect(() => {
    let toSetData = checkValue(currentProductData?.relatedContents) || [];

    if (Array.isArray(toSetData)) {
      if (!toSetData.length) {
        toSetData = [{ ...defaultFiles }];
      }
      setContents([...toSetData]);
    }

    if (toSetData.value) {
      if (!toSetData?.value?.length) {
        toSetData = [{ ...defaultFiles }];
      }
      setContents([...toSetData.value]);
    }
  }, [currentProductData.relatedContents]);

  useEffect(() => {
    let toSetData = checkValue(currentProductData?.resources) || [];

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

      <InheritanceField
        field='resources'
        onChange={setProductData}
        value={currentProductData?.resources || []}
        selectOptions={resourceLabels || []}
        parentId={parentId}
        currentProductData={currentProductData}
      >
        <AssetsResource
          label={localization.t('labels.resources')}
          labelOptions={resourceLabels}
          resources={[...resources]}
          setResources={updateResources}
          currentStoreData={currentProductData}
          setCurrentStoreData={setProductData}
        />
      </InheritanceField>

      <InheritanceField
        field='relatedContents'
        onChange={setProductData}
        value={currentProductData?.relatedContents || []}
        parentId={parentId}
        currentProductData={currentProductData}
        buttonStyles={{ top: '26px' }}
        containerStyles={{ alignItems: 'flex-start' }}
      >
        <AssetsResource
          containerStyles={{ marginTop: '20px' }}
          label={localization.t('labels.relatedContents')}
          labelOptions={[]}
          resources={[...contents]}
          setResources={updateContents}
          currentStoreData={currentProductData}
          setCurrentStoreData={setProductData}
          withSelect={false}
          isDisabled={currentProductData?.relatedContents?.state === 'inherits'}
        />
      </InheritanceField>
    </Box>
  );
};

ProductFiles.propTypes = {
  currentProductData: PropTypes.object,
  setProductData: PropTypes.func,
  parentId: PropTypes.string,
};

export default ProductFiles;

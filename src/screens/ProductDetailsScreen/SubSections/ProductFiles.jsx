/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Box, Typography } from '@material-ui/core';

import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import ClearIcon from '@material-ui/icons/Clear';

import {
  InputCustom,
  SelectCustom,
} from '../../../components/Inputs';
import FileUpload from '../../../components/utils/FileUpload';

import localization from '../../../localization';

import './productFile.scss';

const ProductFileBlock = ({ withSelect }) => {
  const [newLabel, setNewLabel] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [selectType, setSelectType] = useState('_free');

  return (
    <Box display='flex' width='100%' className='product-files'>
      <FileUpload />

      <Box display='flex' flexDirection='column' flexGrow='1' justifyContent='space-between' px={4}>
        <Box maxWidth='690px' display='flex'>
          {
            withSelect && (
              <Box width='40%' mr={3}>
                <SelectCustom
                  label='label'
                  value={selectType}
                  selectOptions={[
                    { id: '_free', value: localization.t('labels.freeLabel') },
                    { id: 'product_header_logo', value: localization.t('labels.headerLogo') },
                    { id: 'product_boxshot', value: localization.t('labels.boxshot') },
                    { id: 'product_icon', value: localization.t('labels.icon') },
                  ]}
                  onChangeSelect={(e) => setSelectType(e.target.value)}
                />
              </Box>
            )
          }

          {
            (!withSelect || selectType === '_free') && (
              <InputCustom
                label='freeLabel'
                isRequired
                value={newLabel}
                onChangeInput={(e) => setNewLabel(e.target.value)}
              />
            )
          }
        </Box>

        <Box display='flex' width='100%' maxWidth='690px' alignItems='center' position='relative'>
          <InputCustom
            label='url'
            value={newUrl}
            onChangeInput={(e) => setNewUrl(e.target.value)}
          />

          <Box position='absolute' className='block-actions'>
            <AddPhotoAlternateIcon />
            <ClearIcon />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const ProductFiles = () => {
  const [newLabel, setNewLabel] = useState('');

  return (
    <Box p={2} pt={0}>
      <Typography variant='h6' style={{ fontWeight: '400' }}>{localization.t('labels.dropFileOrSelect')}</Typography>

      <Box my={4}>
        <Typography variant='h5'>{localization.t('labels.relatedContents')}</Typography>
      </Box>

      <ProductFileBlock />

      <Box my={4}>
        <Typography variant='h5'>{localization.t('labels.resources')}</Typography>
      </Box>

      <ProductFileBlock withSelect />
    </Box>
  );
};

ProductFiles.propTypes = {
  data: PropTypes.object,
  handleChange: PropTypes.func,
};

export default ProductFiles;

import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import ClearIcon from '@material-ui/icons/Clear';
import SaveIcon from '@material-ui/icons/Save';

import { Box, CircularProgress } from '@material-ui/core';

import {
  InputCustom,
  SelectCustom,
} from '../../../components/Inputs';
import FileUpload from '../../../components/utils/FileUpload';

import localization from '../../../localization';

const defaultLabels = ['product_header_logo', 'product_boxshot', 'product_icon'];

const ProductFileBlock = ({
  withSelect,
  data,
  item,
  empty,
  updateData,
  index,
  type,
}) => {
  const curRef = useRef(null);
  const [newLabel, setNewLabel] = useState('');
  const [hasSave, setHasSave] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [initImage, setInitImage] = useState('');
  const [urlLoading, setUrlLoading] = useState(true);
  const [urlFetching, setUrlFetching] = useState(false);
  const [selectType, setSelectType] = useState('_free');

  const setInit = () => {
    setNewUrl('');
    setNewLabel('');
    setInitImage('');
    setSelectType('_free');
  };

  useEffect(() => {
    if (item) {
      const { url, file, label } = item;

      if (url || file) {
        setInitImage(url || file);
        setNewUrl(url || file);
      }

      if (label) {
        const selectedLabel = defaultLabels.indexOf(label) < 0 ? '_free' : label;

        setNewLabel(selectedLabel === '_free' ? label : selectedLabel);
        setSelectType(selectedLabel);
      }
    }

    setUrlLoading(false);

    return () => setInit();
  }, []);

  const checkForSave = () => {
    if (!item) return;

    const checkType = selectType !== '_free' ? selectType !== item.label : newLabel !== item.label;
    const hasChanges = checkType || (item[type] !== newUrl);

    setHasSave(hasChanges);
  };

  useEffect(() => checkForSave(), [newUrl, newLabel, selectType]);

  const makeUpdate = () => {
    if (!empty) {
      const newData = JSON.parse(JSON.stringify(data));

      newData.forEach((it, ind) => {
        if (item.label === it.label && it[type] === item[type]) {
          newData[ind][type] = newUrl;
          newData[ind].label = selectType === '_free' ? newLabel : selectType;
        }
      });

      updateData(newData);
    }
  };

  const updateUrl = (e) => {
    const newVal = e.target.value;
    if (newVal !== newUrl) {
      setNewUrl(newVal);
    }
  };

  const updateLabel = (e) => {
    const newVal = e.target.value;
    if (newVal !== newLabel) {
      setNewLabel(newVal);
    }
  };

  const updateSelect = (e) => {
    const newVal = e.target.value;
    if (newVal !== selectType) {
      setSelectType(newVal);

      if (newVal === '_free') {
        setNewLabel('');
      }
    }
  };

  const deleteItem = () => {
    if (empty) {
      if (newUrl) {
        setInitImage(' ');
      }

      setTimeout(setInit, 0);
    } else {
      const newData = [...data];
      newData.splice(index, 1);

      updateData(newData);
    }
  };

  const addNew = () => {
    if (!newUrl || (selectType === '_free' && !newLabel)) return;

    const newData = data ? [...data] : [];

    const newItemData = {
      [type]: newUrl,
      label: selectType === '_free' ? newLabel : selectType,
    };

    newData.push(newItemData);

    updateData(newData);
    setInit();
  };

  return (
    <Box
      display='flex'
      width='100%'
      className={`product-files ${urlFetching ? 'disable-block' : ''} ${empty ? 'new-item' : 'existing-item'}`}
      ref={curRef}
    >
      <Box width='198px' height='139px' display='flex' justifyContent='center' alignItems='center'>
        {
          (urlLoading || initImage === ' ') ? <CircularProgress /> : (
            <FileUpload
              setFileUrl={setNewUrl}
              setUrlLoading={setUrlLoading}
              setUrlFetching={setUrlFetching}
              initialFiles={initImage}
              setHasSave={setHasSave}
            />
          )
        }
      </Box>

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
                  onChangeSelect={updateSelect}
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
                onChangeInput={updateLabel}
              />
            )
          }
        </Box>

        <Box display='flex' width='100%' maxWidth='690px' alignItems='center' position='relative'>
          <InputCustom
            label='url'
            value={newUrl}
            onChangeInput={updateUrl}
          />

          <Box position='absolute' className={`block-actions ${empty ? '' : 'single'}`}>
            {hasSave && <SaveIcon className='save-block' onClick={makeUpdate} />}
            {empty && <AddPhotoAlternateIcon onClick={addNew} />}
            <ClearIcon onClick={deleteItem} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

ProductFileBlock.propTypes = {
  withSelect: PropTypes.bool,
  data: PropTypes.array,
  item: PropTypes.object,
  empty: PropTypes.bool,
  type: PropTypes.string,
  updateData: PropTypes.func,
  index: PropTypes.number,
};

export default ProductFileBlock;

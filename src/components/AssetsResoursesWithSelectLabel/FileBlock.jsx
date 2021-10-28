import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ClearIcon from '@material-ui/icons/Clear';
import {
  CircularProgress, Grid, Box, Typography,
} from '@material-ui/core';

import { InputCustom, SelectCustom } from '../Inputs';
import FileUpload from '../utils/FileUpload';
import localization from '../../localization';

import './AssetsResource.scss';

const FileBlock = ({
  item, updateResources, deleteItem, index, labelOptions, data, withSelect,
}) => {
  const [urlLoading, setUrlLoading] = useState(true);

  const [initImage, setInitImage] = useState('');
  const [urlFetching, setUrlFetching] = useState(false);

  useEffect(() => {
    if (item) {
      if (item.url || item.file) {
        setInitImage(item.url || item.file);
      }
    }

    setUrlLoading(false);
  }, []);

  const setFileUrl = (value) => {
    updateResources(index, 'url', value);
  };

  const checkDublicateLabel = () => {
    const valueArr = data.map((each) => each.label);
    const [duplicateVals] = valueArr.filter((each, id) => valueArr.indexOf(each) !== id);

    return duplicateVals || [];
  };

  const selectedLabel = item.label && !labelOptions.filter((l) => l.id === item.label).length ? '_free' : item.label;

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      className={`product-files ${
        urlFetching ? 'disable-block' : ''
      } existing-item`}
    >
      <Box minWidth="250px">
        {urlLoading || initImage === ' ' ? (
          <CircularProgress />
        ) : (
          <FileUpload
            setFileUrl={setFileUrl}
            setUrlLoading={setUrlLoading}
            setUrlFetching={setUrlFetching}
            initialFiles={initImage}
            setHasSave={() => { }}
          />
        )}
      </Box>
      <Box width={3 / 4}>
        <Grid container spacing={1} alignItems="center">
          <Grid item md={11} sm={11}>
            <Box my={2} display='flex'>
              {withSelect && (
                <Box width="250px">
                  <SelectCustom
                    label="label"
                    value={selectedLabel}
                    selectOptions={labelOptions}
                    usedOptions={
                      labelOptions.filter((l) => data.filter((r) => r.label === l.id).length)
                    }
                    onChangeSelect={(e) => updateResources(index, 'label', e.target.value)}
                  />

                  {!item.label && item.label !== null && (
                    <Box width={1} pl={1}>
                      <Typography variant="body2" style={{ color: 'red' }}>
                        {localization.t('labels.validationLabel')}
                      </Typography>
                    </Box>
                  )}

                  {checkDublicateLabel() === item.label && (
                    <Box width={1} pl={1}>
                      <Typography variant="body2" style={{ color: 'red' }}>
                        {localization.t('labels.validationDublicateLabel')}
                      </Typography>
                    </Box>
                  )}
                </Box>
              )}

              {
                (!withSelect || selectedLabel === '_free') && (
                  <Box flexGrow={1} ml={withSelect ? 2 : 0}>
                    <InputCustom
                      label='freeLabel'
                      isRequired
                      value={item.label === '_free' ? '' : item.label}
                      onChangeInput={(e) => updateResources(index, 'label', e.target.value)}
                    />
                  </Box>
                )
              }
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={1} alignItems="center">
          <Grid item md={11} sm={11}>
            <InputCustom
              label="url"
              value={item.url || item.file}
              onChangeInput={(e) => updateResources(index, 'url', e.target.value)}
            />
            {!item.url && !item.file && item.url !== null && (
              <Box width={1} pl={1}>
                <Typography variant="body2" style={{ color: 'red' }}>
                  {localization.t('labels.validationUrl')}
                </Typography>
              </Box>
            )}
          </Grid>
          <Grid item md={1} sm={1} className="iconWrapper">
            <ClearIcon
              color="secondary"
              onClick={() => deleteItem(item.key)}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

FileBlock.propTypes = {
  item: PropTypes.object,
  data: PropTypes.array,
  updateResources: PropTypes.func,
  deleteItem: PropTypes.func,
  index: PropTypes.number,
  labelOptions: PropTypes.array,
  withSelect: PropTypes.bool,
};

export default FileBlock;

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
  item, updateResources, deleteItem, index, labelOptions, data,
}) => {
  const [urlLoading, setUrlLoading] = useState(true);

  const [initImage, setInitImage] = useState('');
  const [urlFetching, setUrlFetching] = useState(false);

  useEffect(() => {
    if (item) {
      if (item.url) {
        setInitImage(item.url);
      }
    }

    setUrlLoading(false);
  }, []);

  const setFileUrl = (value) => {
    updateResources(index, 'url', value);
  };

  const checkDublicateLabel = () => {
    const valueArr = data.map((each) => each.label);
    const isDublicate = valueArr.some((each, id) => valueArr.indexOf(each) !== id);
    if (isDublicate) {
      return valueArr.splice(valueArr.indexOf(item.label), 1);
    }
    return false;
  };

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
            s
            setUrlFetching={setUrlFetching}
            initialFiles={initImage}
            setHasSave={() => { }}
          />
        )}
      </Box>
      <Box width={3 / 4}>
        <Box maxWidth="250px" my={2}>
          <SelectCustom
            label="label"
            value={item.label}
            selectOptions={labelOptions}
            usedOptions={labelOptions.filter((l) => data.filter((r) => r.label === l.id).length)}
            onChangeSelect={(e) => updateResources(index, 'label', e.target.value)}
          />
          {!item.label && item.label !== null && (
            <Box width={1} pl={1}>
              <Typography variant="body2" style={{ color: 'red' }}>
                {localization.t('labels.validationLabel')}
              </Typography>
            </Box>
          )}
          {checkDublicateLabel()[0] === item.label && (
            <Box width={1} pl={1}>
              <Typography variant="body2" style={{ color: 'red' }}>
                {localization.t('labels.validationDublicateLabel')}
              </Typography>
            </Box>
          )}
        </Box>
        <Grid container spacing={1} alignItems="center">
          <Grid item md={11} sm={11}>
            <InputCustom
              label="url"
              value={item.url}
              onChangeInput={(e) => updateResources(index, 'url', e.target.value)}
            />
            {!item.url && item.url !== null && (
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
};

export default FileBlock;

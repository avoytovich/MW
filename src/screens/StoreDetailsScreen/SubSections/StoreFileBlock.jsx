import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import ClearIcon from '@material-ui/icons/Clear';

import { CircularProgress, Grid, Box } from '@material-ui/core';
import { resourceLabel } from '../utils';
import { InputCustom, SelectCustom } from '../../../components/Inputs';
import FileUpload from '../../../components/utils/FileUpload';
import '../storeDetailsScreen.scss';

const StoreFileBlock = ({ item, updateResources, deleteItem, index }) => {
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

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      className={`product-files ${
        urlFetching ? 'disable-block' : ''
      } existing-item`}
    >
      <Box minWidth="220px" width={1 / 4}>
        {urlLoading || initImage === ' ' ? (
          <CircularProgress />
        ) : (
          <FileUpload
            setFileUrl={setFileUrl}
            setUrlLoading={setUrlLoading}
            s
            setUrlFetching={setUrlFetching}
            initialFiles={initImage}
            setHasSave={() => {}}
          />
        )}
      </Box>
      <Box width={3 / 4}>
        <Box maxWidth="250px" my={2}>
          <SelectCustom
            label="label"
            value={item.label}
            selectOptions={resourceLabel}
            onChangeSelect={(e) =>
              updateResources(index, 'label', e.target.value)
            }
          />
        </Box>
        <Grid container spacing={1} alignItems="center">
          <Grid item md={11} sm={11}>
            <InputCustom
              label="url"
              value={item.url}
              onChangeInput={(e) =>
                updateResources(index, 'url', e.target.value)
              }
            />
          </Grid>
          <Grid item md={1} sm={1} className="iconWrapper">
            <ClearIcon
             color="secondary" onClick={() => deleteItem(item.key)} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

StoreFileBlock.propTypes = {
  item: PropTypes.object,
  updateResources: PropTypes.func,
  deleteItem: PropTypes.func,
  index: PropTypes.number,
};

export default StoreFileBlock;

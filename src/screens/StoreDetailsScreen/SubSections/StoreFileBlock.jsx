import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import ClearIcon from '@material-ui/icons/Clear';

import { CircularProgress, Grid } from '@material-ui/core';
import { resourceLabel } from '../utils';
import { InputCustom, SelectCustom } from '../../../components/Inputs';
import FileUpload from '../../../components/utils/FileUpload';

const StoreFileBlock = ({
  item, updateResources, deleteItem, index,
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

  return (
    <Grid
      justify="space-between"
      spacing={1}
      container
      className={`product-files ${
        urlFetching ? 'disable-block' : ''
      } existing-item`}
    >
      <Grid item md={3}>
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
      </Grid>

      <Grid item md={7}>
        <SelectCustom
          label="label"
          value={item.label}
          selectOptions={resourceLabel}
          onChangeSelect={(e) => updateResources(index, 'label', e.target.value)}
        />

        <InputCustom
          label="url"
          value={item.url}
          onChangeInput={(e) => updateResources(index, 'url', e.target.value)}
        />
      </Grid>
      <Grid item md={1} className="block-actions single">
        <ClearIcon onClick={() => deleteItem(item.key)} />
      </Grid>
    </Grid>
  );
};

StoreFileBlock.propTypes = {
  item: PropTypes.object,
  updateResources: PropTypes.func,
  deleteItem: PropTypes.func,
  index: PropTypes.number,
};

export default StoreFileBlock;

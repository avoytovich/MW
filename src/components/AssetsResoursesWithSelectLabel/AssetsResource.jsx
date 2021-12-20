import React from 'react';
import PropTypes from 'prop-types';
import {
  Box, Divider, Button, Typography,
} from '@mui/material';
import localization from '../../localization';
import FileBlock from './FileBlock';

const AssetsResource = ({
  resources, setResources, maxPayloadFiles, labelOptions, label, withSelect = true, isFile,
}) => {
  const deleteItem = (key) => {
    const newResources = resources.filter((item) => item.key !== key);
    setResources(newResources);
  };

  const updateResources = (index, key, value) => {
    const newResources = [...resources];
    newResources[index][key] = value;
    setResources(newResources);
  };

  const addItem = () => {
    const lastKey = resources[resources.length - 1]?.key;
    const newResource = { label: null, [isFile ? 'file' : 'url']: null, key: lastKey ? lastKey + 1 : 1 };

    setResources([...resources, newResource]);
  };

  return (
    <>
      <Box width={1} p={2}>
        <Typography variant="h6">
          {label || localization.t('general.selectFiles')}
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" width={1}>
        {!!resources.length
          && resources.map((content, index) => (
            <Box key={content.key} width={1} p={2}>
              <Box width={1} pb={4}>
                <FileBlock
                  labelOptions={labelOptions}
                  deleteItem={deleteItem}
                  data={resources}
                  item={content}
                  updateResources={updateResources}
                  index={index}
                  withSelect={withSelect}
                  isFile={isFile}
                  type="file"
                />
              </Box>
              {(index !== resources.length - 1) && <Divider light />}
            </Box>
          ))}
        {(!maxPayloadFiles || resources.length < maxPayloadFiles) && (
          <Box alignSelf='flex-start' px={2} minWidth={220}>
            <Button
              disabled={resources.filter((i) => !i.label || (!i.url && !i.file)).length}
              style={{ width: '100%' }}
              onClick={addItem}
              variant="outlined"
              color="primary"
            >
              {localization.t('general.addAssets')}
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};

AssetsResource.propTypes = {
  resources: PropTypes.array,
  setResources: PropTypes.func,
  maxPayloadFiles: PropTypes.number,
  labelOptions: PropTypes.array,
  label: PropTypes.string,
  withSelect: PropTypes.bool,
  isFile: PropTypes.bool,
};

export default AssetsResource;

import React from 'react';
import PropTypes from 'prop-types';
import PublishIcon from '@material-ui/icons/Publish';
import {
  Box, Divider, Button, Typography,
} from '@material-ui/core';
import localization from '../../localization';
import FileBlock from './FileBlock';

const AssetsResource = ({
  resources, setResources, maxPayloadFiles, labelOptions,
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
    const newResource = { label: '', url: '', key: lastKey ? lastKey + 1 : 1 };

    setResources([...resources, newResource]);
  };
  return (
    <>
      <Box width={1} p={2}>
        <Typography variant="body2">
          {localization.t('general.selectFiles')}
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
                  type="file"
                />
              </Box>
              <Divider light />
            </Box>
          ))}
        {(!maxPayloadFiles || resources.length < maxPayloadFiles) && (
          <Box>
            <Button
              startIcon={<PublishIcon />}
              onClick={addItem}
              variant="outlined"
              color="primary"
            >
              {localization.t('general.uploadFiles')}
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
};

export default AssetsResource;

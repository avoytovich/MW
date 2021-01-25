import React from 'react';
import PropTypes from 'prop-types';
import {
  Box, Typography, Divider, Button,
} from '@material-ui/core';
import moment from 'moment';

import localization from '../../../localization';

const MainSection = ({ currentProductData, setProductData }) => (
  <Box display="flex" flexDirection="column">
    <Box mt={3} bgcolor="#fff" boxShadow={2} p={3} mx={2}>
      <Box pb={10}>
        <Typography data-test="productName" gutterBottom variant="h3">
          {currentProductData.genericName}
        </Typography>
        <Divider light />
      </Box>
      <Box display="flex" flexDirection="row" my={7} alignItems="baseline">
        <Box width="30%">
          <Typography color="secondary" gutterBottom variant="body2">
            {localization.t('labels.status')}
          </Typography>
        </Box>
        <Box>
          <Button
            data-test="statusEnabledBtn"
            disabled={currentProductData.status === 'ENABLED'}
            color="primary"
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              setProductData({
                ...currentProductData,
                status: 'ENABLED',
              });
            }}
          >
            {localization.t('labels.enabled')}
          </Button>
          <Button
            data-test="statusDisabledBtn"
            disabled={currentProductData.status === 'DISABLED'}
            color="primary"
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              setProductData({
                ...currentProductData,
                status: 'DISABLED',
              });
            }}
          >
            {localization.t('labels.disabled')}
          </Button>
        </Box>
      </Box>
      <Box display="flex" flexDirection="row" mt={7} alignItems="baseline">
        <Box width="30%">
          <Typography color="secondary" gutterBottom variant="body2">
            {localization.t('labels.lastUpdate')}
          </Typography>
        </Box>
        <Box>
          <Typography color="secondary" gutterBottom variant="body2">
            {moment(currentProductData.updateDate).format('D MMM YYYY')}
          </Typography>
        </Box>
      </Box>
    </Box>
  </Box>
);

MainSection.propTypes = {
  currentProductData: PropTypes.object,
  setProductData: PropTypes.func,
};

export default MainSection;

import React from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Typography,
  Grid,
} from '@mui/material';

import localization from '../../localization';

import StripedRow from './StripedRow';

const StripedDetailSection = ({
  xsValue = 12,
  mdValue = 12,
  sectionsData,
  emptyValue,
}) => (
  <>
    {sectionsData && (
      <Grid container spacing={2} pb={4}>
        {Object.keys(sectionsData).map((key) => (
          <Grid key={key} item md={mdValue} xs={xsValue}>
            <Box bgcolor='#fff' boxShadow={2} height='100%'>
              <Box py={3} pl={2}>
                <Typography gutterBottom variant='h4'>
                  {
                    key === 'user'
                      ? localization.t(`labels.end${key.charAt(0).toUpperCase()}${key.slice(1)}`)
                      : localization.t(`labels.${key}`)
                  }
                </Typography>
              </Box>
              <StripedRow
                emptyValue={emptyValue}
                rowData={sectionsData[key]}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    )}
  </>
);

StripedDetailSection.propTypes = {
  sectionsData: PropTypes.object,
  xsValue: PropTypes.number,
  mdValue: PropTypes.number,
  emptyValue: PropTypes.string,
};
export default StripedDetailSection;

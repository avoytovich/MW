import React from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Typography,
  Grid,
} from '@material-ui/core';

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
      <Grid container spacing={2}>
        {Object.keys(sectionsData).map((key) => (
          <Grid key={key} item md={mdValue} xs={xsValue}>
            <Box my={3} bgcolor='#fff' boxShadow={2} height='100%'>
              <Box py={3} pl={2}>
                <Typography gutterBottom variant='h4'>
                  {localization.t(`labels.${key}`)}
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

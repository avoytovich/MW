/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useHistory } from 'react-router-dom';

import PropTypes from 'prop-types';

import {
  Typography,
  Box,
} from '@material-ui/core';
import localization from '../../../localization';

const CustomBreadcrumbs = ({ sections, url, id = null }) => {
  const filteredSections = [...sections].filter((item) => item !== id);
  const history = useHistory();
  return (
    <Box display='flex' flexDirection='row' pb={2}>
      {filteredSections.map((section, index) => {
        const slash = index !== (filteredSections.length - 1) ? '/' : id ? '/' : '';
        const sectionName = localization.t(`sections.${section}`);
        return (
          <Typography
            key={`${section}_${index}`}
            variant='h5'
            color='primary'
            component='div'
            onClick={() => url && index === (filteredSections.length - 1) && history.push(url)}
          >
            <Box display='flex'>
              <Box
                style={url && index === (filteredSections.length - 1) ? { cursor: 'pointer', textDecorationLine: 'underline', width: 'max-content' } : {}}
              >
                {`${sectionName}`}
              </Box>
              <Box px={0.5}>{`${slash}`}</Box>
            </Box>
          </Typography>
        );
      })}

      <Typography component='div' color='secondary'>
        <Box fontWeight={500}>
          <>&nbsp;</>
          {id}
        </Box>
      </Typography>
    </Box>
  );
};

CustomBreadcrumbs.propTypes = {
  sections: PropTypes.array,
  url: PropTypes.string,
  id: PropTypes.string,
};

export default CustomBreadcrumbs;

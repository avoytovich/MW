/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import {
  Typography,
  Box,
} from '@mui/material';

import { resetSearch } from '../../../redux/actions/TableData';
import localization from '../../../localization';

const CustomBreadcrumbs = ({ sections, url, id = null }) => {
  const dispatch = useDispatch();
  const filteredSections = [...sections].filter((item) => (id ? item !== id && item !== 'add' : item !== id));
  const history = useHistory();
  const tableSearchKeys = useSelector(({ tableData: { search } }) => Object.keys(search));

  if (tableSearchKeys.length && !sections.includes(tableSearchKeys[0])) {
    dispatch(resetSearch());
  }
  return (
    <Box display='flex' flexDirection='row' pb={1}>
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

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import GetAppIcon from '@material-ui/icons/GetApp';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { Grid, Box } from '@material-ui/core';

import localization from '../../localization';

import './stripedDetailSection.scss';

const StripedRow = ({
  rowData,
}) => {
  const makeCopy = (value) => {
    navigator.clipboard.writeText(value)
      .then(() => toast(localization.t('general.itemHasBeenCopied')));
  };

  return rowData.map((item) => (
    <Grid container className="orderDetailsRow" key={item.key}>
      <Grid item md={6} xs={6}>
        <Box p={2} fontWeight={500}>
          {item.label}
        </Box>
      </Grid>
      <Grid item md={6} xs={6}>
        <Box display="flex">
          {!item.link ? (
            <Box p={2} className="rowValue">
              {item.value}
            </Box>
          )
            : (
              <Box p={2} className="rowValue">
                {item.link === 'external'
                  ? (
                    <a href={item.path} target='_blank' rel='noreferrer'>
                      {item.value || '-'}
                    </a>
                  ) : (
                    <Link to={item.path}>
                      {item.value}
                    </Link>
                  )}
              </Box>
            )}
          <Box p={2}>
            {item.downloadFunc && (
              <GetAppIcon onClick={() => item.downloadFunc(item)} color="secondary" />
            )}
            {item.value && item.shouldCopy && (
              <FileCopyIcon
                onClick={() => makeCopy(item.shouldCopy)}
                style={{ marginLeft: '5px' }}
                color="secondary"
                className="copyIcon"
              />
            )}
          </Box>
        </Box>
      </Grid>
    </Grid>
  ));
};
StripedRow.propTypes = {
  rowData: PropTypes.array,
};

export default StripedRow;

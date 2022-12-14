import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import GetAppIcon from '@mui/icons-material/GetApp';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { Grid, Box } from '@mui/material';

import localization from '../../localization';

import './stripedDetailSection.scss';

const StripedRow = ({
  rowData, emptyValue,
}) => {
  const makeCopy = (value) => {
    navigator.clipboard.writeText(value)
      .then(() => toast(localization.t('general.itemHasBeenCopied')));
  };

  return rowData.map((item) => (
    <Grid container className="orderDetailsRow" key={item.label}>
      <Grid item md={6} xs={6}>
        <Box p={2} fontWeight={500}>
          {item.label}
        </Box>
      </Grid>
      <Grid item md={6} xs={6}>
        <Box display="flex">
          {(!item.link || item.value === emptyValue || item.value === localization.t('labels.customerNotFound')) ? (
            <Box p={2} style={item.color ? { color: item.color } : {}}>
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
          {(item.value !== emptyValue && item.value !== localization.t('labels.customerNotFound'))
            && (
              <Box display='flex' p={2}>
                {item.downloadFunc && (
                  <GetAppIcon onClick={() => item.downloadFunc(item)} color="secondary" className='actionIcon' />
                )}
                {item.value && item.shouldCopy && (
                  <FileCopyIcon
                    onClick={() => makeCopy(item.shouldCopy)}
                    style={{ marginLeft: '5px' }}
                    color="secondary"
                    className="actionIcon"
                  />
                )}
              </Box>
            )}
        </Box>
      </Grid>
    </Grid>
  ));
};
StripedRow.propTypes = {
  rowData: PropTypes.array,
  emptyValue: PropTypes.string,
};

export default StripedRow;

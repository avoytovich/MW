import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import {
  Box,
  Typography,
} from '@mui/material';
import { FileCopy as FileCopyIcon } from '@mui/icons-material';
import localization from '../../localization';

import './autoFulfillmentDetails.scss';

const AutoFulfillmentDetailsView = ({
  detailsData,
}) => {
  const makeCopy = (value) => {
    navigator.clipboard.writeText(value)
      .then(() => toast(localization.t('general.itemHasBeenCopied')));
  };

  return (
    <>
      {Object.keys(detailsData).map((key) => (
        <Box display="flex" p={2} flexDirection="row" key={key}>
          <Box pr={2}><Typography>{localization.t(`labels.${key}`)}</Typography></Box>
          <Box pr={2}>
            {key === 'customer' && detailsData[key].path
              ? (
                <Box display="flex" flexDirection="row">
                  <Link to={detailsData[key].path} className='customerLink'>
                    <Typography>{detailsData[key].value}</Typography>
                  </Link>
                  <Typography color='secondary' style={{ paddingLeft: '10px' }}>{`(${detailsData[key].copyValue})`}</Typography>
                </Box>
              ) : <Typography color='secondary'>{detailsData[key].value}</Typography>}

          </Box>
          {detailsData[key].copyValue && (
            <Box>
              <FileCopyIcon
                color='secondary'
                className="copyIcon"
                onClick={() => makeCopy(detailsData[key].copyValue)}
              />
            </Box>
          )}
        </Box>
      ))}
    </>
  );
};

AutoFulfillmentDetailsView.propTypes = {
  detailsData: PropTypes.object,
};
export default AutoFulfillmentDetailsView;

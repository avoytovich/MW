import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import {
  Box,
  Typography,
  Grid,
} from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';

import { toast } from 'react-toastify';

import localization from '../../localization';
import parentPaths from '../../services/paths';
import { structure } from './utils';

import './autoFulfillmentDetails.scss';
import CustomCard from '../../components/utils/CustomCard';

const AutoFulfillmentDetailsView = ({ detailsData, customer }) => {
  const history = useHistory();

  const makeCopy = (value) => {
    navigator.clipboard.writeText(value)
      .then(() => toast(localization.t('general.itemHasBeenCopied')));
  };

  const renderDefault = (each) => (
    <>
      <Grid item md={3} xs={12}>
        <Typography variant='h6'>
          {localization.t(`labels.${each.label}`)}
        </Typography>
      </Grid>
      <Grid item md={9} xs={12}>
        <Box>
          <Typography variant='subtitle1'>
            {each.field}
          </Typography>
        </Box>
      </Grid>
    </>
  );

  const renderId = (each) => (
    <>
      <Grid item md={3} xs={12}>
        <Typography variant='h6'>
          {localization.t(`labels.${each.label}`)}
        </Typography>
      </Grid>
      <Grid item md={9} xs={12}>
        <Box className='fulfillment' display='inline-flex'>
          <Typography variant='subtitle1' className='fulfillment-value'>
            {each.field}
          </Typography>
          <FileCopyIcon
            onClick={() => makeCopy(detailsData?.id)}
            style={{ marginLeft: '5px' }}
            color="secondary"
          />
        </Box>
      </Grid>
    </>
  );

  const renderCustomer = (each) => (
    <>
      <Grid item md={3} xs={12}>
        <Typography variant='h6'>
          {localization.t(`labels.${each.label}`)}
        </Typography>
      </Grid>
      <Grid item md={9} xs={12}>
        <Box className='customer'>
          <Typography variant='subtitle1' className='customer-value-name'>
            {`${each.field}, `}
          </Typography>
          <span
            className="customer-value-id"
            onClick={() => history.push(`${parentPaths.customers}/${customer.id}`)} // ToDo: should be replaced with new customer route
          >
            {customer.id}
          </span>
          <FileCopyIcon
            onClick={() => makeCopy(customer.id)}
            style={{ marginLeft: '5px' }}
            color="secondary"
          />
        </Box>
      </Grid>
    </>
  );

  const renderFields = (each) => {
    switch (each.label) {
      case 'id':
        return renderId(each);
      case 'customer':
        return renderCustomer(each);
      default:
        return renderDefault(each);
    }
  };

  const renderContent = () => (
    structure(detailsData, customer).map((each) => (
      <Grid container spacing={2} key={each.label}>
        {renderFields(each)}
      </Grid>
    ))
  );

  return (
    <>
      {
        detailsData && customer && (
          <CustomCard mt={0}>{renderContent()}</CustomCard>
        )
      }
    </>
  );
};

AutoFulfillmentDetailsView.propTypes = {
  detailsData: PropTypes.object,
  customer: PropTypes.string,
};

export default AutoFulfillmentDetailsView;

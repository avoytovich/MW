import React from 'react';
import {
  Box,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import localization from '../../../localization';
import OrderDetailsTableComponent from '../../../components/TableComponent/OrderDetailsTableComponent';

const Emails = ({ emails }) => (emails ? (
  <Box
    border={1}
    borderRadius="borderRadius"
    borderColor="#c7c7c7"
  >
    <OrderDetailsTableComponent
      showColumn={emails.defaultEmailsShow}
      tableData={emails}
      isLoading={emails === null}
      customPath='disabled'
      errorHighlight='processingError'
      noActions
    />
  </Box>
) : (<Box p={2}><Typography>{localization.t('general.noEmails')}</Typography></Box>));

Emails.propTypes = {
  emails: PropTypes.object,
};

export default Emails;

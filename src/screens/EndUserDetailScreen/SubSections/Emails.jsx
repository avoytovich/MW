import React from 'react';
import {
  Box,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import localization from '../../../localization';
import TableComponent from '../../../components/TableComponent';

const Emails = ({ emails }) => (emails ? (
  <TableComponent
    defaultShowColumn={emails.defaultEmailsShow}
    tableData={emails}
    scope="endUsersEmails"
    noActions
    noTableActionsBar
    noEditDeleteActions
    customPath='disabled'
    errorHighlight='processingError'
  />
) : (<Box p={2}><Typography>{localization.t('general.noEmails')}</Typography></Box>));

Emails.propTypes = {
  emails: PropTypes.object,
};

export default Emails;

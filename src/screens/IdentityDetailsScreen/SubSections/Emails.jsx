import React, { useEffect, useState } from 'react';
import {
  LinearProgress,
  TableContainer,
  Box,
  Typography,
} from '@mui/material';

import PropTypes from 'prop-types';
import localization from '../../../localization';
import TableComponent from '../../../components/TableComponent';
import {
  generateData,
  defaultShow,
} from '../../../services/useData/tableMarkups/emails';

import '../identityDetailsScreen.scss';

const Emails = ({ curIdentity }) => {
  const [emails, setEmails] = useState(null);
  const scope = 'usersEmails';

  useEffect(() => {
    if (curIdentity?.emails) {
      const emailsTableData = generateData(curIdentity.emails);
      setEmails(emailsTableData);
    }
  }, []);

  if (curIdentity === null) return <LinearProgress />;

  return curIdentity.emails ? (
    <TableComponent
      defaultShowColumn={defaultShow}
      tableData={emails}
      scope={scope}
      noActions
      noTableActionsBar
      noEditDeleteActions
      customPath='disabled'
      errorHighlight='processingError'
    />
  ) : (
    <Box textAlign='center'>
      <Typography data-test='noResourcesMatchCriteria'>
        {localization.t('general.noResourcesMatchCriteria')}
      </Typography>
    </Box>
  );
};

Emails.propTypes = {
  curIdentity: PropTypes.object,
};

export default Emails;

import React from 'react';
import PropTypes from 'prop-types';

import { defaultShow } from '../../services/useData/tableMarkups/LicenseDetails';
import StripedDetailSection from '../../components/StripedDetailSection';
import TableComponent from '../../components/TableComponent';
import { emptyValue } from './utils';

const LicenseDetailsView = ({
  license,
  tableData,
  scope,
  curTab,
}) => (
  <>
    {curTab === 0 && (
      <StripedDetailSection
        emptyValue={emptyValue}
        xsValue={12}
        mdValue={4}
        sectionsData={license}
      />
    )}
    {curTab === 1 && (
      <TableComponent
        customPath='disabled'
        defaultShowColumn={defaultShow}
        tableData={tableData}
        scope={scope}
        noActions
        noTableActionsBar
        noEditDeleteActions
      />
    )}

  </>
);

LicenseDetailsView.propTypes = {
  tableData: PropTypes.object,
  license: PropTypes.object,
  scope: PropTypes.string,
  curTab: PropTypes.number,
};
export default LicenseDetailsView;

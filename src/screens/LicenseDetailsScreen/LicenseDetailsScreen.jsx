import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import parentPaths from '../../services/paths';
import DetailPageWrapper from '../../components/utils/DetailPageWrapper';
import localization from '../../localization';
import api from '../../api';
import { generateData } from '../../services/useData/tableMarkups/LicenseDetails';
import LicenseDetailsView from './LicenseDetailsView';
import { generateGeneralData } from './utils';

const LicenseDetailsScreen = () => {
  const scope = 'licensesDetails';

  const { id } = useParams();
  const [license, setLicense] = useState(null);
  const [tableData, settableData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .getLicenseById(id)
      .then(({ data }) => {
        const eventsTableData = generateData(data);
        settableData(eventsTableData);
        generateGeneralData(data).then((res) => {
          setLicense(res);
          setLoading(false);
        });
      }).catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <DetailPageWrapper
      nxStateNotNeeded
      id={id}
      name={`${localization.t('labels.licenseId')} ${id}`}
      isLoading={isLoading}
      curParentPath={parentPaths.licenses}
      curData={license}
      addFunc={null}
      updateFunc={null}
      beforeSend={null}
    >
      <LicenseDetailsView license={license} tableData={tableData} scope={scope} />
    </DetailPageWrapper>
  );
};

export default LicenseDetailsScreen;

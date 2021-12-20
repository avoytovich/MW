// ToDo: consider making a common layout for such type of settings screens
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import DetailPageWrapper from '../../components/utils/DetailPageWrapper';
import api from '../../api';
import localization from '../../localization';
import useCatalogsDetails from '../../services/useData/useCatalogsDetails';
import parentPaths from '../../services/paths';
import CatalogsDetailsView from './CatalogsDetailsView';

const CatalogsDetailsScreen = () => {
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);
  const { id } = useParams();

  const {
    isLoading,
    catalogs,
    curCatalogs,
    hasChanges,
    setCurCatalogs,
    customer,
    setUpdate,
  } = useCatalogsDetails(id, nxState);

  return (
    <DetailPageWrapper
      nxState={nxState}
      id={id}
      name={catalogs?.name || `${localization.t('general.new')} ${localization.t(
        'general.catalog',
      )}`}
      saveIsDisabled={!curCatalogs?.name}
      hasChanges={hasChanges}
      isLoading={isLoading}
      curParentPath={parentPaths.catalogs}
      curData={curCatalogs}
      addFunc={api.addCatalogs}
      updateFunc={api.updateCatalogsById}
      setUpdate={setUpdate}
      noTabsMargin
    >
      <CatalogsDetailsView
        id={catalogs?.id}
        customer={customer}
        curCatalogs={curCatalogs}
        setCurCatalogs={setCurCatalogs}
        catalogs={catalogs}
      />
    </DetailPageWrapper>
  );
};

export default CatalogsDetailsScreen;

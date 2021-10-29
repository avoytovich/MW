import React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import useEndUserDetailScreen from './useEndUserDetailScreen';
import parentPaths from '../../services/paths';
import EndUserDetailView from './EndUserDetailView';
import api from '../../api';
import { removeEmptyPropsInObject } from '../../services/helpers/dataStructuring';
import DetailPageWrapper from '../../components/utils/DetailPageWrapper';

const EndUserDetailScreen = ({ location }) => {
  const scope = location.pathname.split('/endusers/')[1].split('/')[0];
  const curParentPath = scope === 'enduserlist' ? parentPaths.endusers : parentPaths.resellers;
  const { id } = useParams();
  const {
    setUpdate,
    curEndUser,
    setCurEndUser,
    isLoading,
    hasChanges,
    endUser,
    selectOptions,
    orders,
    emails,
    invalidVatNumber,
    setInvalidVatNumber,
    consent,
  } = useEndUserDetailScreen(id);

  return (
    <DetailPageWrapper
      nxStateNotNeeded
      id={id}
      name={endUser?.fullName}
      saveIsDisabled={curEndUser?.firstName === '' || curEndUser?.lastName === ''}
      hasChanges={hasChanges}
      isLoading={isLoading}
      curParentPath={curParentPath}
      curData={curEndUser}
      addFunc={null}
      updateFunc={api.updateEndUser}
      beforeSend={removeEmptyPropsInObject}
      setUpdate={setUpdate}
    >
      <EndUserDetailView
        scope={scope}
        curEndUser={curEndUser}
        setInvalidVatNumber={setInvalidVatNumber}
        invalidVatNumber={invalidVatNumber}
        setCurEndUser={setCurEndUser}
        selectOptions={selectOptions}
        consent={consent}
        orders={orders}
        emails={emails}
      />
    </DetailPageWrapper>
  );
};

EndUserDetailScreen.propTypes = {
  location: PropTypes.object,
};

export default EndUserDetailScreen;

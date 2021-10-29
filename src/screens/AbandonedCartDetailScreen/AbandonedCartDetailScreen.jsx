import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import DetailPageWrapper from '../../components/utils/DetailPageWrapper';
import parentPaths from '../../services/paths';
import { beforeSend } from './utils';
import localization from '../../localization';
import useAbandonedCartDetailScreen from './useAbandonedCartDetailScreen';
import api from '../../api';
import AbandonedCartDetailsView from './AbandonedCartDetailsView';

const AbandonedCartDetailScreen = () => {
  const [hasError, setHasError] = useState(false);

  const { id } = useParams();
  const nxState = useSelector(({ account: { nexwayState } }) => nexwayState);
  const {
    setUpdate,
    curAbandonedCart,
    setCurAbandonedCart,
    isLoading,
    hasChanges,
    abandonedCart,
  } = useAbandonedCartDetailScreen(id, nxState);


  return (
    <DetailPageWrapper
      nxState={nxState}
      id={id}
      name={abandonedCart?.name || `${localization.t('general.new')} ${localization.t(
        'labels.abandonedCart',
      )}`}
      saveIsDisabled={curAbandonedCart?.name === '' || hasError}
      hasChanges={hasChanges}
      isLoading={isLoading}
      curParentPath={parentPaths.campaigns.abandoned}
      curData={curAbandonedCart}
      addFunc={api.addAbandonedCart}
      updateFunc={api.updateAbandonedCart}
      beforeSend={beforeSend}
      setUpdate={setUpdate}
    >
      <AbandonedCartDetailsView
        setCurAbandonedCart={setCurAbandonedCart}
        curAbandonedCart={curAbandonedCart}
        hasError={hasError}
        setHasError={setHasError}
      />
    </DetailPageWrapper>
  );
};

export default AbandonedCartDetailScreen;

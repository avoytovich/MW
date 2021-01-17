import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import JsonEditorLayout from '../../layouts/JsonEditorLayout';

import { showNotification } from '../../redux/actions/HttpNotifications';
import localization from '../../localization';
import api from '../../api';

const LayoutAddScreen = () => {
  const dispatch = useDispatch();

  const { customerId } = useSelector(({ account: { user } }) => user);
  const initData = {
    name: '',
    data: {
      layouts: {},
      pages: [],
      steps: [],
    },
    customerId,
  };

  const [hasChanges, setChanges] = useState(false);
  const [currentLayout, setCurrentLayout] = useState({ ...initData });

  const saveLayout = () => {
    api.addNewLayout(currentLayout).then(() => {
      dispatch(
        showNotification(localization.t('general.updatesHaveBeenSaved')),
      );
      setCurrentLayout({ ...initData });
    });
  };

  useEffect(() => {
    setChanges(JSON.stringify(currentLayout) !== JSON.stringify(initData));

    return () => setChanges(false);
  }, [currentLayout]);

  return (
    <JsonEditorLayout
      customer={customerId}
      hasChanges={hasChanges}
      doSave={saveLayout}
      currentData={currentLayout}
      setCurrentData={setCurrentLayout}
      staticData={initData}
      title='Layout Data'
      isNew
    />
  );
};

export default LayoutAddScreen;

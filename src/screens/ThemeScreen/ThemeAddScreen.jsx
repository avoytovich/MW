import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ThemeLayout from './ThemeLayout';
import localization from '../../localization';
import { showNotification } from '../../redux/actions/HttpNotifications';
import api from '../../api';

const newTheme = {
  customerId: 'Nexway',
  data: '',
  name: '',
};
const ThemeAddScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [currentTheme, setCurrentTheme] = useState(newTheme);
  const disabled = currentTheme.data === ''
  || currentTheme.name === '';

  const saveTheme = () => {
    api.addNewTheme(currentTheme).then((res) => {
      const location = res.headers.location.split('/');
      const id = location[location.length - 1];
      dispatch(
        showNotification(localization.t('general.updatesHaveBeenSaved')),
      );
      history.push(`/checkout-experience/themes/${id}`);
    });
  };

  return (
    <ThemeLayout
      customer="Nexway"
      disabled={disabled}
      hasChanges
      saveTheme={saveTheme}
      currentTheme={currentTheme}
      setCurrentTheme={setCurrentTheme}
    />
  );
};

export default ThemeAddScreen;

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import ThemeLayout from './ThemeLayout';
import localization from '../../localization';
import api from '../../api';
import parentPaths from '../../services/paths';

const newTheme = {
  customerId: 'Nexway',
  data: '',
  name: '',
};
const ThemeAddScreen = () => {
  const history = useHistory();
  const [currentTheme, setCurrentTheme] = useState(newTheme);
  const disabled = currentTheme.data === ''
  || currentTheme.name === '';

  const saveTheme = () => {
    api.addNewTheme(currentTheme).then((res) => {
      const location = res.headers.location.split('/');
      const id = location[location.length - 1];
      toast(localization.t('general.updatesHaveBeenSaved'));
      history.push(`${parentPaths.checkoutpagebuilder}/themes/${id}`);
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

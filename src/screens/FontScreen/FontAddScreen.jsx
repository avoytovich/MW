import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import FontLayout from './FontLayout';
import localization from '../../localization';
import api from '../../api';
import parentPaths from '../../services/paths';

const newFont = {
  customerId: 'Nexway',
  data: { font: '', fontFamily: '' },
  name: '',
};
const FontAddScreen = () => {
  const history = useHistory();
  const [currentFont, setCurrentFont] = useState(newFont);
  const disabled = currentFont.data.font === ''
    || currentFont.data.fontFamily === ''
    || currentFont.name === '';

  const saveFont = () => {
    api.addNewFont(currentFont).then((res) => {
      const location = res.headers.location.split('/');
      const id = location[location.length - 1];
      toast(localization.t('general.updatesHaveBeenSaved'));
      history.push(`${parentPaths.checkoutpagebuilder.fontsTab}/${id}`);
    });
  };

  return (
    <FontLayout
      customer="Nexway"
      disabled={disabled}
      hasChanges
      saveFont={saveFont}
      currentFont={currentFont}
      setCurrentFont={setCurrentFont}
    />
  );
};

export default FontAddScreen;

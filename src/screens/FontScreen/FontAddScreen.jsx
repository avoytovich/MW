import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import FontLayout from './FontLayout';
import localization from '../../localization';
import { showNotification } from '../../redux/actions/HttpNotifications';
import api from '../../api';

const newFont = {
  customerId: 'Nexway',
  data: { font: '', fontFamily: '' },
  name: '',
};
const FontAddScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [currentFont, setCurrentFont] = useState(newFont);
  const disabled = currentFont.data.font === ''
    || currentFont.data.fontFamily === ''
    || currentFont.name === '';

  const saveFont = () => {
    api.addNewFont(currentFont).then((res) => {
      const location = res.headers.location.split('/');
      const id = location[location.length - 1];
      dispatch(
        showNotification(localization.t('general.updatesHaveBeenSaved')),
      );
      history.push(`/checkout-experience/fonts/${id}`);
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

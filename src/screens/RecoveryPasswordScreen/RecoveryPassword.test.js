import React from 'react';
import { mount } from 'enzyme';

import RecoveryPassword from './RecoveryPassword';
import { Button } from '@mui/material';
import { Formik } from 'formik';

describe('email', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<RecoveryPassword/>);
  });

  it('should have a <Formik />', () => {
    expect(wrapper.find(Formik)).toHaveLength(1);
  });

  it('should have input for email', () => {
      expect(wrapper.find('input[name="email"]').exists()).toBeTruthy();
  });

  it('should have button', () => {
      expect(wrapper.find(Button)).toHaveLength(1);
  });
})

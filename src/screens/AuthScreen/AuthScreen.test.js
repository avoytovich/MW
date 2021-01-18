import React from 'react';
import { shallow } from 'enzyme';

import AuthScreen from './AuthScreen';
import LoginForm from '../../components/LoginForm';

describe('<AuthScreen />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<AuthScreen />);
  });

  it('should have a <LoginForm />', () => {
    expect(wrapper.find(LoginForm)).toHaveLength(1);
  });
});

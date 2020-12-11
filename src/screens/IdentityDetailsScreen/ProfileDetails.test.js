import React from 'react';
import { mount } from 'enzyme';

import ProfileDetails from './ProfileDetails';
import CustomCard from '../../components/utils/CustomCard';

let testIdentity = {
  firstName: 'test-first-name',
  lastName: 'test-last-name',
  email: 'test-email',
  userName: 'test-user-name',
  inactive: true,
};

describe('<ProfileDetails />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<ProfileDetails identity={testIdentity} />);
  });

  it('should have two <CustomCard />', () => {
    expect(wrapper.find(CustomCard)).toHaveLength(2);
  });

  it('should have identity details populated to form elements', () => {
    const { firstName, lastName, email, userName, inactive } = testIdentity;

    expect(wrapper.find('input[name="firstName"]').instance().value).toEqual(firstName);
    expect(wrapper.find('input[name="lastName"]').instance().value).toEqual(lastName);
    expect(wrapper.find('input[name="email"]').instance().value).toEqual(email);
    expect(wrapper.find('input[name="userName"]').instance().value).toEqual(userName);
    expect(wrapper.find('input[name="status"]').instance().checked).toEqual(!inactive);
  });

  it('should change identity when some update is made', async() => {
    wrapper.setProps({ changeIdentity: (newIdentity) => { testIdentity = newIdentity; } });
    
    const newValue = 'another-value';
    wrapper.find('input[name="firstName"]').simulate('change', {
      target: { name: 'firstName', value: newValue }
    });

    expect(testIdentity.firstName).toEqual(newValue);
  });
});

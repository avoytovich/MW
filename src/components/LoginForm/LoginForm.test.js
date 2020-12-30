import React from 'react';
import { mount } from 'enzyme';
import LoginForm from './LoginForm';

jest.mock('react-redux', () => ({ useDispatch: jest.fn() }));

let initial = {
  username: '',
  password: '',
};

describe('email', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<LoginForm initialValues={initial}/>);
  });

  it('should have a <Formik />', () => {
    expect(wrapper.find('.formik')).toHaveLength(1);
  });

  it('should have username input', () => {
    expect(wrapper.find('input[name="username"]').exists()).toBeTruthy()
  });

  it('should have username input', () => {
    expect(wrapper.find('input[name="password"]').exists()).toBeTruthy()
  });

  it('should change username input', () => {
    wrapper.find('input[name="username"]').at(0).simulate('change', { target: { name: 'username', value: 'test-username' } });
    expect(wrapper.find('input[name="username"]').instance().value).toEqual(
      'test-username',
    );
  });

  it('should change password input', () => {
    wrapper.find('input[name="password"]').at(0).simulate('change', { target: { name: 'password', value: 'test-password' } });
    expect(wrapper.find('input[name="password"]').instance().value).toEqual(
      'test-password',
    );
  });

})

import React from 'react';
import { Tab } from '@material-ui/core';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import IdentityDetailsScreen from './IdentityDetailsScreen';
import ProfileDetails from './ProfileDetails';
import RightsDetails from './RightsDetails';
import api from '../../api';

jest.mock('react-redux', () => ({ useDispatch: jest.fn() }));
jest.mock('react-router-dom', () => ({ useParams: jest.fn(() => ({ id: 'test-id' })) }));

jest.mock('../../api', () => ({
  getIdentityById: jest.fn(),
  updateIdentityById: jest.fn(),
}));

jest.mock('../../services/useData', () => ({
  ...jest.requireActual('../../services/useData'),
  usePrivilegesData: jest.fn(),
  useRolesData: jest.fn(),
  useMetaRolesData: jest.fn(),
}));

describe('<IdentityDetailsScreen />', () => {
  let wrapper;

  beforeEach(async () => {
    await act(async() => {
      wrapper = mount(<IdentityDetailsScreen />);
    });
    
    wrapper.update();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should fetch identity by ID from params', () => {
    expect(api.getIdentityById).toHaveBeenCalledTimes(1);
    expect(api.getIdentityById).toHaveBeenCalledWith('test-id');
  });

  it('should have two tabs with Profile and Rights', () => {
    expect(wrapper.find(Tab)).toHaveLength(2);
    expect(wrapper.find(Tab).first().text()).toEqual('Profile');
    expect(wrapper.find(Tab).last().text()).toEqual('Rights');
  });

  it('should show <ProfileDetails /> if Profile tab is active', () => {
    expect(wrapper.find(Tab).first().getDOMNode().attributes.getNamedItem('aria-selected').value).toEqual('true');
    expect(wrapper.find(Tab).last().getDOMNode().attributes.getNamedItem('aria-selected').value).toEqual('false');
    expect(wrapper.find(ProfileDetails)).toHaveLength(1);
    expect(wrapper.find(RightsDetails)).toHaveLength(0);
  });

  it('should show <RightsDetails /> if Rights tab is active', () => {
    wrapper.find(Tab).last().simulate('click');
    
    expect(wrapper.find(Tab).first().getDOMNode().attributes.getNamedItem('aria-selected').value).toEqual('false');
    expect(wrapper.find(Tab).last().getDOMNode().attributes.getNamedItem('aria-selected').value).toEqual('true');
    expect(wrapper.find(ProfileDetails)).toHaveLength(0);
    expect(wrapper.find(RightsDetails)).toHaveLength(1);
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import { LinearProgress } from '@material-ui/core';
import Permissions from './Permissions';

describe('IdentityDetailsScreen <Permissions/>', () => {
  let wrapper;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('if curIdentity = null should return <LinearProgress/>', () => {
    wrapper = shallow(
      <Permissions
        selectOptions={{}}
        curIdentity={null}
        setCurIdentity={jest.fn()}
      />,
    );
    expect(wrapper.contains(<LinearProgress />)).toBe(true)
  });

  it('if curIdentity exist should return 3 inputs ', () => {
    wrapper = shallow(
      <Permissions
        selectOptions={{}}
        curIdentity={{}}
        setCurIdentity={jest.fn()}
      />,
    );
    expect(wrapper.find({ 'data-test': "managedCustomers" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "roles" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "metaRoles" }).length).toEqual(1)
  });
});

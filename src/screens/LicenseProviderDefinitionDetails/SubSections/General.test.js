import React from 'react';
import { shallow } from 'enzyme';
import General from './General';

describe('LicenseProviderDefinitionDetails <General/>', () => {
  let wrapper;

  it('should return all inputs ', () => {
    wrapper = shallow(
      <General
        curLicenseProvider={{}}
        setCurLicenseProvider={jest.fn()}
      />,
    );
    expect(wrapper.find({ 'data-test': "name" }).length).toEqual(1);
    expect(wrapper.find({ 'data-test': "status" }).length).toEqual(1);
    expect(wrapper.find({ 'data-test': "baseUrl" }).length).toEqual(1);
    expect(wrapper.find({ 'data-test': "format" }).length).toEqual(1);
    jest.clearAllMocks();

  });


});

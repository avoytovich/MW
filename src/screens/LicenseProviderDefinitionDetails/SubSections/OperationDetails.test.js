import React from 'react';
import { shallow } from 'enzyme';
import OperationDetails from './OperationDetails';
import { defaultObject } from '../utils'

describe('LicenseProviderDefinitionDetails <OperationDetails/>', () => {
  let wrapper;
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should return all inputs ', () => {
    wrapper = shallow(
      <OperationDetails
        curLicenseProvider={defaultObject}
        setCurLicenseProvider={jest.fn()}
      />,
    );
    expect(wrapper.find({ 'data-test': "urlComplement" }).length).toEqual(1);
    expect(wrapper.find({ 'data-test': "bodyTemplate" }).length).toEqual(1);
    expect(wrapper.find({ 'data-test': "contentType" }).length).toEqual(1);
    expect(wrapper.find({ 'data-test': "errorStatusCodesOnePerLine" }).length).toEqual(1);
    expect(wrapper.find({ 'data-test': "activationCode" }).length).toEqual(1);
    expect(wrapper.find({ 'data-test': "conversionTemplate" }).length).toEqual(1);
    expect(wrapper.find({ 'data-test': "downloadExpireDate" }).length).toEqual(1);
    expect(wrapper.find({ 'data-test': "downloadUrl" }).length).toEqual(1);
    expect(wrapper.find({ 'data-test': "errorMessage" }).length).toEqual(1);

  });

  it('should not return activationCode,conversionTemplate,downloadUrl,errorMessage and  downloadExpireDate inputs if bodyType === json', () => {
    wrapper = shallow(
      <OperationDetails
        curLicenseProvider={{ ...defaultObject, bodyType: 'json' }}
        setCurLicenseProvider={jest.fn()}
      />,
    );
    expect(wrapper.find({ 'data-test': "activationCode" }).length).toEqual(0);
    expect(wrapper.find({ 'data-test': "conversionTemplate" }).length).toEqual(0);
    expect(wrapper.find({ 'data-test': "downloadUrl" }).length).toEqual(0);
    expect(wrapper.find({ 'data-test': "errorMessage" }).length).toEqual(0);
    expect(wrapper.find({ 'data-test': "downloadExpireDate" }).length).toEqual(0);

  });

});

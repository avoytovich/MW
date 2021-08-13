import React from 'react';
import { shallow } from 'enzyme';
import HTTPConfiguration from './HTTPConfiguration';
import { defaultObject } from '../utils'
describe('LicenseProviderDefinitionDetails <HTTPConfiguration/>', () => {
  let wrapper;
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should return all inputs ', () => {
    wrapper = shallow(
      <HTTPConfiguration
        curLicenseProvider={defaultObject}
        setCurLicenseProvider={jest.fn()}
      />,
    );
    expect(wrapper.find({ 'data-test': "contentTypeOneByLine" }).length).toEqual(1);
    expect(wrapper.find({ 'data-test': "versionOneByLine" }).length).toEqual(1);
    expect(wrapper.find({ 'data-test': "tlsAuthMode" }).length).toEqual(1);
    expect(wrapper.find({ 'data-test': "clientId" }).length).toEqual(1);
    expect(wrapper.find({ 'data-test': "clientSecret" }).length).toEqual(1);
    expect(wrapper.find({ 'data-test': "tokenUrl" }).length).toEqual(1);
    expect(wrapper.find({ 'data-test': "scopesOneByLine" }).length).toEqual(1);
  });

  it('should return caCertificate,privateKey and  clientCertificates inputs if tlsAuthMode === client', () => {
    wrapper = shallow(
      <HTTPConfiguration
        curLicenseProvider={{ ...defaultObject, httpClientConfiguration: { ...defaultObject.httpClientConfiguration, tlsConfiguration: { tlsAuthMode: 'client' } } }}
        setCurLicenseProvider={jest.fn()}
      />,
    );
    expect(wrapper.find({ 'data-test': "caCertificate" }).length).toEqual(1);
    expect(wrapper.find({ 'data-test': "privateKey" }).length).toEqual(1);
    expect(wrapper.find({ 'data-test': "clientCertificates" }).length).toEqual(1);

  });
  it('should not return caCertificate,privateKey and  clientCertificates inputs if tlsAuthMode === none', () => {
    wrapper = shallow(
      <HTTPConfiguration
        curLicenseProvider={{ ...defaultObject, httpClientConfiguration: { ...defaultObject.httpClientConfiguration, tlsConfiguration: { tlsAuthMode: 'none' } } }}
        setCurLicenseProvider={jest.fn()}
      />,
    );
    expect(wrapper.find({ 'data-test': "caCertificate" }).length).toEqual(0);
    expect(wrapper.find({ 'data-test': "privateKey" }).length).toEqual(0);
    expect(wrapper.find({ 'data-test': "clientCertificates" }).length).toEqual(0);

  });
  it('should return caCertificate and privateKey but not clientCertificates input if tlsAuthMode === server', () => {
    wrapper = shallow(
      <HTTPConfiguration
        curLicenseProvider={{ ...defaultObject, httpClientConfiguration: { ...defaultObject.httpClientConfiguration, tlsConfiguration: { tlsAuthMode: 'server' } } }}
        setCurLicenseProvider={jest.fn()}
      />,
    );
    expect(wrapper.find({ 'data-test': "caCertificate" }).length).toEqual(1);
    expect(wrapper.find({ 'data-test': "privateKey" }).length).toEqual(1);
    expect(wrapper.find({ 'data-test': "clientCertificates" }).length).toEqual(0);

  });
});

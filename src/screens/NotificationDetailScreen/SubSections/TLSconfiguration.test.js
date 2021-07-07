import React from 'react';
import { shallow } from 'enzyme';
import TLSconfiguration from './TLSconfiguration';

describe('NotificationDetailScreen <TLSconfiguration/>', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('If tlsAuthMode equal "none" only tlsAuthMode should be on the page ', () => {
    let wrapper = shallow(
      <TLSconfiguration
        curNotification={{ httpClientConfiguration: { tlsConfiguration: { tlsAuthMode: 'none' } } }}
        setCurNotification={jest.fn()}
      />,
    );
    expect(wrapper.find({ 'data-test': "clientCertificates" }).length).toEqual(0)
    expect(wrapper.find({ 'data-test': "tlsAuthMode" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "privateKey" }).length).toEqual(0)
    expect(wrapper.find({ 'data-test': "cACertificate" }).length).toEqual(0)

  });

  it('If tlsAuthMode equal "client" clientCertificates should be on the page ', () => {
    let wrapper = shallow(
      <TLSconfiguration
        curNotification={{ httpClientConfiguration: { tlsConfiguration: { tlsAuthMode: 'client' } } }}
        setCurNotification={jest.fn()}
      />,
    );
    expect(wrapper.find({ 'data-test': "tlsAuthMode" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "privateKey" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "cACertificate" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "clientCertificates" }).length).toEqual(1)
  });

  it('If tlsAuthMode not equal "none" privateKey and cACertificate inputs should be on the page ', () => {
    let wrapper = shallow(
      <TLSconfiguration
        curNotification={{ httpClientConfiguration: { tlsConfiguration: { tlsAuthMode: 'server' } } }}
        setCurNotification={jest.fn()}
      />,
    );
    expect(wrapper.find({ 'data-test': "clientCertificates" }).length).toEqual(0)
    expect(wrapper.find({ 'data-test': "tlsAuthMode" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "privateKey" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "cACertificate" }).length).toEqual(1)

  });
});

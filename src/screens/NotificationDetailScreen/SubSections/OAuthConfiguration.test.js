import React from 'react';
import { shallow } from 'enzyme';
import OAuthConfiguration from './OAuthConfiguration';

describe('NotificationDetailScreen <OAuthConfiguration/>', () => {
  it('should return all inputs', () => {
    let wrapper = shallow(
      <OAuthConfiguration
        curNotification={{ httpClientConfiguration: { clientCredentialOauth2Config: { scopes: [] } } }}
        setCurNotification={jest.fn()}
      />,
    );
    expect(wrapper.find({ 'data-test': "clientID" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "clientSecret" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "tokenURL" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "scopesOneByLine" }).length).toEqual(1)
    jest.clearAllMocks();
  });
});

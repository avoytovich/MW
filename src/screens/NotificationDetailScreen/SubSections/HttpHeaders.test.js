import React from 'react';
import { shallow } from 'enzyme';
import HttpHeaders from './HttpHeaders';

describe('NotificationDetailScreen <HttpHeaders/>', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <HttpHeaders
        curNotification={{ httpClientConfiguration: { httpHeaders: { Version: [], 'Content-Type': [] } } }}
        setCurNotification={jest.fn()}
      />,
    );
  })
  it('should return all inputs', () => {
    expect(wrapper.find({ 'data-test': "versionOneByLine" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "contentTypeOneByLine" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "url" }).length).toEqual(1)
    jest.clearAllMocks();
  });
});

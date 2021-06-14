import React from 'react';
import { shallow } from 'enzyme';
import General from './General';

describe('IdentityDetailsScreen <General/>', () => {
  let wrapper;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('if curIdentity.id exist should return all inputs ', () => {
    wrapper = shallow(
      <General
        curIdentity={{ id: 1 }}
        setCurIdentity={jest.fn()}
        identityType=''
        setIdentityType={(newType) => {
          wrapper.setProps({ identityType: newType });
        }}
      />,
    );
    expect(wrapper.find({ 'data-test': "status" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "type" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "contactEmailAddress" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "createDate" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "updateDate" }).length).toEqual(1)
  });

  it('if curIdentity.id does not exist should return type and contactEmailAddress inputs  ', () => {
    wrapper = shallow(
      <General
        curIdentity={{}}
        setCurIdentity={jest.fn()}
        identityType=''
        setIdentityType={(newType) => {
          identityType = newType;
          wrapper.setProps({ identityType: newType });
        }}
      />,
    );
    expect(wrapper.find({ 'data-test': "type" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "contactEmailAddress" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "status" }).length).toEqual(0)
    expect(wrapper.find({ 'data-test': "createDate" }).length).toEqual(0)
    expect(wrapper.find({ 'data-test': "updateDate" }).length).toEqual(0)
  });

  it('if curIdentity.id exist FormControl labels user and application should be disabled', () => {
    wrapper = shallow(
      <General
        curIdentity={{ id: 1 }}
        setCurIdentity={jest.fn()}
        identityType=''
        setIdentityType={(newType) => {
          identityType = newType;
          wrapper.setProps({ identityType: newType });
        }}
      />,
    );
    expect(wrapper.find({ 'data-test': "user" }).props().disabled).toEqual(true)
    expect(wrapper.find({ 'data-test': "application" }).props().disabled).toEqual(true)
  });

  it('if curIdentity.id not exist FormControl labels user and application should be enabled', () => {
    wrapper = shallow(
      <General
        curIdentity={{}}
        setCurIdentity={jest.fn()}
        identityType=''
        setIdentityType={(newType) => {
          identityType = newType;
          wrapper.setProps({ identityType: newType });
        }}
      />,
    );
    expect(wrapper.find({ 'data-test': "user" }).props().disabled).toEqual(false)
    expect(wrapper.find({ 'data-test': "application" }).props().disabled).toEqual(false)
  });
});

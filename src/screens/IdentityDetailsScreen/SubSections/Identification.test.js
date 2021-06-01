import React from 'react';
import { shallow } from 'enzyme';
import { LinearProgress } from '@material-ui/core';
import SecretKeysTable from './SecretKeysTable';

import Identification from './Identification';

describe('DiscountDetailsScreen <Identification/>', () => {
  let wrapper;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('if curIdentity = null should return <LinearProgress/>', () => {
    wrapper = shallow(
      <Identification
        curIdentity={null}
        setCurIdentity={jest.fn()}
        identityType=''
        addSecretKey={jest.fn()}
        removeSecretKey={jest.fn()}
      />,
    );
    expect(wrapper.contains(<LinearProgress />)).toBe(true)
  });

  it('if identityType = user should return userName, firstName and lastName inputs  ', () => {
    wrapper = shallow(
      <Identification
        curIdentity={{}}
        setCurIdentity={jest.fn()}
        identityType='user'
        addSecretKey={jest.fn()}
        removeSecretKey={jest.fn()}
      />,
    );
    expect(wrapper.find({ 'data-test': "userName" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "firstName" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "lastName" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "addSecretButton" }).length).toEqual(0)
    expect(wrapper.contains(<SecretKeysTable />)).toBe(false)
  });
  describe('If identityType = application', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('if curIdentity.id exist and urIdentity.secretKeys.length = 0  should return clientId, addSecretButton', () => {
      wrapper = shallow(
        <Identification
          curIdentity={{ id: 1, secretKeys: [] }}
          setCurIdentity={jest.fn()}
          identityType='application'
          addSecretKey={jest.fn()}
          removeSecretKey={jest.fn()}
        />,
      );
      expect(wrapper.find({ 'data-test': "clientId" }).length).toEqual(1)
      expect(wrapper.find({ 'data-test': "addSecretButton" }).length).toEqual(1)
      expect(wrapper.find({ 'data-test': "lastName" }).length).toEqual(0)
      expect(wrapper.find({ 'data-test': "userName" }).length).toEqual(0)
      expect(wrapper.find({ 'data-test': "firstName" }).length).toEqual(0)
      expect(wrapper.find(SecretKeysTable)).toHaveLength(0);
    });
    it('if curIdentity.id exist and curIdentity.secretKeys.length > 0  should return clientId, addSecretButton and SecretKeysTable', () => {
      wrapper = shallow(
        <Identification
          curIdentity={{ id: 1, secretKeys: [1] }}
          setCurIdentity={jest.fn()}
          identityType='application'
          addSecretKey={jest.fn()}
          removeSecretKey={jest.fn()}
        />,
      );
      expect(wrapper.find({ 'data-test': "clientId" }).length).toEqual(1)
      expect(wrapper.find({ 'data-test': "addSecretButton" }).length).toEqual(1)
      expect(wrapper.find(SecretKeysTable)).toHaveLength(1);
      expect(wrapper.find({ 'data-test': "lastName" }).length).toEqual(0)
      expect(wrapper.find({ 'data-test': "userName" }).length).toEqual(0)
      expect(wrapper.find({ 'data-test': "firstName" }).length).toEqual(0)
    });
  })
});

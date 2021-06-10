import React from 'react';
import { shallow } from 'enzyme';
import localization from '../../../localization';
import { formattedCreateDates, testDate } from '../../../../__mocks__/fileMock';
import SecretKeysTable from './SecretKeysTable';
const secrets = [{
  createDate: testDate,
  secret: 'secret',
}]
const tableHeaders = [
  localization.t('labels.secretKey'),
  localization.t('labels.createDate'),
  localization.t('labels.deleteSecretKey')
];

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('IdentityDetailsScreen <SecretKeysTable/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <SecretKeysTable
        curIdentity={{
          secretKeys: secrets
        }}
      />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should draw correct number of rows and cells', () => {
    expect(wrapper.find({ 'data-test': "tableHeader" }).length).toEqual(tableHeaders.length)
    expect(wrapper.find({ 'data-test': "tableRow" }).length).toEqual(secrets.length)
  });

  it('Should draw correct data ', () => {
    wrapper = shallow(
      <SecretKeysTable
        curIdentity={{
          secretKeys: secrets
        }}
      />
    );
    wrapper.find({ 'data-test': "tableHeader" }).forEach((tableHeader, index) =>
      expect(tableHeader.text()).toEqual(tableHeaders[index])
    )
    wrapper.find({ 'data-test': "secretCell" }).forEach((item, index) =>
      expect(item.text()).toEqual(secrets[index].secret)
    )
    wrapper.find({ 'data-test': "createDateCell" }).forEach((item, index) =>
      expect(item.text()).toEqual(formattedCreateDates[secrets[index].createDate])
    )
    expect(wrapper.find({ 'data-test': "clearIconCell" }).length).toEqual(secrets.length)
  });
});

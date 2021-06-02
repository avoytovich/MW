import React from 'react';
import { shallow } from 'enzyme';
import { LinearProgress, TableContainer } from '@material-ui/core';
import { formattedCreateDates } from '../../../../__mocks__/fileMock';
import localization from '../../../localization';

import Emails from './Emails';
const tableHeaders = [
  localization.t('labels.id'),
  localization.t('labels.emailId'),
  localization.t('labels.createDate'),
  localization.t('labels.type')
];
const emails = [{
  createDate: 1613120768811,
  emailId: 'emailId',
  id: 'id',
  type: 'type'
}]
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('IdentityDetailsScreen <Emails/>', () => {
  let wrapper;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('if curIdentity = null should return <LinearProgress/>', () => {
    wrapper = shallow(
      <Emails
        curIdentity={null}
      />
    );
    expect(wrapper.contains(<LinearProgress />)).toBe(true)
    expect(wrapper.find(TableContainer)).toHaveLength(0);
  });

  it('if curIdentity exist  but curIdentity.emails is not should return noResourcesMatchCriteria notification ', () => {
    wrapper = shallow(
      <Emails
        curIdentity={{}}
      />
    );
    expect(wrapper.find({ 'data-test': "noResourcesMatchCriteria" }).length).toEqual(1)
    expect(wrapper.find(TableContainer)).toHaveLength(0);
  });

  it('if curIdentity and curIdentity.emails exist should return TableContainer ', () => {
    wrapper = shallow(
      <Emails
        curIdentity={{
          emails: []
        }}
      />
    );
    expect(wrapper.find(TableContainer)).toHaveLength(1);
  });
  it('Table should draw correct data ', () => {
    wrapper = shallow(
      <Emails
        curIdentity={{
          emails: emails
        }}
      />
    );
    expect(wrapper.find({ 'data-test': "tableHeader" }).length).toEqual(tableHeaders.length)
    expect(wrapper.find({ 'data-test': "tableRow" }).length).toEqual(emails.length)
    wrapper.find({ 'data-test': "tableHeader" }).forEach((tableHeader, index) =>
      expect(tableHeader.text()).toEqual(tableHeaders[index])
    )
    wrapper.find({ 'data-test': "idCell" }).forEach((item, index) =>
      expect(item.text()).toEqual(emails[index].id)
    )
    wrapper.find({ 'data-test': "emailIdCell" }).forEach((item, index) =>
      expect(item.text()).toEqual(emails[index].emailId)
    )
    wrapper.find({ 'data-test': "typeCell" }).forEach((item, index) =>
      expect(item.text()).toEqual(emails[index].type)
    )
    wrapper.find({ 'data-test': "createDateCell" }).forEach((item, index) =>
      expect(item.text()).toEqual(formattedCreateDates[emails[index].createDate])
    )
  });
});

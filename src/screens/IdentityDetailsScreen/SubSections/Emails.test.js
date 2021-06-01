import React from 'react';
import { shallow } from 'enzyme';
import { LinearProgress, TableContainer } from '@material-ui/core';
import Emails from './Emails';
const emails = [{
  createDate: 1613120768811,
  emailId: 'emailId',
  id: 'id',
  type: 'type'
}]
const formattedDate = '2021/02/12 11:06 (+02:00)';
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('DiscountDetailsScreen <Emails/>', () => {
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
    expect(wrapper.find({ 'data-test': "tableHeader" }).length).toEqual(4)
    expect(wrapper.find({ 'data-test': "tableRow" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "idCell" }).text()).toEqual(emails[0].id);
    expect(wrapper.find({ 'data-test': "emailIdCell" }).text()).toEqual(emails[0].emailId);
    expect(wrapper.find({ 'data-test': "createDateCell" }).text()).toEqual(formattedDate);
    expect(wrapper.find({ 'data-test': "typeCell" }).text()).toEqual(emails[0].type);


  });
});

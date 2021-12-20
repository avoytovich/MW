import React from 'react';
import { shallow } from 'enzyme';
import General from './General';
import { LinearProgress } from '@mui/material';
import { formattedCreateDates, testDate } from '../../../../../__mocks__/fileMock';

const curRole = { createDate: testDate, updateDate: testDate, lastUpdateReason: 'lastUpdateReason' }
describe('RoleDetailScreen <General/>', () => {
  let wrapper;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return LinearProgress if curRole is null ', () => {
    wrapper = shallow(
      <General
        curRole={null}
        setCurRole={jest.fn()}
      />,
    );
    expect(wrapper.contains(<LinearProgress />)).toBe(true)
  });

  it('if curIdentity.id exist should return all inputs', () => {
    wrapper = shallow(
      <General
        curRole={curRole}
        setCurRole={jest.fn()}
      />,
    );
    expect(wrapper.find({ 'data-test': "createDate" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "updateDate" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "lastUpdateReason" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "name" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "description" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "reasonForCurrentChange" }).length).toEqual(1)

  });

  it('createDate and updateDate should be formatted', () => {
    wrapper = shallow(
      <General
        curRole={curRole}
        setCurRole={jest.fn()}
      />,
    );
    expect(wrapper.find({ 'data-test': "createDate" }).text()).toEqual(formattedCreateDates[curRole.createDate])
    expect(wrapper.find({ 'data-test': "updateDate" }).text()).toEqual(formattedCreateDates[curRole.updateDate])

  });

  it('Should not draw lastUpdateReason if curRole.lastUpdateReason not exist', () => {
    wrapper = shallow(
      <General
        curRole={{ createDate: testDate, updateDate: testDate }}
        setCurRole={jest.fn()}
      />,
    );
    expect(wrapper.find({ 'data-test': "lastUpdateReason" }).length).toEqual(0)
  });


});

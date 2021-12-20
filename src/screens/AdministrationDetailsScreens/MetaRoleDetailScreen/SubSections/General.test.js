import React from 'react';
import { shallow } from 'enzyme';
import General from './General';
import { LinearProgress } from '@mui/material';
import { formattedCreateDates, testDate } from '../../../../../__mocks__/fileMock';

const curMetaRole = {
  createDate: testDate,
  updateDate: testDate,
  lastUpdateReason: 'lastUpdateReason',
}

describe('MetaRoleDetailScreen <General/>', () => {
  let wrapper;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return LinearProgress if curMetaRole is null ', () => {
    wrapper = shallow(
      <General
        curMetaRole={null}
        setCurMetaRole={jest.fn()}
      />,
    );
    expect(wrapper.contains(<LinearProgress />)).toBe(true)
  });

  it(' should return all inputs', () => {
    wrapper = shallow(
      <General
        curMetaRole={curMetaRole}
        setCurMetaRole={jest.fn()}
      />,
    );
    expect(wrapper.find({ 'data-test': "createDate" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "updateDate" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "lastUpdateReason" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "name" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "reasonForCurrentChange" }).length).toEqual(1)
  });

  it('createDate and updateDate should be formatted', () => {
    wrapper = shallow(
      <General
        curMetaRole={curMetaRole}
        setCurMetaRole={jest.fn()}
      />,
    );
    expect(wrapper.find({ 'data-test': "createDate" }).text()).toEqual(formattedCreateDates[curMetaRole.createDate])
    expect(wrapper.find({ 'data-test': "updateDate" }).text()).toEqual(formattedCreateDates[curMetaRole.updateDate])
  });

  it('Should not draw lastUpdateReason if curMetaRole.lastUpdateReason not exist', () => {
    wrapper = shallow(
      <General
        curMetaRole={{ createDate: testDate, updateDate: testDate }}
        setCurMetaRole={jest.fn()}
      />,
    );
    expect(wrapper.find({ 'data-test': "lastUpdateReason" }).length).toEqual(0)
  });
});

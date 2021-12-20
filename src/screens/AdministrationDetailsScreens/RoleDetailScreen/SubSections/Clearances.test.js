import React from 'react';
import { shallow } from 'enzyme';
import Clearances from './Clearances';
import { LinearProgress } from '@mui/material';
import { testDate } from '../../../../../__mocks__/fileMock';
import ClearancesInputs from './ClearancesInputs';

const curRole = { createDate: testDate, updateDate: testDate, lastUpdateReason: 'lastUpdateReason' }
describe('RoleDetailScreen <Clearances/>', () => {
  let wrapper;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return LinearProgress if curRole is null ', () => {
    wrapper = shallow(
      <Clearances
        curRole={null}
        setCurRole={jest.fn()}
        selectOptions={{}}
      />,
    );
    expect(wrapper.contains(<LinearProgress />)).toBe(true)
  });

  it('if curIdentity.id exist should return all inputs', () => {
    wrapper = shallow(
      <Clearances
        curRole={curRole}
        setCurRole={jest.fn()}
        selectOptions={{}}
      />,
    );
    expect(wrapper.find({ 'data-test': "conditionsOfAvailability" }).length).toEqual(1)
    expect(wrapper.find(ClearancesInputs)).toHaveLength(1);
  });
});

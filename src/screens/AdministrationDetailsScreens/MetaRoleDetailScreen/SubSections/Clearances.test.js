import React from 'react';
import { shallow } from 'enzyme';
import Clearances from './Clearances';
import { LinearProgress } from '@mui/material';

describe('MetaRoleDetailScreen <Clearances/>', () => {
  let wrapper;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return LinearProgress if curRole is null ', () => {
    wrapper = shallow(
      <Clearances
        curMetaRole={null}
        setCurMetaRole={jest.fn()}
        selectOptions={{}}
      />,
    );
    expect(wrapper.contains(<LinearProgress />)).toBe(true)
  });

  it('if curIdentity.id exist should return aggregatedRoles input', () => {
    wrapper = shallow(
      <Clearances
        curMetaRole={{}}
        setCurMetaRole={jest.fn()}
        selectOptions={{}}
      />,
    );
    expect(wrapper.find({ 'data-test': "aggregatedRoles" }).length).toEqual(1)
  });
});

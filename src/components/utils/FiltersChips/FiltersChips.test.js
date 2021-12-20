import React from 'react';
import { Chip } from '@mui/material';
import { mount } from 'enzyme';

import FiltersChips from './FiltersChips';

const initTestFilters = [
  { 'test-filter-1': { label: 'test-label-1' } },
  { 'test-filter-2': { label: 'test-label-2' } },
  { 'test-filter-3': { label: 'test-label-3' } }
];

let curTestFilters = [...initTestFilters];

jest.mock('react-redux', () => ({
  useDispatch: () => ({ payload: { filters } }) => { curTestFilters = [...filters]; }
}));

describe('<FiltersChips />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<FiltersChips filters={curTestFilters} />);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should have <Chip /> for each filters object item', () => {
    expect(wrapper.find(Chip)).toHaveLength(initTestFilters.length);
  });

  it('should remove filter on delete click', () => {
    wrapper.find('.MuiChip-root').first().children('.MuiChip-deleteIcon').simulate('click');

    expect(curTestFilters).toHaveLength(initTestFilters.length - 1);
  });
});
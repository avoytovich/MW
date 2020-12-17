import React from 'react';
import { Select } from '@material-ui/core';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import SelectSubFilter from './SelectSubFilter';

const testFilter = {
  id: 'test-filter-id',
  label: 'test-filter-label',
  values: [
    { label: 'test-label-1', value: 'test-value-1' },
    { label: 'test-label-2', value: 'test-value-2' },
    { label: 'test-label-3', value: 'test-value-3' }
  ]
};

let testConfig = {};

describe('<SelectSubFilter />', () => {
  let wrapper;

  beforeEach(async() => {
    wrapper = mount(<SelectSubFilter
      filter={testFilter}
      config={testConfig}
      setConfig={(newConfig) => { testConfig = newConfig; }}
    />);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should have <Select />', () => {
    expect(wrapper.find(Select)).toHaveLength(1);
  });

  it('should change config on selecting new values', async() => {
    expect(wrapper.find(Select).props().value).toEqual(['test-value-1']);

    await act(async() => {
      const event = { 'target': { 'value': ['test-value-1', 'test-value-2'] } };
      wrapper.find(Select).prop('onChange').call(null, event);
    });

    expect(testConfig[testFilter.id].values).toEqual(['test-value-1', 'test-value-2']);
  });
});
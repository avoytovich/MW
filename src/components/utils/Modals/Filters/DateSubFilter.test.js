import React from 'react';
import { Button, Dialog, DialogActions } from '@material-ui/core';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import DateSubFilter from './DateSubFilter';

const testFilter = { id: 'test-filter-id', label: 'test-filter-label' };

let testConfig = {};

describe('<DateSubFilter />', () => {
  let wrapper;

  beforeEach(async() => {
    wrapper = mount(<DateSubFilter
      filter={testFilter}
      config={testConfig}
      setConfig={(newConfig) => { testConfig = newConfig; }}
    />);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should have <Button /> with corresponding text', () => {
    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(Button).text()).toEqual('unlimited');
  });

  it('should have <Dialog />', () => {
    expect(wrapper.find(Dialog)).toHaveLength(1);
  });

  it('should open <Dialog /> on button click', async() => {
    expect(wrapper.find(DialogActions)).toHaveLength(0);
    
    await act(async() => {
      wrapper.find(Button).simulate('click');
    });

    wrapper.update();
    
    expect(wrapper.find(DialogActions)).toHaveLength(1);
  });
});
import React from 'react';
import { Button } from '@material-ui/core';
import { mount } from 'enzyme';

import TextSubFilter from './TextSubFilter';

import localization from '../../../../localization';

const testFilter = { id: 'test-filter-id', label: 'test-filter-label' };

let testConfig = {};

describe('<TextSubFilter />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<TextSubFilter
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
    expect(wrapper.find(Button).text()).toEqual(localization.t('forms.buttons.contains'));
  });

  it('should change config and Button text on click', async() => {
    expect(testConfig[testFilter.id].exact).toEqual(false);
    wrapper.find(Button).simulate('click');    
    expect(testConfig[testFilter.id].exact).toEqual(true);
  });
});
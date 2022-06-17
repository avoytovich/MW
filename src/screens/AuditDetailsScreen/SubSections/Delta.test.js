import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';


import Delta from './Delta';

describe('<Delta />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
        <Delta audit ={{what: {}}} />
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(wrapper)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

});

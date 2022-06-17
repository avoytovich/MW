import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';


import General from './General';

describe('<General />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
        <General audit={{}}/>
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

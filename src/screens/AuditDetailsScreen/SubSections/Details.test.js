import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';


import Details from './Details';

describe('<Details />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Details />);
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

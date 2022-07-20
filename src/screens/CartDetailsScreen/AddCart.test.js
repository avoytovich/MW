import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import AddCart from './AddCart';

jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockImplementation(() => []),
}));

describe('<AddCart />', () => {
  let wrapper;
  const myInitialState = 'initial'
  React.useState = jest.fn().mockReturnValue([myInitialState, () => {}])

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <AddCart />
      </BrowserRouter>
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

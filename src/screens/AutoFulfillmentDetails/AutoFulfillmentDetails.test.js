import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';


import AutoFulfillmentDetails from './AutoFulfillmentDetails';

jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockImplementation(() => []),
}));

describe('<AutoFulfillmentDetails />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <AutoFulfillmentDetails />
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

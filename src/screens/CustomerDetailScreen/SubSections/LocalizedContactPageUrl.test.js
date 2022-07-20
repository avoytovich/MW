import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';


import LocalizedContactPageUrl from './LocalizedContactPageUrl';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn().mockImplementation(() => jest.fn()),
  useSelector: jest.fn().mockImplementation(() => []),
}));

describe('<LocalizedContactPageUrl />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<LocalizedContactPageUrl />);
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

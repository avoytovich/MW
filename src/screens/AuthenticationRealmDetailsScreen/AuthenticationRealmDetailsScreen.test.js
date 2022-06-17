import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';


import AuthenticationRealmDetailsScreen from './AuthenticationRealmDetailsScreen';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn().mockImplementation(() => []),
}));

describe('<AuthenticationRealmDetailsScreen />', () => {
  let wrapper;
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((init) => [init, setState]);

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <AuthenticationRealmDetailsScreen/>
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
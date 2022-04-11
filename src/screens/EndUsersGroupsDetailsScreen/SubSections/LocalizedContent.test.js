import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import '@testing-library/jest-dom';


import LocalizedContent from './LocalizedContent';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn().mockImplementation(() => []),
}));

describe('<LocalizedContent />', () => {
  let wrapper;
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((init) => [init, setState]);

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <LocalizedContent errors={{defaultLocalizedContent: ''}} currentData={{}} setErrors={() => {}}/>
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

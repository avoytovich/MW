import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';


import AuditDetailsScreenView from './AuditDetailsScreenView';

describe('<AuditDetailsScreenView />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<AuditDetailsScreenView />);
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

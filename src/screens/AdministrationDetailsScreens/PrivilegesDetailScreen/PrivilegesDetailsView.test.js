import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';


import PrivilegesDetailsView from './PrivilegesDetailsView';

describe('<PrivilegesDetailsView />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<PrivilegesDetailsView privilegeData={{availableActions: []}} />);
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

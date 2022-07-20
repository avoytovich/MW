import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';


import DiscountDetailsView from './DiscountDetailsView';

describe('<DiscountDetailsView />', () => {
  let wrapper;
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((init) => [init, setState]);

  beforeEach(() => {
    wrapper = mount(
        <DiscountDetailsView
          curTab={1}
          curDiscount={{localizedLabels: []}}
        />
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

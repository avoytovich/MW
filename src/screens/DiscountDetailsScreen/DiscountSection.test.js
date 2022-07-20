import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';


import DiscountSection from './DiscountSection';

describe('<DiscountSection />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<DiscountSection />);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(wrapper)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

});

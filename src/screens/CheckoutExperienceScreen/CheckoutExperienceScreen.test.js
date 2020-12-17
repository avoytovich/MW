import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { Tab } from '@material-ui/core';
import CheckoutExperienceScreen from './CheckoutExperienceScreen';
import ThemesTab from './ThemesTab';
import FontsTab from './FontsTab';
const mockSetState = jest.fn();
const useStateSpy = jest.spyOn(React, 'useState');
useStateSpy.mockImplementation((init) => [init, mockSetState]);

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn().mockImplementation(() => []),
}));
jest.mock('../../services/useData');
describe('<CheckoutExperienceScreen/>', () => {
  let wrapper;
  beforeEach(async () => {
    wrapper = mount(<CheckoutExperienceScreen />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should have 4 tabs with Themes, Layouts, Translations and Fonts', () => {
    expect(wrapper.find(Tab)).toHaveLength(4);
    expect(wrapper.find(Tab).at(0).text()).toEqual('Themes');
    expect(wrapper.find(Tab).at(1).text()).toEqual('Layouts');
    expect(wrapper.find(Tab).at(2).text()).toEqual('Translations');
    expect(wrapper.find(Tab).at(3).text()).toEqual('Fonts');
  });

  it('should show <ThemesTab /> if Themes tab is active', () => {
    expect(
      wrapper
        .find(Tab)
        .first()
        .getDOMNode()
        .attributes.getNamedItem('aria-selected').value,
    ).toEqual('true');
    expect(wrapper.find(ThemesTab)).toHaveLength(1);
  });

  it('should show <FontsTab /> if Fonts tab is active', () => {
    wrapper.find(Tab).last().simulate('click');
    expect(
      wrapper
        .find(Tab)
        .first()
        .getDOMNode()
        .attributes.getNamedItem('aria-selected').value,
    ).toEqual('false');
    expect(
      wrapper
        .find(Tab)
        .last()
        .getDOMNode()
        .attributes.getNamedItem('aria-selected').value,
    ).toEqual('true');
    expect(wrapper.find(ThemesTab)).toHaveLength(0);
    expect(wrapper.find(FontsTab)).toHaveLength(1);
  });
});

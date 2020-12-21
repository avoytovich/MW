import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { Tab } from '@material-ui/core';
import CheckoutExperienceScreen from './CheckoutExperienceScreen';
import ThemesTab from './ThemesTab';
import FontsTab from './FontsTab';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn().mockImplementation(() => []),
}));
jest.mock('../../services/useData');
describe('<CheckoutExperienceScreen/>', () => {
  let wrapper;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should have 4 tabs with Themes, Layouts, Translations and Fonts', () => {
    wrapper = mount(
      <Router>
        <CheckoutExperienceScreen
          location={{ pathname: '/checkout-experience' }}
        />
      </Router>,
    );
    expect(wrapper.find(Tab)).toHaveLength(4);
    expect(wrapper.find(Tab).at(0).text()).toEqual('Themes');
    expect(wrapper.find(Tab).at(1).text()).toEqual('Layouts');
    expect(wrapper.find(Tab).at(2).text()).toEqual('Translations');
    expect(wrapper.find(Tab).at(3).text()).toEqual('Fonts');
  });

  it('should show Themes tab be active if path is /checkout-experience/themes', () => {
    wrapper = mount(
      <Router>
        <CheckoutExperienceScreen
          location={{ pathname: '/checkout-experience/themes' }}
        />
      </Router>,
    );
    expect(
      wrapper
        .find(Tab)
        .first()
        .getDOMNode()
        .attributes.getNamedItem('aria-selected').value,
    ).toEqual('true');
  });
  it('should Fonts tab be active if path is /checkout-experience/fonts', () => {
    wrapper = mount(
      <Router>
        <CheckoutExperienceScreen
          location={{ pathname: '/checkout-experience/fonts' }}
        />
      </Router>,
    );
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
  });
});

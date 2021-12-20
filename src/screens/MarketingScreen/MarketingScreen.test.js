import React from 'react';
import { mount } from 'enzyme';
import { Tab } from '@mui/material';
import MarketingScreen from './MarketingScreen';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn().mockImplementation(() => []),
}));
jest.mock('../../services/useData');
describe('<MarketingScreen/>', () => {
  let wrapper;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should have 4 tabs with Campaigns, Recommendations, Discounts and Prices', () => {
    wrapper = mount(
      <Router>
        <MarketingScreen
          location={{ pathname: '/marketing/campaigns' }}
        />
      </Router>,
    );
    expect(wrapper.find(Tab)).toHaveLength(4);
    expect(wrapper.find(Tab).at(0).text()).toEqual('Campaigns');
    expect(wrapper.find(Tab).at(1).text()).toEqual('Recommendations');
    expect(wrapper.find(Tab).at(2).text()).toEqual('Discounts');
    expect(wrapper.find(Tab).at(3).text()).toEqual('Prices');
  });

  it('should show Campaigns tab if path is /marketing/campaigns', () => {
    wrapper = mount(
      <Router>
        <MarketingScreen
          location={{ pathname: '/marketing/campaigns' }}
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
  it('should Prices tab be active if path is /marketing/prices', () => {
    wrapper = mount(
      <Router>
        <MarketingScreen
          location={{ pathname: '/marketing/prices' }}
        />
      </Router>,
    );
    expect(
      wrapper
        .find(Tab)
        .last()
        .getDOMNode()
        .attributes.getNamedItem('aria-selected').value,
    ).toEqual('false');
    expect(
      wrapper
        .find(Tab)
        .first()
        .getDOMNode()
        .attributes.getNamedItem('aria-selected').value,
    ).toEqual('true');
  });
});

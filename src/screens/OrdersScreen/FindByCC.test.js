import React from 'react';
import { mount } from 'enzyme';

import api from '../../api';

import FindByCC from './FindByCC';

jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockImplementation(() => []),
}));

jest.mock('../../api', () => ({
  getOrdersByCard: jest.fn(() => Promise.resolve({})),
}));

describe('<FindByCC />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<FindByCC open={true} />);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should find orders by card bin & last 4', () => {
    const cardInput = wrapper.find('input[name="cardBin"]');
    cardInput.simulate('change', { target: { value: '411111' } });

    const lastDigitsInput = wrapper.find('input[name="lastDigits"]');
    lastDigitsInput.simulate('change', { target: { value: '1111' } });

    const searchButton = wrapper.find('button[aria-label="by-card-search-button"]');
    searchButton.simulate('click');

    const mockedArguments = {
      amount: "",
      bin: "411111",
      currency: "",
      customer: undefined,
      date: null,
      l4: "1111",
      page: 1,
      size: 10
    };
    
    expect(api.getOrdersByCard).toHaveBeenCalledWith(mockedArguments);
  });
});

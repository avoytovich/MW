import React from 'react';
import { mount, shallow } from 'enzyme';
import LicenseDetailsScreen from './LicenseDetailsScreen';
import OrderDetailsTableComponent from '../../components/TableComponent/OrderDetailsTableComponent';
import api from '../../api';

jest.mock('../../api', () => ({
  getLicenseById: jest.fn(() => Promise.resolve()),
}));
jest.mock('react-router-dom', () => ({
  useParams: jest.fn(() => ({ })),
}));

describe('LicenseDetailsScreen', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<LicenseDetailsScreen />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

    it('should call api.getLicenseById', () => {
      mount(<LicenseDetailsScreen />);
      expect(api.getLicenseById).toHaveBeenCalledTimes(1);
    });

    it('should have <OrderDetailsTableComponent />', () => {
      expect(wrapper.find(OrderDetailsTableComponent).length).toEqual(0);
    });

});

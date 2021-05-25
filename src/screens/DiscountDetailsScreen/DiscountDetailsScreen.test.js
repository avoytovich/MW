import React from 'react';
import { mount, shallow } from 'enzyme';
import DiscountDetailsScreen from './DiscountDetailsScreen';
import { Tab } from '@material-ui/core';

import { discountObj, selectOptions } from '../../../__mocks__/fileMock';
const customerId = 1;
import api from '../../api';

jest.mock('../../api', () => ({
  getDiscountById: jest.fn().mockImplementation(() => Promise.resolve({ data: { customerId: customerId } }),
  ),
  getEndUsersByCustomerId: jest.fn().mockImplementation(() => Promise.resolve({ value: { data: { items: [] } } }),
  ),
  getStores: jest.fn().mockImplementation(() => Promise.resolve({ value: { data: { items: [] } } }),
  ),
  getDiscountProductsByIds: jest.fn().mockImplementation(() => Promise.resolve({ value: { data: { items: [] } } }),
  ),
  getParentProductsByIds: jest.fn().mockImplementation(() => Promise.resolve({ value: { data: { items: [] } } }),
  ),
  getEndUsersGroupsByCustomerId: jest.fn().mockImplementation(() => Promise.resolve({ value: { data: { items: [] } } }),
  ),
}));
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn().mockImplementation(() => { }),
}));

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(() => ({ id: 12 })),
  useHistory: jest.fn(() => ({})),
}));
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn().mockImplementation(() => { }),
}));


const setDiscountCodes = jest.fn().mockImplementation(() => [discountObj]);
const setCurDiscountCodes = jest.fn().mockImplementation(() => [discountObj]);
const setHasChanges = jest.fn().mockImplementation(() => false);


const useStateSpy = jest.spyOn(React, 'useState');
useStateSpy.mockImplementation((initial) => [initial, mockSetState]);




describe('<DiscountDetailsScreen/> ', () => {
  let wrapper;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('on mount', () => {
    it('should call api.getDiscountById', () => {
      mount(<DiscountDetailsScreen />);
      expect(api.getDiscountById).toHaveBeenCalledTimes(1);
      expect(api.getDiscountById).toHaveBeenCalledWith(12);

    });
    it('should call callback after getDiscountById', () => {
      mount(<DiscountDetailsScreen />);
      api.getDiscountById().then(() => {
        expect(api.getEndUsersByCustomerId).toHaveBeenCalledTimes(1);
        expect(api.getEndUsersByCustomerId).toHaveBeenCalledWith(customerId);

        expect(api.getStores).toHaveBeenCalledTimes(1);
        expect(api.getStores).toHaveBeenCalledWith(0, `&customerId=${customerId}`);

        expect(api.getDiscountProductsByIds).toHaveBeenCalledTimes(1);
        expect(api.getDiscountProductsByIds).toHaveBeenCalledWith(customerId);

        expect(api.getParentProductsByIds).toHaveBeenCalledTimes(1);
        expect(api.getParentProductsByIds).toHaveBeenCalledWith(customerId, null);

        expect(api.getEndUsersGroupsByCustomerId).toHaveBeenCalledTimes(1);
        expect(api.getEndUsersGroupsByCustomerId).toHaveBeenCalledWith(customerId);
      })
    });
  });
  beforeEach(() => {
    wrapper = shallow(
      <DiscountDetailsScreen />,
    );
  });
  it('should contains 3 tabs', () => {
    const tabs = wrapper.find(Tab);
    expect(tabs.length).toEqual(3)

  });


});

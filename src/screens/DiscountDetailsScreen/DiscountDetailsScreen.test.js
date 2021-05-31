import React from 'react';
import { shallow } from 'enzyme';
import DiscountDetailsScreen from './DiscountDetailsScreen';
import { Tab, LinearProgress, Tabs, Button } from '@material-ui/core';
import useDiscountDetails from '../../services/useData/useDiscountDetails';
import General from './SubSections/General';
import CappingAndLimits from './SubSections/CappingAndLimits';
import Eligibility from './SubSections/Eligibility';

jest.mock('../../services/useData/useDiscountDetails', () => jest.fn());
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

describe('<DiscountDetailsScreen/> ', () => {
  let wrapper;
  it('should return LinearProgress if curDiscount is null', () => {
    useDiscountDetails.mockImplementation(() => ({
      discount: null,
      curDiscount: null,
    })
    )
    wrapper = shallow(
      <DiscountDetailsScreen />,
    );
    expect(wrapper.contains(<LinearProgress />)).toBe(true)
    jest.clearAllMocks();

  });


  describe('DiscountDetailsScreen with data is nut null', () => {

    beforeEach(() => {
      useDiscountDetails.mockImplementation(() => ({
        discount: {},
        curDiscount: {},
      })
      )
      wrapper = shallow(
        <DiscountDetailsScreen />,
      );
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should contains 3 tabs', () => {
      const tabs = wrapper.find(Tab);
      expect(tabs.length).toEqual(3)
    });

    it('should return General component on first tab', () => {
      wrapper.find({ 'data-test': "tabs" }).props().onChange({}, 0);
      expect(wrapper.find(General)).toHaveLength(1);
      expect(wrapper.find(CappingAndLimits)).toHaveLength(0);
      expect(wrapper.find(Eligibility)).toHaveLength(0);
    });

    it('should return CappingAndLimits component on second tab', () => {
      wrapper.find({ 'data-test': "tabs" }).props().onChange({}, 1);
      expect(wrapper.find(General)).toHaveLength(0);
      expect(wrapper.find(CappingAndLimits)).toHaveLength(1);
      expect(wrapper.find(Eligibility)).toHaveLength(0);
    });

    it('should return Eligibility component on third tab', () => {
      wrapper.find({ 'data-test': "tabs" }).props().onChange({}, 2);
      expect(wrapper.find(General)).toHaveLength(0);
      expect(wrapper.find(CappingAndLimits)).toHaveLength(0);
      expect(wrapper.find(Eligibility)).toHaveLength(1);
    });
  })
});




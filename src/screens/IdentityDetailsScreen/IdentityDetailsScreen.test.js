import React from 'react';
import { Tab,LinearProgress } from '@mui/material';
import { shallow } from 'enzyme';
import General from './SubSections/General';
import Identification from './SubSections/Identification';
import Permissions from './SubSections/Permissions';
import Emails from './SubSections/Emails';
import IdentityDetailsScreen from './IdentityDetailsScreen';
import useIdentityDetails from '../../services/useData/useIdentityDetails';

jest.mock('../../services/useData/useIdentityDetails', () => jest.fn());
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn().mockImplementation(() => { }),
}));

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(() => ({ id: 12 })),
  useHistory: jest.fn(() => ({})),
}));

describe('<IdentityDetailsScreen/> ', () => {
  let wrapper;
  it('should return LinearProgress if isLoading is true', () => {
    useIdentityDetails.mockImplementation(() => ({
      isLoading: true,
    })
    )
    wrapper = shallow(
      <IdentityDetailsScreen />,
    );
    expect(wrapper.contains(<LinearProgress />)).toBe(true)
    jest.clearAllMocks();
  });

  describe('IdentityDetailsScreen with data is nut null', () => {

    beforeEach(() => {
      useIdentityDetails.mockImplementation(() => ({
        curIdentity: {},
      })
      )
      wrapper = shallow(
        <IdentityDetailsScreen />,
      );
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should contains 4 tabs', () => {
      const tabs = wrapper.find(Tab);
      expect(tabs.length).toEqual(4)
    });

    it('should return General component on first tab', () => {
      wrapper.find({ 'data-test': "tabs" }).props().onChange({}, 0);
      expect(wrapper.find(General)).toHaveLength(1);
      expect(wrapper.find(Identification)).toHaveLength(0);
      expect(wrapper.find(Permissions)).toHaveLength(0);
      expect(wrapper.find(Emails)).toHaveLength(0);
    });

    it('should return CappingAndLimits component on second tab', () => {
      wrapper.find({ 'data-test': "tabs" }).props().onChange({}, 1);
      expect(wrapper.find(General)).toHaveLength(0);
      expect(wrapper.find(Identification)).toHaveLength(1);
      expect(wrapper.find(Permissions)).toHaveLength(0);
      expect(wrapper.find(Emails)).toHaveLength(0);
    });

    it('should return Eligibility component on third tab', () => {
      wrapper.find({ 'data-test': "tabs" }).props().onChange({}, 2);
      expect(wrapper.find(General)).toHaveLength(0);
      expect(wrapper.find(Identification)).toHaveLength(0);
      expect(wrapper.find(Permissions)).toHaveLength(1);
      expect(wrapper.find(Emails)).toHaveLength(0);
    });

    it('should return Emails component on fourth tab', () => {
      wrapper.find({ 'data-test': "tabs" }).props().onChange({}, 3);
      expect(wrapper.find(General)).toHaveLength(0);
      expect(wrapper.find(Identification)).toHaveLength(0);
      expect(wrapper.find(Permissions)).toHaveLength(0);
      expect(wrapper.find(Emails)).toHaveLength(1);
    });
  })
});


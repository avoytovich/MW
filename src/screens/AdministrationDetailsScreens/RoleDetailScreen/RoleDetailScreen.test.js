import React from 'react';
import { shallow } from 'enzyme';
import RoleDetailScreen from './RoleDetailScreen';
import { Tab, LinearProgress, Tabs, Button } from '@mui/material';
import useRoleDetailsData from '../../../services/useData/useRoleDetailsData';
import General from './SubSections/General';
import Clearances from './SubSections/Clearances';

jest.mock('../../../services/useData/useRoleDetailsData', () => jest.fn());
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn().mockImplementation(() => { }),
}));
jest.mock('../../../services/useData/useRoleDetailsData', () => jest.fn());

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(() => ({ id: 1 })),
  useHistory: jest.fn(() => ({})),
}));

describe('<RoleDetailScreen/> ', () => {
  let wrapper;
  it('should return LinearProgress if curRole is null', () => {
    useRoleDetailsData.mockImplementation(() => ({
      curRole: null,
    })
    )
    wrapper = shallow(
      <RoleDetailScreen />,
    );
    expect(wrapper.contains(<LinearProgress />)).toBe(true)
    jest.clearAllMocks();

  });


  describe('RoleDetailScreen with data no equal to null', () => {

    beforeEach(() => {
      useRoleDetailsData.mockImplementation(() => ({
        curRole: {},
      })
      )
      wrapper = shallow(
        <RoleDetailScreen />,
      );
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should contains 2 tabs', () => {
      const tabs = wrapper.find(Tab);
      expect(tabs.length).toEqual(2)
    });

    it('should return General component on first tab', () => {
      wrapper.find(Tabs).props().onChange({}, 0);
      expect(wrapper.find(General)).toHaveLength(1);
      expect(wrapper.find(Clearances)).toHaveLength(0);
    });

    it('should return Clearances component on second tab', () => {
      wrapper.find(Tabs).props().onChange({}, 1);
      expect(wrapper.find(General)).toHaveLength(0);
      expect(wrapper.find(Clearances)).toHaveLength(1);
    });

  })
  it('Button should be disabled if curRole.name is empty', () => {
    useRoleDetailsData.mockImplementation(() => ({
      curRole: { name: '' },
    })
    )
    wrapper = shallow(
      <RoleDetailScreen />,
    );
    expect(wrapper.find(Button).props().disabled).toEqual(true);
    jest.clearAllMocks();

  });
  it('Button should not be disabled if curRole.name is not empty', () => {
    useRoleDetailsData.mockImplementation(() => ({
      curRole: { name: 'someName' },
    })
    )
    wrapper = shallow(
      <RoleDetailScreen />,
    );
    expect(wrapper.find(Button).props().disabled).toEqual(false);
    jest.clearAllMocks();
  });
});




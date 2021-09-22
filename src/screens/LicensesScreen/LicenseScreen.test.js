import React from 'react';
import { shallow } from 'enzyme';

import LicensesScreen from './LicensesScreen';
import TableComponent from '../../components/TableComponent';
import TableActionsBar from '../../components/TableActionsBar';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn().mockImplementation(() => []),
}));
jest.mock('../../services/useData');

describe('<LicensesScreen />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<LicensesScreen />);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should have a <TableActionsBar />', () => {
    expect(wrapper.find(TableActionsBar)).toHaveLength(1);
  });

  it('should have a <TableComponent />', () => {
    expect(wrapper.find(TableComponent)).toHaveLength(1);
  });
});

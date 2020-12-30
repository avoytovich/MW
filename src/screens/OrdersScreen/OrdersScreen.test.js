import React from 'react';
import { shallow } from 'enzyme';

import OrdersScreen from './OrdersScreen';
import TableComponent from '../../components/TableComponent';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn().mockImplementation(() => []),
}));
jest.mock('../../services/useData');

describe('<OrdersScreen />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<OrdersScreen />);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should have a <TableComponent />', () => {
    expect(wrapper.find(TableComponent)).toHaveLength(1);
  });
});

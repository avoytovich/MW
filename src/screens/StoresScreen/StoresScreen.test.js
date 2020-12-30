import React from 'react';
import { shallow } from 'enzyme';

import StoresScreen from './StoresScreen';
import TableComponent from '../../components/TableComponent';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn().mockImplementation(() => []),
}));
jest.mock('../../services/useData');

describe('<StoresScreen />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<StoresScreen />);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should have a <TableComponent />', () => {
    expect(wrapper.find(TableComponent)).toHaveLength(1);
  });
});

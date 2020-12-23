import React from 'react';
import { shallow } from 'enzyme';

import FontsTab from './FontsTab';
import TableComponent from '../../components/TableComponent';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn().mockImplementation(() => []),
}));
jest.mock('../../services/useData');

describe('<FontsTab />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<FontsTab />);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should have a <TableComponent />', () => {
    expect(wrapper.find(TableComponent)).toHaveLength(1);
  });
});

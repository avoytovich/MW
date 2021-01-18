import React from 'react';
import { shallow } from 'enzyme';

import LayoutsTab from './LayoutsTab';
import TableComponent from '../../components/TableComponent';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn().mockImplementation(() => []),
}));
jest.mock('../../services/useData');

describe('<LayoutsTab />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<LayoutsTab />);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should have a <TableComponent />', () => {
    expect(wrapper.find(TableComponent)).toHaveLength(1);
  });
});

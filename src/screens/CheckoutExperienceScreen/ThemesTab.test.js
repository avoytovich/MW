import React from 'react';
import { shallow } from 'enzyme';

import ThemesTab from './ThemesTab';
import TableComponent from '../../components/TableComponent';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn().mockImplementation(() => []),
}));
jest.mock('../../services/useData');

describe('<ThemesTab />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ThemesTab />);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should have a <TableComponent />', () => {
    expect(wrapper.find(TableComponent)).toHaveLength(1);
  });
});

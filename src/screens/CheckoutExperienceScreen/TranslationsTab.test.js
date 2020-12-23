import React from 'react';
import { shallow } from 'enzyme';

import TranslationsTab from './TranslationsTab';
import TableComponent from '../../components/TableComponent';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn().mockImplementation(() => []),
}));
jest.mock('../../services/useData');

describe('<TranslationsTab />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<TranslationsTab />);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should have a <TableComponent />', () => {
    expect(wrapper.find(TableComponent)).toHaveLength(1);
  });
});

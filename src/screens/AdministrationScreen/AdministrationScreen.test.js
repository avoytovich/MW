import React from 'react';
import { shallow } from 'enzyme';

import AdministrationScreen from './AdministrationScreen';
import TableComponent from '../../components/TableComponent';

jest.mock('react-redux', () => ({ useDispatch: jest.fn() }));
jest.mock('../../services/useData');

describe('<AdministrationScreen />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<AdministrationScreen />);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should have a <TableComponent />', () => {
    expect(wrapper.find(TableComponent)).toHaveLength(1);
  });
});

import React from 'react';
import { shallow } from 'enzyme';

import IdentitiesScreen from './IdentitiesScreen';
import TableComponent from '../../components/TableComponent';

jest.mock('react-redux', () => ({ useDispatch: jest.fn() }));
jest.mock('../../services/useData');

describe('<IdentitiesScreen />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<IdentitiesScreen />);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should have a <TableComponent />', () => {
    expect(wrapper.find(TableComponent)).toHaveLength(1);
  });
});

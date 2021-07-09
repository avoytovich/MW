import React from 'react';
import { mount } from 'enzyme';

import NotificationDefinitionScreen from './NotificationDefinitionScreen';
import TableComponent from '../../components/TableComponent';

const testData = {
  headers: [
    { value: 'ID', id: 'id', sortParam: 'id' },
    { value: 'Name', id: 'name', sortParam: 'name' },
    { value: 'Last Update', id: 'updateDate', sortParam: 'updateDate' },
    { value: 'Event Subject', id: 'subject', sortParam: 'subject' },
    { value: 'Event Fact', id: 'fact', sortParam: 'fact' }
  ],
  meta: {
    totalPages: 1,
  },
  values: [
    {
      id: 'ad1ada9e', name: 'confirmation', updateDate: '31 Mar 2020', subject: 'order', fact: 'updated',
    },
    {
      id: '179b49ce', name: 'email', updateDate: '15 Apr 2019', subject: 'order', fact: 'updated',
    },
    {
      id: '26758b34', name: 'pending', updateDate: '31 Mar 2020', subject: 'order', fact: 'updated',
    },
  ],
};

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn().mockImplementation(() => []),
}));
jest.mock('../../services/useData', () => ({
  useTableData: () => (testData),
}));

describe('<NotificationDefinitionScreen />', () => {
  let wrapper;
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState')
  useStateSpy.mockImplementation((init) => [init, setState]);

  beforeEach(() => {
    wrapper = mount(<NotificationDefinitionScreen />);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render a TableComponent', () => {
    expect(wrapper.find(TableComponent).exists()).toEqual(true);
  });

  it('should change state sortParams', () => {
    wrapper.find('.tableHeader').at(2).simulate('click');
    expect(setState).toHaveBeenCalledWith({value: "id", type: "desc"});
    wrapper.find('.tableHeader').at(5).simulate('click');
    expect(setState).toHaveBeenCalledWith({value: "name", type: "desc"});
  });

});

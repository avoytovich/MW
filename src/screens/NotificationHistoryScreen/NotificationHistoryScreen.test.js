import React from 'react';
import { mount } from 'enzyme';

import NotificationHistoryScreen from './NotificationHistoryScreen';
import TableComponent from '../../components/TableComponent';

const testData = {
  headers: [
    { value: 'Customer', id: 'customer', sortParam: null },
    { value: 'Processing Date', id: 'processingDate', sortParam: 'processingDate' },
    { value: 'Status', id: 'status', sortParam: 'status' },
    { value: 'Event', id: 'processedEvent', sortParam: null },
    { value: 'Receiver(s) email(s)', id: 'receiverEmail', sortParam: 'emails' },
    { value: 'Receiver URL (webhook)', id: 'receiverUrl', sortParam: 'url' },
    { value: 'Webhook Success Response', id: 'webHook', sortParam: null }
  ],
  meta: {
    totalPages: 1,
  },
  values: [
    {
      customer: 'Kaspersky',
      processingDate: '31 Mar 2020',
      status: 'Done',
      processedEvent: 'Order completed',
      receiverEmail: 'pbernad@nex',
      receiverUrl: 'http://nx-kas',
      webHook: '204',
    },
    {
      customer: 'Kaspersky',
      processingDate: '31 Mar 2020',
      status: 'Done',
      processedEvent: 'Order completed',
      receiverEmail: 'pbernad@nex',
      receiverUrl: 'http://nx-kas',
      webHook: '204',
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

describe('<NotificationHistoryScreen />', () => {
  let wrapper;
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState')
  useStateSpy.mockImplementation((init) => [init, setState]);

  beforeEach(() => {
    wrapper = mount(<NotificationHistoryScreen />);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render a TableComponent', () => {
    expect(wrapper.find(TableComponent).exists()).toEqual(true);
  });

  it('should change state sortParams', () => { 
    wrapper.find('.tableHeader').at(5).simulate('click');
    expect(setState).toHaveBeenCalledWith({value: "processingDate", type: "asc"});
    wrapper.find('.tableHeader').at(8).simulate('click');
    expect(setState).toHaveBeenCalledWith({value: "status", type: "asc"});
  });

});

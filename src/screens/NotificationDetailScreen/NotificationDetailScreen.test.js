import React from 'react';
import { shallow } from 'enzyme';
import NotificationDetailScreen from './NotificationDetailScreen';
import useNotificationDetail from '../../services/useData/useNotificationDetail';
import DetailPageWrapper from '../../components/utils/DetailPageWrapper';

jest.mock('../../services/useData/useNotificationDetail', () => jest.fn());
jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockImplementation(() => ({}))
}));

jest.mock('react-beautiful-dnd', () => ({
  Droppable: ({ children }) => children({
    draggableProps: {
      style: {},
    },
    innerRef: jest.fn(),
  }, {}),
  Draggable: ({ children }) => children({
    draggableProps: {
      style: {},
    },
    innerRef: jest.fn(),
  }, {}),
  DragDropContext: ({ children }) => children,
}));

jest.mock('react-router-dom', () => ({
  useParams: jest.fn().mockImplementation(() => ({ id: '1' }))
}));

describe('<NotificationDetailScreen/> ', () => {
  let wrapper;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return DetailPageWrapper ', () => {
    useNotificationDetail.mockImplementation(() => ({
      curNotification: {},
      notification: { id: '1' }
    })
    )
    wrapper = shallow(
      <NotificationDetailScreen />,
    );

    expect(wrapper.find(DetailPageWrapper)).toHaveLength(1);
  });
});


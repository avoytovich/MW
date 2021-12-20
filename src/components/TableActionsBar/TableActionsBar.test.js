import React from 'react';
import { shallow } from 'enzyme';
import TableActionsBar from './TableActionsBar';
import { TextField, IconButton } from '@mui/material';

const testNode = <div id='testNode'></div>

jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockImplementation(() => '20'),
  useDispatch: jest.fn(),
}));


describe('<TableActionsBar/> ', () => {
  let wrapper;

  it('should return rowsPerPageLabel,TextField, six IconButtons and child ', () => {
    wrapper = shallow(
      <TableActionsBar
        children={testNode}
        findByCC={jest.fn()}
      />,
    );
    expect(wrapper.find({ 'data-test': 'rowsPerPageLabel' })).toHaveLength(1);
    expect(wrapper.find(TextField)).toHaveLength(1);
    expect(wrapper.find(IconButton)).toHaveLength(6);
    expect(wrapper.find('div#testNode')).toHaveLength(1);
    jest.clearAllMocks();
  });

  it('should not draw find button if findByCC is not passed to component', () => {
    wrapper = shallow(
      <TableActionsBar
        children={testNode}
      />,
    );
    expect(wrapper.find(IconButton)).toHaveLength(5);
    expect(wrapper.find({ 'aria-label': 'find' })).toHaveLength(0);
    jest.clearAllMocks();
  });

  it('should not draw  buttons if positionBottom is true', () => {
    wrapper = shallow(
      <TableActionsBar
        children={testNode}
        positionBottom
      />,
    );
    expect(wrapper.find(IconButton)).toHaveLength(0);
    jest.clearAllMocks();
  });
});


import React from 'react';
import { shallow } from 'enzyme';

import TopBar from './TopBar';

import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Dialog,
} from '@material-ui/core';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn().mockImplementation(() => []),
}));


jest.mock("react-router-dom", () => ({
  useLocation: () => ({
    pathname: "localhost:8080/overview/products"
  })
}));

describe('<TopBar />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<TopBar/>);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should have a <AppBar />', () => {
    expect(wrapper.find(AppBar)).toHaveLength(1);
  });

  it('should have a <ToolBar />', () => {
    expect(wrapper.find(Toolbar)).toHaveLength(1);
  });

  it('should have a <IconButton />', () => {
    expect(wrapper.find(IconButton)).toHaveLength(4);
  });

  it('should have a <InputBase />', () => {
    expect(wrapper.find(InputBase)).toHaveLength(1);
  });

  it('should have a <Dialog />', () => {
    expect(wrapper.find(Dialog)).toHaveLength(1);
  });
});

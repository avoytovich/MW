import React from 'react';
import { shallow } from 'enzyme';
import ShowColumnPopper from './ShowColumnPopper';
import {
  FormControlLabel,
  TextField,
  Popover,
} from '@material-ui/core';
import localization from '../../localization';

const scope = 'product';
const testShowColumns = { id: true, productName: true, date: false }
jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockImplementation(() => testShowColumns),
  useDispatch: jest.fn(),
}));


describe('<ShowColumnPopper/> ', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <ShowColumnPopper
        scope={scope}
        anchorEl={null}
        setAnchorEl={jest.fn()}
      />,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should return Popover,TextField 2 Buttons and list of FormControlLabels', () => {
    expect(wrapper.find(Popover)).toHaveLength(1);
    expect(wrapper.find(TextField)).toHaveLength(1);
    expect(wrapper.find({ 'data-test': 'hideAllButton' })).toHaveLength(1);
    expect(wrapper.find({ 'data-test': 'showAllButton' })).toHaveLength(1);
    expect(wrapper.find(FormControlLabel)).toHaveLength(Object.keys(testShowColumns).length);
  });

  it('Should draw appropriate labels for FormControlLabels', () => {
    const listOfFormControlLabel = wrapper.find(FormControlLabel);
    listOfFormControlLabel.forEach((item, index) => {
      const curKey = Object.keys(testShowColumns)[index];
      expect(item.props().label).toEqual(localization.t(`labels.${curKey}`))
    })

  });

});

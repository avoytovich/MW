import React from 'react';
import { shallow } from 'enzyme';
import EditKeyValueInputs from './EditKeyValueInputs';
import ClearIcon from '@material-ui/icons/Clear';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {
  SelectCustom,
  NumberInput,
  InputCustom,
} from '../../components/Inputs';

const amountData = ['currency', 'amount'];
const discountLabelData = ['language', 'discountLabel'];

describe('DiscountDetailsScreen <EditKeyValueInputs/>', () => {
  let wrapper;
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return text "Add new value" and <AddCircleIcon/> if curValue array is empty', () => {
    wrapper = shallow(
      <EditKeyValueInputs
        curValue={[]}
        setCurValue={jest.fn()}
        selectOptions={[]}
        labels={discountLabelData}
      />,
    );
    expect(wrapper.find(SelectCustom).length).toEqual(0)
    expect(wrapper.find(InputCustom).length).toEqual(0)
    expect(wrapper.find(NumberInput).length).toEqual(0)
    expect(wrapper.find(AddCircleIcon).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "addNewInputsText" }).length).toEqual(1)
  });

  it('should add new inputs on click <AddCircleIcon/>', () => {
    wrapper = shallow(
      <EditKeyValueInputs
        curValue={[]}
        setCurValue={() => {
          wrapper.setProps({ curValue: [{ key: '', value: '' }] });
        }}
        selectOptions={[]}
        labels={discountLabelData}
      />,
    );
    expect(wrapper.find(SelectCustom).length).toEqual(0)
    expect(wrapper.find(InputCustom).length).toEqual(0)
    expect(wrapper.find(NumberInput).length).toEqual(0)
    wrapper.find(AddCircleIcon).props().onClick();
    expect(wrapper.find(SelectCustom).length).toEqual(1)
    expect(wrapper.find(InputCustom).length).toEqual(1)
    expect(wrapper.find(NumberInput).length).toEqual(0)
  });

  it('should remove one inputs line on click <ClearIcon/>', () => {
    wrapper = shallow(
      <EditKeyValueInputs
        curValue={[{ key: '1', value: '' }, { key: '2', value: '' }]}
        setCurValue={(newValue) => {
          wrapper.setProps({ curValue: newValue });
        }}
        selectOptions={[]}
        labels={discountLabelData}
      />,
    );
    expect(wrapper.find(SelectCustom).length).toEqual(2)
    expect(wrapper.find(InputCustom).length).toEqual(2)
    wrapper.find(ClearIcon).props().onClick(1);
    expect(wrapper.find(SelectCustom).length).toEqual(1)
    expect(wrapper.find(InputCustom).length).toEqual(1)
  });

  it('draw all input components', () => {
    wrapper = shallow(
      <EditKeyValueInputs
        curValue={[{
          key: "",
          value: ''
        }]}
        setCurValue={jest.fn()}
        selectOptions={[]}
        labels={discountLabelData}
      />,
    );
    expect(wrapper.find(SelectCustom).length).toEqual(1)
    expect(wrapper.find(InputCustom).length).toEqual(1)
    expect(wrapper.find(NumberInput).length).toEqual(0)
  });

  it(' <EditKeyValueInputs/> draw all input components  for amountData', () => {
    wrapper = shallow(
      <EditKeyValueInputs
        curValue={[{
          key: "",
          value: ''
        }]}
        setCurValue={jest.fn()}
        selectOptions={[]}
        labels={amountData}
      />,
    );
    expect(wrapper.find(SelectCustom).length).toEqual(1)
    expect(wrapper.find(InputCustom).length).toEqual(0)
    expect(wrapper.find(NumberInput).length).toEqual(1)
  });



});

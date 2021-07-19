import React from 'react';
import { shallow } from 'enzyme';
import Eligibility from './Eligibility';
import { SelectWithChip } from '../../../components/Inputs';
import { discountObj } from '../../../../__mocks__/fileMock';
import EditKeyValueInputs from '../EditKeyValueInputs';
import Autocomplete from '@material-ui/lab/Autocomplete';

jest.mock('../../../components/utils/OptionsFetcher/OptionsFetcher',
  () => ({
    getCountriesOptions: jest.fn(() => ([])),
  })
);

describe('DiscountDetailsScreen <Eligibility/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Eligibility
        curDiscount={discountObj}
        updateDiscount={jest.fn()}
        setCurDiscount={jest.fn()}
        selectOptions={{}}
      />,
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('draw all input components on the page', () => {
    expect(wrapper.find({ 'data-test': "manualRenewal" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "purchase" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "buyer" }).length).toEqual(1)
    expect(wrapper.find({ 'data-test': "reseller" }).length).toEqual(1)
    expect(wrapper.find(EditKeyValueInputs).length).toEqual(1)
    expect(wrapper.find(Autocomplete).length).toEqual(1)
    expect(wrapper.find(SelectWithChip).length).toEqual(6)
  });
  it('should update error message if new email value is not valid', () => {
    const useStateSpy = jest.spyOn(React, 'useState')
    wrapper.find(Autocomplete).props().onChange({ target: { value: 'testValue' } }, [1, 2, 3]);
    expect(useStateSpy).toHaveBeenCalled();
  });
});

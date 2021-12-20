import React from 'react';
import { shallow } from 'enzyme';
import { TableContainer, IconButton } from '@mui/material';
import localization from '../../../../localization';
import ClearancesInputs from './ClearancesInputs';

const tableHeaders = [
  localization.t('labels.serviceName'),
  localization.t('labels.privileges'),
  localization.t('labels.conditionsOfAvailability'),
];
const firstItemKey = 1
let rights = {
  some1_right: [{
    actions: [],
    availabilityConditions: [],
    key: firstItemKey,
  },
  {
    actions: [],
    availabilityConditions: [],
    key: 3,
  },],
  some2_right: [{
    actions: [],
    availabilityConditions: [],
    key: 2,
  }]
}
const countNumberOfRows = () => {
  let rowNumbers = 0;
  Object.keys(rights).forEach(key => rowNumbers = rights[key].length > 0 ? rowNumbers + rights[key].length : rowNumbers)
  return rowNumbers;
}

describe('RoleDetailScreen <ClearancesInputs/>', () => {
  let wrapper;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return only serviceName input if curRole.rights is empty', () => {
    wrapper = shallow(
      <ClearancesInputs
        curRole={{ rights: rights }}
        setCurRole={jest.fn()}
        selectOptions={{}}
      />,
    );
    expect(wrapper.find(TableContainer)).toHaveLength(1);

  });

  it('Table should draw correct table headers ', () => {
    wrapper = shallow(
      <ClearancesInputs
        curRole={{ rights: rights }}
        setCurRole={jest.fn()}
        selectOptions={{}}
      />,
    );
    expect(wrapper.find({ 'data-test': "tableHeader" }).length).toEqual(tableHeaders.length)
    wrapper.find({ 'data-test': "tableHeader" }).forEach((tableHeader, index) =>
      expect(tableHeader.text()).toEqual(tableHeaders[index])
    )
  });

  it('Table should draw correct number of rows ', () => {
    wrapper = shallow(
      <ClearancesInputs
        curRole={{ rights: rights }}
        setCurRole={jest.fn()}
        selectOptions={{}}
      />,
    );
    expect(wrapper.find({ 'data-test': "tableRow" }).length).toEqual(countNumberOfRows())
  });

  it('Each row should contains appropriate inputs', () => {
    wrapper = shallow(
      <ClearancesInputs
        curRole={{ rights: rights }}
        setCurRole={jest.fn()}
        selectOptions={{}}
      />,
    );
    wrapper.find({ 'data-test': "tableRow" }).forEach((row) => {
      const rowIndex = row.props()['data-index'];
      if (rowIndex === 0) {
        expect(row.find({ 'data-test': "right" }).length).toEqual(1)
      } else {
        expect(row.find({ 'data-test': "right" }).length).toEqual(0)
      }
      expect(row.find({ 'data-test': "privileges" }).length).toEqual(1)
      expect(row.find({ 'data-test': "conditionsOfAvailability" }).length).toEqual(1)
      expect(row.find(IconButton)).toHaveLength(1);
    })
  });

  it('Row should remove on click  IconButton', () => {
    wrapper = shallow(
      <ClearancesInputs
        curRole={{ rights: rights }}
        setCurRole={(newValue) => {
          rights = newValue.rights
          wrapper.setProps({ curRole: { rights: rights } });
        }}
        selectOptions={{}}
      />,
    );
    const rowNumberBeforeDelete = countNumberOfRows()
    wrapper.find(IconButton).at(firstItemKey).props().onClick()
    let includesValue = false;
    Object.keys(rights).forEach(key => {
      includesValue = rights[key].some(item =>
        item.key === firstItemKey
      )
    })
    expect(includesValue).toEqual(false)
    expect(wrapper.find({ 'data-test': "tableRow" }).length).toEqual(rowNumberBeforeDelete - 1)
  });

});

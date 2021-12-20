import React from 'react';
import { shallow } from 'enzyme';

import TableRowComponent from './TableRowComponent';
import PaginationComponent from '../PaginationComponent';
import { LinearProgress, Checkbox } from '@mui/material';
import TableComponent from './TableComponent';
import { useSelector } from 'react-redux';

const tableData = {
  headers: [
    {
      id: "creationDate",
      value: "CreationDate",
    }, {
      id: "customer",
      sortParam: "customer",
      value: "Customer",
    }, {
      id: "id",
      sortParam: "id",
      value: "Id",
    },
  ],
  values: [{
    customer: "Customer",
    id: "1",
    creationDate: "creationDate"
  }],
};

const showColumn = {
  creationDate: true,
  customer: true,
  id: false,
};

const secondaryProps = {
  setSortParams: jest.fn(),
  sortParams: { value: 'customer', type: 'desc' },
  customPath: '',
  errorHighlight: '',
  updatePage: jest.fn(),
  handleDeleteItem: jest.fn(),
  showColumn,
  currentPage: 1,
};
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('TableComponent', () => {
  let wrapper;
  beforeEach(() => {
    useSelector
      .mockReturnValueOnce(showColumn)
      .mockReturnValueOnce([])
  });

  afterEach(() => {
    useSelector.mockClear();
    jest.clearAllMocks();
  });

  it('Should return LinearProgress if isLoading is true', () => {
    wrapper = shallow(
      <TableComponent
        {...secondaryProps}
        tableData={tableData}
        isLoading={true}
        noActions

      />)
    expect(wrapper.find(LinearProgress).length).toEqual(1)
  });

  it('Should not draw Checkbox if noActions is true', () => {
    wrapper = shallow(
      <TableComponent
        {...secondaryProps}
        tableData={tableData}
        isLoading={false}
        noActions={true}
      />)
    expect(wrapper.find(Checkbox).length).toEqual(0)

  });

  it('Should return only noResultsNotification if tableData.values.length is zero', () => {
    wrapper = shallow(
      <TableComponent
        tableData={{
          headers: [],
          values: [],
        }}
        isLoading={false}
        showColumn={showColumn}
        handleDeleteItem={jest.fn()}
        noActions={false}
      />)
    expect(wrapper.find(TableRowComponent).length).toEqual(0)
    expect(wrapper.find(PaginationComponent).length).toEqual(0)

    expect(wrapper.find({ 'data-test': 'noResultsNotification' }).length).toEqual(1)
  });

  it('Should return TableRowComponent and PaginationComponent components  if tableData.values.length is not zero', () => {
    wrapper = shallow(
      <TableComponent
        tableData={tableData}
        isLoading={false}
        showColumn={showColumn}
        handleDeleteItem={jest.fn()}
        noActions={false}
        noTableActionsBar
      />)
    expect(wrapper.find(TableRowComponent).length).toEqual(1)
    expect(wrapper.find(PaginationComponent).length).toEqual(1)
    expect(wrapper.find({ 'data-test': 'noResultsNotification' }).length).toEqual(0)
  });

  describe('With all props', () => {
    beforeEach(() => {
      wrapper = shallow(
        <TableComponent
          {...secondaryProps}
          tableData={tableData}
          isLoading={false}
          noActions={false}
        />)
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Should draw Checkbox if noActions is false', () => {
      expect(wrapper.find(Checkbox).length).toEqual(1)
    });
    it('Should draw correct number of headers wit appropriate value', () => {
      const headersToShow = Object.keys(showColumn).filter(key => !!showColumn[key]);
      const headers = wrapper.find('.tableHeader')
      expect(headers.length).toEqual(headersToShow.length)
      headers.forEach((header, index) => {
        const value = tableData.headers.find(item => item.id === headersToShow[index]).value;
        expect(header.text()).toEqual(value)
      })
    });

    it('Should draw appropriate number of headers with class sortableHeader', () => {
      const headersWithSortParam = tableData.headers.filter(header => header.sortParam && showColumn[header.id]);
      const sortableHeaders = wrapper.find('.sortableHeader')
      expect(sortableHeaders.length).toEqual(headersWithSortParam.length)
    });

    it('Should add sortActiveAsc class if appropriate sortParams.value not equal to header value', () => {
      const headers = tableData.headers.filter(val => val.id !== secondaryProps.sortParams.value);
      const sortableHeaders = wrapper.find('.sortActiveAsc')
      sortableHeaders.forEach(header => {
        const value = tableData.headers.find(item => item.id === headersToShow[index]).value;
        expect(header.text()).toEqual(value)
      })
    });
  });
});

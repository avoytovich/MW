import React from 'react';
import { shallow } from 'enzyme';
import FullNameAvatar from '../utils/FullNameAvatar';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  FileCopy as FileCopyIcon,
  Check as CheckIcon,
  Close as CloseIcon,
} from '@material-ui/icons';
import { Checkbox } from '@material-ui/core';
import TableRowComponent from './TableRowComponent';

const showColumn = {
  creationDate: true,
  customer: true,
  id: false,
  fullName: true,
  status: true
};

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));


describe('TableRowComponent', () => {
  let wrapper;

  describe('With all props values', () => {

    beforeEach(() => {
      wrapper = shallow(
        <TableRowComponent
          rowItem={{
            creationDate: '1',
            customer: "Customer",
            id: "1",
            fullName: "FullName",
            status: "ENABLED"
          }}
          showColumn={showColumn}
          markupSequence={[
            { value: "Customer", id: "customer" },
            { value: "Creation Date", id: "creationDate" },
            { value: 'fullName', id: "fullName" },
            { value: "Status", id: "status" },
          ]}
          handleCheck={jest.fn()}
          noActions={false}
          checked={false}
          handleDeleteItem={jest.fn()}
        />
      );
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Should draw correct number of cells', () => {
      const count = Object.keys(showColumn).filter(key => !!showColumn[key]);
      expect(wrapper.find({ 'data-test': "tableCellItem" }).length).toEqual(count.length)
    });

    it('Should draw Checkbox if noActions if false', () => {
      expect(wrapper.find(Checkbox).length).toEqual(1)
    });

    it('Should draw FullNameAvatar if markupSequence have fullName id', () => {
      expect(wrapper.find(FullNameAvatar).length).toEqual(1)
    });

    it('Should draw CheckIcon if status is ENABLED', () => {
      expect(wrapper.find(CheckIcon).length).toEqual(1)
      expect(wrapper.find(CloseIcon).length).toEqual(0)
    });

    it('Should draw DeleteIcon onMouseOver and remove onMouseLeave if noActions if false', () => {
      wrapper.find({ 'data-test': "tableRow" }).props().onMouseOver();
      expect(wrapper.find(DeleteIcon).length).toEqual(1)

      wrapper.find({ 'data-test': "tableRow" }).props().onMouseLeave();
      expect(wrapper.find(DeleteIcon).length).toEqual(0)
    });


    it('Should draw EditIcon and FileCopyIcon onMouseOver and remove onMouseLeave', () => {
      wrapper.find({ 'data-test': "tableRow" }).props().onMouseOver();
      expect(wrapper.find(EditIcon).length).toEqual(1)
      expect(wrapper.find(FileCopyIcon).length).toEqual(1)

      wrapper.find({ 'data-test': "tableRow" }).props().onMouseLeave();
      expect(wrapper.find(EditIcon).length).toEqual(0)
      expect(wrapper.find(FileCopyIcon).length).toEqual(0)
    });
  });

  describe('With not all props values', () => {

    beforeEach(() => {
      wrapper = shallow(
        <TableRowComponent
          rowItem={{
            creationDate: '1',
            customer: "Customer",
            id: "1",
            status: "DISABLED"
          }}
          showColumn={showColumn}
          markupSequence={[
            { value: "Customer", id: "customer" },
            { value: "Creation Date", id: "creationDate" },
            { value: "Status", id: "status" },
          ]}
          handleCheck={jest.fn()}
          noActions={true}
          checked={false}
          handleDeleteItem={jest.fn()}
        />
      );
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Should not draw Checkbox if noActions if true', () => {
      expect(wrapper.find(Checkbox).length).toEqual(0)
    });

    it('Should not draw FullNameAvatar if markupSequence have not fullName id', () => {
      expect(wrapper.find(FullNameAvatar).length).toEqual(0)
    });

    it('Should draw CloseIcon if status is DISABLED', () => {
      expect(wrapper.find(CheckIcon).length).toEqual(0)
      expect(wrapper.find(CloseIcon).length).toEqual(1)
    });

    it('Should not draw DeleteIcon on onMouseOver if noActions if true', () => {
      wrapper.find({ 'data-test': "tableRow" }).props().onMouseOver();
      expect(wrapper.find(DeleteIcon).length).toEqual(0)
    });
  });

});

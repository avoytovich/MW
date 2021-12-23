import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCheckedItems } from '../../redux/actions/TableData';

const useAllTablesItems = () => {
  const dispatch = useDispatch();
  const tableCheckedItems = useSelector(({ tableData: { checkedItems } }) => checkedItems);
  const reduxRowPerPage = useSelector(({ tableData: { rowsPerPage } }) => rowsPerPage);
  const [allCheckedItems, setAllCheckedItems] = useState([tableCheckedItems]);

  useEffect(() => {
    if (allCheckedItems[reduxRowPerPage]) {
      dispatch(setCheckedItems(allCheckedItems[allCheckedItems.length - 1]));
    }
  }, [reduxRowPerPage]);

  useEffect(() => {
    setAllCheckedItems([...allCheckedItems, tableCheckedItems]);
  }, [tableCheckedItems]);

  return [allCheckedItems, setAllCheckedItems];
};

export default useAllTablesItems;

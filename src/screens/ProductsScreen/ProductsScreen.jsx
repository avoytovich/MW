import React, { useEffect, useState } from 'react';
import { Button, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import api from '../../api';
import { setCheckedItems } from '../../redux/actions/TableData';
import {
  generateData,
  defaultShow,
  markUp,
} from '../../services/useData/tableMarkups/products';
import useTableData from '../../services/useData/useTableData';
import TableComponent from '../../components/TableComponent';

import localization from '../../localization';
import TableActionsBar from '../../components/TableActionsBar';
import {
  getSortParams,
  saveSortParams,
  sortKeys,
} from '../../services/sorting';
import parentPaths from '../../services/paths';

const ProductsScreen = () => {
  const scope = 'productlist';
  const dispatch = useDispatch();
  const reduxRowPerPage = useSelector(({ tableData: { rowsPerPage } }) => rowsPerPage);
  const tableCheckedItems = useSelector(({ tableData: { checkedItems } }) => checkedItems);
  const [allCheckedItems, setAllCheckedItems] = useState(tableCheckedItems);
  const [makeUpdate, setMakeUpdate] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [sortParams, setSortParams] = useState(
    getSortParams(sortKeys.products),
  );

  const requests = async (rowsPerPage, reduxCurrentPage, filtersUrl) => {
    const res = await api.getProducts({
      page: reduxCurrentPage, size: rowsPerPage, filters: filtersUrl, sortParams,
    });
    return generateData(res.data);
  };

  const handleSetSortParams = (params) => {
    setSortParams(params);
    saveSortParams(sortKeys.products, params);
  };

  const products = useTableData(
    setLoading,
    makeUpdate,
    scope,
    requests,
    sortParams,
  );

  const handleDeleteProduct = (id) => api.deleteProductById(id).then(() => {
    setMakeUpdate((v) => v + 1);
    toast(
      `${localization.t('general.product')} ${id} ${localization.t(
        'general.hasBeenSuccessfullyDeleted',
      )}`,
    );
  });

  useEffect(() => {
    if (allCheckedItems[reduxRowPerPage]) {
      dispatch(setCheckedItems(allCheckedItems[allCheckedItems.length - 1]));
    }
  }, [reduxRowPerPage]);

  useEffect(() => {
    setAllCheckedItems([...allCheckedItems, tableCheckedItems]);
  }, [tableCheckedItems]);

  return (
    <>
      <TableActionsBar
        scope={scope}
        deleteFunc={api.deleteProductById}
        headers={markUp.headers}
      >
        <Box>
          <Button
            id="add-product"
            color="primary"
            size="large"
            variant="contained"
            component={Link}
            to={`${parentPaths.productlist}/add`}
          >
            {localization.t('general.addProduct')}
          </Button>
        </Box>
      </TableActionsBar>
      <TableComponent
        allCheckedItems={allCheckedItems}
        sortParams={sortParams}
        setSortParams={handleSetSortParams}
        handleDeleteItem={handleDeleteProduct}
        defaultShowColumn={defaultShow}
        scope={scope}
        tableData={products}
        isLoading={isLoading}
      />
    </>
  );
};

export default ProductsScreen;

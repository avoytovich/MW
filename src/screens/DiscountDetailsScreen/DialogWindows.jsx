import React from 'react';
import PropTypes from 'prop-types';

import { Dialog } from '@material-ui/core';

import TableItems from '../../components/utils/Modals/TableItems';

import './discountDetailsScreen.scss';

const DialogWindows = ({
  productsModal,
  setProductsModalOpen,
  curProducts,
  availProducts,
  removeItem,
  addItem,
  storesModal,
  curStores,
  setStoresModalOpen,
  availStores,
  parentProductsModal,
  setParentProductsModalOpen,
  curProductsByParent,
  availParentProducts,
}) => (
  <>
    <Dialog
      open={productsModal}
      onClose={() => setProductsModalOpen(false)}
      aria-labelledby="table-items-dialog-title"
      fullWidth
      maxWidth="sm"
    >
      <TableItems
        values={curProducts}
        avail={availProducts}
        type="products"
        noDelete
        removeItem={(item) => removeItem(item, 'products')}
        addItem={(item) => addItem(item, 'products')}
      />
    </Dialog>

    <Dialog
      open={storesModal}
      onClose={() => setStoresModalOpen(false)}
      aria-labelledby="table-items-dialog-title"
      fullWidth
      maxWidth="sm"
    >
      <TableItems
        values={curStores}
        avail={availStores}
        type="stores"
        noDelete
        removeItem={(item) => removeItem(item, 'stores')}
        addItem={(item) => addItem(item, 'stores')}
      />
    </Dialog>
    <Dialog
      open={parentProductsModal}
      onClose={() => setParentProductsModalOpen(false)}
      aria-labelledby="table-items-dialog-title"
      fullWidth
      maxWidth="sm"
    >
      <TableItems
        values={curProductsByParent}
        avail={availParentProducts}
        type="parentProducts"
        noDelete
        removeItem={(item) => removeItem(item, 'parentProducts')}
        addItem={(item) => addItem(item, 'parentProducts')}
      />
    </Dialog>
  </>
);

export default DialogWindows;

DialogWindows.propTypes = {
  productsModal: PropTypes.bool,
  setProductsModalOpen: PropTypes.func,
  curProducts: PropTypes.array,
  availProducts: PropTypes.array,
  removeItem: PropTypes.func,
  addItem: PropTypes.func,
  storesModal: PropTypes.bool,
  curStores: PropTypes.array,
  setStoresModalOpen: PropTypes.func,
  availStores: PropTypes.array,
  parentProductsModal: PropTypes.bool,
  setParentProductsModalOpen: PropTypes.func,
  curProductsByParent: PropTypes.array,
  availParentProducts: PropTypes.array,
};

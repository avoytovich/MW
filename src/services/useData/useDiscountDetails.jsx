import { useState, useEffect } from 'react';
import { discountRequiredFields } from '../../screens/DiscountDetailsScreen/utils';
import {
  structureSelectOptions,
} from '../helpers/dataStructuring';
import api from '../../api';

const useDiscountDetails = (id, nxState) => {
  const [isLoading, setLoading] = useState(true);

  const [discount, setDiscount] = useState(null);
  const [curDiscount, setCurDiscount] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [update, setUpdate] = useState(0);

  const [selectOptions, setSelectOptions] = useState({
    refProducts: null,
    endUserGroups: null,
    countries: null,
    endUsers: null,
    stores: null,
    parentProducts: null,
    discountProducts: null,
  });

  const [amountType, setAmountType] = useState(null);

  useEffect(() => {
    let discountRequest;
    setLoading(true);

    if (id === 'add') {
      discountRequest = Promise.resolve({
        data: { customerId: nxState?.selectedCustomer?.id },
      });
    } else {
      discountRequest = api.getDiscountById(id);
    }
    discountRequest.then(({ data }) => {
      const checkedData = discountRequiredFields(data);
      setAmountType(data.discountRate ? 'byPercentage' : 'byCurrency');
      setDiscount(JSON.parse(JSON.stringify(checkedData)));
      setCurDiscount(JSON.parse(JSON.stringify(checkedData)));
      // const parentIds = data.parentProductIds?.length
      //   ? data.parentProductIds.join('&')
      //   : null;
      setLoading(false);

      const { customerId } = data;
      Promise.allSettled([
        api.getEndUsersByCustomerId(customerId),
        api.getStores({ filters: `&customerId=${customerId}` }),
        api.getDiscountProductsByIds(customerId),
        api.getParentProductsByIds(customerId, null),
        api.getEndUsersGroupsByCustomerId(customerId),
      ]).then(
        ([
          endUsers,
          stores,
          discountProducts,
          parentProducts,
          endUsersGroups,
        ]) => {
          const refDiscountProductsObjs = [];

          discountProducts.value?.data.items.forEach((product) => {
            if (
              product.publisherRefId
              && !refDiscountProductsObjs.filter(
                (e) => e.id === product.publisherRefId,
              ).length > 0
            ) {
              refDiscountProductsObjs.push({
                id: product.publisherRefId,
                value: product.publisherRefId,
              });
            }
          });
          setSelectOptions({
            ...selectOptions,
            endUsers:
              structureSelectOptions(endUsers.value.data?.items, 'fullName') || [],
            refProducts: refDiscountProductsObjs || [],
            endUserGroups:
              structureSelectOptions(endUsersGroups.value.data?.items, 'name') || [],
            stores:
              structureSelectOptions(stores.value?.data.items, 'name') || [],
            parentProducts:
              structureSelectOptions(
                parentProducts.value?.data.items,
                'genericName',
              ) || [],
            discountProducts:
              structureSelectOptions(
                discountProducts.value?.data.items,
                'genericName',
              ) || [],
          });
        },
      );
    })
      .catch(() => {
        setLoading(false);
      });
  }, [update]);

  const handleUpdateAmountType = (newValue) => {
    if (newValue === 'byPercentage' && !curDiscount.discountRate) {
      setCurDiscount({ ...curDiscount, discountRate: 1 });
    }
    setAmountType(newValue);
  };

  useEffect(() => {
    setHasChanges(JSON.stringify(curDiscount) !== JSON.stringify(discount));

    return () => setHasChanges(false);
  }, [
    curDiscount,
    discount,
  ]);
  return {
    isLoading,
    discount,
    curDiscount,
    hasChanges,
    amountType,
    setCurDiscount,
    setAmountType: handleUpdateAmountType,
    selectOptions,
    setUpdate,
  };
};

export default useDiscountDetails;

import { useState, useEffect } from 'react';
import { discountRequiredFields } from '../../screens/DiscountDetailsScreen/utils';
import {
  structureSelectOptions, structureProdAutocompleteSelectOptions,
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
        data: { customerId: nxState?.selectedCustomer?.id, discountRate: 0.1 },
      });
    } else {
      discountRequest = api.getDiscountById(id);
    }
    discountRequest.then(({ data }) => {
      const checkedData = discountRequiredFields(data);
      setAmountType(data.discountRate ? 'byPercentage' : 'byCurrency');
      // const parentIds = data.parentProductIds?.length
      //   ? data.parentProductIds.join('&')
      //   : null;

      const { customerId } = data;
      Promise.allSettled([
        api.getEndUsersByCustomerId(customerId),
        api.getStores(),
        api.getDiscountProductsByIds(customerId),
        api.getParentProductsByIds(customerId, null),
        api.getEndUsersGroups(),
      ]).then(
        ([
          endUsers,
          stores,
          discountProductsData,
          parentProductsData,
          endUsersGroups,
        ]) => {
          const refDiscountProductsObjs = [];

          discountProductsData.value?.data.items.forEach((product) => {
            if (
              product.publisherRefId
              && !refDiscountProductsObjs.filter(
                (e) => e.id === product.publisherRefId,
              ).length > 0
            ) {
              refDiscountProductsObjs.push({
                id: product.publisherRefId,
                value: `${product.publisherRefId} (${product.id})`,
              });
            }
          });
          const discountProducts = structureProdAutocompleteSelectOptions(
            {
              options: discountProductsData.value?.data.items,
              optionValue: 'genericName',
            },
          ) || [];
          const parentProducts = structureProdAutocompleteSelectOptions(
            {
              options: parentProductsData.value?.data.items,
              optionValue: 'genericName',
            },
          ) || [];
          const refProducts = refDiscountProductsObjs || [];
          const productIds = discountProducts
            .filter((obj) => checkedData.productIds.includes(obj?.id));

          const parentProductIds = parentProducts
            .filter((obj) => checkedData.parentProductIds.includes(obj?.id));
          const publisherRefIds = refProducts
            .filter((obj) => checkedData.publisherRefIds.includes(obj?.id));

          setDiscount(JSON.parse(JSON.stringify({
            ...checkedData,
            productIds,
            parentProductIds,
            publisherRefIds,
          })));
          setCurDiscount(JSON.parse(JSON.stringify({
            ...checkedData,
            productIds,
            parentProductIds,
            publisherRefIds,
          })));
          setSelectOptions({
            ...selectOptions,
            endUsers:
              structureSelectOptions({ options: endUsers.value.data?.items, optionValue: 'fullName' }) || [],
            refProducts,
            endUserGroups:
              structureSelectOptions({ options: endUsersGroups.value.data?.items, optionValue: 'name' }) || [],
            stores:
              structureSelectOptions({ options: stores.value?.data.items, optionValue: 'name' }) || [],
            parentProducts,
            discountProducts,
          });
          setLoading(false);
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

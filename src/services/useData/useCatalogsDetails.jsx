import { useState, useEffect } from 'react';
import api from '../../api';

const useCatalogsDetails = (id, nxState) => {
  const initialCatalogs = {
    running: true,
    salesMode: 'STANDARD',
    singleUse: false,
    status: 'ENABLED',
    type: 'INTERNAL',
  };

  const [isLoading, setLoading] = useState(true);
  const [customer, setCustomer] = useState(null);
  const [catalogs, setCatalogs] = useState(initialCatalogs);
  const [curCatalogs, setCurCatalogs] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    let catalogsRequest;
    setLoading(true);

    if (id === 'add') {
      catalogsRequest = Promise.resolve({
        data: {
          customerId: nxState?.selectedCustomer?.id,
          ...catalogs,
        },
      });
    } else {
      catalogsRequest = api.getCatalogsById(id);
    }
    catalogsRequest.then(({ data }) => {
      setCatalogs(JSON.parse(JSON.stringify(data)));
      setCurCatalogs(JSON.parse(JSON.stringify(data)));
      setLoading(false);

      const { customerId } = data;
      api.getCustomerById(customerId).then((res) => setCustomer(res.data));
    })
      .catch(() => {
        setLoading(false);
      });
  }, [update]);

  useEffect(() => {
    setHasChanges(JSON.stringify(curCatalogs) !== JSON.stringify(catalogs));

    return () => setHasChanges(false);
  }, [
    curCatalogs,
    catalogs,
  ]);
  return {
    isLoading,
    catalogs,
    curCatalogs,
    hasChanges,
    customer,
    setCurCatalogs,
    setUpdate,
  };
};

export default useCatalogsDetails;

import { useState, useEffect } from 'react';

import api from '../../api';

const useMetaRolesData = () => {
  const [data, setData] = useState();

  useEffect(() => {
    let isCanceled = false;

    api
      .getMetaRoles()
      .then(({ data: data_ }) => {
        if (!isCanceled) {
          setData(data_);
        }
      });

    return () => { isCanceled = true; };
  }, []);

  return data;
};

export default useMetaRolesData;

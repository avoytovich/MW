// ToDo[major]: refactor all useData to reuse common logic
import { useState, useEffect } from 'react';

import api from '../../api';

const useRolesData = () => {
  const [data, setData] = useState();

  useEffect(() => {
    let isCanceled = false;

    api
      .getRoles()
      .then(({ data: data_ }) => {
        if (!isCanceled) {
          setData(data_);
        }
      });

    return () => { isCanceled = true; };
  }, []);

  return data;
};

export default useRolesData;

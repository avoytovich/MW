// ToDo[major]: refactor all useData to reuse common logic
import { useState, useEffect } from 'react';

import api from '../../api';

const usePrivelegesData = () => {
  const [data, setData] = useState();

  useEffect(() => {
    let isCanceled = false;

    api
      .getPrivileges()
      .then(({ data: data_ }) => {
        if (!isCanceled) {
          setData(data_);
        }
      });

    return () => { isCanceled = true; };
  }, []);

  return data;
};

export default usePrivelegesData;

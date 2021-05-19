import deleteApi from './deleteApi';
import getAllApi from './getAllApi';
import getFewByIdsApi from './getFewByIdsApi';
import getOneByIdApi from './getOneByIdApi';
import postApi from './postApi';
import putApi from './putApi';

const api = {
  ...deleteApi,
  ...getAllApi,
  ...getFewByIdsApi,
  ...getOneByIdApi,
  ...postApi,
  ...putApi,
};

export default api;

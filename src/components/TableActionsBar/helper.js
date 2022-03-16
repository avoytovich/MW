const searchData = (scope) => {
  switch (scope) {
    case 'orderlist':
      return {
        id: 'id',
        label: '',
        type: 'text',
      };
    case 'subscriptions':
      return {
        id: 'id',
        name: 'name',
        label: '',
        type: 'text',
      };
    case 'licenses':
      return {
        id: 'id',
        label: '',
        type: 'text',
      };
    case 'carts':
      return {
        id: 'id',
        label: '',
        type: 'text',
      };
    case 'stores':
      return {
        id: 'id',
        name: 'name',
        label: '',
        type: 'text',
      };
    case 'productlist':
      return {
        id: 'id',
        name: 'genericName',
        label: '',
        type: 'text',
      };
    case 'prices':
      return {
        id: 'productId',
        name: 'productGenericName',
        label: '',
        type: 'text',
      };
    case 'recommendations':
      return {
        id: 'id',
        name: 'name',
        label: '',
        type: 'text',
      };
    case 'discountrules':
      return {
        id: 'id',
        name: 'name',
        label: '',
        type: 'text',
      };
    case 'marketingCampaigns':
      return {
        id: 'id',
        name: 'name',
        label: '',
        type: 'text',
      };
    case 'marketingAbandoned':
      return {
        id: 'id',
        name: 'name',
        label: '',
        type: 'text',
      };
    case 'enduserlist':
      return {
        id: 'id',
        name: 'email',
        label: '',
        type: 'text',
      };
    case 'endusergroups':
      return {
        id: 'id',
        name: 'name',
        label: '',
        type: 'text',
      };
    case 'resellers':
      return {
        id: 'id',
        name: 'email',
        label: '',
        type: 'text',
      };
    case 'realms':
      return {
        id: 'id',
        name: 'name',
        label: '',
        type: 'text',
      };
    default:
      return null;
  }
};

export {
  searchData,
};

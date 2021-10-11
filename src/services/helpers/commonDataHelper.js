import api from '../../api';

export const getRoleName = async (id) => {
  const loadedRoles = JSON.parse(sessionStorage.getItem('rolesData')) || [];
  const [existing] = loadedRoles.filter((c) => c.id === id);

  if (existing) {
    return existing.name || existing.id;
  }

  const updateStorage = (name) => {
    const loaded = JSON.parse(sessionStorage.getItem('rolesData')) || [];

    sessionStorage.setItem('rolesData', JSON.stringify([...loaded, { name: name || null, id }]));
  };

  const name = await api.getRoleById(id).then(({ data }) => {
    updateStorage(data?.name);

    return data?.name;
  }).catch(() => {
    updateStorage();

    return id;
  });

  return name || id;
};

export const getMetaRoleName = async (id) => {
  const loadedMetaRoles = JSON.parse(sessionStorage.getItem('metaRolesData')) || [];
  const [existing] = loadedMetaRoles.filter((c) => c.id === id);

  if (existing) {
    return existing.name || existing.id;
  }

  const updateStorage = (name) => {
    const loaded = JSON.parse(sessionStorage.getItem('metaRolesData')) || [];

    sessionStorage.setItem('metaRolesData', JSON.stringify([...loaded, { name: name || null, id }]));
  };

  const name = await api.getMetaRoleById(id).then(({ data }) => {
    updateStorage(data?.name);

    return data?.name;
  }).catch(() => {
    updateStorage();

    return id;
  });

  return name || id;
};

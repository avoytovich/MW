const defaultShow = {
  fullName: true,
  userName: true,
  email: true,
  createDate: true,
};

const markUp = {
  headers: [
    { value: 'Full Name', id: 'fullName' },
    { value: 'User ID', id: 'userName' },
    { value: 'Email', id: 'email' },
    { value: 'Account Created', id: 'createDate' },
  ],
};

const generateData = (data) => {
  const values = data.items.map((val) => ({
    id: val.id,
    fullName: `${val.firstName} ${val.lastName}`,
    userName: val.userName,
    email: val.email,
    createDate: val.createDate,
  }));

  const meta = {
    totalPages: data.totalPages,
  };

  Object.assign(markUp, { values, meta });

  return markUp;
};

export { generateData, defaultShow };

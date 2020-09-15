const USER_KEY = 'auth-user';

export const onSignIn = (data) => localStorage.setItem(USER_KEY, JSON.stringify(data));

export const onSignOut = () => localStorage.removeItem(USER_KEY);

export const getToken = () => {
  const { token } = JSON.parse(localStorage.getItem(USER_KEY)) || {};
  return token;
};

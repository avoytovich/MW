class Session {
  getRedirect = () => sessionStorage.getItem('redirect');

  getRealm = () => sessionStorage.getItem('realm');

  setRedirect = (redirect) => sessionStorage.setItem('redirect', redirect);

  setRealm = (realm) => sessionStorage.setItem('realm', realm);

  clearRedirect = () => sessionStorage.removeItem('redirect');
}

const session = new Session();

export default session;

class Session {
  getRedirect = () => sessionStorage.getItem('redirect');

  setRedirect = (redirect) => sessionStorage.setItem('redirect', redirect);

  clearRedirect = () => sessionStorage.removeItem('redirect');
}

const session = new Session();

export default session;

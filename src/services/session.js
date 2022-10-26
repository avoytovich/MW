class Session {
  getRedirect = () => sessionStorage.getItem('redirect');

  getRealm = () => sessionStorage.getItem('realm');

  getEditorCursor = (page) => sessionStorage.getItem(`editor-cursor-${page}`);

  setRedirect = (redirect) => sessionStorage.setItem('redirect', redirect);

  setRealm = (realm) => sessionStorage.setItem('realm', realm);

  setEditorCursor = (page, values) => sessionStorage.setItem(`editor-cursor-${page}`, values);

  clearRedirect = () => sessionStorage.removeItem('redirect');
}

const session = new Session();

export default session;

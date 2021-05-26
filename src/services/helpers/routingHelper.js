export default (() => {
  const [, initPath] = window.location.pathname.split('/');

  const isBranchPath = !!initPath.match(/^IAP-[0-9]+$/);

  return isBranchPath ? `/${initPath}` : '';
})();

export default (() => {
  const [, initPath] = window.location.pathname.split('/');

  const isBranchPath = !!initPath.match(/^iap-[0-9]+$/);

  return isBranchPath && process.env.ENV_MODE === 'staging' ? `/${initPath}` : '';
})();

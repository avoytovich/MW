export default (() => {
  const [, initPath] = window.location.pathname.split('/');

  const isBranchPath = !!initPath.match(/^(iap|devops)-.+$/i);

  return isBranchPath && process.env.ENV_MODE === 'staging' ? `/${initPath}` : '';
})();

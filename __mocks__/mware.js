const exp = require('../access');

let workflows = {
  WorkflowID: 2,
  WorkflowName: 'Allow only specific IPs for ADMIN and SUPER_ADMIN roles',
  Path: '/admin/*',
  Params: [
    {
      Name: 'ip_address',
      Expression: '$request.getIpAddress',
    },
    {
      Name: 'user_role',
      Expression: '$user.getRole',
    },
  ],
  Rules: [
    {
      RuleName: 'Allow only specific IP',
      Expression: "ip_range($ip_address, '100.100.100.1/28')",
    },
    {
      RuleName: 'Check role',
      Expression: "in($user_role, 'ADMIN', 'SUPER_ADMIN')",
    },
  ],
};

let isPath = false;
let isIpAddress = false;
let isAuthorized = false;
let ipAddress = '';
let userRole = '';

const mware = () => {
  let path = '/admin';

  const isPat = exp.checkPath(workflows.Path, path, isPath);

  if (!isPat) return 'nije admin putanja';

  ipAddress = '100.100.100.0';

  userRole = 'ADMIN';

  const { isAuthorized: isAuth, isIpAddress: isIpAdd } = exp.checkRules(
    workflows.Rules,
    userRole,
    ipAddress,
    isAuthorized,
    isIpAddress
  );
  
  if (
    isAuth &&
    isIpAdd &&
    typeof isAuth == 'boolean' &&
    typeof isIpAdd === 'boolean'
  )
    return true;
  else if (
    typeof isAuth == 'boolean' &&
    typeof isIpAdd === 'boolean'
  )
    return false;
};

module.exports = mware;

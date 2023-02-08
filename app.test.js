const exp = require('./access');
const mware = require('./mware');

jest.mock('./mware');

function returnString(param) {
  if (typeof param === 'boolean' && param) return (param = 'true');
  else if (typeof param === 'boolean') return (param = 'false');
}

test('should output true or false for path', () => {
  const path = exp.checkPath('/admin/*', '/admin', false);
  const pathString = returnString(path);
  expect(pathString).toMatch(/true|false/);
});

test('should output true or false for role', () => {
  const role = exp.checkRole(['ADMIN', 'ADMIN', 'SUPER_ADMIN']);
  const roleString = returnString(role);
  expect(roleString).toMatch(/true|false/);
});

test('should output true or false for ip', () => {
  const ip = exp.checkIp(['100.100.100.0', '100.100.100.1/28']);
  const ipString = returnString(ip);
  expect(ipString).toMatch(/true|false/);
});

test('should output true or false for rules', () => {
  const ruleArr = [
    {
      RuleName: 'Allow only specific IP',
      Expression: "ip_range('100.100.100.0', '100.100.100.1/28')",
    },
    {
      RuleName: 'Check role',
      Expression: "in('ADMIN', 'ADMIN', 'SUPER_ADMIN')",
    },
  ];

  const rulesIp = exp.checkRules(
    ruleArr,
    'ADMIN',
    '100.100.100.0',
    false,
    false
  );

  const { helper: helperIp } = rulesIp;
  const resultIp = helperIp('ip');
  const helperIpString = returnString(resultIp);

  expect(helperIpString).toMatch(/true|false/);

  const rulesRole = exp.checkRules(
    ruleArr,
    'ADMIN',
    '100.100.100.0',
    false,
    false
  );

  const { helper: helperRole } = rulesRole;
  const resultRole = helperRole('role');
  const helperRoleString = returnString(resultRole);

  expect(helperRoleString).toMatch(/true|false/);
});

test('should output true or false for access', () => {
  const access = mware();
  let accessString;

  if (typeof access === 'string') accessString = access;
  else accessString = returnString(access);

  expect(accessString).toMatch(/true|false|nije admin putanja/);
});

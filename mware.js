const fs = require('fs').promises;
const path = require('path');

const exp = require('./access');

let workflows;
let isPath = false;
let isIpAddress = false;
let isAuthorized = false;
let ipAddress = '';
let userRole = '';

async function getRules(acl) {
  const p = path.join(path.dirname(require.main.filename), acl);

  const file = await fs.readFile(p);
  return await JSON.parse(file);
}

getRules('rules2.json').then((res) => {
  workflows = res;
});

const mware = (req, res, next) => {
  let path = req.path;

  const isPat = exp.checkPath(workflows.Path, path, isPath);

  if (!isPat) return res.status(200).json('nije admin putanja');

  for (const p of workflows.Params) {
    if (p.Name === 'ip_address') {
      ipAddress = req.ip;
    }
    if (p.Name === 'user_role') {
      userRole = req.headers.key;
    }
  }

  const { isAuthorized: isAuth, isIpAddress: isIpAdd } = exp.checkRules(
    workflows.Rules,
    userRole,
    ipAddress,
    isAuthorized,
    isIpAddress
  );

  if (isAuth && isIpAdd) return res.status(200).json(true);
  else return res.status(403).json(false);
};

module.exports = mware;

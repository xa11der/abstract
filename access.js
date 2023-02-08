const ipRange = require('ip-range-check');

function checkPath(configPath, path, isPath) {
  let parsedPath = '';

  if (configPath.includes('*')) {
    parsedPath = configPath.split('*')[0];
  } else parsedPath = configPath;

  if (path.startsWith(parsedPath)) return (isPath = true); // regExp; /admin/ putanja isto moze da vrati neku stranicu
  else return (isPath = false);
}

function checkRole(params) {
  for (let i = 1; i <= params.length; i++) {
    if (params[0] === params[i]) {
      return true;
    }
  }
  return false;
}

function checkIp(params) {
  const inArray = params.slice(1);
  return ipRange(params[0], inArray);
}

function checkRules(rules, userRole, ipAddress, isAuthorized, isIpAddress) {
  for (const r of rules) {
    function helper(flag) {
      let result;
      let comparison;
      let fn;

      if (flag === 'role') {
        comparison = userRole;
        result = isAuthorized;
        fn = checkRole;
      } else if (flag === 'ip') {
        comparison = ipAddress;
        result = isIpAddress;
        fn = checkIp;
      }

      if (r.Expression.startsWith('$')) {
        // ako pocinje znakom $ znaci da tu imamo promenljivu
        const operator = r.Expression.match(/== | === | != | !==/);
        if (operator[0].startsWith('=')) {
          if (
            comparison ===
            r.Expression.split(operator[0])[1].trim().slice(1, -1)
          )
            result = true;
        } else result = false;
      } else {
        // u suprotnom je u pitanju fn
        const args = r.Expression.split('(')[1].split(')')[0].split(',');
        const transformedArgs = args.map((a) => {
          if (a.startsWith('$')) return comparison;
          else return a.trim().slice(1, -1);
        });

        result = fn(transformedArgs);
      }
      return result;
    }

    if (r.RuleName === 'Allow only specific IP') {
      isIpAddress = helper('ip');
    }
    if (r.RuleName === 'Check role') {
      isAuthorized = helper('role');
    }
  }

  return { helper, isAuthorized, isIpAddress };
}

module.exports = {
  checkPath,
  checkRole,
  checkIp,
  checkRules,
};

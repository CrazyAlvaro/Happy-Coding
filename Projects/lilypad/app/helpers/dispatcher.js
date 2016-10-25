const _ = require('lodash');

function generateDispatcher(...funcs) {
  return (target, ...args) => {
    let ret = undefined;

    for (const func of funcs) {
      ret = func.apply(func, [target, ...args]);

      if (!_.isUndefined(ret)) {
        return ret;
      }
    }
    return ret;
  };
}

function reactor(type, func) {
  return (target, ...args) => {
    if (type === target) {
      return func.apply(func, args);
    }
    return undefined;
  };
}

module.exports = {
  generateDispatcher,
  reactor,
};

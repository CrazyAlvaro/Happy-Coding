import configFile from '../db-migrate/database.json';
import _ from 'lodash';

const config = configFile[process.env.NODE_ENV || configFile.defaultEnv];

const resolved = _.mapValues(config, (v, k) => {
  if (_.isObject(v)) {
    if (!v.ENV) {
      throw new Error('expecting the environment value to contain key ENV');
    } else {
      const value = process.env[v.ENV];
      if (!value) {
        throw new Error(`db config key '${k}' must be present as env '${v.ENV}'`);
      }
      return value;
    }
  } else {
    return v;
  }
});

const {
  host,
  port,
  user,
  database,
} = resolved;

const passwordString = resolved.password ? `:${resolved.password}` : '';

export default _.merge({
  connString: `postgres://${user}${passwordString}@${host}:${port}/${database}`,
}, resolved);

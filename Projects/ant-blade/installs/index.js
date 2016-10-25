import 'babel-polyfill';
import installDefaultAdmin from './installDefaultAdmin';
import installDefaultRoles from './installDefaultRoles';
import winston from 'winston';

installDefaultAdmin()
.then(() => installDefaultRoles())
.then(() => {
  winston.log('installing defaults with success!');
  process.exit();
});

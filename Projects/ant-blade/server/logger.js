import winston from 'winston';
import PgLogger from 'winston-pg';
import dbConfig from './db';

const { connString } = dbConfig;

winston.log('configured postgres transport for winston at', connString);

export const authLogger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      colorize: process.env.NODE_ENV !== 'production',
      timestamp: true,
    }),
    new PgLogger({
      connString,
      tableName: 'winston_logs',
    }),
  ],
});

// utility for auth logging
export function logAuthn(level, operation, principal, err) {
  switch (level) {
    case 'info':
      authLogger.info(`successfully ${operation} for ${principal}`, {
        operation,
        principal,
      });
      break;
    case 'error':
      authLogger.error(`failed to ${operation} for ${principal} error is ${err}`, {
        operation,
        principal,
        err,
      });
      break;
    default:
      winston.warn(`log level ${level} not supported in logAuthn`);
      return;
  }
}

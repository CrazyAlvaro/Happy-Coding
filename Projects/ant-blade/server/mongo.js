import { MongoClient } from 'mongodb';
import winston from 'winston';

export const MONGODB_HOST = process.env.MONGODB_HOST || 'localhost';
export const MONGODB_PORT = process.env.MONGODB_PORT || 27017;
export const MONGODB_DB = process.env.MONDOB_DB || 'ant_blade_auth';

export const URL = `mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DB}`;

export async function getDbInstance() {
  try {
    winston.info('trying to connect to mongodb at', URL);
    const db = await MongoClient.connect(URL);
    winston.info('successfully connected to mongodb at', URL);
    return db;
  } catch (err) {
    winston.error('failed to connect to mongo at', URL, 'error is', err);
    // we should exit because it does not make sense to continue
    return process.exit(err);
  }
}

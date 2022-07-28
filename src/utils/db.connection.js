import mongoose from 'mongoose';

import config from '../configs';
import logger from './logger';
let database;
const connect = async () => {
  const MONGODOB_URL = config.MONGO_DB_URL;
  //database  object already initialized do not reinitialize it
  if (database) return;

  mongoose
    .connect(MONGODOB_URL)
    .then((connection) => {
      database = connection;
      logger.info('Database Synced');
    })
    .catch((err) => {
      logger.error(err.message);
    });
};

export { connect };

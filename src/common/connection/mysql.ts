import {
  Sequelize,
  Options,
  ConnectionError,
  ConnectionTimedOutError,
  TimeoutError,
} from "sequelize";
import config from "../../config";
import { Logger } from "../../logger";

const logger = Logger.getInstance(module);
const mysqlDB = {} as { sequelize: Sequelize };

const connection: Options = {
  host: config.mysql.host,
  dialect: "mysql",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true,
    },
  },
  port: config.mysql.port,
  quoteIdentifiers: false,
  logging: false,
  retry: {
    max: 5,
    match: [ConnectionError, ConnectionTimedOutError, TimeoutError],
  },
  pool: {
    max: 100,
    min: 0,
    acquire: 60000,
    idle: 10000,
  },
};

const sequelize: Sequelize = new Sequelize(
  config.mysql.database,
  config.mysql.username,
  config.mysql.password,
  connection
);

const connectMysqlDB = (): Sequelize => {
  sequelize
    .authenticate()
    .then(() => {
      logger.info("Connection to mysql has been established successfully");
    })
    .catch((err: Error) => {
      logger.error(
        `Unable to connect to the mysql database: ${JSON.stringify(
          config.mysql.database
        )} ${JSON.stringify(err)}`
      );
    });

  mysqlDB.sequelize = sequelize;

  return mysqlDB.sequelize;
};

const asyncConnectMysqlDB = async (): Promise<Sequelize> => {
  await sequelize
    .authenticate()
    .then(() => {
      logger.info("Connection to mysql has been established successfully");
    })
    .catch((err: Error) => {
      logger.error(
        `Unable to connect to the mysql database: ${JSON.stringify(
          config.mysql.database
        )} ${JSON.stringify(err)}`
      );
    });

  mysqlDB.sequelize = sequelize;

  return mysqlDB.sequelize;
};

export { connectMysqlDB, mysqlDB, asyncConnectMysqlDB };

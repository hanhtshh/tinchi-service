const dotenvSafe = require('dotenv-safe');
const path = require('path');

dotenvSafe.config({
  allowEmptyValues: true,
  path: path.join(__dirname, `../../.env`),
  sample: path.join(__dirname, '../../example.env')
});

const config = {
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true,
    }
  }
};

module.exports = {
  local: config,
  dev: config,
  stg: config,
  prd: config
};

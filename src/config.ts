import dotenvSafe from "dotenv-safe";
import path from "path";

dotenvSafe.config({
  allowEmptyValues: true,
  example: path.join(__dirname, "../example.env"),
});

export interface IConfig {
  env: string;
  port: string;
  mysql: {
    host: string;
    username: string;
    password: string;
    database: string;
    schema: string;
    port: number;
  };
  auth_secret: string;
  token_secret: string;
  admin_secret: string;
}

const config = <IConfig>{
  env: process.env.NODE_ENV,
  port: process.env.NODE_PORT,
  mysql: {
    host: process.env.MYSQL_HOST,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    schema: process.env.MYSQL_SCHEMA,
    port: Number(process.env.MYSQL_PORT),
  },
  auth_secret: process.env.AUTH_SECRET,
  token_secret: process.env.TOKEN_SECRET,
  admin_secret: process.env.ADMIN_SECRET,
};

export default config;

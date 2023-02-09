import config from "../../config";

const MODEL_NAME = {
  USER: "users",
  CLASS: "classes",
  USER_CLASS: "user_classes",
  SESSION: "sessions",
  CLASS_SESSION: "class_sessions",
};

const SCHEMA = config.mysql.schema;

export { MODEL_NAME, SCHEMA };

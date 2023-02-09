import { Sequelize } from "sequelize";
import { Class } from "./class.model";
import { ClassSession } from "./classSession.model";
import { Session } from "./session.model";
import { User } from "./user.model";
import { UserClass } from "./userClass.model";

export { User, UserClass, Class, Session, ClassSession };

export const initModels = (sequelize: Sequelize) => {
  User.initModel(sequelize);
  UserClass.initModel(sequelize);
  Class.initModel(sequelize);
  Session.initModel(sequelize);
  ClassSession.initModel(sequelize);

  return {
    User,
    UserClass,
    Class,
    Session,
    ClassSession,
  };
};

import { UserClass } from "../../models";
class UserClassRepository {
  public async createUserClass(condition: any) {
    const result = await UserClass.findOrCreate({
      where: condition,
    });
    return result;
  }

  public async findOrCreateUser(condition: any) {
    const result = await UserClass.findOrCreate({
      where: condition,
    });
    return result;
  }

  public async getUserByQuery(condition: any) {
    const result = await UserClass.findOne({
      where: condition,
    });
    return result;
  }

  public async getAllUserClassByUserId(condition: any) {
    const result = await UserClass.findAll({
      where: condition,
    });
    return result;
  }

  public async getUserDetail(condition: any) {
    const result = await UserClass.findOne({
      where: condition,
    });
    return result;
  }

  public async deleteAllClass(condition: any) {
    const result = await UserClass.destroy({
      where: condition,
    });
    return result;
  }
}

export const userClassRepository = new UserClassRepository();

import { User } from "../../models";
class UserRepository {
  public async findOrCreateUser(condition: any) {
    const result = await User.findOrCreate({
      where: condition,
    });
    return result;
  }

  public async getUserByQuery(condition: any) {
    const result = await User.findOne({
      where: condition,
    });
    return result;
  }

  public async getAllUserByRole(
    condition: any,
    pageSize: number,
    current: number
  ) {
    const result = await User.findAll({
      where: condition,
      offset: pageSize * (current - 1),
    });
    return result;
  }

  public async getUserDetail(condition: any) {
    const result = await User.findOne({
      where: condition,
    });
    return result;
  }
}

export const userRepository = new UserRepository();

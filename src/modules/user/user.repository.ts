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

  public async updateUserInfo(userInfo: any, condition: any) {
    const result = await User.update(
      {
        ...userInfo,
      },
      {
        where: condition,
      }
    );
    return result;
  }

  public async getAllUserByRole(
    condition: any,
    pageSize: number,
    current: number
  ): Promise<[User[], number]> {
    const [result, totalRows] = await Promise.all([
      User.findAll({
        where: condition,
        offset: pageSize * (current - 1),
      }),
      User.count({
        where: condition,
      }),
    ]);
    return [result, totalRows];
  }

  public async getUserDetail(condition: any) {
    const result = await User.findOne({
      where: condition,
    });
    return result;
  }
}

export const userRepository = new UserRepository();

import { Session } from "../../models";
import { Op } from "sequelize";
class SessionRepository {
  public async findOrCreateSession(condition: any) {
    const result = await Session.findOrCreate({
      where: condition,
    });
    return result;
  }

  public async getSessionByQuery(condition: any) {
    const result = await Session.findOne({
      where: condition,
    });
    return result;
  }

  public async getAllSession(pageSize: number, current: number, date: any) {
    if (date) {
      const date_check = new Date(date);
      console.log(date_check);
      const where: any = {
        date: {
          [Op.between]: [
            new Date(date_check.getTime() - 60 * 60 * 24 * 1000),
            new Date(date_check.getTime() + 60 * 60 * 24 * 1000),
          ],
        },
      };
      const [sessions] = await Promise.all([
        Session.findAll({
          where,
          limit: pageSize,
          offset: pageSize * (current - 1),
        }),
      ]);
      return [sessions, sessions.length];
    }
    const [sessions, totalRows] = await Promise.all([
      Session.findAll({
        limit: pageSize,
        offset: pageSize * (current - 1),
      }),
      Session.count(),
    ]);
    return [sessions, totalRows];
  }
}

export const sessionRepository = new SessionRepository();

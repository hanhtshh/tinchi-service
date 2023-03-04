import { Session } from "../../models";
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

  public async getAllSession(pageSize: number, current: number) {
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

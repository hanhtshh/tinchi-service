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
}

export const sessionRepository = new SessionRepository();

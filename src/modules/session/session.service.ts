import { Logger } from "../../logger";
import { Session, SessionCreateAttributes } from "../../models/session.model";
import { SessionServiceInterface } from "./session.interface";
import { sessionRepository } from "./session.repository";

export class SessionService implements SessionServiceInterface {
  private logger: Logger;

  constructor() {
    this.logger = Logger.getInstance(module);
  }

  //Get Session Info
  public async getSessionInfo(query: any): Promise<any> {
    try {
      this.logger.info("ok");
      return sessionRepository.getSessionByQuery(query);
    } catch (error) {
      throw error;
    }
  }

  //Get all session
  public async getAllSession(
    pageSize: number,
    current: number,
    date: string
  ): Promise<any> {
    try {
      this.logger.info("ok");
      const [sessions, totalRows] = await sessionRepository.getAllSession(
        pageSize,
        current,
        date
      );
      return { sessions, totalRows };
    } catch (error) {
      throw error;
    }
  }

  //Create Session account
  public async createNewSession(
    SessionInfo: SessionCreateAttributes
  ): Promise<any> {
    try {
      return sessionRepository.findOrCreateSession(SessionInfo);
    } catch (error) {
      throw error;
    }
  }

  //update Session account
  public async updateSession(
    SessionInfo: SessionCreateAttributes,
    id: number
  ): Promise<any> {
    try {
      return Session.update(SessionInfo, {
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }
}

export const sessionService = new SessionService();

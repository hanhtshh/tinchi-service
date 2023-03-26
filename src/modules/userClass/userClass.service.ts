import { Logger } from "../../logger";
import { userClassRepository } from "../userClass/userClass.repository";

export class UserClassService {
  private logger: Logger;

  constructor() {
    this.logger = Logger.getInstance(module);
  }

  //Get User Info
  public async getUserInfo(query: any): Promise<any> {
    try {
      this.logger.info("ok");
      return userClassRepository.getUserByQuery(query);
    } catch (error) {
      throw error;
    }
  }

  //Get User Info
  public async createUserClass(
    user_id: number,
    class_id: number
  ): Promise<any> {
    try {
      const result = await userClassRepository.createUserClass({
        user_id,
        class_id,
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export const userClassService = new UserClassService();

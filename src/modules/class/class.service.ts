import { HttpError } from "../../common/http";
import { Logger } from "../../logger";
import { ClassSession } from "../../models";
import { ClassServiceInterface } from "./class.interface";
import { classRepository } from "./class.repository";

export class ClassService implements ClassServiceInterface {
  private logger: Logger;

  constructor() {
    this.logger = Logger.getInstance(module);
  }

  //Get class Info
  public async getClassInfo(query: any): Promise<any> {
    try {
      this.logger.info("ok");
      return classRepository.getClassByQuery(query);
    } catch (error) {
      throw error;
    }
  }

  public async getAllClass(
    pageSize: number,
    current: number,
    name: string
  ): Promise<any> {
    try {
      this.logger.info("ok");
      const [classes, totalRows] = await classRepository.getAllClass(
        pageSize,
        current,
        name
      );
      return {
        classes,
        totalRows,
      };
    } catch (error) {
      throw error;
    }
  }

  //Create class account
  public async createNewClass(classInfo: any): Promise<any> {
    try {
      const classResult = await classRepository.findOrCreateClass(classInfo);
      const sessionSet = new Set(classInfo.listSessionId);
      if (sessionSet.size !== classInfo.listSessionId.length) {
        throw new HttpError(
          400,
          "Kíp học bị trùng, vui lòng kiểm tra lại",
          "Kíp học bị trùng, vui lòng kiểm tra lại"
        );
      }
      await ClassSession.bulkCreate(
        classInfo.listSessionId.map((sessionId: any) => ({
          session_id: sessionId,
          class_id: classResult.id,
        }))
      );
      return classResult;
    } catch (error) {
      throw error;
    }
  }
}

export const classService = new ClassService();

import { Logger } from "../../logger";
import { ClassCreateAttributes } from "../../models/class.model";
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

  public async getAllClass(pageSize: number, current: number): Promise<any> {
    try {
      this.logger.info("ok");
      const [classes, totalRows] = await classRepository.getAllClass(
        pageSize,
        current
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
  public async createNewClass(classInfo: ClassCreateAttributes): Promise<any> {
    try {
      return classRepository.findOrCreateClass(classInfo);
    } catch (error) {
      throw error;
    }
  }
}

export const classService = new ClassService();

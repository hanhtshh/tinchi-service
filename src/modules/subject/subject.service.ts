import { Logger } from "../../logger";
import { SubjectCreateAttributes } from "../../models/subject.model";
import { subjectRepository } from "./subject.repository";

export class SubjectService {
  private logger: Logger;

  constructor() {
    this.logger = Logger.getInstance(module);
  }

  //Get class Info
  public async getSubjectInfo(query: any): Promise<any> {
    try {
      this.logger.info("ok");
      return subjectRepository.getSubjectByQuery(query);
    } catch (error) {
      throw error;
    }
  }

  public async getAllSubject(pageSize: number, current: number): Promise<any> {
    try {
      this.logger.info("ok");
      const [subjects, totalRows] = await subjectRepository.getAllSubject(
        pageSize,
        current
      );
      return {
        subjects,
        totalRows,
      };
    } catch (error) {
      throw error;
    }
  }

  //Create class account
  public async createNewSubject(
    classInfo: SubjectCreateAttributes
  ): Promise<any> {
    try {
      return subjectRepository.findOrCreateSubject(classInfo);
    } catch (error) {
      throw error;
    }
  }

  //update subject
  public async updateSubject(
    id: number,
    subjectInfo: SubjectCreateAttributes
  ): Promise<any> {
    try {
      return subjectRepository.updateSubjectById(id, subjectInfo);
    } catch (error) {
      throw error;
    }
  }
}

export const subjectService = new SubjectService();

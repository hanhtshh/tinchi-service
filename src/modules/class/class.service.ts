import { HttpError } from "../../common/http";
import { Logger } from "../../logger";
import { ClassSession } from "../../models";
import { sessionRepository } from "../session/session.repository";
import { userRepository } from "../user/user.repository";
import { userClassRepository } from "../userClass/userClass.repository";
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
      const classDetail = await classRepository.getClassByQuery(query);
      const listUserClass = await userClassRepository.getAllUserClassByUserId({
        class_id: classDetail?.id,
      });
      const listUserInfo = await Promise.all(
        listUserClass?.map((userClass: any) =>
          userRepository.getUserByQuery({
            id: userClass.user_id,
          })
        )
      );
      let sessionList;
      const classSessionList = await ClassSession.findAll({
        where: {
          class_id: classDetail?.id,
        },
        raw: true,
      });
      sessionList = await Promise.all(
        classSessionList?.map((classSession) =>
          sessionRepository.getSessionByQuery({
            id: classSession.session_id,
          })
        )
      );
      return {
        ...classDetail,
        listUserInfo,
        sessionList,
      };
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

  //update class account
  public async updateClass(classInfo: any): Promise<any> {
    try {
      const classResult = await classRepository.updateClass(
        classInfo,
        classInfo.id
      );
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
          class_id: classResult[1][0].id,
        }))
      );
      return classResult;
    } catch (error) {
      throw error;
    }
  }

  //Check duplicate schedule
  public async checkSchedule(listClassId: number[]): Promise<any> {
    try {
      console.log(listClassId);
      const listSessionArray = await Promise.all(
        listClassId.map((class_id) =>
          ClassSession.findAll({
            where: {
              class_id: class_id,
            },
          })
        )
      );
      let listSessionId: number[] = [];
      listSessionArray.forEach((listSubSessionClass) => {
        listSessionId = listSessionId.concat(
          listSubSessionClass.map((sessionClass) => sessionClass.session_id)
        );
      });
      const listSessionIdSet = new Set(listSessionId);
      if (listSessionIdSet.size == listSessionId.length) {
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }

  //Add class
  public async addClass(listClassId: number[], user_id: number): Promise<any> {
    try {
      const checkScheduleResult = await this.checkSchedule(listClassId);
      if (checkScheduleResult) {
        await userClassRepository.deleteAllClass({
          user_id: user_id,
        });
        await Promise.all(
          listClassId.map((class_id) =>
            userClassRepository.createUserClass({
              user_id: user_id,
              class_id: class_id,
            })
          )
        );
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }
}

export const classService = new ClassService();

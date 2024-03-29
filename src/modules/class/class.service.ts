import { HttpError } from "../../common/http";
import { Logger } from "../../logger";
import { Class, ClassSession, UserClass } from "../../models";
import { sessionRepository } from "../session/session.repository";
import { subjectRepository } from "../subject/subject.repository";
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
      if (classResult[0]) {
        await ClassSession.destroy({
          where: {
            class_id: classInfo.id,
          },
        });
        await ClassSession.bulkCreate(
          classInfo.listSessionId.map((sessionId: any) => ({
            session_id: sessionId,
            class_id: classInfo.id,
          }))
        );
      }
      return classResult;
    } catch (error) {
      throw error;
    }
  }

  //update class account
  public async getClassPer7Days(): Promise<any> {
    try {
      const listClassPerDays = await Promise.all([
        classRepository.getClassPer1DayAgo(7),
        classRepository.getClassPer1DayAgo(6),
        classRepository.getClassPer1DayAgo(5),
        classRepository.getClassPer1DayAgo(4),
        classRepository.getClassPer1DayAgo(3),
        classRepository.getClassPer1DayAgo(2),
        classRepository.getClassPer1DayAgo(1),
      ]);
      const totalSlot = await classRepository.getTotalSlot();
      // const list_empty_slot = await classResult.map((class_detail)=>class_detail.)
      return listClassPerDays.map((classPerDay, index) => {
        let emptySlot = totalSlot;
        console.log(index);
        for (let i = index; i < 6; i++) {
          emptySlot = emptySlot + listClassPerDays[i + 1];
        }
        return {
          emptySlot,
          submitSlot: classPerDay,
        };
      });
    } catch (error) {
      throw error;
    }
  }

  //Check duplicate schedule
  public async checkSchedule(listClassId: number[]): Promise<any> {
    try {
      let result = true;
      const listClass = await Promise.all(
        listClassId.map((class_id) => classRepository.getClassById(class_id))
      );
      listClass.forEach((class_info) => {
        if (
          (class_info?.total_student || 0) + 1 >
          (class_info?.max_student || 0)
        ) {
          result = false;
        }
      });
      if (!result) {
        return result;
      }
      const listSubjectId = listClass.map(
        (classDetail) => classDetail?.subject_id
      );
      if (new Set(listSubjectId).size !== listSubjectId.length) {
        return false;
      }
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
        return listClass;
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
        await Promise.all(
          checkScheduleResult.map(async (classDetail: any) =>
            classRepository.updateClass(
              {
                total_student: await UserClass.count({
                  where: {
                    class_id: classDetail?.id,
                  },
                }),
              },
              classDetail?.id
            )
          )
        );
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }

  //update class account
  public async getTotalEmpty(): Promise<any> {
    try {
      const totalEmpty = await classRepository.getTotalSlot();
      const submitSlot = await Class.sum("total_student");
      return {
        totalEmpty,
        submitSlot,
      };
    } catch (error) {
      throw error;
    }
  }

  //update class account
  public async getClassesDashboard(): Promise<any> {
    try {
      const classes = await Class.findAll({
        order: [["total_student", "DESC"]],
        limit: 10,
      });
      const classesFormat = await Promise.all(
        classes.map(async (classDetail: any) => {
          const subject = await subjectRepository.getSubjectById(
            classDetail.dataValues.subject_id
          );
          if (subject?.name.toUpperCase().includes("")) {
            return {
              ...classDetail.dataValues,
              subject,
            };
          }
          return null;
        })
      );

      return classesFormat.filter((class_check) => class_check != null);
    } catch (error) {
      throw error;
    }
  }
}

export const classService = new ClassService();

import CryptoJs from "crypto-js";
import jwt from "jsonwebtoken";
import { HttpError } from "../../common/http";
import config from "../../config";
import { Logger } from "../../logger";
import { UserCreateAttributes } from "../../models/user.model";
import { classRepository } from "../class/class.repository";
import { userClassRepository } from "../userClass/userClass.repository";

import { UserServiceInterface } from "./user.interface";
import { userRepository } from "./user.repository";
import { Op } from "sequelize";
import { subjectRepository } from "../subject/subject.repository";
import { ClassSession } from "../../models";
import { sessionRepository } from "../session/session.repository";
import { classService } from "../class/class.service";

export class UserService implements UserServiceInterface {
  private logger: Logger;

  constructor() {
    this.logger = Logger.getInstance(module);
  }

  //Get User Info
  public async getUserInfo(query: any): Promise<any> {
    try {
      this.logger.info("ok");
      return userRepository.getUserByQuery(query);
    } catch (error) {
      throw error;
    }
  }

  //Create User account
  public async createUserAccount(
    userInfo: any,
    listClassId: any
  ): Promise<any> {
    try {
      const secret = config.auth_secret;
      const encryptedPassword = CryptoJs.AES.encrypt(
        userInfo.password,
        secret
      ).toString();
      const newUser = await userRepository.findOrCreateUser({
        ...userInfo,
        password: encryptedPassword,
      });
      await classService.addClass(listClassId, newUser[0].id);
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  //update user acount
  public async updateUserAccount(userInfo: UserCreateAttributes): Promise<any> {
    try {
      const secret = config.auth_secret;
      const encryptedPassword = CryptoJs.AES.encrypt(
        userInfo.password,
        secret
      ).toString();
      const newUser = await userRepository.updateUserInfo(
        {
          ...userInfo,
          password: encryptedPassword,
        },
        {
          id: userInfo.id,
        }
      );
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  //Register
  public async registerUser(
    email: string,
    password: string,
    name: string,
    phone_number: string,
    secret: string
  ): Promise<any> {
    try {
      if (secret === config.admin_secret) {
        console.log(secret);
        const encryptedPassword = CryptoJs.AES.encrypt(
          password,
          config.auth_secret
        ).toString();
        console.log(encryptedPassword);
        const newAdmin = await userRepository.findOrCreateUser({
          email,
          password: encryptedPassword,
          name,
          phone_number,
          role: 2,
        });
        return newAdmin;
      }

      throw new HttpError(
        400,
        "Invalid secret",
        "Mã bí mật không đúng, vui lòng kiểm tra lại!"
      );
    } catch (error) {
      throw error;
    }
  }

  //Login
  public async loginUser(email: string, password: string): Promise<any> {
    try {
      const secret = config.auth_secret;
      const userInfo = await userRepository.getUserByQuery({ email });
      if (userInfo) {
        const comparePassword = CryptoJs.AES.decrypt(
          userInfo.password,
          secret
        ).toString(CryptoJs.enc.Utf8);
        if (password === comparePassword) {
          const token = jwt.sign(
            {
              id: userInfo.id,
              name: userInfo.name,
              email: userInfo.email,
              phone_number: userInfo.phone_number,
              role: userInfo.role,
            },
            config.token_secret,
            {
              expiresIn: "1 days",
            }
          );
          return {
            token,
            userInfo: {
              id: userInfo.id,
              name: userInfo.name,
              email: userInfo.email,
              phone_number: userInfo.phone_number,
              role: userInfo.role,
            },
          };
        }
      }
      throw new HttpError(
        400,
        "Invalid acount",
        "Sai thông tin đăng nhập, vui lòng kiểm tra lại"
      );
    } catch (error) {
      throw error;
    }
  }

  //Get all students
  public async getAllStudent(
    pageSize: number,
    current: number,
    name: string
  ): Promise<any> {
    try {
      const [listStudent, totalRows] = await userRepository.getAllUserByRole(
        {
          role: 0,
          name: {
            [Op.like]: "%" + name + "%",
          },
        },
        pageSize,
        current
      );
      return {
        listStudent: {
          students: listStudent.map((user: any) => ({
            ...user.dataValues,
            password: CryptoJs.AES.decrypt(
              user.dataValues.password,
              config.auth_secret
            ).toString(CryptoJs.enc.Utf8),
          })),
          totalRows,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  //Get all students
  public async getAllTeacher(
    pageSize: number,
    current: number,
    name: string
  ): Promise<any> {
    try {
      const [listTeacher, totalRows] = await userRepository.getAllUserByRole(
        {
          role: 1,
          name: {
            [Op.like]: "%" + name + "%",
          },
        },
        pageSize,
        current
      );
      return {
        teachers: listTeacher.map((user: any) => ({
          ...user.dataValues,
          password: CryptoJs.AES.decrypt(
            user.dataValues.password,
            config.auth_secret
          ).toString(CryptoJs.enc.Utf8),
        })),
        totalRows,
      };
    } catch (error) {
      throw error;
    }
  }

  //Get all students
  public async getStudentDetail(id: number): Promise<any> {
    try {
      const studentDetail: any = await userRepository.getUserDetail({
        id,
      });
      if (studentDetail) {
        const listUserClass = await userClassRepository.getAllUserClassByUserId(
          {
            user_id: id,
          }
        );
        console.log(listUserClass);
        const listClass = await Promise.all(
          listUserClass.map(async (userClass: any) => {
            const classDetail = await classRepository.getClassById(
              userClass.class_id
            );
            let subjectDetail;
            let sessionList;
            if (classDetail) {
              subjectDetail = await subjectRepository.getSubjectById(
                classDetail?.subject_id
              );
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
            }

            return {
              ...classDetail,
              subject: subjectDetail,
              sessionList,
            };
          })
        );
        return {
          ...studentDetail.dataValues,
          password: CryptoJs.AES.decrypt(
            studentDetail.dataValues.password,
            config.auth_secret
          ).toString(CryptoJs.enc.Utf8),
          listClass,
        };
      } else {
        throw new HttpError(
          404,
          "Không tìm thấy thông tin",
          "Không tìm thấy thông tin"
        );
      }
    } catch (error) {
      throw error;
    }
  }
}

export const userService = new UserService();

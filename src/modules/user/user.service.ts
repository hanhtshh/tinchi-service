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
  public async createUserAccount(userInfo: UserCreateAttributes): Promise<any> {
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
  public async getAllStudent(pageSize: number, current: number): Promise<any> {
    try {
      const listStudent = await userRepository.getAllUserByRole(
        {
          role: 0,
        },
        pageSize,
        current
      );
      return listStudent.map((user: any) => ({
        ...user.dataValues,
        password: CryptoJs.AES.decrypt(
          user.dataValues.password,
          config.auth_secret
        ).toString(CryptoJs.enc.Utf8),
      }));
    } catch (error) {
      throw error;
    }
  }

  //Get all students
  public async getAllTeacher(pageSize: number, current: number): Promise<any> {
    try {
      const listStudent = await userRepository.getAllUserByRole(
        {
          role: 1,
        },
        pageSize,
        current
      );
      return listStudent.map((user: any) => ({
        ...user.dataValues,
        password: CryptoJs.AES.decrypt(
          user.dataValues.password,
          config.auth_secret
        ).toString(CryptoJs.enc.Utf8),
      }));
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
        const listClass = await Promise.all(
          listUserClass.map((userClass: any) => {
            return classRepository.getClassById(userClass.id);
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

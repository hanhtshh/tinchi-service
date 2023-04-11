import { SERVICE_NAME } from "../../common/constants";
import { AbstractController } from "../../common/rest/rest.controller";
import authorizeMiddleware from "../../middleware/authen";

import { IRequest } from "../../common/rest/rest.interface";
import { UserService } from "./user.service";
import userValidation from "./user.validation";

class UserController extends AbstractController {
  private userService: UserService;

  constructor(userService: UserService) {
    super(`/${SERVICE_NAME}`);
    this.userService = userService;
    this.initializeRoutes();
  }

  protected initializeRoutes(): void {
    this.router.get(
      `${this.path}/user/get-user-info`,
      authorizeMiddleware.allSource,
      this.asyncRouteFormatResponse(this.getUserInfo)
    );

    this.router.get(
      `${this.path}/users/get-all-student`,
      authorizeMiddleware.allSource,
      this.asyncRouteFormatResponse(this.getAllStudent)
    );

    this.router.get(
      `${this.path}/users/get-user-detail/:id`,
      this.asyncRouteFormatResponse(this.getStudentDetail)
    );

    this.router.get(
      `${this.path}/users/get-all-teacher`,
      authorizeMiddleware.allSource,
      this.asyncRouteFormatResponse(this.getAllTeacher)
    );

    this.router.post(
      `${this.path}/users/create`,
      // authorizeMiddleware.adminSource,
      this.asyncRouteFormatResponse(this.createUser)
    );

    this.router.post(
      `${this.path}/user/login`,
      this.asyncRouteFormatResponse(this.loginUser)
    );

    this.router.post(
      `${this.path}/user/register`,
      this.asyncRouteFormatResponse(this.registerUser)
    );
  }

  getUserInfo = async (request: IRequest) => {
    const args = { ...request.query };
    const vArgs = await this.validation(
      args,
      userValidation.getUserInforValidation
    );
    const query = vArgs;

    const response = await this.userService.getUserInfo(query);
    return response;
  };

  createUser = async (request: IRequest) => {
    const args = { ...request.body };
    const vArgs = await this.validation(
      args,
      userValidation.createUserValidation
    );
    const { name, email, phone_number, role, password } = vArgs;

    const response = await this.userService.createUserAccount({
      name,
      email,
      password,
      phone_number,
      role,
    });
    return response;
  };

  loginUser = async (request: IRequest) => {
    const args = { ...request.body };
    const vArgs = await this.validation(
      args,
      userValidation.loginUserValidation
    );
    const { email, password } = vArgs;

    const response = await this.userService.loginUser(email, password);
    return response;
  };

  registerUser = async (request: IRequest) => {
    const args = { ...request.body };
    const vArgs = await this.validation(
      args,
      userValidation.registerUserValidation
    );
    const { email, password, name, phone_number, secret } = vArgs;

    const response = await this.userService.registerUser(
      email,
      password,
      name,
      phone_number,
      secret
    );
    return response;
  };

  getAllStudent = async (request: IRequest) => {
    const args = { ...request.query };
    const vArgs = await this.validation(
      args,
      userValidation.getAllStudentValidation
    );
    const { pageSize = 10, current = 1, name = "" } = vArgs;

    const response = await this.userService.getAllStudent(
      pageSize,
      current,
      name
    );
    return response;
  };

  getAllTeacher = async (request: IRequest) => {
    const args = { ...request.query };
    const vArgs = await this.validation(
      args,
      userValidation.getAllStudentValidation
    );
    const { pageSize = 10, current = 1, name = "" } = vArgs;

    const response = await this.userService.getAllTeacher(
      pageSize,
      current,
      name
    );
    return response;
  };

  getStudentDetail = async (request: IRequest) => {
    const args = { ...request.params };
    const vArgs = await this.validation(
      args,
      userValidation.getStudentDetailValidation
    );
    const { id } = vArgs;

    const response = await this.userService.getStudentDetail(id);
    return response;
  };
}

export default UserController;

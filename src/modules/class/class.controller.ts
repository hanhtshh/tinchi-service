import { SERVICE_NAME } from "../../common/constants";
import { AbstractController } from "../../common/rest/rest.controller";
import authorizeMiddleware from "../../middleware/authen";

import { IRequest } from "../../common/rest/rest.interface";
import { ClassService } from "./class.service";
import classValidation from "./class.validation";

class ClassController extends AbstractController {
  private classService: ClassService;

  constructor(ClassService: ClassService) {
    super(`/${SERVICE_NAME}`);
    this.classService = ClassService;
    this.initializeRoutes();
  }

  protected initializeRoutes(): void {
    this.router.get(
      `${this.path}/class/get-class-info`,
      // authorizeMiddleware.allSource,
      this.asyncRouteFormatResponse(this.getClassInfo)
    );

    this.router.get(
      `${this.path}/class/get-all-class`,
      // authorizeMiddleware.allSource,
      this.asyncRouteFormatResponse(this.getAllClass)
    );

    this.router.post(
      `${this.path}/class/create`,
      this.asyncRouteFormatResponse(this.createClass)
    );

    this.router.post(
      `${this.path}/class/check-schedule`,
      this.asyncRouteFormatResponse(this.checkSchedule)
    );

    this.router.post(
      `${this.path}/class/add-class`,
      authorizeMiddleware.allSource,
      this.asyncRouteFormatResponse(this.addClass)
    );

    this.router.post(
      `${this.path}/class/add-class-admin`,
      authorizeMiddleware.allSource,
      this.asyncRouteFormatResponse(this.addClassAdmin)
    );

    this.router.put(
      `${this.path}/class/update`,
      this.asyncRouteFormatResponse(this.updateClass)
    );
  }

  getClassInfo = async (request: IRequest) => {
    const args = { ...request.query };
    const vArgs = await this.validation(
      args,
      classValidation.getClassInforValidation
    );
    const query = vArgs;

    const response = await this.classService.getClassInfo(query);
    return response;
  };

  getAllClass = async (request: IRequest) => {
    const args = { ...request.query };
    const vArgs = await this.validation(
      args,
      classValidation.getAllClassValidation
    );
    const { pageSize = 10, current = 1, name = "" } = vArgs;

    const response = await this.classService.getAllClass(
      pageSize,
      current,
      name
    );
    return response;
  };

  createClass = async (request: IRequest) => {
    const args = { ...request.body };
    const vArgs = await this.validation(
      args,
      classValidation.createClassValidation
    );
    const { subject_id, group, max_student, listSessionId } = vArgs;

    const response = await this.classService.createNewClass({
      subject_id,
      group,
      max_student,
      listSessionId,
    });
    return response;
  };

  updateClass = async (request: IRequest) => {
    const args = { ...request.body };
    const vArgs = await this.validation(
      args,
      classValidation.createClassValidation
    );
    const { subject_id, group, max_student, listSessionId, id } = vArgs;

    const response = await this.classService.updateClass({
      subject_id,
      group,
      max_student,
      listSessionId,
      id,
    });
    return response;
  };

  checkSchedule = async (request: IRequest) => {
    const args = { ...request.body };
    const vArgs = await this.validation(
      args,
      classValidation.checkScheduleValidation
    );
    const { listClassId } = vArgs;

    const response = await this.classService.checkSchedule(listClassId);
    return response;
  };

  addClass = async (request: IRequest) => {
    const args = { ...request.body };
    const vArgs = await this.validation(
      args,
      classValidation.checkScheduleValidation
    );
    const userInfo = (request as any)?.userInfo;
    const { listClassId } = vArgs;

    const response = await this.classService.addClass(
      listClassId,
      userInfo?.id
    );
    return response;
  };

  addClassAdmin = async (request: IRequest) => {
    const args = { ...request.body };
    const vArgs = await this.validation(
      args,
      classValidation.checkScheduleValidation
    );
    const { listClassId, userId } = vArgs;

    const response = await this.classService.addClass(listClassId, userId);
    return response;
  };
}

export default ClassController;

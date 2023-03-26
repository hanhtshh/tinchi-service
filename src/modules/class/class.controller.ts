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
      authorizeMiddleware.allSource,
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
    const { pageSize = 10, current = 1 } = vArgs;

    const response = await this.classService.getAllClass(pageSize, current);
    return response;
  };

  createClass = async (request: IRequest) => {
    const args = { ...request.body };
    const vArgs = await this.validation(
      args,
      classValidation.createClassValidation
    );
    const { subject_id, group, max_student } = vArgs;

    const response = await this.classService.createNewClass({
      subject_id,
      group,
      max_student,
    });
    return response;
  };
}

export default ClassController;

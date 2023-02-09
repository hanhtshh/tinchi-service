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
      `${this.path}/Class/get-Class-info`,
      authorizeMiddleware.allSource,
      this.asyncRouteFormatResponse(this.getClassInfo)
    );

    this.router.post(
      `${this.path}/Classs/create`,
      authorizeMiddleware.adminSource,
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

  createClass = async (request: IRequest) => {
    const args = { ...request.body };
    const vArgs = await this.validation(
      args,
      classValidation.createClassValidation
    );
    const { name, status, max_student, tinchi_number } = vArgs;

    const response = await this.classService.createNewClass({
      name,
      status,
      max_student,
      tinchi_number,
    });
    return response;
  };
}

export default ClassController;

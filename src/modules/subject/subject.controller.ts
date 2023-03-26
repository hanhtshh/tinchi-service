import { SERVICE_NAME } from "../../common/constants";
import { AbstractController } from "../../common/rest/rest.controller";
import authorizeMiddleware from "../../middleware/authen";

import { IRequest } from "../../common/rest/rest.interface";
import { SubjectService } from "./subject.service";
import subjectValidation from "./subject.validation";

class SubjectController extends AbstractController {
  private subjectService: SubjectService;

  constructor(SubjectService: SubjectService) {
    super(`/${SERVICE_NAME}`);
    this.subjectService = SubjectService;
    this.initializeRoutes();
  }

  protected initializeRoutes(): void {
    this.router.get(
      `${this.path}/subject/get-subject-info`,
      authorizeMiddleware.allSource,
      this.asyncRouteFormatResponse(this.getSubjectInfo)
    );

    this.router.get(
      `${this.path}/subject/get-all-subject`,
      // authorizeMiddleware.allSource,
      this.asyncRouteFormatResponse(this.getAllSubject)
    );

    this.router.post(
      `${this.path}/subject/create`,
      this.asyncRouteFormatResponse(this.createSubject)
    );

    this.router.put(
      `${this.path}/subject/update/:id`,
      this.asyncRouteFormatResponse(this.updateSubject)
    );
  }

  getSubjectInfo = async (request: IRequest) => {
    const args = { ...request.query };
    const vArgs = await this.validation(
      args,
      subjectValidation.getSubjectInforValidation
    );
    const query = vArgs;

    const response = await this.subjectService.getSubjectInfo(query);
    return response;
  };

  getAllSubject = async (request: IRequest) => {
    const args = { ...request.query };
    const vArgs = await this.validation(
      args,
      subjectValidation.getAllSubjectValidation
    );
    const { pageSize = 10, current = 1 } = vArgs;

    const response = await this.subjectService.getAllSubject(pageSize, current);
    return response;
  };

  createSubject = async (request: IRequest) => {
    const args = { ...request.body };
    const vArgs = await this.validation(
      args,
      subjectValidation.createSubjectValidation
    );
    const { name, tinchi_number } = vArgs;

    const response = await this.subjectService.createNewSubject({
      name,
      tinchi_number,
    });
    return response;
  };

  updateSubject = async (request: IRequest) => {
    const args = { ...request.body, ...request.params };
    const vArgs = await this.validation(
      args,
      subjectValidation.updateSubjectValidation
    );
    const { name, tinchi_number, id } = vArgs;

    const response = await this.subjectService.updateSubject(id, {
      name,
      tinchi_number,
    });
    return response;
  };
}

export default SubjectController;

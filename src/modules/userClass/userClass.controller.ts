import { SERVICE_NAME } from "../../common/constants";
import { AbstractController } from "../../common/rest/rest.controller";

import { IRequest } from "../../common/rest/rest.interface";
import { UserClassService } from "./userClass.service";
import userClassValidation from "./userClass.validation";

class UserClassController extends AbstractController {
  private userService: UserClassService;

  constructor(userService: UserClassService) {
    super(`/${SERVICE_NAME}`);
    this.userService = userService;
    this.initializeRoutes();
  }

  protected initializeRoutes(): void {
    this.router.post(
      `${this.path}/user-class/create`,
      // authorizeMiddleware.adminSource,
      this.asyncRouteFormatResponse(this.createUserClass)
    );
  }

  createUserClass = async (request: IRequest) => {
    const args = { ...request.body };
    const vArgs = await this.validation(
      args,
      userClassValidation.createUserClassValidation
    );
    const { user_id, class_id } = vArgs;

    const response = await this.userService.createUserClass(user_id, class_id);
    return response;
  };
}

export default UserClassController;

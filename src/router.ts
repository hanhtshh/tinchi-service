import { AbstractController } from "./common/rest/rest.controller";
import HealthController from "./modules/healthCheck/healthCheck.controller";

import UserController from "./modules/user/user.controller";
import { userService } from "./modules/user/user.service";

const Router: AbstractController[] = [
  new HealthController(),
  new UserController(userService),
];

export default Router;

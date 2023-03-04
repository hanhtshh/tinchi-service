import { AbstractController } from "./common/rest/rest.controller";
import ClassController from "./modules/class/class.controller";
import { classService } from "./modules/class/class.service";
import HealthController from "./modules/healthCheck/healthCheck.controller";
import SessionController from "./modules/session/session.controller";
import { sessionService } from "./modules/session/session.service";

import UserController from "./modules/user/user.controller";
import { userService } from "./modules/user/user.service";

const Router: AbstractController[] = [
  new HealthController(),
  new UserController(userService),
  new ClassController(classService),
  new SessionController(sessionService),
];

export default Router;

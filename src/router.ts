import { AbstractController } from "./common/rest/rest.controller";
import ClassController from "./modules/class/class.controller";
import { classService } from "./modules/class/class.service";
import HealthController from "./modules/healthCheck/healthCheck.controller";
import SessionController from "./modules/session/session.controller";
import { sessionService } from "./modules/session/session.service";
import SubjectController from "./modules/subject/subject.controller";
import { subjectService } from "./modules/subject/subject.service";

import UserController from "./modules/user/user.controller";
import { userService } from "./modules/user/user.service";
import UserClassController from "./modules/userClass/userClass.controller";
import { userClassService } from "./modules/userClass/userClass.service";

const Router: AbstractController[] = [
  new HealthController(),
  new UserController(userService),
  new ClassController(classService),
  new SessionController(sessionService),
  new UserClassController(userClassService),
  new SubjectController(subjectService),
];

export default Router;

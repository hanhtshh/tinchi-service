import {
  NextFunction,
  Response, Router
} from 'express';
import { Logger } from '../../logger';
import HttpStatusCode from '../constants/httpStatus.enum';
import { sendError, sendSuccess } from './res.util';
import { IController, IRequest } from './rest.interface';

type validationFn = (args: any) => Promise<boolean>;
type routeAsyncFn = (request: any, response: Response, next: NextFunction) => Promise<any>;
export abstract class AbstractController implements IController {
  public readonly path: string;

  public readonly router: Router = Router();

  public sendError = sendError;

  public sendSuccess = sendSuccess;

  public logger: Logger;

  constructor(path: string) {
    this.path = path;
    this.logger = Logger.getInstance(module);
  }

  protected abstract initializeRoutes(): void;

  protected asyncRouteFormatResponse = (fn: routeAsyncFn) => async (
    req: IRequest,
    res: Response,
    next: NextFunction
  ) => {
    this.logger.info(`[${req.method}] [${req.originalUrl}]`);
    this.logger.info(`[PAYLOAD]: ${JSON.stringify({ ...req.body, ...req.query, ...req.params })}`);
    try {
      const result = await fn(req, res, next);
      return this.sendSuccess(req, res)({
        data: result?.data || result,
        code: result?.code || HttpStatusCode.OK,
      });
    } catch (error: any) {
      return this.sendError(req, res)(error as Error, error?.status);
    }
  };

  protected validation = async (args: any, func: validationFn): Promise<any> => {
    try {
      const validated = await func(args);

      return validated;
    } catch (error: any) {
      this.logger.error(`validation error: ${JSON.stringify(error)}`);
      error.status = HttpStatusCode.BAD_REQUEST;
      throw error;
    }
  };
}
import { NextFunction, Response } from 'express';
import { SERVICE_NAME } from '../../common/constants';
import { sendSuccess } from '../../common/rest/res.util';
import { AbstractController } from '../../common/rest/rest.controller';
import { IRequest } from '../../common/rest/rest.interface';

class HealthController extends AbstractController {
  constructor() {
    super(`/${SERVICE_NAME}`);
    this.initializeRoutes();
  }

  protected initializeRoutes = () => {
    this.router.get(`${this.path}/health-check`, this.healthResponse);
    this.router.get(`${this.path}/ping`, this.ping);
  };

  private healthResponse = async (
    req: IRequest,
    response: Response,
    _next: NextFunction
  ) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const data = { message: 'Tinchi Service is UP and Running', ip };
    return sendSuccess(req, response)({ data });
  };

  private ping = (_request: IRequest, res: Response, _next: NextFunction) =>
    res.send('pong!');
}

export default HealthController;

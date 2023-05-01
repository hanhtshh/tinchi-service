import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { ERRORS } from "../common/constants";
import HttpStatusCode from "../common/constants/httpStatus.enum";
import { sendError } from "../common/rest/res.util";
import { IRequest } from "../common/rest/rest.interface";
import config from "../config";

const error: Error = {
  name: ERRORS.UNAUTHORIZED.message,
  message: ERRORS.UNAUTHORIZED.message,
};

const allSource = (request: IRequest, res: Response, next: NextFunction) => {
  // keycloak
  if (request.headers && request.headers.authorization) {
    const authHeader = request.headers.authorization.split(" ");
    const tokenPrefix = authHeader[0];
    const token = authHeader[1];
    const userInfo: any = jwt.verify(token, config.token_secret);
    if (userInfo?.role >= 0 && tokenPrefix === "Bearer") {
      (request as any).userInfo = userInfo;
      return next();
    }
  }
  return sendError(request, res)(error, HttpStatusCode.FORBIDDEN);
};

const adminSource = (request: IRequest, res: Response, next: NextFunction) => {
  // keycloak
  if (request.headers && request.headers.authorization) {
    const authHeader = request.headers.authorization.split(" ");
    const tokenPrefix = authHeader[0];
    const token = authHeader[1];
    const userInfo: any = jwt.verify(token, config.token_secret);

    if (userInfo?.role === 2 && tokenPrefix === "Bearer") {
      (request as any).userInfo = userInfo;
      return next();
    }
  }

  return sendError(request, res)(error, HttpStatusCode.FORBIDDEN);
};

export default {
  allSource,
  adminSource,
};

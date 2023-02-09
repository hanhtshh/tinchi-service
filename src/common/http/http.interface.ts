import { Method } from "./htttp.enums";

export interface IHttpResponseBody<DataType, ErrorType> {
  data?: DataType;
  error?: ErrorType;
}

export interface IRequest {
  apiPath: string;
  method: Method;
  headers?: Record<string, any>;
  payload?: any;
  params?: any;
  rejectUnauthorized?: boolean;
}

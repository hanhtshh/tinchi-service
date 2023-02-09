import {
  RequestConfig, BasicAuth, Response, HttpError
} from './http.model';
import { Method, StatusCode } from './htttp.enums';
import { ResponseBase } from './HttpResponse';
import { AxiosHttpClient, HttpClient } from './http.client';

export {
  RequestConfig, Response, BasicAuth, HttpError, HttpClient
};
export interface IHttpResponseBody<DataType, ErrorType> {
  data?: DataType;
  error?: ErrorType;
}

export const createHttpClient = (config: RequestConfig): HttpClient => new AxiosHttpClient(config);

export default {
  Method,
  StatusCode,
  ResponseBase,
};
